import { FC } from 'react';
import { Table, ColumnConfig, ActionsConfig } from 'table';
import { data, FileTableData } from 'fileView/api';

const StatusCell = (props: { data: FileTableData }) => {
  return <td>{props.data.status}</td>
}

const fileTableColumnConfig: ColumnConfig<FileTableData>[] = [{
  dataKey: "name",
  displayName: "Name"
}, {
  dataKey: "device",
  displayName: "Device"
}, {
  dataKey: "path",
  displayName: "Path"
}, {
  dataKey: "status",
  displayName: "Status",
  render: StatusCell
}]

const fileTableActionsConfig: ActionsConfig<FileTableData>[] = [{
  buttonContent: <>oh hi mark</>,
  onClick: () => { }
}]

export const FileView: FC = () => {
  return <Table<FileTableData>
    columnsConfig={fileTableColumnConfig}
    actionsConfig={fileTableActionsConfig}
    data={data}
  />
}
