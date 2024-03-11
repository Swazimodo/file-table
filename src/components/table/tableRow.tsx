import { ReactNode, useCallback } from 'react';
import { Box, CheckedBox } from 'components/table/icons';
import { ColumnConfig, DataRow } from 'components/table/config';
import styled from 'styled-components';
import { MediaSizes, getMaxWidthQuery, useMediaQuery } from 'components/mediaQueries';

interface CellProps<T> {
  columnsConfig: ColumnConfig<T>
  data: T

  /**
   * If the cell is going to be grouped together with other cells then it will be wrapped with a `div` instead of `td`.
   * Grouped cells will also include the data label to assist with a card layout.
   */
  grouped: boolean
}

export const Cell = <T,>(props: CellProps<T>) => {
  const key = props.columnsConfig.dataKey
  let content: ReactNode
  if (props.columnsConfig.Render) {
    content = <props.columnsConfig.Render data={props.data} />
  } else {
    // if the content is unsupported a render component must be provided
    // TODO: catch any errors here gracefully
    content = (props.data[props.columnsConfig.dataKey] as any)
  }

  if (!props.grouped) {
    content = <td className={key.toString()}>{content}</td>
  } else {
    content = <GroupedCellDiv className={key.toString()}>
      <div className='label'>{props.columnsConfig.displayName}: </div>
      <div className='value'>{content}</div>
    </GroupedCellDiv>
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

  const mediaQuery = useMediaQuery(MediaSizes.md)
  let dataCells: ReactNode = props.columnsConfig.map(x => <Cell<T>
    key={x.dataKey.toString()}
    columnsConfig={x}
    data={props.dataRow.data}
    grouped={mediaQuery.matchesDown}
  />)
  if (mediaQuery.matchesDown) {
    dataCells = <td className='grouped-cells'>{dataCells}</td>
  }

  return <Tr className={props.dataRow.selected ? 'selected' : undefined}>
    <Td className='selector'>
      {props.dataRow.selected ?
        <CheckedBox onClick={handleUnselect} />
        :
        <Box onClick={handleSelect} />}
    </Td>
    {dataCells}
  </Tr>
}

const GroupedCellDiv = styled.div`
  > div {
    display: inline-block;
  }
  > div.label {
    min-width: 64px;
  }
`

const Tr = styled.tr`
  border-bottom: rgba(0, 0, 0, .1) 1px solid;

  >td:not(:first-child) {
    font-size: .8em;
  }

  &.selected {
    background: rgba(0, 0, 0, .1);
  }
  &:hover {
    background: rgba(0, 0, 0, .05);
  }
  &.selected:hover {
    background: rgba(0, 0, 0, .15);
  }

  @media ${getMaxWidthQuery(MediaSizes.md)} {
    display: flex;
  }
`

const Td = styled.td`
  > div {
    cursor: pointer;
  }
`
