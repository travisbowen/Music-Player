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
}) => {
	// Play song
	const playSong = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	//Format time for song
	const formatTime = (time) => {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};

	//Song time slider
	const dragInputHandler = (event) => {
		audioRef.current.currentTime = event.target.value;
		setSongInfo({ ...songInfo, currentTime: event.target.value });
	};

	return (
		<div className='player'>
			<div className='player__time'>
				<p>{formatTime(songInfo.currentTime)}</p>
				<input
					min={0}
					max={songInfo.duration}
					value={songInfo.currentTime}
					onChange={dragInputHandler}
					type='range'
				/>
				<p>{formatTime(songInfo.duration)}</p>
			</div>
			<div className='player__control'>
				<FontAwesomeIcon
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
					className='player__forward'
					size='2x'
					icon={faAngleRight}
				/>
			</div>
		</div>
	);
};

export default Player;
