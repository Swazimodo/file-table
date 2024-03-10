import { FC } from 'react';
import styled from 'styled-components'
import { BsDownload, BsCircleFill } from "react-icons/bs";
import { IconWrapper } from 'components/icon';
import { Table, ColumnConfig, ActionsConfig } from 'components/table';
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
  return <td className="status" >
    {hasGreenDot && <IconWrapper>
      <BsCircleFill />
    </IconWrapper>}
    {statusLabel}
  </td>
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
  buttonContent: <>
    <IconWrapper>
      <BsDownload />
    </IconWrapper> Download Selected
  </>,
  onClick: (data) => { console.log(`download ${data.length} items`) }
}]

export const FileView: FC = () => {
  return <TableWrapperDiv>
    <Table<FileTableData>
      columnsConfig={fileTableColumnConfig}
      actionsConfig={fileTableActionsConfig}
      data={data}
    />
  </TableWrapperDiv>
}

// This table wrapper will allow us to inject any custom styles for this table here
const TableWrapperDiv = styled.div`
  th.status,
  td.status {
    padding-left: 25px
  }

  td.status svg {
    position: relative;
    margin-left: -20px;
    color: #85ce75;
  }
`