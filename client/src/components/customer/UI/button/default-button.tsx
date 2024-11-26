import { Button, ButtonProps } from "antd";

export default function DefaultButton(
  props: ButtonProps & {
    className?: string;
  }
) {
  const { className, ...rest } = props;
  return (
    <Button
      {...rest}
      className={`rounded-sm !bg-lime-600 !ring-inherit !text-white !h-10 !min-w-10 ${className} 
      disabled:opacity-75 hover:!ring-inherit hover:!border-lime-600 	`}
    ></Button>
  );
}
