# `@lovelope/table-factory`

`TableFactory` 是一个用于管理列表页的高阶组件；主要负责数据的拉取和筛选条件的管理；

[English](./README.md)
[中文](./README.zh-CN.md)

## 安装

```bash
npm i -S @lovelope/table-factory
# OR
yarn add -S @lovelope/table-factory
```

## 使用

```jsx
import TableFactory from '@lovelope/table-factory';
import React from 'react';
import { getGoodsList } from './services';

@TableFactory({
  getAction: getGoodsList,
  params: { pid },
  mute: ['searchWords'],
})
class GoodsList extends React.Component {
  render() {
    const {
      data: { list },
      query,
      loadData,
      onFilter,
      onReset,
    } = this.props;
    return (
      <div>
        <div className="header">
          <YourFilter onFilter={onFilter} query={query} onReset={onReset} />
        </div>
        <div className="body">
          <Table dataSource={list} />
        </div>
      </div>
    );
  }
}
```

## 配置参数

| 属性      | 说明                                                                     | 类型          | 必填  | 默认值                                 |
| --------- | ------------------------------------------------------------------------ | ------------- | ----- | -------------------------------------- |
| immediate | 用于控制筛选条件改变时是否立即发送请求获取数据                           | boolean       | false | true                                   |
| enums     | 用一组对象修改页面的页数部分的请求参数名字(默认为 page, pageSize)        | object        | false | { page: 'page', pageSize: 'pageSize' } |
| mute      | 控制不立即发送请求的请求参数(比如关键字搜索时，可能并不想输入就立即搜索) | []            | false | ['keyword']                            |
| getAction | 获取 table 数据的请求                                                    | () => promise | true  | --                                     |
| params    | getAction 除筛选条件外的额外可能参数                                     | object        | false | {}                                     |
| format    | getAction 在发起请求前的数据处理函数                                     | function      | false | p => p                                 |

## Tips

- TableFactory 向组件注入了 data, query, onFilter, onReset, loadData 五个 props；
- data 是 getAction 返回的数据；
- onFilter 是给 tableFactory 传参的方法，接收两个参数，第一个是参数对象，第二个是传参后的回调；
- onReset,如果页面需要重置所有请求加参数，你可以使用这个方法；
- loadData，一个主动调取 table 数据的接口；
- query 是 getAction 的请求参数；你可能需要 query 来让组件受控，
- params 如果设置了额外的请求参数，onReset 是不会清空这些参数的，这在时间选择器回到某种初始值时也有帮助；
