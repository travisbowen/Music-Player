import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
	audioRef,
	currentSong,
	isPlaying,
	setIsPlaying,
	setSongInfo,
	songInfo,
	songs,
	setCurrentSong,
	setSongs,
}) => {
	const activeLibraryHandler = (nextPrev) => {
		// Add active state
		const updatedActiveSongs = songs.map((song) => {
			if (song.id === nextPrev.id) {
				return { ...song, active: true };
			} else {
				return { ...song, active: false };
			}
		});
		setSongs(updatedActiveSongs);
	};

	// Play song handler
	const playSong = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	// Format time for song
	const formatTime = (time) => {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};

	// Song time slider handler
	const dragInputHandler = (event) => {
		audioRef.current.currentTime = event.target.value;
		setSongInfo({ ...songInfo, currentTime: event.target.value });
	};

	// Skip track button handlers
	const skipTrackHandler = async (direction) => {
		// Gets index of current playing song in song array
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

		if (direction === "forward") {
			// If longer than song array remainder is 0 and starts over
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
		} else if (direction === "back") {
			// Checks if song array remainder is -1
			if ((currentIndex - 1) % songs.length === -1) {
				await setCurrentSong(songs[songs.length - 1]);
				activeLibraryHandler(songs[songs.length - 1]);
				if (isPlaying) {
					audioRef.current.play();
				}
				return;
			}
			// Goes back as long as array does not equal -1
			await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
			activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
		}
		if (isPlaying) {
			audioRef.current.play();
		}
	};

	return (
		<div className='player'>
			<div className='player__time'>
				<p>{formatTime(songInfo.currentTime)}</p>
				<input
					min={0}
					max={songInfo.duration || 0}
					value={songInfo.currentTime}
					onChange={dragInputHandler}
					type='range'
				/>
				<p>{songInfo.duration ? formatTime(songInfo.duration) : "0:00"}</p>
			</div>
			<div className='player__control'>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("back")}
					className='player__back'
					size='2x'
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon
					className='player__play'
					onClick={playSong}
					size='2x'
					icon={isPlaying ? faPause : faPlay}
				/>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("forward")}
					className='player__forward'
					size='2x'
					icon={faAngleRight}
				/>
			</div>
		</div>
	);
};

export default Player;
