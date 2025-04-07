import React from 'react';
import MoodTracker from '../../components/Tables/mood';
import Menu from '../../components/Menu/menu';

function Emotions() {
	return (
		<div className='emotions-container'>
			<Menu />
			<MoodTracker />
		</div>
	);
}

export default Emotions;
