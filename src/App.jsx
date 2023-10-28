import React, { useState } from "react";

import BgVideo from "./assets/bg.mp4";
import MovieOptions from "./components/MovieOptions";

const App = () => {
    const [selectedCell, setSelectedCell] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [grid, setGrid] = useState(
        Array(9).fill({ name: "", category: "", imageUrl: "" })
    );

    const handleCellClick = (i) => {
        setSelectedCell(i);
        setIsDialogOpen(true);
    };

    const handleMovieSelect = (movie) => {
        console.log(movie);
    };

    const renderGrid = () => {
        const grid = [];

        for (let i = 1; i <= 9; i++) {
            const isSelected = selectedCell === i;
            const cellContent = isSelected ? (
                <div>
                    <p className="text-black">Hello</p>
                    <img src={""} alt="Selected Image" />
                </div>
            ) : (
                <button
                    onClick={() => handleCellClick(i)}
                    className="h-full w-full  transition-opacity hover:bg-opacity-80"
                ></button>
            );

            grid.push(
                <div
                    key={i}
                    className={"cell border border-black bg-white h-40 w-40"}
                >
                    {cellContent}
                </div>
            );
        }

        return grid;
    };

    return (
        <main className="relative h-screen">
            <div className="absolute top-0 left-0 w-full h-full">
                <video
                    autoPlay
                    loop
                    muted
                    className="object-cover w-full h-full"
                >
                    <source src={BgVideo} type="video/mp4" />
                </video>
            </div>
            <div className="absolute z-10 inset-0 bg-black opacity-20"></div>
            <div className="absolute z-20 inset-0 flex flex-col items-center justify-center">
                {selectedCell && (
                    <MovieOptions
                        isDialogOpen={isDialogOpen}
                        setIsDialogOpen={setIsDialogOpen}
                        onSelectMovie={handleMovieSelect}
                    />
                )}

                <h1 className="text-white text-6xl mb-10">Horror HACKS</h1>
                <div className="grid grid-cols-3 rounded-3xl overflow-hidden">
                    {grid.map((data, index) => {
                        const { name, category, imageUrl } = data;

                        return (
                            <div
                                key={index}
                                className={
                                    "cell border border-black bg-white h-40 w-40"
                                }
                            >
                                <button
                                    onClick={() => handleCellClick(index)}
                                    className="h-full w-full  transition-opacity hover:bg-opacity-80"
                                ></button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
};

export default App;
