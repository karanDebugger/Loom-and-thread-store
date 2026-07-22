import { useState } from "react";

function ProductGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(
    images[0] || "https://via.placeholder.com/600x800"
  );

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3">
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index}`}
              onClick={() => setSelectedImage(image)}
              className="w-20 h-20 object-cover rounded-xl cursor-pointer border border-zinc-700 hover:border-white transition"
            />
          ))
        ) : (
          <img
            src="https://via.placeholder.com/100"
            className="w-20 h-20 rounded-xl"
          />
        )}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <img
          src={selectedImage}
          alt="Product"
          className="w-full max-w-xl rounded-3xl object-cover"
        />
      </div>
    </div>
  );
}

export default ProductGallery; 