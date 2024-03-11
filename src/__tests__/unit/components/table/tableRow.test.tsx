import { render, screen } from '@testing-library/react';
import { ColumnConfig } from 'components/table/config'
import { Cell, TableRow } from 'components/table/tableRow'

test('renderCell_withDataKey_shouldRenderValueOfThatKey', () => {
  const data = {
    foo: "bar"
  }
  const columnConfig: ColumnConfig<typeof data> = {
    dataKey: "foo",
    displayName: "Foo"
  }

  render(<table><tbody><tr>
    <Cell
      columnsConfig={columnConfig}
      data={data}
    />
  </tr></tbody></table>);

  expect(screen.getByText(data.foo)).toBeInTheDocument()
});

test('renderCell_withDataKey_shouldSetDataKeyAsClass', () => {
  const data = {
    foo: "bar"
  }
  const columnConfig: ColumnConfig<typeof data> = {
    dataKey: "foo",
    displayName: "Foo"
  }

  const { container } = render(<table><tbody><tr>
    <Cell
      columnsConfig={columnConfig}
      data={data}
    />
  </tr></tbody></table>);

  expect(container.getElementsByClassName(columnConfig.dataKey)[0]).toBeInTheDocument()
});

test('renderCell_withInvalidDataValue_shouldThrowError', () => {
  // mute expected render error
  jest.spyOn(console, 'error').mockImplementation(jest.fn());
  const data = {
    foo: { bar: "baz" }
  }
  const columnConfig: ColumnConfig<typeof data> = {
    dataKey: "foo",
    displayName: "Foo"
  }

  const renderCall = () => render(<table><tbody><tr>
    <Cell
      columnsConfig={columnConfig}
      data={data}
    />
  </tr></tbody></table>)

  expect(renderCall).toThrowError()
});
