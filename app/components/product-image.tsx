import Image from "next/image";

interface ProductImageProps {
  url: string;
  className: string;
}

const ProductImage = ({ url, className }: ProductImageProps) => {
  return (
    <>
      <div className="h-40 w-40 cursor-pointer">
        <Image
          src={url}
          alt="url"
          width={0}
          height={0}
          sizes="100vw"
          priority
          className={`h-full w-full object-cover ${className}`}
        />
      </div>
    </>
  );
};

export default ProductImage;
