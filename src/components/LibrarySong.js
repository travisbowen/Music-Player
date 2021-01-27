import React from "react";

const LibrarySong = ({ song }) => {
	return (
		<div className='library__song'>
			<img alt={song.name} src={song.cover} />
			<div className='library__description'>
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	);
};

export default LibrarySong;
