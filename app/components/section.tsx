import { Product } from "@prisma/client";
import ProductItem from "./productItem";

import "@/app/css/scrollbar.css";

interface SectionProps {
  title: string;
  products: Product[];
}

const Section = ({ title, products }: SectionProps) => {
  return (
    <>
      <div className="flex flex-col gap-8 pt-5">
        <p className="pl-5 text-2xl font-semibold xs:pl-5 sm:px-20 lg:pl-40 lg:text-3xl">
          {title}
        </p>

        <div className="scrollbar flex flex-row gap-5 overflow-x-auto px-5 pb-3 xs:pl-5 sm:pl-20 sm:pr-5 lg:pl-40">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Section;
