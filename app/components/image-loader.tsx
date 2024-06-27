import Image from "next/image";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

interface ImageLoaderProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const ImageLoader = ({ src, alt, width, height }: ImageLoaderProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
    };
    img.onerror = () => {
      console.error("Failed to load image");
    };
  }, [src]);

  return (
    <div>
      {!loaded ? (
        <Skeleton className="flex h-full min-h-[190px] w-full items-center justify-center rounded-none" />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="100vw"
          priority
          className="pointer-events-none h-full min-h-[190px] w-full"
        />
      )}
    </div>
  );
};

export default ImageLoader;
