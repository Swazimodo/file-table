import { FC } from 'react';
import { BsDownload, BsCircleFill } from "react-icons/bs";
import { Table, ColumnConfig, ActionsConfig } from 'table';
import { data, FileTableData } from 'fileView/api';

const StatusCell = (props: { data: FileTableData }) => {
  return <td><BsCircleFill />{props.data.status}</td>
}

// TODO: localize column header label
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
  // TODO: localize button label
  buttonContent: <><BsDownload /> Download Selected</>,
  onClick: () => { }
}]

export const FileView: FC = () => {
  return <Table<FileTableData>
    columnsConfig={fileTableColumnConfig}
    actionsConfig={fileTableActionsConfig}
    data={data}
  />
}
