import { Category } from "@prisma/client";
import Image from "next/image";
import { Card } from ".";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Card className="w-48 flex flex-col items-center">
      <Image
        src={category.image.thumbnail}
        alt={category?.description ? category.description : "Category image"}
        width={100}
        height={100}
      ></Image>
      <p className="font-semibold">{category.name}</p>
    </Card>
  );
}
