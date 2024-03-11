import { JSX, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components'
import { ActionsConfig, ColumnConfig, DataRow } from 'components/table/config';
import { TableHeader } from 'components/table/tableHeader';
import { TableRow } from 'components/table/tableRow';
import { MediaSizes, getMaxWidthQuery } from 'components/mediaQueries';


const useSelectableRows = <T extends {}>(data: T[]) => {
  const [dataRows, setDataRows] = useState<DataRow<T>[]>([])

  useEffect(() => {
    setDataRows(data
      .map((x, i) => ({ id: i, selected: false, data: x })))
  }, [data])

  const handleSelectRow = useCallback((id: number) => {
    const index = dataRows.findIndex(x => x.id === id)
    if (index >= 0) {
      const rows = [...dataRows]
      rows[index].selected = true
      setDataRows(rows)
    }
  }, [dataRows, setDataRows])

  const handleUnselectRow = useCallback((id: number) => {
    const index = dataRows.findIndex(x => x.id === id)
    if (index >= 0) {
      const rows = [...dataRows]
      rows[index].selected = false
      setDataRows(rows)
    }
  }, [dataRows, setDataRows])

  const handleSelectAll = useCallback(() => {
    setDataRows(dataRows.map(row => {
      row.selected = true
      return row
    }))
  }, [dataRows, setDataRows])

  const handleUnselectAll = useCallback(() => {
    setDataRows(dataRows.map(row => {
      row.selected = false
      return row
    }))
  }, [dataRows, setDataRows])

  return {
    dataRows,
    handleSelectRow,
    handleUnselectRow,
    handleSelectAll,
    handleUnselectAll
  }
}

export interface TableWrapperProps<T extends {}> {
  columnsConfig: ColumnConfig<T>[]
  actionsConfig: ActionsConfig<T>[]
  data: T[]
  tabIndex?: number
}

export const TableWrapper = <T extends {}>(props: TableWrapperProps<T>): JSX.Element => {
  const tabIndexOffset = props.tabIndex ? props.tabIndex : 1
  const {
    dataRows,
    handleSelectRow, handleUnselectRow,
    handleSelectAll, handleUnselectAll } = useSelectableRows(props.data)

  return <Table>
    <TableHeader<T>
      actionsConfig={props.actionsConfig}
      columnsConfig={props.columnsConfig}
      dataRows={dataRows}
      onSelectAll={handleSelectAll}
      onUnselectAll={handleUnselectAll}
      tabIndex={tabIndexOffset}
    />
    <tbody>
      {dataRows.map((row, i) => <TableRow
        key={row.id}
        dataRow={row}
        columnsConfig={props.columnsConfig}
        onSelectRow={handleSelectRow}
        onUnselectRow={handleUnselectRow}
        tabIndex={tabIndexOffset + props.actionsConfig.length + i}
      />)}
    </tbody>
  </Table>
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 8px;
  }

  @media ${getMaxWidthQuery(MediaSizes.md)} {
    display: flex;
    flex-direction: column;
  }
`
