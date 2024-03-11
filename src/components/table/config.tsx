import { ReactNode } from 'react';

export interface ColumnConfig<T, K extends keyof T = keyof T> {
  displayName: string
  dataKey: K
  /**
   * Functional component to render this `td` cell. This provides the ability for calculations or extra formatting.
   * @param data data element from this row
   * @returns td element
   */
  Render?: (props: { data: T }) => JSX.Element
}

export interface ActionsConfig<T> {
  buttonContent: ReactNode
  onClick: (selectedData: T[]) => void
}

export interface DataRow<T> {
  /**
   * We generate an id for each row so that it can be used in event handlers.
   * It also is used as a react key which would allow for features like table sort.
   */
  id: number
  selected: boolean
  data: T
}
