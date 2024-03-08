import { JSX, useCallback, useEffect, useState } from 'react';
import { ActionsConfig, ColumnConfig, RowWithId } from 'table/config';
import { TableHeader } from 'table/tableHeader';
import { TableRow } from 'table/tableRow';


export interface TableWrapperProps<T extends RowWithId> {
  columnsConfig: ColumnConfig<T>[]
  actionsConfig: ActionsConfig<T>[]
  data: T[]
}

const useSelectableRows = <T extends RowWithId>(data: T[]) => {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([])
  // remove selected id if the row was removed from the source data
  useEffect(() => {
    const ids = selectedIds.filter(id => !data.find(row => row.Id === id))
    if (ids.length !== selectedIds.length) {
      setSelectedIds(ids)
    }
  }, [data])

  const handleSelectRow = useCallback((id: string | number) => {
    if (selectedIds.includes(id)) {
      return
    }
    setSelectedIds([...selectedIds, id])
  }, [selectedIds, setSelectedIds])

  const handleUnselectRow = useCallback((id: string | number) => {
    if (!selectedIds.includes(id)) {
      return
    }
    setSelectedIds(selectedIds.filter(x => x !== id))
  }, [selectedIds, setSelectedIds])

  const handleSelectAll = useCallback(() => {
    setSelectedIds(data.map(x => x.Id))
  }, [setSelectedIds])

  const handleUnselectAll = useCallback(() => {
    setSelectedIds([])
  }, [setSelectedIds])

  return {
    selectedIds,
    handleSelectRow,
    handleUnselectRow,
    handleSelectAll,
    handleUnselectAll
  }
}

export const TableWrapper = <T extends RowWithId>(props: TableWrapperProps<T>): JSX.Element => {
  const {
    selectedIds,
    handleSelectRow, handleUnselectRow,
    handleSelectAll, handleUnselectAll } = useSelectableRows(props.data)

  return <table>
    <TableHeader
      actionsConfig={props.actionsConfig}
      columnsConfig={props.columnsConfig}
      selectedData={[]}
      onSelectAll={handleSelectAll}
      onUnselectAll={handleUnselectAll}
    />
    <tbody>
      {props.data.map((row) => <TableRow
        key={row.Id}
        row={row}
        columnsConfig={props.columnsConfig}
        selected={selectedIds.find(id => id === row.Id) !== undefined ? true : false}
        onSelectRow={handleSelectRow}
        onUnselectRow={handleUnselectRow}
      />)}
    </tbody>
  </table>
}
