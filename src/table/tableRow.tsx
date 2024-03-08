import { ReactNode } from 'react';
import { ColumnConfig, RowWithId } from 'table/config';
import { TableHeader } from 'table/tableHeader';

interface CellProps<T> {
  columnsConfig: ColumnConfig<T>
  row: T
}

const Cell = <T,>(props: CellProps<T>) => {
  const key = props.columnsConfig.dataKey
  let content: ReactNode
  if (props.columnsConfig.render) {
    content = <props.columnsConfig.render data={props.row} />
  } else {
    // if the content is unsupported a render component must be provided
    // TODO: catch any errors here gracefully
    content = <td className={key.toString()}>
      {(props.row[props.columnsConfig.dataKey] as any)}
    </td>
  }
  return content
}

export interface TableRowProps<T extends RowWithId> {
  columnsConfig: ColumnConfig<T>[]
  selected: boolean
  row: T
  onSelectRow: (id: string | number) => void
  onUnselectRow: (id: string | number) => void
}

export const TableRow = <T extends RowWithId>(props: TableRowProps<T>) => {
  return <tr>
    {props.columnsConfig.map(x => <Cell
      key={x.dataKey.toString()}
      columnsConfig={x}
      row={props.row}
    />)
    }
  </tr>
}
