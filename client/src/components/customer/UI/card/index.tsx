import { ReactNode } from "react";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`m-1 p-3 border-[0.5px] hover:outline hover:outline-2 hover:outline-lime-600 ${className} rounded-lg`}
    >
      {children}
    </div>
  );
}
