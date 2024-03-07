import { ActionsConfig, ColumnConfig } from 'table/config';

interface TableHeaderProps<T> {
  actionsConfig: ActionsConfig<T>[]
  columnsConfig: ColumnConfig<T>[]
}

const Action = <T,>(props: ActionsConfig<T>) => {
  return <button>{props.buttonContent}</button>
}

const ColumnHeader = <T,>(props: ColumnConfig<T>) => {
  return <th>{props.displayName}</th>
}

export const TableHeader = <T,>(props: TableHeaderProps<T>) => {
  return <>
    {!!props.actionsConfig.length && <caption>
      {props.actionsConfig.map((x, i) => <Action key={i} {...x} />)}
    </caption>}
    <thead>
      <tr>
        {props.columnsConfig.map(x => <ColumnHeader key={x.dataKey.toString()} {...x} />)}
      </tr>
    </thead>
  </>
}
