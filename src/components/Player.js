import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
	const audioRef = useRef(null);
	const [songInfo, setSongInfo] = useState({
		currentTime: null,
		duration: null,
	});

	const playSong = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const timeUpdate = (event) => {
		setSongInfo({
			...songInfo,
			currentTime: event.target.currentTime,
			duration: event.target.duration,
		});
	};

	const formatTime = (time) => {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};

	return (
		<div className='player'>
			<div className='player__time'>
				<p>{formatTime(songInfo.currentTime)}</p>
				<input
					min={0}
					max={songInfo.duration}
					value={songInfo.currentTime}
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
					icon={faPlay}
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
