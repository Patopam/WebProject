import { useParams } from 'react-router-dom';
import JournalCardView from '../../components/Journal/journalCardView';

const EditJournal = () => {
	const { id } = useParams();
	return (
		<div>
			<JournalCardView journalId={id} />
		</div>
	);
};
export default EditJournal;
