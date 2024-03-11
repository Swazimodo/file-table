import styled from 'styled-components';

// TODO: this component should have some type of a button style property and consume a theme context
export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: React.ReactNode
}

export const Button = (props: ButtonProps) => {
  const { children, onClick, ...prop } = props

  return <TextButton onClick={onClick} {...prop}>
    {children}
  </TextButton>
}

const TextButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: 64px;
  padding: 6px 8px;
  border-radius: 4px;

  &:hover {
    background: rgba(67, 149, 235, 0.04);
  }
`
