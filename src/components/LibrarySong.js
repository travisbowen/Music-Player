import React from "react";
import { playAudio } from "../util";

const LibrarySong = ({
	song,
	songs,
	setCurrentSong,
	audioRef,
	isPlaying,
	setSongs,
}) => {
	const songSelectHandler = () => {
		const selectedSong = songs.filter(
			(filteredSong) => filteredSong.id === song.id,
		);
		setCurrentSong(selectedSong[0]);

		// Add active state
		const updatedActiveSongs = songs.map((song) => {
			if (song.id === selectedSong[0].id) {
				return { ...song, active: true };
			} else {
				return { ...song, active: false };
			}
		});
		setSongs(updatedActiveSongs);

		playAudio(isPlaying, audioRef);
	};

	return (
		<div
			onClick={songSelectHandler}
			className={`library__song ${song.active ? "selected" : ""}`}>
			<img alt={song.name} src={song.cover} />
			<div className='library__description'>
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	);
};

export default LibrarySong;
