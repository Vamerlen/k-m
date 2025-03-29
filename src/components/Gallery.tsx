

import { useState, useEffect } from "react";
import { ImageType } from "@/types/gallery";
import { cn } from "@/lib/utils";

interface GalleryProps {
    images: ImageType[];
}

const Gallery = ({ images }: GalleryProps) => {
    const [loaded, setLoaded] = useState<Record<string, boolean>>({});
    const [columns, setColumns] = useState(3);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setColumns(1);
            } else if (window.innerWidth < 1024) {
                setColumns(2);
            } else {
                setColumns(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleImageLoad = (id: string) => {
        setLoaded(prev => ({ ...prev, [id]: true }));
    };

    // Sort images into columns for masonry layout
    const getImageColumns = () => {
        const imageColumns: ImageType[][] = Array.from({ length: columns }, () => []);

        images.forEach((image, index) => {
            const columnIndex = index % columns;
            imageColumns[columnIndex].push(image);
        });

        return imageColumns;
    };

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold text-center mb-6">Image Gallery</h2>

            {/* Gallery grid */}
            <div className="flex gap-4">
                {getImageColumns().map((column, columnIndex) => (
                    <div key={`column-${columnIndex}`} className="flex-1 flex flex-col gap-4">
                        {column.map((image) => (
                            <div
                                key={image.id}
                                className={cn(
                                    "relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg",
                                    loaded[image.id] ? "opacity-100" : "opacity-0"
                                )}
                                style={{
                                    aspectRatio: `${image.width} / ${image.height}`,
                                    transform: `scale(${loaded[image.id] ? 1 : 0.9})`
                                }}
                                onClick={() => setSelectedImage(image.url)}
                            >

                                <img
                                    src={image.url}
                                    alt={image.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    onLoad={() => handleImageLoad(image.id)}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-screen-lg max-h-screen flex flex-col">
                        <button
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
                            onClick={() => setSelectedImage(null)}
                        >
                            ✕
                        </button>
                        <img
                            src={selectedImage}
                            alt="Enlarged view"
                            className="max-w-full max-h-[90vh] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
