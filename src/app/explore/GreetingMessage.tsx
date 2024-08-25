import React from "react";

interface GreetingMessageProps {
  primary: string;
  secondary: string;
}

function GreetingMessage({ primary, secondary }: GreetingMessageProps) {
  return (
    <h1 className="text-2xl font-bold tracking-wide">
      {primary}
      <span className="text-tertiary"> {secondary}</span>
    </h1>
  );
}

export default GreetingMessage;
