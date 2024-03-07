import { ReactNode } from 'react';

export interface ColumnConfig<T, K extends keyof T = keyof T> {
  displayName: string
  dataKey: K
  /**
   * Functional component to render this `td` cell. This is useful for calculations or extra formatting.
   * @param data data element from this row
   * @returns td element
   */
  render?: (props: { data: T }) => JSX.Element
}

export interface ActionsConfig<T> {
  buttonContent: ReactNode
  onClick: (selectedData: T) => void
}

export interface RowWithId {
  Id: string | number
}
