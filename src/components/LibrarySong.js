import React from "react";

const LibrarySong = ({
	song,
	songs,
	setCurrentSong,
	audioRef,
	isPlaying,
	setSongs,
}) => {
	const songSelectHandler = async () => {
		const selectedSong = songs.filter(
			(filteredSong) => filteredSong.id === song.id,
		);
		await setCurrentSong(selectedSong[0]);

		// Add active state
		const updatedActiveSongs = songs.map((song) => {
			if (song.id === selectedSong[0].id) {
				return { ...song, active: true };
			} else {
				return { ...song, active: false };
			}
		});
		setSongs(updatedActiveSongs);

		if (isPlaying) {
			audioRef.current.play();
		}
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
