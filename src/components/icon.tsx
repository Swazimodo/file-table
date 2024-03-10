import styled from 'styled-components';

export interface Clickable {
  children?: React.ReactNode
  onClick?: () => void
}

export const IconWrapper = (props: Clickable) => {
  return <SvgWrapperDiv onClick={props.onClick}>
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
