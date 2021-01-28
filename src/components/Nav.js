import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryOpen, setLibraryOpen }) => {
	return (
		<div className='nav'>
			<h1>Waves</h1>
			<button onClick={() => setLibraryOpen(!libraryOpen)}>
				Library
				<FontAwesomeIcon icon={faMusic} />
			</button>
		</div>
	);
};

export default Nav;
