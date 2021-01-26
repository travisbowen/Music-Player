import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = () => {
	return (
		<div className='player'>
			<div className='player__time'>
				<p>Start Time</p>
				<input type='range' />
				<p>End Time</p>
			</div>
			<div className='player__control'>
				<FontAwesomeIcon
					className='player__back'
					size='2x'
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon className='player__play' size='2x' icon={faPlay} />
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
