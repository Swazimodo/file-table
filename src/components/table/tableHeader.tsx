import { useCallback } from "react";
import styled from 'styled-components';
import { Button } from 'components/button';
import { Box, CheckedBox, PartialBox } from 'components/table/icons';
import { ActionsConfig, ColumnConfig, DataRow } from 'components/table/config';
import { MediaSizes, getMaxWidthQuery } from "components/mediaQueries";

interface ActionProps<T> extends ActionsConfig<T> {
  dataRows: DataRow<T>[]
}

const Action = <T,>(props: ActionProps<T>) => {
  const {
    buttonContent,
    dataRows,
    onClick } = props
  const handleClick = useCallback(() => { onClick(dataRows.filter(x => x.selected).map(x => x.data)) }, [dataRows, onClick])

  return <Button onClick={handleClick}>{buttonContent}</Button>
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
    <div>
      {!selectionCount && "None "}
      Selected
      {!!selectionCount && ` ${selectionCount}`}
    </div>
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
    <THead>
      <tr>
        <th />
        {props.columnsConfig.map(x => <ColumnHeader key={x.dataKey.toString()} {...x} />)}
      </tr>
    </THead>
  </>
}

const THead = styled.thead`
  border-bottom: rgba(0, 0, 0, .1) 1px solid;

  @media ${getMaxWidthQuery(MediaSizes.md)} {
    display: none;
  }
`

const Th = styled.th`
  text-align: left;
  font-weight: lighter;
  font-size: 1.1em;
`

const TableCaptionDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  padding: 4px 0;
  border-bottom: rgba(0, 0, 0, .1) 1px solid;

  >* {
    margin: 4px 16px 4px 8px;
  }
`

const TopSelectionControlDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 124px;

  > div:first-child {
    cursor: pointer;
  }
`
