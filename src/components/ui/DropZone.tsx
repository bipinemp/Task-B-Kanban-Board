import { memo, useState } from "react";

type Props = {
  onDrop: (column_name: string, position: number) => void;
  column_name: string;
  index: number;
};
const DropZone = memo(({ onDrop, column_name, index }: Props) => {
  const [showDropzone, setShowDropzone] = useState(false);

  return (
    <span
      role="region"
      aria-label="Drop item here"
      onDragEnter={() => setShowDropzone(true)}
      onDragLeave={() => setShowDropzone(false)}
      onDrop={() => {
        onDrop(column_name, index);
        setShowDropzone(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={`${
        showDropzone
          ? `transition ease-in-out duration-150 w-full h-[50px] my-1 opacity-100 border border-gray-600 rounded-md border-dashed flex items-center justify-center`
          : "opacity-0 h-[15px]"
      } `}
    >
      Drop Here
    </span>
  );
});

export default DropZone;
