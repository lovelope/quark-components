import React from 'react';
import { mapValues } from 'lodash';

/**
 * 分页字段映射
 * @interface PaginationEnums
 * @param {string} page 页数
 * @param {string} pageSize 分页大小
 */
export interface PaginationEnums {
  page: string;
  pageSize: string;
}
const initialEnums: PaginationEnums = {
  page: 'page',
  pageSize: 'pageSize',
};

/**
 * 跳转页面后回退支持保留查询条件
 * @interface ParamsStoreType
 * @param {*} params 查询条件
 */
interface ParamsStoreType {
  params: {
    [key: string]: unknown;
  };
}
class ParamsStore implements ParamsStoreType {
  params;

  constructor(props) {
    this.params = props;
  }

  setPathQuery = query => {
    this.params = query;
  };
}

interface Data {
  [key: string]: unknown;
}

interface ResponseData {
  data?: Data;
  [k: string]: unknown;
}

interface WrapperComponentProps {}
interface WrapperComponentState {
  query: {
    [key: string]: unknown;
  };
  isLoading: boolean;
  data: Data;
}

export interface TableFactoryProps {
  immediate?: boolean;
  enums?: PaginationEnums;
  mute?: string[];
  getAction: (params?: unknown) => Promise<ResponseData>;
  params?: {
    [key: string]: unknown;
  };
  format?: (v: unknown) => unknown;
}

export type TableFactoryType = (
  props: TableFactoryProps
) => (Component: React.ComponentType) => React.ComponentType;

const TableFactory: TableFactoryType = ({
  immediate = true,
  enums = initialEnums,
  mute = ['keyword'],
  getAction,
  params = {},
  format = p => p,
}: TableFactoryProps) => (Component: React.ComponentType) => {
  const store = new ParamsStore({
    [enums.page]: params[enums.page] || 1,
    [enums.pageSize]: params[enums.pageSize] || 20,
    ...params,
  });
  class WrapperComponent extends React.Component<
    WrapperComponentProps,
    WrapperComponentState
  > {
    static displayName = `TableFactory(${Component.displayName ||
      Component.name ||
      'Component'})`;

    constructor(props) {
      super(props);
      this.state = {
        query: { ...store.params },
        data: {},
        isLoading: false,
      };
    }

    componentDidMount() {
      this.loadData();
    }

    onFilter = (queryParams = {}, cb = () => {}) => {
      const { query } = this.state;
      let updatedQuery = {};
      if (immediate && Object.keys(queryParams).every(p => p !== enums.page)) {
        updatedQuery = { ...query, ...queryParams, [enums.page]: 1 };
      } else {
        updatedQuery = { ...query, ...queryParams };
      }

      this.setState({ query: { ...updatedQuery } }, () => {
        if (
          immediate &&
          !Object.keys(queryParams).some(p => mute.includes(p))
        ) {
          this.loadData();
        }
        cb();
        store.setPathQuery(updatedQuery);
      });
    };

    onReset = () => {
      const { query } = this.state;
      const emptyQuery = {
        ...mapValues(query, () => ''),
        [enums.page]: params[enums.page] || 1,
        [enums.pageSize]: params[enums.pageSize] || 20,
        ...params,
      };
      this.setState({ query: { ...emptyQuery } }, () => {
        this.loadData();
      });
    };

    // 允许主动调用取值函数
    loadData = async () => {
      this.setState({ isLoading: true });
      const { query } = this.state;
      const response = await getAction(format(query));
      this.setState({ data: (response || {}).data || {}, isLoading: false });
    };

    render() {
      const definedProps = {
        ...this.state,
        ...this.props,
        loadData: this.loadData,
        onFilter: this.onFilter,
        onReset: this.onReset,
      };
      return <Component {...definedProps} />;
    }
  }
  return WrapperComponent;
};

export default TableFactory;
