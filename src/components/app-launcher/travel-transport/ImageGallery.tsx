import React, { useState } from 'react';

interface ImageGalleryProps {
    images: string[];
    mainImage: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, mainImage }) => {
    const allImages = [mainImage, ...images];
    const [activeImage, setActiveImage] = useState(allImages[0]);

    if (!allImages || allImages.length === 0) {
        return null;
    }

    return (
        <div>
            <div className="mb-4">
                <img src={activeImage} alt="Main hotel view" className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg" />
            </div>
            {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {allImages.map((img, index) => (
                        <button key={index} onClick={() => setActiveImage(img)}>
                            <img 
                                src={img} 
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-4 transition-all ${
                                    activeImage === img ? 'border-gyn-accent-light dark:border-gyn-accent-dark' : 'border-transparent hover:border-gyn-accent-light/50 dark:hover:border-gyn-accent-dark/50'
                                }`}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
