import { JSX } from 'react';
import { ActionsConfig, ColumnConfig, RowWithId } from 'table/config';
import { TableHeader } from 'table/tableHeader';
import { TableRow } from 'table/tableRow';


export interface TableWrapperProps<T extends RowWithId> {
  columnsConfig: ColumnConfig<T>[]
  actionsConfig: ActionsConfig<T>[]
  data: T[]
}

export const TableWrapper = <T extends RowWithId>(props: TableWrapperProps<T>): JSX.Element => {
  return <table>
    <TableHeader
      actionsConfig={props.actionsConfig}
      columnsConfig={props.columnsConfig}
    />
    <tbody>
      {props.data.map((row) => <TableRow
        key={row.Id}
        row={row}
        columnsConfig={props.columnsConfig}
        selected={false}
      />)}
    </tbody>
  </table>
}
