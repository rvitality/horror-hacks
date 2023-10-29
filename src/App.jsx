import React, { useEffect, useState } from "react";

import BgVideo from "./assets/bg.mp4";
import MovieOptions from "./components/MovieOptions";
import GridCells from "./components/GridCells";

const topCategories = ["Serial Killer", "Summer", "Revenge"];
const leftCategories = ["Torture", "Slasher", "Suspense"];

const App = () => {
    const [selectedCell, setSelectedCell] = useState([0, 0]);
    const [selectedCellCategories, setSelectedCellCategories] = useState([
        "",
        "",
    ]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [points, setPoints] = useState(0);
    const [guesses, setGuesses] = useState(9);
    const [scoreBumped, setScoreBumped] = useState(false);

    const [gridData, setGridData] = useState([
        [
            { label: "", category: "", imageUrl: "" },
            { label: "", category: "", imageUrl: "" },
            { label: "", category: "", imageUrl: "" },
        ],
        [
            { label: "", category: "", imageUrl: "" },
            { label: "", category: "", imageUrl: "" },
            { label: "", category: "", imageUrl: "" },
        ],
        [
            { label: "", category: "", imageUrl: "" },
            { label: "", category: "", imageUrl: "" },
            { label: "", category: "", imageUrl: "" },
        ],
    ]);

    const handleCellClick = (i, j) => {
        const leftCategory = leftCategories[i];
        const topCategory = topCategories[j];

        setSelectedCellCategories([leftCategory, topCategory]);

        setSelectedCell([i, j]);
        setIsDialogOpen(true);
    };

    const handleMovieSelect = (selectedMovie) => {
        if (!selectedMovie) return;

        const selectedMovieCategorise = selectedMovie.categories
            .map((str) => str.toLowerCase())
            .sort();
        const selectedCategories = selectedCellCategories
            .map((str) => str.toLowerCase())
            .sort();

        const areEqual =
            JSON.stringify(selectedMovieCategorise) ===
            JSON.stringify(selectedCategories);

        if (!areEqual) {
            setGuesses((prevState) => prevState - 1);

            setScoreBumped(true);

            setTimeout(() => {
                setScoreBumped(false);
            }, 600);

            return;
        }

        setPoints(
            (prevState) => prevState + (selectedMovie.label?.length || 0)
        );

        console.log(selectedCell);

        const [i, j] = selectedCell;

        setGridData((prevState) => {
            return prevState.map((movies, x) => {
                if (i === x) {
                    return movies.map((movie, y) => {
                        if (j === y) {
                            return selectedMovie;
                        }

                        return movie;
                    });
                }

                return movies;
            });
        });
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
                <MovieOptions
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    onSelectMovie={handleMovieSelect}
                />

                <h1 className="text-white text-7xl mb-6">SpookuDoku</h1>

                <div className="mb-6 flex items-center justify-between gap-6">
                    <div className="text-xl bg-white py-1 px-4">
                        <span className="text-gray-500">Points: </span>
                        <span>{points}</span>
                    </div>
                    <div className="flex text-xl bg-white py-1 px-4">
                        <span className="text-gray-500 mr-1">Guesses: </span>
                        <div
                            className={`${
                                scoreBumped
                                    ? "transform scale-125 text-red-500"
                                    : ""
                            } transition-transform mr-1`}
                        >
                            {guesses}
                        </div>
                        / 9
                    </div>
                </div>

                {/* GRID */}
                <div className="ml-[-13.5rem]">
                    {/* TOP CATEGORIES */}
                    <div className="flex">
                        <div
                            className={
                                "h-20 w-52 flex items-center justify-center mr-1"
                            }
                        ></div>

                        <div className="flex">
                            {topCategories.map((category) => {
                                return (
                                    <div
                                        key={category}
                                        className={
                                            "h-20 w-52 flex items-center justify-center"
                                        }
                                    >
                                        <p className="text-white w-full mr-2 text-center bg-black bg-opacity-50 p-2 text-xl">
                                            {category}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex">
                        {/* LEFT CATEGORIES */}

                        <div className="flex flex-col">
                            {leftCategories.map((category) => {
                                return (
                                    <div
                                        key={category}
                                        className={
                                            "h-52 w-52 flex items-center justify-center"
                                        }
                                    >
                                        <p className="text-white w-full text-center mr-5 bg-black bg-opacity-50 p-2 text-xl">
                                            {category}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="grid grid-cols-3">
                            <GridCells
                                gridData={gridData}
                                onHandleCellClick={handleCellClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default App;
