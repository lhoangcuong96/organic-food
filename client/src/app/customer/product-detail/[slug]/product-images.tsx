import Image from "next/image";

export function ProductImages({ images }: { images: string[] }) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-square">
        <Image
          src="/placeholder.svg?height=500&width=500"
          alt="Rau dền 4KFarm"
          className="rounded-lg object-cover"
          width={500}
          height={500}
        />
      </div>
      <div className="flex gap-2">
        {images.map((image) => (
          <div key={image} className="relative w-24 aspect-square">
            <Image
              src={image}
              alt={`Thumbnail ${image}`}
              className="rounded-md object-cover border cursor-pointer"
              width={96}
              height={96}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
