import React from "react";

type Props = {
  msg: string;
  extraStyles?: string;
};

const Message = ({ msg, extraStyles }: Props) => {
  return <div className={extraStyles}>{msg}</div>;
};

export default Message;
