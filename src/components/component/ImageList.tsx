import { PlusIcon } from "lucide-react";
import { Button } from "src/components/ui/button";
import { type Image } from "@prisma/client";

export function ImageList({
  images,
  openNewImageModal,
  urlBuilder,
}: {
  images: Image[];
  openNewImageModal: () => void;
  urlBuilder: (image: Image) => string;
}) {
  return (
    <div>
      <div className="grid h-[90vh] w-full grid-cols-3 gap-4 rounded-xl bg-gray-100 p-5">
        {images &&
          images.map((image, index) => (
            <div
              key={index}
              className="items start transition-translate flex h-60 cursor-pointer flex-col justify-center overflow-hidden rounded-lg bg-gray-100 shadow-md hover:scale-[1.01]"
            >
              {image.src ? (
                <img
                  alt={image.label || `Image ${index + 1}`}
                  className="h-40 w-full object-cover"
                  src={image.src}
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
                <p className="text-gray-500">{urlBuilder(image)}</p>
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
