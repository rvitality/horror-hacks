import { useState } from "react";
import { Dialog, Autocomplete, TextField, DialogContent } from "@mui/material";

import db from "../assets/db.json";

const MovieOptions = ({ isDialogOpen, setIsDialogOpen, onSelectMovie }) => {
    const [value, setValue] = useState("");
    const [inputValue, setInputValue] = useState("");

    const handleModalClose = () => {
        setIsDialogOpen(false);
        setValue("");
        setInputValue("");
    };

    const handleMovieSelect = (movie) => {
        onSelectMovie(movie);
        // setValue(movie);

        setIsDialogOpen(false);
        setValue("");
        setInputValue("");
    };

    const handleInputChange = (event, newValue) => {
        if (newValue?.trim() === "") {
            setInputValue(null);
        } else {
            setInputValue(newValue);
        }
    };

    return (
        <Dialog
            open={isDialogOpen}
            className="flex items-start justify-center h-full"
            onClose={handleModalClose}
        >
            <DialogContent className="bg-white p-6 rounded-xl mb-10 w-[30rem] fixed top-10 transform -translate-x-1/2">
                <h2 className="text-center text-2xl mb-4">Make your guess</h2>
                <Autocomplete
                    freeSolo
                    options={db}
                    value={value}
                    open={inputValue !== ""}
                    className="h-full"
                    onChange={(event, newValue) => {
                        handleMovieSelect(newValue);
                    }}
                    onInputChange={(event, newValue) => {
                        handleInputChange(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Movie" />
                    )}
                />
            </DialogContent>
        </Dialog>
    );
};

export default MovieOptions;
