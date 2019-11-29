import media from './mediaQueries';

export default {
	Navbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: '5vh'
	},
	logo: {
		marginRight: '15px',
		padding: '0 13px',
		fontSize: '22px',
		backgroundColor: '#eceff1',
		fontFamily: 'Roboto',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		[media.below('xs')]: {
			marginRight: '5px',
			padding: '0  0 0 13px',
			maxWidth: '75px'
		},
		'& a': {
			textDecoration: 'none',
			color: 'black',
			[media.below('xs')]: {
				fontSize: '1rem'
			}
		}
	},
	slider: {
		width: '340px',
		margin: '0 10px',
		display: 'inline-block',
		'& .rc-slider-rail': {
			height: '8px'
		},
		'& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, rc-slider-handle:focus': {
			backgroundColor: 'green',
			outline: 'none',
			border: '2px solid green',
			boxShadow: 'none',
			width: '13px',
			height: '13px',
			marginLeft: '-3px',
			marginTop: '-3px'
		},
		[media.below('sm')]: {
			width: '150px'
		},
		'& .rc-slider-track': {
			background: 'transparent'
		}
	},
	selectContainer: {
		marginLeft: 'auto',
		marginRight: '1rem'
	}
};
