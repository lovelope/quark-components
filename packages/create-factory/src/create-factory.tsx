import React from 'react';
import { Form } from 'antd';
import { isNil } from 'lodash';
import { parse } from 'qs';
import { withRouter, RouteComponentProps } from 'react-router';
// eslint-disable-next-line import/extensions
import { FormComponentProps } from 'antd/es/form/Form';

interface Data {
  [key: string]: unknown;
}
interface ResponseData {
  [k: string]: unknown;
  data?: Data;
}

const convertDataToForm = (data: Data) =>
  Object.keys(data).reduce((prev, cur) => {
    // eslint-disable-next-line no-param-reassign
    prev[cur] = { value: isNil(data[cur]) ? '--' : data[cur] };
    return prev;
  }, {});

export type WrapperProps = RouteComponentProps & FormComponentProps;

export interface WrapperState {
  isUpdate: boolean;
  id?: string | number;
  isLoading: boolean;
  data: {
    [key: string]: unknown;
  };
}

export interface CreateFactoryProps {
  key?: string;
  getAction: (id: WrapperState['id']) => Promise<ResponseData>;
  putAction: (id: WrapperState['id'], values: Data) => Promise<ResponseData>;
  postAction: (values: Data) => Promise<ResponseData>;
  mapPropsToFields?: (v: any) => any;
  initialValues?: Data;
}

export type CreateFactoryType = (
  props: CreateFactoryProps
) => (Component: React.ComponentType<WrapperProps>) => React.ComponentType;

const CreateFactory: CreateFactoryType = ({
  key = 'id',
  getAction,
  putAction,
  postAction,
  mapPropsToFields = p => p,
  initialValues = {},
}: CreateFactoryProps) => Component => {
  class WrapperComponent extends React.Component<WrapperProps, WrapperState> {
    static displayName = `CreateFactory(${Component.displayName ||
      Component.name ||
      'Component'})`;

    constructor(props) {
      super(props);
      const {
        match: {
          // @ts-ignore
          params: { [key]: matchId },
        },
        location: { search },
      } = this.props;
      const { [key]: queryId } = parse(search.substring(1));
      const id = matchId || queryId;

      this.state = { isUpdate: !isNil(id), data: {}, id, isLoading: false };
    }

    async componentDidMount() {
      const { isUpdate, id } = this.state;
      const {
        form: { setFields },
      } = this.props;
      setFields(convertDataToForm(initialValues));
      if (isUpdate) {
        this.setState({ isLoading: true });
        const { data = {} } = await getAction(id);
        if (data) {
          const fields = mapPropsToFields(data);
          setFields(convertDataToForm(fields));
        }
        this.setState({ isLoading: false, data });
      }
    }

    onSubmit = async (values, callback) => {
      this.setState({ isLoading: true });
      const { isUpdate, id } = this.state;
      const response = isUpdate
        ? await putAction(id, values)
        : await postAction(values);
      this.setState({ isLoading: false });
      if (response && callback) {
        callback();
      }
      return response;
    };

    render() {
      const definedProps = {
        ...this.props,
        ...this.state,
        onSubmit: this.onSubmit,
      };

      return <Component {...definedProps} />;
    }
  }

  return withRouter(Form.create<WrapperProps>()(WrapperComponent));
};

export default CreateFactory;
