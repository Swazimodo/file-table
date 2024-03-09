import { BsSquare, BsDashSquareFill, BsCheckSquareFill } from "react-icons/bs";
import { IconWrapper, Clickable } from 'common/icon';

export const Box = (props: Clickable) => {
  return <IconWrapper onClick={props.onClick}>
    <BsSquare />
  </IconWrapper>
}

export const PartialBox = (props: Clickable) => {
  return <IconWrapper onClick={props.onClick}>
    <BsDashSquareFill className='primary' />
  </IconWrapper>
}

export const CheckedBox = (props: Clickable) => {
  return <IconWrapper onClick={props.onClick}>
    <BsCheckSquareFill className='primary' />
  </IconWrapper>
}
