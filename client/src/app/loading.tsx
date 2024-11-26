import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Spin></Spin>
    </div>
  );
}
