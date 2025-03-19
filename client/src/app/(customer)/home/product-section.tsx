"use client";

import DefaultButton from "@/components/customer/UI/button/default-button";
import OutlineButton from "@/components/customer/UI/button/outline-button";
import { ProductCard } from "@/components/customer/UI/card/product-card";
import { ErrorMessage } from "@/components/customer/UI/error-massage";
import { ProductInListType } from "@/validation-schema/product";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useReducer, useRef } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

interface ProductSectionProps {
  banner?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  products: ProductInListType[];
  error?: string;
  viewAllUrl?: string;
}

interface ComponentState {
  isDisabledNext: boolean;
  isDisabledPrev: boolean;
}

enum ActionType {
  DISABLE_NEXT_BUTTON = "DISABLE_NEXT_BUTTON",
  DISABLE_PREV_BUTTON = "DISABLE_PREV_BUTTON",
}

const INITIAL_STATE: ComponentState = {
  isDisabledNext: true,
  isDisabledPrev: true,
};

const reducer = (
  state: ComponentState,
  action: { type: ActionType; value: boolean }
) => {
  switch (action.type) {
    case ActionType.DISABLE_NEXT_BUTTON:
      return {
        ...state,
        isDisabledNext: action.value,
      };

    case ActionType.DISABLE_PREV_BUTTON:
      return {
        ...state,
        isDisabledPrev: action.value,
      };

    default:
      throw Error("Unknown action.");
  }
};

export function ProductSection({
  banner,
  title,
  subtitle,
  products,
  error,
  viewAllUrl,
}: ProductSectionProps) {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      dispatch({
        type: ActionType.DISABLE_NEXT_BUTTON,
        value: swiperRef.current.swiper.isEnd,
      });
      dispatch({
        type: ActionType.DISABLE_PREV_BUTTON,
        value: swiperRef.current.swiper.isBeginning,
      });
    }
  }, [swiperRef]);

  return (
    <div
      className={`max-w-full w-screen h-fit mt-5 relative z-50 grid ${
        banner ? "grid-cols-[max-content_auto] md:gap-8" : "grid-cols-1"
      } `}
    >
      {banner && (
        <Link href={viewAllUrl || "#"} className="">
          <Image
            src={banner}
            alt={`${title} banner`}
            width="287"
            height="410"
            className="rounded-sm hidden lg:block"
          ></Image>
        </Link>
      )}
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex flex-row justify-between mb-5 pb-4 border-b-[0.5px] border-b-lime-600">
          <div>
            <h3 className=" text-lime-600 text-2xl font-bold flex flex-row items-center gap-2">
              <Link href={viewAllUrl || "#"}>{title}</Link>
              <Image
                src="/images/icons/leaf.webp"
                alt="icon"
                width={25}
                height={25}
              ></Image>
            </h3>
            {subtitle && <p className="font-semibold">{subtitle}</p>}
          </div>

          <div className="flex flex-row items-center justify-center">
            <DefaultButton
              className="!h-8 !w-8 !p-0 !min-w-8"
              suffix={
                <MdOutlineNavigateBefore className="!h-5 !w-5"></MdOutlineNavigateBefore>
              }
              disabled={state.isDisabledPrev}
              onClick={() => swiperRef.current?.swiper.slidePrev()}
            ></DefaultButton>
            <DefaultButton
              className="!h-8 !w-8 !p-0 !min-w-8"
              suffix={
                <MdOutlineNavigateNext className="!h-5 !w-5"></MdOutlineNavigateNext>
              }
              disabled={state.isDisabledNext}
              onClick={() => swiperRef.current?.swiper.slideNext()}
            ></DefaultButton>
          </div>
        </div>
        {error && (
          <ErrorMessage className="text-center leading-10">
            {error}
          </ErrorMessage>
        )}
        {!error && products.length === 0 && (
          <ErrorMessage className="text-center leading-10">
            Không có sản phẩm nào phù hợp.
          </ErrorMessage>
        )}
        {!error && products.length > 0 && (
          <>
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={10}
              slidesPerView={"auto"}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              autoplay={true}
              onSlideChange={(swiper) => {
                dispatch({
                  type: ActionType.DISABLE_NEXT_BUTTON,
                  value: swiper.isEnd,
                });
                dispatch({
                  type: ActionType.DISABLE_PREV_BUTTON,
                  value: swiper.isBeginning,
                });
              }}
              className="w-full"
            >
              {products.map((product) => {
                return (
                  <SwiperSlide key={product.id} className="p-2 !w-fit !mr-2">
                    <ProductCard product={product}></ProductCard>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Link href={viewAllUrl || "#"}>
              <OutlineButton className="mt-4 m-auto block">
                Xem tất cả
              </OutlineButton>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
