import { Link } from "@/components/ui/link";
import { routePath } from "@/constants/routes";
import { CategoryInListType } from "@/validation-schema/category";
import { ProductListQueryType } from "@/validation-schema/product";
import Image from "next/image";

const CategoryList = ({
  categories,
  errorMessage,
  params,
}: {
  categories: CategoryInListType[];
  errorMessage?: string;
  params?: ProductListQueryType;
}) => {
  return (
    <div className="bg-lime-100 px-3 py-2 rounded-md">
      <div className="text-lg font-semibold mb-4 rounded flex flex-row gap-2 items-center justify-between">
        <h2 className="text-lime-600">Danh mục sản phẩm</h2>
        <Image
          src="/images/icons/leaf.webp"
          alt="icon"
          width={25}
          height={25}
        ></Image>
      </div>
      <ul className="space-y-3">
        {errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <>
            <Link
              href={routePath.customer.products({
                ...params,
                category: "",
              })}
              className="block no-underline cursor-pointer"
              scroll={false}
            >
              <li className="text-base hover:text-lime-700">Tất cả sản phẩm</li>
            </Link>
            {categories.map((category) => {
              const url = routePath.customer.products({
                ...params,
                category: category.slug,
              });
              const isActive = params?.category === category.slug;
              return (
                <Link
                  href={url}
                  key={category.id}
                  className="block no-underline cursor-pointer"
                  scroll={false}
                >
                  <li
                    className={`text-base hover:text-lime-700 ${
                      isActive ? "text-lg font-semibold" : ""
                    }`}
                  >
                    {category.name}
                  </li>
                </Link>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
