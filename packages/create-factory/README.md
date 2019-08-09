# `@lovelope/create-factory`

`CreateFactory` is a high-level component used to manage editing pages and details pages; it is mainly responsible for data pulling and updating.

[English](./README.md)
[中文](./README.zh-CN.md)

## 安装

```bash
npm i -S @lovelope/create-factory
# OR
yarn add -S @lovelope/create-factory
```

## 使用

```jsx
import CreateFactory from '@lovelope/create-factory';
import React from 'react';
import { Form } from 'antd';
import { getUserInfo, putUserInfo } from './services';

const FormItem = Form.Item;

// this page's path is /user/edit/:userId

@CreateFactory({
  key: 'userId',
  getAction: getUserInfo,
  putAction: putUserInfo,
})
class Email extends React.Component {
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form>
        <FormItem label="username">
          {getFieldDecorator('name')(<Input />)}
        </FormItem>
        <FormItem label="Eamil">
          {getFieldDecorator('email')(<Input />)}
        </FormItem>
      </Form>
    );
  }
}
```

## Options

| Property         | Description                                                                                        | type           | required | default  |
| ---------------- | -------------------------------------------------------------------------------------------------- | -------------- | -------- | -------- |
| key              | ID value defined in routing URL                                                                    | string, number | false    | 'id'     |
| getAction        | The function that pulls the form data when it is initialized                                       | () => promise  | false    | --       |
| putAction        | Submit the function to be called after editing the form                                            | () => promise  | false    | --       |
| postAction       | The function to be called when adding a new form                                                   | promise        | false    | --       |
| mapPropsToFields | The formatting function of the data that getAction is filled in before the form item is filled in. | function       | false    | () => {} |
| initialValues    | Form default values                                                                                | object         | false    | {}       |
