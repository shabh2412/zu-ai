"use client";
import { forwardRef } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
const Card = forwardRef<HTMLDivElement, CardProps>(({ ...props }, ref) => {
  return <div className="w-full bg-white rounded-3xl" {...props} ref={ref} />;
});

export default Card;
