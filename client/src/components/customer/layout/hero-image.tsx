import Image, { StaticImageData } from "next/image";

export function HeroImage({
  src,
}: {
  src: string | StaticImageData;
  link?: string;
}) {
  return (
    <Image
      src={src}
      alt="Hero Image"
      width={1500}
      height={607}
      className="max-w-[1500px] w-full h-auto relative -top-6 z-10 rounded-sm"
      layout="responsive"
    ></Image>
  );
}
