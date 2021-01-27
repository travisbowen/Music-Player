import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
	//State
	const audioRef = useRef(null);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});

	// Play song
	const playSong = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	//Update song time info for player
	const timeUpdate = (event) => {
		setSongInfo({
			...songInfo,
			currentTime: event.target.currentTime,
			duration: event.target.duration,
		});
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
			<audio
				onTimeUpdate={timeUpdate}
				onLoadedMetadata={timeUpdate}
				ref={audioRef}
				src={currentSong.audio}
			/>
		</div>
	);
};

export default Player;
