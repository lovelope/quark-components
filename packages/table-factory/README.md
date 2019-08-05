# `@lovelope/table-factory`

`TableFactory` is a combinable higher order components for list management page, in order to fetch list data and manage filter queries.

## Install

```bash
npm i -S @lovelope/table-factory
# OR
yarn add -S @lovelope/table-factory
```

## Usage

```js
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

## Options

### `TableFactory`

| Property  | Description                                                                                                                                           | type                    | required | default                                |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------- | -------------------------------------- |
| immediate | Used to control whether requests for data are sent immediately when filter conditions change                                                          | boolean                 | false    | true                                   |
| enums     | Modify the request parameter name of the page number section of the page with a set of objects (page, page Size by default)                           | object                  | false    | { page: 'page', pageSize: 'pageSize' } |
| mute      | Control request parameters that do not immediately send requests (such as keyword search, which may not be immediately searched if you want to enter) | string[]                | false    | ['keyword']                            |
| getAction | Request for table data                                                                                                                                | () => Promise\<object\> | true     | --                                     |
| params    | Additional Possible Parameters of getAction in addition to Screening Conditions                                                                       | object                  | false    | {}                                     |
| format    | Data Processing Function of getAction before Initiating Request                                                                                       | function                | false    | p => p                                 |

## Tips

- `TableFactory` injects data, query, onFilter, onReset and loadData five props into the component.
- `data` is the data returned by `getAction`.
- `onFilter` is a method of passing parameters to tableFactory. It receives two parameters. The first one is the parameter object, and the second one is the callback after reference.
- `onReset`, if the page needs to reset all requests plus parameters, you can use this method;
- `loadData`, an interface that actively calls table data;
- `query` is the request parameter of getAction; you may need query to keep components under control.
- If `params` sets additional request parameters, `onReset` will not empty these parameters, which is also helpful when the timeselector returns to some initial value.
