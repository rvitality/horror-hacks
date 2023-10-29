import React from "react";

const GridCells = ({ gridData, onHandleCellClick }) => {
    const handleCellClick = (i, j) => {
        onHandleCellClick(i, j);
    };


    return (
        <>
            {gridData.map((movies, i) => {
                return movies.map((movie, j) => {
                    const { label, category, imageUrl } = movie;

                    return (
                        <div
                            key={j}
                            className={
                                "rounded-xl overflow-hidden border border-gray-400 bg-white bg-opacity-10 h-52 w-52"
                            }
                        >
                            <button
                                onClick={() => {
                                    if (imageUrl) {
                                        return;
                                    }
                                    handleCellClick(i, j);
                                }}
                                className={`h-full w-full transition-opacity hover:bg-opacity-80 flex flex-col items-center justify-center p-2 gap-2 ${
                                    imageUrl ? "cursor-not-allowed" : ""
                                }`}
                            >
                                {imageUrl && (
                                    <img
                                        className="h-[8rem] w-full object-cover"
                                        src={imageUrl}
                                        alt={label}
                                    />
                                )}
                                {label && (
                                    <span className="bg-gray-200 py-1 px-4 rounded">
                                        {label}
                                    </span>
                                )}
                            </button>
                        </div>
                    );
                });
            })}{" "}
        </>
    );
};

export default GridCells;
