import React from "react";

const Song = ({ currentSong }) => {
	return (
		<div className='song__container'>
			<img alt='' src={currentSong.cover} />
			<h2>{currentSong.name}</h2>
			<h3>{currentSong.artist}</h3>
		</div>
	);
};

export default Song;