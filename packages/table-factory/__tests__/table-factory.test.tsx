import React from 'react';
import { render } from 'enzyme';
import { Table } from 'antd';
// @ts-ignore ts2691
import TableFactory, { TableFactoryProps } from '../src/table-factory.tsx';

describe('table-factory', () => {
  it('should be defined', () => {
    expect(TableFactory).toBeDefined();
  });

  it('should be a function', () => {
    expect(typeof TableFactory === 'function').toBeTruthy();
  });

  describe('components', () => {
    function testPair(name, renderComponent) {
      describe(`${name}`, () => {
        it('normal', () => {
          expect(render(renderComponent({}))).toMatchSnapshot();
        });
      });
    }

    testPair('TableFactory', props => {
      interface YourFilterProps {
        onFilter: (v: any) => void;
        query: any;
        onReset: (v: any) => void;
      }
      class YourFilter extends React.Component<YourFilterProps> {
        render() {
          return null;
        }
      }

      @TableFactory({
        getAction: () => {},
      })
      class GoodsList extends React.Component<TableFactoryProps> {
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
                <YourFilter
                  onFilter={onFilter}
                  query={query}
                  onReset={onReset}
                />
              </div>
              <div className="body">
                <Table dataSource={list} />
              </div>
            </div>
          );
        }
      }

      return <GoodsList />;
    });
  });
});
