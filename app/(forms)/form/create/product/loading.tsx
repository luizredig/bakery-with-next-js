import BeatLoader from "@/app/components/beat-loader";

const Loading = () => {
  return (
    <>
      <div className="flex h-full w-full flex-1 items-center justify-center bg-background/25 ">
        <BeatLoader />
      </div>
    </>
  );
};

export default Loading;
