import React, { useState } from 'react';

const Toggler = () => {
	const [ isHappy, setIsHappy ] = useState(true);

	return <h1>{isHappy ? ':)' : ':('}</h1>;
};

export default Toggler;
