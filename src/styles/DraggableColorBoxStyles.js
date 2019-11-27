import media from './mediaQueries';

const styles = {
	root: {
		height: '25%',
		width: '20%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-6px',
		'&:hover svg': {
			color: 'white',
			transform: 'scale(1.5)'
		},
		[media.below('lg')]: {
			width: '25%',
			height: '20%'
		},
		[media.below('md')]: {
			width: '50%',
			height: '10%'
		},
		[media.below('sm')]: {
			width: '100%',
			height: '5%'
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

export default styles;
