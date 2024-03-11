import { fireEvent, render, screen } from '@testing-library/react';
import { ColumnConfig, DataRow } from 'components/table/config'
import { Cell, TableRow } from 'components/table/tableRow'

jest.mock('components/mediaQueries', () => ({
  ...jest.requireActual('components/mediaQueries'),
  useMediaQuery: () => ({
    matchesDown: false,
    matchesUp: true
  })
}))

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
      grouped={false}
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
      grouped={false}
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
      grouped={false}
    />
  </tr></tbody></table>)

  expect(renderCall).toThrowError()
});

test('renderCell_withCustomRendererFuncComponent_shouldUseOverride', () => {
  const data = {
    foo: { bar: "baz" }
  }
  const columnConfig: ColumnConfig<typeof data> = {
    dataKey: "foo",
    displayName: "Foo",
    Render: (props) => <div>{props.data.foo.bar}</div>
  }

  render(<table><tbody><tr>
    <Cell
      columnsConfig={columnConfig}
      data={data}
      grouped={false}
    />
  </tr></tbody></table>);

  expect(screen.getByText(data.foo.bar)).toBeInTheDocument()
});

test('renderUnselectedTableRow_clickCheckBox_ShouldCallOnSelectRow', () => {
  const dataRow: DataRow<any> = {
    id: 5,
    selected: false,
    data: { foo: "bar" }
  }
  const columnsConfig: ColumnConfig<typeof dataRow.data>[] = [{
    dataKey: "foo",
    displayName: "Foo"
  }]
  const handleSelectRow = jest.fn()
  const handleUnselectRow = jest.fn()
  const { container } = render(<table><tbody>
    <TableRow
      columnsConfig={columnsConfig}
      dataRow={dataRow}
      onSelectRow={handleSelectRow}
      onUnselectRow={handleUnselectRow}
      tabIndex={0}
    />
  </tbody></table>);

  const checkbox = container.getElementsByClassName('selector')[0].firstChild
  fireEvent.click(checkbox!)

  expect(handleSelectRow).toBeCalledTimes(1)
  expect(handleSelectRow).toBeCalledWith(dataRow.id)
  expect(handleUnselectRow).not.toBeCalled()
});

test('renderSelectedTableRow_clickCheckBox_ShouldCallOnUnselectRow', () => {
  const dataRow: DataRow<any> = {
    id: 5,
    selected: true,
    data: { foo: "bar" }
  }
  const columnsConfig: ColumnConfig<typeof dataRow.data>[] = [{
    dataKey: "foo",
    displayName: "Foo"
  }]
  const handleSelectRow = jest.fn()
  const handleUnselectRow = jest.fn()
  const { container } = render(<table><tbody>
    <TableRow
      columnsConfig={columnsConfig}
      dataRow={dataRow}
      onSelectRow={handleSelectRow}
      onUnselectRow={handleUnselectRow}
      tabIndex={0}
    />
  </tbody></table>);

  const checkbox = container.getElementsByClassName('selector')[0].firstChild
  fireEvent.click(checkbox!)

  expect(handleUnselectRow).toBeCalledTimes(1)
  expect(handleUnselectRow).toBeCalledWith(dataRow.id)
  expect(handleSelectRow).not.toBeCalled()
});
