import { ErrorMessage } from "@/components/customer/UI/error-massage";
import { CategoriesWithProductsResponse } from "@/services/category";
import CategorySection from "./category-section";

export default function FoodSection({
  categories,
  error,
}: {
  categories: CategoriesWithProductsResponse[];
  error?: string;
}) {
  return (
    <div className="max-w-screen-xl w-screen h-fit mt-5 relative z-50">
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        categories.map((category, index) => {
          return (
            <CategorySection
              category={category}
              index={index}
              key={category.id}
            ></CategorySection>
          );
        })
      )}
    </div>
  );
}
