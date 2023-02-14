import React from 'react'

type Props = {
  msg: string
}

const Message = ({msg}: Props) => {
  return (
    <div className='bg-green-700'>{msg}</div>
  )
}

export default Message