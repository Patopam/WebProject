import React from 'react';
import MoodTracker from '../../components/Tables/mood';
import Menu from '../../components/Menu/menu';
import ReminderCard from '../../components/Cards/remainder';
import GoalProgressCard from '../../components/Cards/goal';

function Emotions() {
	return (
		<div className='emotions-container'>
			<Menu />
			<MoodTracker />
			<ReminderCard />
			<GoalProgressCard />
		</div>
	);
}

export default Emotions;
