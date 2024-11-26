"use client";

import Link from "next/link";
import Image from "next/image";
import Breadcrumb, {
  BreadcrumbItemType,
  ItemType,
} from "antd/es/breadcrumb/Breadcrumb";
import { AnyObject } from "antd/es/_util/type";

function itemRender(
  item: ItemType,
  params: AnyObject,
  items: ItemType[],
  paths: string[]
) {
  const isLast = item?.title === items[items.length - 1]?.title;

  return isLast ? (
    <span className="text-lime-600 w-fit">{item.title}</span>
  ) : (
    <Link href={`/${paths.join("/")}`} className="!text-white w-fit">
      {item.title}
    </Link>
  );
}

export default function AppBreadcrumb({
  src,
  breadcrumbItems,
  pageTitle,
}: {
  src: string;
  pageTitle: string;
  breadcrumbItems: BreadcrumbItemType[];
}) {
  return (
    <div className="relative">
      <Image
        src={src}
        alt="Hero Image"
        width={1500}
        height={607}
        className="!w-screen m-auto object-cover !h-52 -top-7 relative z-10 rounded-sm"
        layout="responsive"
      ></Image>

      <div className="absolute w-full h-full z-20 -top-7 left-0 ">
        <div className="absolute w-full h-full z-20 top-0 left-0 bg-gradient-to-t from-[#000000cc] to-[#0000004d] "></div>
        <div className="z-30 relative flex flex-col items-center justify-center h-full">
          <h3 className="text-white text-2xl font-semibold">{pageTitle}</h3>
          <Breadcrumb
            style={{ color: "white" }}
            separator={<p className="text-white">/</p>}
            items={breadcrumbItems}
            itemRender={itemRender}
          ></Breadcrumb>
        </div>
      </div>
    </div>
  );
}
