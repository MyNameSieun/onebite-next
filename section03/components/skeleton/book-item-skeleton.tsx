const BookItemSkeleton = () => {
  return (
    <div className="mb-3.5 flex gap-3 border-b border-gray-200 py-5">
      <div className="h-[100px] w-20 bg-gray-100" />
      <div className="flex flex-1 flex-col">
        <div className="flex h-[70px] flex-col bg-gray-100"></div>

        <div className="mt-3 h-max flex-1 bg-gray-100"></div>
      </div>
    </div>
  );
};

export default BookItemSkeleton;
