import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
	songs,
	setCurrentSong,
	audioRef,
	isPlaying,
	setSongs,
	libraryOpen,
}) => {
	return (
		<div className={`library ${libraryOpen ? "active__library" : ""}`}>
			<h2>Library</h2>
			<div className='library__songs'>
				{songs.map((song) => {
					return (
						<LibrarySong
							song={song}
							songs={songs}
							setCurrentSong={setCurrentSong}
							key={song.id}
							audioRef={audioRef}
							isPlaying={isPlaying}
							setSongs={setSongs}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Library;
