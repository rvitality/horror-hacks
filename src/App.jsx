import React from "react";

import BgVideo from "./assets/bg.mp4";

const App = () => {
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
                    {/* You can add multiple video formats (e.g., WebM, Ogg) for better compatibility */}
                </video>
            </div>
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* <h1 className="text-white text-8xl">Today's Puzzle</h1> */}
              <h1 className="text-white text-8xl">Horror HACKS</h1>
            </div>
        </main>
    );
};

export default App;
   