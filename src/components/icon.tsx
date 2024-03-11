import styled from 'styled-components';

export interface Clickable {
  children?: React.ReactNode
  onClick?: () => void
  tabIndex?: number
}

export const IconWrapper = (props: Clickable) => {
  return <SvgWrapperDiv onClick={props.onClick} tabIndex={props.tabIndex}>
    {props.children}
  </SvgWrapperDiv>
}

const SvgWrapperDiv = styled.div`
  display: inline-block;

  svg {
    margin-bottom: -2px;
  }
  svg.primary {
    color: #4395eb;
  }
`
