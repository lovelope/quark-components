# `@lovelope/create-factory`

`CreateFactory` 是一个用于管理编辑页与详情页的高阶组件；主要负责数据的拉取和更新；

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

// 这个页面的路由是 /user/edit/:userId

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

## 配置参数

| 属性             | 说明                                                 | 类型           | 必填  | 默认值   |
| ---------------- | ---------------------------------------------------- | -------------- | ----- | -------- |
| key              | 路由 url 中的定义的 id 值                            | string, number | false | 'id'     |
| getAction        | 初始化时的调用的拉取表单数据的函数                   | () => promise  | false | --       |
| putAction        | 编辑表单后提交需要调用的函数                         | () => promise  | false | --       |
| postAction       | 新增表单时需要调用的函数                             | promise        | false | --       |
| mapPropsToFields | getAction 拿取到的数据的在填充进表单项前的格式化函数 | function       | false | () => {} |
| initialValues    | 表单默认值                                           | object         | false | {}       |
