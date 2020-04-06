import React from 'react';
import { render } from 'enzyme';
import { Form, Input } from 'antd';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
// @ts-ignore ts2691
import CreateFactory, { CreateFactoryProps } from '../src/create-factory.tsx';

const FormItem = Form.Item;

describe('create-factory', () => {
  it('should be defined', () => {
    expect(CreateFactory).toBeDefined();
  });

  it('should be a function', () => {
    expect(typeof CreateFactory === 'function').toBeTruthy();
  });

  describe('components', () => {
    function testPair(name, renderComponent) {
      describe(`${name}`, () => {
        it('normal', () => {
          expect(render(renderComponent({}))).toMatchSnapshot();
        });
      });
    }

    testPair('CreateFactory', (props) => {
      @CreateFactory({
        key: 'userId',
        getAction: () => {},
        putAction: () => {},
      })
      class Email extends React.Component<CreateFactoryProps> {
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

      return (
        <Router history={createBrowserHistory()}>
          <Email />
        </Router>
      );
    });
  });
});
