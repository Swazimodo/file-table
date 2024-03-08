import { JSX, useCallback, useEffect, useMemo, useState } from 'react';
import { ActionsConfig, ColumnConfig, DataRow } from 'table/config';
import { TableHeader } from 'table/tableHeader';
import { TableRow } from 'table/tableRow';


const useSelectableRows = <T extends {}>(data: T[]) => {
  const [dataRows, setDataRows] = useState<DataRow<T>[]>([])

  useEffect(() => {
    const rows = data.map((x, i) => ({ id: i, selected: false, data: x }))
    if (!dataRows.filter(x => !x.selected).length) {
      setDataRows(rows)
      return
    }

    // TODO: if any rows were selected we want to try and preserve the checked state
    // Seems how the row ids are generated here and are not apart of the original source data
    // we would need to do a reference compare between the old row data obj and the new incoming one
    // if there is a match we could then transfer the old checked value
    // However, right now we will lose any checked state on a data change as that is outside the requirements
    setDataRows(rows)
    return
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
}

export const TableWrapper = <T extends {}>(props: TableWrapperProps<T>): JSX.Element => {
  const {
    dataRows,
    handleSelectRow, handleUnselectRow,
    handleSelectAll, handleUnselectAll } = useSelectableRows(props.data)

  return <table>
    <TableHeader<T>
      actionsConfig={props.actionsConfig}
      columnsConfig={props.columnsConfig}
      dataRows={dataRows}
      onSelectAll={handleSelectAll}
      onUnselectAll={handleUnselectAll}
    />
    <tbody>
      {dataRows.map((row) => <TableRow
        key={row.id}
        dataRow={row}
        columnsConfig={props.columnsConfig}
        onSelectRow={handleSelectRow}
        onUnselectRow={handleUnselectRow}
      />)}
    </tbody>
  </table>
}
