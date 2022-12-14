import React, { createRef } from 'react';
import { isNil } from 'lodash';
import { parse } from 'qs';
import { withRouter } from 'react-router';
import type { RouteComponentProps } from 'react-router';
import type { FormInstance, FormProps } from 'antd/es/form';

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

export type WrapperProps = RouteComponentProps & FormProps;

export interface WrapperState {
  isUpdate: boolean;
  id?: string;
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

const CreateFactory: CreateFactoryType =
  ({
    key = 'id',
    getAction,
    putAction,
    postAction,
    mapPropsToFields = (p) => p,
    initialValues = {},
  }: CreateFactoryProps) =>
  (Component) => {
    class WrapperComponent extends React.Component<WrapperProps, WrapperState> {
      // eslint-disable-next-line react/static-property-placement
      static displayName = `CreateFactory(${
        Component.displayName || Component.name || 'Component'
      })`;

      formRef = createRef<FormInstance>();

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
        const instance = this.formRef.current;
        instance!.setFieldsValue(convertDataToForm(initialValues));
        if (isUpdate) {
          this.setState({ isLoading: true });
          const { data = {} } = await getAction(id);
          if (data) {
            const fields = mapPropsToFields(data);
            instance!.setFieldsValue(convertDataToForm(fields));
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
          ref: this.formRef,
          onSubmit: this.onSubmit,
        };

        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Component {...definedProps} />;
      }
    }

    return withRouter(WrapperComponent);
  };

export default CreateFactory;
