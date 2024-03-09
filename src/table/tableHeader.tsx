import { useCallback } from "react";
import styled from 'styled-components';
import { Box, CheckedBox, PartialBox } from 'table/icons';
import { ActionsConfig, ColumnConfig, DataRow } from 'table/config';

interface ActionProps<T> extends ActionsConfig<T> {
  dataRows: DataRow<T>[]
}

const Action = <T,>(props: ActionProps<T>) => {
  const {
    buttonContent,
    dataRows,
    onClick } = props
  const handleClick = useCallback(() => { onClick(dataRows.filter(x => x.selected).map(x => x.data)) }, [dataRows, onClick])

  return <button onClick={handleClick}>{buttonContent}</button>
}

const ColumnHeader = <T,>(props: ColumnConfig<T>) => {
  return <Th className={props.dataKey.toString()}>{props.displayName}</Th>
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
    selectionControl = <Box onClick={props.onSelectAll} />
  } else if (selectionCount !== totalNumberOfRows) {
    selectionControl = <PartialBox onClick={props.onSelectAll} />
  } else {
    selectionControl = <CheckedBox onClick={props.onUnselectAll} />
  }

  return <TopSelectionControlDiv>
    {selectionControl}
    <div>{selectionCount ? selectionCount : "None"} Selected</div>
  </TopSelectionControlDiv>
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
      <TableCaptionDiv>
        <TopSelectionControl<T>
          dataRows={props.dataRows}
          onSelectAll={props.onSelectAll}
          onUnselectAll={props.onUnselectAll}
        />
        {props.actionsConfig.map((x, i) => <Action
          key={i}
          dataRows={props.dataRows}
          {...x}
        />)}
      </TableCaptionDiv>
    </caption>
    <thead>
      <tr>
        <th />
        {props.columnsConfig.map(x => <ColumnHeader key={x.dataKey.toString()} {...x} />)}
      </tr>
    </thead>
  </>
}

const Th = styled.th`
  text-align: left;
`

const TableCaptionDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 2px;

  >* {
    margin: 4px 16px 4px 4px;
  }
`

const TopSelectionControlDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 124px;
`
