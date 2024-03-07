import { RowWithId } from 'table';

export interface FileTableData extends RowWithId {
  name: string
  device: string
  path: string
  status: string
}

export const data: FileTableData[] = [
  {
    Id: "5464c012-0c20-4ad5-9543-0424afdf2850",
    name: "smss.exe",
    device: "Mario",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: "scheduled"
  },
  {
    Id: "25410fd3-35a9-4b19-86d1-93739ed20d25",
    name: "netsh.exe",
    device: "Luigi",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: "available"
  },
  {
    Id: "d5787b1d-3714-4b88-ae50-75e3d725cbad",
    name: "uxtheme.dll",
    device: "Peach",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: "available"
  },
  {
    Id: "48d39179-9167-4fdc-9193-9b87c11f6fea",
    name: "aries.sys",
    device: "Daisy",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys",
    status: "scheduled"
  },
  {
    Id: "7871374e-982a-40ce-ac82-fc71a6c952ca",
    name: "cryptbase.dll",
    device: "Yoshi",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    status: "scheduled"
  },
  {
    Id: "b07fc013-7612-4082-99ab-63fa97748732",
    name: "7za.exe",
    device: "Toad",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "scheduled"
  }
]