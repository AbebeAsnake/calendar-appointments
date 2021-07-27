import { connect } from 'react-redux';
import AddReminder from './AddReminder';
import { closeAddReminder, createReminder } from '../../redux/actions';

interface State {
	addReminderStatus: {
		isOpen: boolean,
		reminders: Reminder[]
	}
}

const mapStateToProps = (state: State) => {
	return { 
		isOpen: state.addReminderStatus.isOpen
	};
}

export type Reminder = {
	title: string;
	color: string;
	datetime: string;
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		onClose: () => {
			dispatch( closeAddReminder() );
		},
		onAddReminder: (reminder: Reminder) => {
			dispatch( createReminder(reminder) )
		}
	}
}

const AddReminderContainer = connect( mapStateToProps, mapDispatchToProps )( AddReminder );

export default AddReminderContainer;