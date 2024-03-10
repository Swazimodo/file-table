import { ReactNode, useCallback } from 'react';
import { Box, CheckedBox } from 'components/table/icons';
import { ColumnConfig, DataRow } from 'components/table/config';

interface CellProps<T> {
  columnsConfig: ColumnConfig<T>
  id: number
  data: T
}

export const Cell = <T,>(props: CellProps<T>) => {
  const key = props.columnsConfig.dataKey
  let content: ReactNode
  if (props.columnsConfig.Render) {
    content = <props.columnsConfig.Render data={props.data} />
  } else {
    // if the content is unsupported a render component must be provided
    // TODO: catch any errors here gracefully
    content = <td className={key.toString()}>
      {(props.data[props.columnsConfig.dataKey] as any)}
    </td>
  }
  return content
}

export interface TableRowProps<T extends {}> {
  columnsConfig: ColumnConfig<T>[]
  dataRow: DataRow<T>
  onSelectRow: (id: number) => void
  onUnselectRow: (id: number) => void
}

export const TableRow = <T extends {}>(props: TableRowProps<T>) => {
  const { dataRow, onSelectRow, onUnselectRow } = props

  const handleSelect = useCallback(() => {
    props.onSelectRow(props.dataRow.id)
  }, [onSelectRow, dataRow])

  const handleUnselect = useCallback(() => {
    props.onUnselectRow(props.dataRow.id)
  }, [onUnselectRow, dataRow])


  return <tr>
    <td>{props.dataRow.selected ? <CheckedBox onClick={handleUnselect} /> : <Box onClick={handleSelect} />}</td>
    {props.columnsConfig.map(x => <Cell<T>
      key={x.dataKey.toString()}
      columnsConfig={x}
      data={props.dataRow.data}
      id={props.dataRow.id}
    />)
    }
  </tr>
}
