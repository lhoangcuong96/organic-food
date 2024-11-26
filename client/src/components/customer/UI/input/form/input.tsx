/* eslint-disable react/display-name */
import { Input, InputProps } from "antd";
import { PasswordProps } from "antd/es/input";

const FormInput = (
  props: InputProps & {
    className?: string;
  }
) => {
  return (
    <Input
      {...props}
      className={`!ring-inherit h-10 rounded-sm focus-visible:!border-lime-700 hover:!border-lime-700 ${props.className} `}
    ></Input>
  );
};

FormInput.Password = (
  props: PasswordProps & {
    className?: string;
  }
) => {
  return (
    <Input
      type="password"
      {...props}
      className={`!ring-inherit h-10 rounded-sm focus-visible:!border-lime-700 hover:!border-lime-700 ${props.className} `}
    />
  );
};

export default FormInput;
