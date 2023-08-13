"use client";
import React from "react";

export function Button({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button {...props} className="text bg-gray-200 px-2 py-1">
      {children}
    </button>
  );
}
