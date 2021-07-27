import React, { useCallback, useEffect, useState } from 'react';
import * as constants from '../../utils/constants';
import * as regEx from '../../utils/regExUtils'
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, FormControl, FormHelperText, Input, InputLabel, TextField } from '@material-ui/core';
import {convertDateToInputString} from '../../utils/dateUtils';
import { Reminder } from './AddReminderContainer';

const styles = (theme: Theme) => createStyles({
	addReminderFormContainer: {
		minHeight: '250px',
		marginTop: '0px',
		display: 'flex',
		flexDirection: 'column'
	},
	addReminderFormField: {
		marginTop: '10px',
		marginBottom: '10px'
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	}
});

interface Props extends WithStyles<typeof styles>{
	isOpen: boolean,
	onClose: () => void,
	onAddReminder: (reminder: Reminder) => void
}

const checkSubmitDisabled = (title: string): boolean => !title || regEx.isValidTitleLength(title)
export const createReminderKey = (reminder: Reminder) => `${reminder.title}${reminder.datetime}`

const DEFAULT_DATETIME = convertDateToInputString(new Date());
const AddReminder = (props: Props) => {
	const initialState = {
  title: constants.DEFAULT_TITLE,
  datetime: DEFAULT_DATETIME,
  color: constants.DEFAULT_COLOR
};
	const { classes, isOpen, onClose, onAddReminder } = props;

	 const[title, titleHandler] = useState(constants.DEFAULT_TITLE);
	const [datetime, dateTimeHandler] = useState(DEFAULT_DATETIME);
	const [color, colorHandler] = useState(constants.DEFAULT_COLOR);

	const onClickSaveReminder = useCallback(() => {
		onAddReminder({
			title,
			datetime,
			color
		})
		onClose()
	}, [onAddReminder, title, datetime, color, onClose]);

	useEffect(() => {
		titleHandler(constants.DEFAULT_TITLE)
		colorHandler(constants.DEFAULT_COLOR)
		dateTimeHandler(DEFAULT_DATETIME)
	},  [isOpen]);

	return (
		<Dialog
			open={ isOpen }
			onClose={onClose}
			aria-labelledby='form-dialog-title'
			fullWidth={ true }
			maxWidth='md'
		>
			<DialogTitle id='form-dialog-title'>
				{constants.ADD_REMINDER}
				<IconButton aria-label='Close' className={ classes.closeButton } onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider light />
			<DialogContent className={ classes.addReminderFormContainer }>
				<FormControl className={ classes.addReminderFormField }>
					<TextField
						id="reminder-title"
						type="text"
						value={title}
						onChange={(value) => titleHandler(value.target.value)} 
						error={regEx.isValidTitleLength(title)}
						label={constants.REMINDER_TITLE}
						helperText={regEx.isValidTitleLength(title) && constants.REMINDER_TITLE_VALIDATION}
					/>
					<FormHelperText id="reminder-title-helper-text">
						This will display as text in the calendar month view.
					</FormHelperText>
				</FormControl>
				<FormControl className={ classes.addReminderFormField }>
					<InputLabel htmlFor="reminder-color">Reminder Color</InputLabel>
					<Input
						id="reminder-color"
						type="color"
						value={color}
						onChange={(value) => colorHandler(value.target.value)} 
					/>
					<FormHelperText id="reminder-color-helper-text">
						Reminder background color.
					</FormHelperText>
				</FormControl>
				<FormControl className={ classes.addReminderFormField }>
					<InputLabel htmlFor="reminder-datetime">Reminder Date &amp; Time</InputLabel>
					<Input
						id="reminder-datetime"
						type="datetime-local"
						value={datetime}
						onChange={(value) => dateTimeHandler(value.target.value)} 
					/>
					<FormHelperText id="reminder date-time">
						Date time reminder.
					</FormHelperText>
				</FormControl>
				<FormControl className={ classes.addReminderFormField }>
					<Button
						variant="contained"
						color="primary"
						disabled={checkSubmitDisabled(title)}
						onClick={onClickSaveReminder}
					>Save</Button>
				</FormControl>
			</DialogContent>
		</Dialog>
	);
}
export default withStyles(styles)( AddReminder );