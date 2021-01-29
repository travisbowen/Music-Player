import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
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
	const [libraryOpen, setLibraryOpen] = useState(false);

	//Update song time info for player
	const timeUpdate = (event) => {
		setSongInfo({
			...songInfo,
			currentTime: event.target.currentTime,
			duration: event.target.duration,
		});
	};

	const songEndHandler = async () => {
		// Gets index of current playing song in song array
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		if (isPlaying) {
			audioRef.current.play();
		}
	};

	return (
		<div className={`app ${libraryOpen ? "library__active" : ""}`}>
			<Nav libraryOpen={libraryOpen} setLibraryOpen={setLibraryOpen} />
			<Song currentSong={currentSong} />
			<Player
				audioRef={audioRef}
				currentSong={currentSong}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				setSongInfo={setSongInfo}
				songInfo={songInfo}
				songs={songs}
				setCurrentSong={setCurrentSong}
				setSongs={setSongs}
			/>
			<Library
				audioRef={audioRef}
				songs={songs}
				setCurrentSong={setCurrentSong}
				isPlaying={isPlaying}
				setSongs={setSongs}
				libraryOpen={libraryOpen}
			/>
			<audio
				onTimeUpdate={timeUpdate}
				onLoadedMetadata={timeUpdate}
				ref={audioRef}
				src={currentSong.audio}
				onEnded={songEndHandler}
			/>
		</div>
	);
};

export default App;
