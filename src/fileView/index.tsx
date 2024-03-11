import { FC, useCallback, useContext } from 'react';
import styled from 'styled-components'
import { BsDownload, BsCircleFill } from "react-icons/bs";
import { IconWrapper } from 'components/icon';
import { Table, ColumnConfig, ActionsConfig } from 'components/table';
import { data, FileTableData } from 'fileView/api';
import { toastContext } from 'components/toast';
import { MediaSizes, getMaxWidthQuery, getMinWidthQuery } from 'components/mediaQueries';

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
  return <StatusCellDiv>
    {hasGreenDot && <IconWrapper>
      <BsCircleFill />
    </IconWrapper>}
    {statusLabel}
  </StatusCellDiv>
}

export const FileView: FC = () => {
  const { addMessage } = useContext(toastContext)

  const handleDownload = useCallback((data: FileTableData[]) => {
    const actionableData = data.filter(x => x.status === 'available')
    if (!actionableData.length || actionableData.length !== data.length) {
      addMessage({
        level: 'warning',
        message: `Downloading is only possible on rows with a status of "${StatusLabels['available']}"`,
      })
    }
    if (!actionableData.length) {
      return
    }

    // implement any button logic here
    addMessage({
      level: 'info',
      message: 'Started Downloading',
      details: actionableData.reduce((accumulator, x) => {
        accumulator += `${x.device}: ${x.path}\n`
        return accumulator
      }, "")
    })
  }, [addMessage])

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
    onClick: handleDownload
  }]

  return <TableWrapperDiv>
    <Table<FileTableData>
      columnsConfig={fileTableColumnConfig}
      actionsConfig={fileTableActionsConfig}
      data={data}
    />
  </TableWrapperDiv>
}

const StatusCellDiv = styled.div`
  svg {
    color: #85ce75;
  }

  @media ${getMinWidthQuery(MediaSizes.md)} {
    svg {
      position: relative;
      margin-left: -20px;
      z-index: -1;
    }
  }

  @media ${getMaxWidthQuery(MediaSizes.md)} {
    display: flex;
    flex-direction: row-reverse;

    svg {
      padding-left: 8px;
    }
  }
`

// This table wrapper will allow us to inject any custom styles for this table here
const TableWrapperDiv = styled.div`
  th.status,
  td.status {
    padding-left: 25px;
  }
`
