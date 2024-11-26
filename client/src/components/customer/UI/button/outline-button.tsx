import { Button, ButtonProps } from "antd";

export default function OutlineButton(
  props: ButtonProps & {
    className?: string;
  }
) {
  const { className, ...rest } = props;
  return (
    <Button
      variant="outlined"
      {...rest}
      className={`rounded-sm !text-lime-600 !border-lime-600 !ring-inherit !h-10 !min-w-10 disabled:opacity-75 !text-base !font-semibold
        hover:!bg-lime-600 hover:!text-white ${className} `}
    ></Button>
  );
}
