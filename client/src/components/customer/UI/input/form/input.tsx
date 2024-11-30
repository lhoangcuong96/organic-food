/* eslint-disable react/display-name */
import { Input, InputProps } from "antd";
import { PasswordProps } from "antd/es/input";

const FormInput = (
  props: InputProps & {
    className?: string;
    error?: string;
  }
) => {
  const { error, className, ...rest } = props;
  return (
    <Input
      {...rest}
      className={`!ring-inherit h-10 rounded-sm focus:!shadow-none ${
        error
          ? "!border-2 !border-red-500 focus:!border-red-500 focus-visible:!border-red-500 hover:!border-red-500"
          : " focus-visible:!border-lime-700 hover:!border-lime-700"
      } ${className} `}
    ></Input>
  );
};

FormInput.Password = (
  props: PasswordProps & {
    className?: string;
    error?: string;
  }
) => {
  const { error, className, ...rest } = props;

  return (
    <Input
      type="password"
      {...rest}
      className={`!ring-inherit h-10 rounded-sm focus:!shadow-none  ${
        error
          ? "!border-2 !border-red-500 focus:!border-red-500 focus-visible:!border-red-500 hover:!border-red-500"
          : " focus-visible:!border-lime-700 hover:!border-lime-700"
      } ${className} `}
    />
  );
};

export default FormInput;
