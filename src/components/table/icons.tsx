import { BsSquare, BsDashSquareFill, BsCheckSquareFill } from "react-icons/bs";
import { IconWrapper, Clickable } from 'components/icon';

interface BoxProps extends Clickable {
  tabIndex?: number
}

export const Box = (props: BoxProps) => {
  return <IconWrapper {...props}>
    <BsSquare />
  </IconWrapper>
}

export const PartialBox = (props: BoxProps) => {
  return <IconWrapper {...props}>
    <BsDashSquareFill className='primary' />
  </IconWrapper>
}

export const CheckedBox = (props: BoxProps) => {
  return <IconWrapper {...props}>
    <BsCheckSquareFill className='primary' />
  </IconWrapper>
}
