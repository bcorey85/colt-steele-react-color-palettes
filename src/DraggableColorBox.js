import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
	root: {
		height: '20%',
		width: '25%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-4px',
		'&:hover svg': {
			color: 'white',
			transform: 'scale(1.5)'
		}
	},
	boxContent: {
		position: 'absolute',
		width: '100%',
		left: '0px',
		bottom: '0px',
		padding: '10px',
		textAlign: 'left',
		color: 'black',
		letterSpacing: '1px',
		fontSize: '12px',
		boxSizing: 'border-box',
		textTransform: 'uppercase',
		display: 'flex',
		justifyContent: 'space-between'
	},
	deleteIcon: {
		color: 'rgba(0,0,0,0.5)',
		transition: 'all 0.3s ease-in-out'
	}
};

const DraggableColorBox = props => {
	const { classes, name } = props;
	return (
		<div className={classes.root} style={{ backgroundColor: props.color }}>
			{props.name}
			<div className={classes.boxContent}>
				<span>{name}</span>
				<DeleteIcon className={classes.deleteIcon} />
			</div>
		</div>
	);
};

export default withStyles(styles)(DraggableColorBox);
