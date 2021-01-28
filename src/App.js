import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import "./styles/app.scss";
import data from "./data";

const App = () => {
	//State
	const audioRef = useRef(null);
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});

	//Update song time info for player
	const timeUpdate = (event) => {
		setSongInfo({
			...songInfo,
			currentTime: event.target.currentTime,
			duration: event.target.duration,
		});
	};

	return (
		<div className='App'>
			<Song currentSong={currentSong} />
			<Player
				audioRef={audioRef}
				currentSong={currentSong}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				setSongInfo={setSongInfo}
				songInfo={songInfo}
			/>
			<Library
				audioRef={audioRef}
				songs={songs}
				setCurrentSong={setCurrentSong}
				isPlaying={isPlaying}
			/>
			<audio
				onTimeUpdate={timeUpdate}
				onLoadedMetadata={timeUpdate}
				ref={audioRef}
				src={currentSong.audio}
			/>
		</div>
	);
};

export default App;
