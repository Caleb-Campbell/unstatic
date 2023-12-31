import { PlusIcon } from "lucide-react";
import { Button } from "src/components/ui/button";
import { type Image } from "@prisma/client";

export function ImageList({
  images,
  openNewImageModal,
}: {
  images: Image[];
  openNewImageModal: () => void;
}) {
  return (
    <div>
      {JSON.stringify(images)}
      <div className="grid h-[90vh] w-full grid-cols-3 gap-4 bg-gray-100 p-5">
        {images &&
          images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg bg-gray-100 shadow-md"
            >
              {image.src ? (
                <img
                  alt={image.label || `Image ${index + 1}`}
                  className="h-56 w-full object-cover"
                  src={image.url}
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  className="h-56 w-full bg-gray-200"
                  style={{ aspectRatio: "200/200" }}
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold">
                  {image.label || `Image ${index + 1}`}
                </h3>
                <p className="text-gray-500">
                  {image.label ? `This is ${image.label}` : `No label provided`}
                </p>
              </div>
            </div>
          ))}
        <Button
          className="flex h-60 flex-col items-center justify-center rounded-lg bg-gray-100 p-4 shadow-md"
          variant="outline"
          onClick={openNewImageModal}
        >
          Add New Image
        </Button>
      </div>
    </div>
  );
}
