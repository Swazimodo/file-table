import { BsSquare, BsDashSquareFill, BsCheckSquareFill } from "react-icons/bs";
import { ActionsConfig, ColumnConfig, DataRow } from 'table/config';

const Action = <T,>(props: ActionsConfig<T>) => {
  return <button>{props.buttonContent}</button>
}

const ColumnHeader = <T,>(props: ColumnConfig<T>) => {
  return <th>{props.displayName}</th>
}

interface TopSelectionControlProps<T> {
  dataRows: DataRow<T>[]
  onSelectAll: () => void
  onUnselectAll: () => void
}

export const TopSelectionControl = <T,>(props: TopSelectionControlProps<T>) => {
  const selectionCount = props.dataRows.filter(x => x.selected).length
  const totalNumberOfRows = props.dataRows.length
  let selectionControl
  if (selectionCount === 0) {
    selectionControl = <BsSquare onClick={props.onSelectAll} />
  } else if (selectionCount !== totalNumberOfRows) {
    selectionControl = <BsDashSquareFill onClick={props.onSelectAll} />
  } else {
    selectionControl = <BsCheckSquareFill onClick={props.onUnselectAll} />
  }

  return <div>{selectionControl}{selectionCount ? selectionCount : "None"} Selected</div>
}

interface TableHeaderProps<T> {
  actionsConfig: ActionsConfig<T>[]
  columnsConfig: ColumnConfig<T>[]
  dataRows: DataRow<T>[]
  onSelectAll: () => void
  onUnselectAll: () => void
}

// TODO: localize `# Selected` label
export const TableHeader = <T,>(props: TableHeaderProps<T>) => {
  return <>
    <caption>
      <TopSelectionControl<T>
        dataRows={props.dataRows}
        onSelectAll={props.onSelectAll}
        onUnselectAll={props.onUnselectAll}
      />
      {props.actionsConfig.map((x, i) => <Action key={i} {...x} />)}
    </caption>
    <thead>
      <tr>
        <th />
        {props.columnsConfig.map(x => <ColumnHeader key={x.dataKey.toString()} {...x} />)}
      </tr>
    </thead>
  </>
}
