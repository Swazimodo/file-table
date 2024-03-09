import { FC } from 'react';
import { BsDownload, BsCircleFill } from "react-icons/bs";
import { Table, ColumnConfig, ActionsConfig } from 'table';
import { data, FileTableData } from 'fileView/api';

interface StatusCellProps {
  data: FileTableData
}

const StatusLabels: { [key: string]: string } = {
  available: "Available",
  scheduled: "Scheduled"
}

const StatusCell = (props: StatusCellProps) => {
  // TODO: this status value would need to be mapped to a localized value
  // but the system value will be used to determine the styling of it
  const statusLabel = StatusLabels[props.data.status] ? StatusLabels[props.data.status] : props.data.status
  const hasGreenDot = props.data.status === 'available'
  return < td className="status" > {hasGreenDot && <BsCircleFill />}{statusLabel}</td>
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
  Render: StatusCell
}]

const fileTableActionsConfig: ActionsConfig<FileTableData>[] = [{
  // TODO: localize button label
  buttonContent: <><BsDownload /> Download Selected</>,
  onClick: (data) => { console.log(`download ${data.length} items`) }
}]

export const FileView: FC = () => {
  return <Table<FileTableData>
    columnsConfig={fileTableColumnConfig}
    actionsConfig={fileTableActionsConfig}
    data={data}
  />
}
