"use client";
import React, { forwardRef } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export default forwardRef(function Card(
  props: CardProps,
  ref: React.Ref<HTMLDivElement>
) {
  return <div className="w-full bg-white rounded-3xl" {...props} ref={ref} />;
});
