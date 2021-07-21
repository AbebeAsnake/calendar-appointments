import React,{useState} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextField, Button  } from '@material-ui/core';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

const styles = (theme: Theme) => createStyles({
	addReminderFormContainer: {
		minHeight: '250px',
		marginTop: '10px',
		display: 'flex',
		flexDirection: 'column'
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	},
	addNote:{
		marginBottom:'10px'
	},
	saveButton:{
		marginTop:'50px',
		float: 'right'
		
	},
	sketchPicker:{
		marginTop: "50px"
	}
      
});

interface Props extends WithStyles<typeof styles>{
	isOpen: boolean,
	onClose: () => void
}

const AddReminder = (props: Props) => {
	const[displayColorPicker, displayColor] = useState(false);
	const[color, setColor] = useState({
      r: '241',
      g: '112',
      b: '19',
      a: '1'
    });
const styles = reactCSS({
      'default': {
        color: {
          width: '38px',
          height: '18px',
          borderRadius: '2px',
          background: `rgba(${color.r }, ${color.g }, ${color.b }, ${color.a })`,
        },
        swatch: {
          padding: '2px',
		  marginTop: '29px',
		  marginLeft: '10px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
    position: 'relative',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
		const { classes, isOpen, onClose } = props;

		return (
			<Dialog
				open={ isOpen }
				onClose={onClose}
				aria-labelledby='form-dialog-title'
				fullWidth={ true }
				maxWidth='md'
			>
				<DialogTitle id='form-dialog-title'>
					Add Reminder
					<IconButton aria-label='Close' className={ classes.closeButton } onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<Divider light />
				<DialogContent className={ classes.addReminderFormContainer }>
					<Typography>
						  <TextField className ={classes.addNote}  id="standard-basic" label="Add Note(Maximum of 30 character)" fullWidth = {true} />
						<form noValidate>
  <TextField
    id="date"
    label="date"
       type="date"
    InputLabelProps={{
      shrink: true,
    }}
  />

  <TextField
    id="time"
    label="Time"
	type="time"
    defaultValue="07:30"
    InputLabelProps={{
      shrink: true,
    }}
    
  />
        <div style={ styles.swatch } onClick={ () => displayColor(!displayColorPicker) }>
          <div style={ styles.color } />
        </div>
        { displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={() => displayColor(false)}/>
          <SketchPicker color={ color } onChange={(color) => setColor(color.rgb) } />
        </div> : null }

</form> <Button className={classes.saveButton} variant="outlined">Save</Button>
					</Typography>
				</DialogContent>
			</Dialog>
		);
}

export default withStyles(styles)( AddReminder );
