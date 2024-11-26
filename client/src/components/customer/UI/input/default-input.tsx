import { Input, InputProps } from "antd";

export default function DefaultInput(
  props: InputProps & {
    className?: string;
  }
) {
  return (
    <Input
      {...props}
      className={`!border-lime-600 !border-2 !ring-inherit h-12 rounded-sm ${props.className}`}
    ></Input>
  );
}
