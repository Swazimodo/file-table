import { FC, createContext, useCallback, useContext, useRef, useState } from "react";
import styled from 'styled-components'

export interface ToastMessage {
  message: string
  details?: string
  level: 'info' | 'warning' | 'error'
}

interface TemporalToastMessage extends ToastMessage {
  shown: Date
  id: string
}

export interface ToastContext {
  messages: TemporalToastMessage[]
  addMessage: (message: ToastMessage) => void
}

// @ts-expect-error
// we will not mount the children until this context has been set
// this will prevent the whole app from needing to do null checks
export const toastContext = createContext<ToastContext>(null)

interface ToastContextProviderProps {
  children?: React.ReactNode
}

export const ToastContextProvider: FC<ToastContextProviderProps> = (props) => {
  const toastContextValue = useToasts()

  return <toastContext.Provider value={toastContextValue}>
    {props.children}
  </toastContext.Provider>
}

const useToasts = () => {
  // ref is needed here because the state in the setTimeout closure is not guaranteed to be the latest
  const messages = useRef<TemporalToastMessage[]>([])
  const [, setMessageCount] = useState(0)

  const removeMessage = useCallback((message: TemporalToastMessage) => {
    messages.current = messages.current.filter(msg => msg !== message)
    setMessageCount(messages.current.length)
  }, [messages, setMessageCount])

  const addMessage = useCallback((message: ToastMessage) => {
    // adding the message count to the id will help generate a unique id even if two messages are added at the same time
    const shownTime = new Date()
    const temporalMessage = { ...message, shown: shownTime, id: shownTime.toISOString() + messages.current.length }
    messages.current = [...messages.current, temporalMessage]
    setMessageCount(messages.current.length)
    setTimeout(() => removeMessage(temporalMessage), 8000)
  }, [messages, removeMessage])

  return {
    messages: messages.current,
    addMessage
  }
}

export const ToastMessageEmitter: FC = () => {
  const { messages } = useContext(toastContext)
  return <CenterPointDiv>
    {messages.reverse().map((m) => <ToastDiv role="alert" className={m.level} key={m.id}>
      <div>{m.message}</div>
      {m.details && <div>{m.details}</div>}
    </ToastDiv>)}
  </CenterPointDiv>
}

const CenterPointDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const ToastDiv = styled.div`
  max-width: 500px;
  border: 2px solid;

  margin: 4px 4px 0 0;
  padding: 2px;
  display: flex;
  flex-direction: column;

  white-space: pre-line;
  z-index: 9001;

  &.info {
    background-color: #b8b8f5;
    border-color: #2323ac;
  }
  &.warning {
    background-color: #ffd382;
    border-color: #ffa500;
  }
  &.error {
    background-color: #f58383;
    border-color: #9c0505;
  }
`
