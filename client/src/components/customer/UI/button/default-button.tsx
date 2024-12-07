import { Button, ButtonProps } from "@/components/ui/button";
import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

export default function DefaultButton(
  props: ButtonProps & {
    prefix?: ReactNode | Element | IconType;
    suffix?: ReactNode | Element | IconType;
  }
) {
  const { className, prefix, suffix, children, ...rest } = props;
  return (
    <Button
      {...rest}
      className={`rounded-sm !bg-lime-600 !ring-inherit !text-white flex flex-row gap-2
         !h-10 !min-w-10 ${className} disabled:opacity-75 hover:!ring-inherit hover:!border-lime-600 	`}
    >
      {prefix}
      {children}
      {suffix}
    </Button>
  );
}
