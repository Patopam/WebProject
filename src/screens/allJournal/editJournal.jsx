import { useParams } from 'react-router-dom';
import JournalCardView from '../../components/Cards/journalCardsView';

const EditJournal = () => {
	const { id } = useParams();
	return (
		<div>
			<JournalCardView journalId={id} />
		</div>
	);
};
export default EditJournal;
