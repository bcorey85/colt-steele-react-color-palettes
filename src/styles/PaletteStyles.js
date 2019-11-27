import media from './mediaQueries';

export default {
	Palette: {
		height: '100vh'
	},
	PaletteColors: {
		height: '90vh'
	},
	goBack: {
		width: '20%',
		height: '50%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-4px',
		textTransform: 'uppercase',
		opacity: 1,
		backgroundColor: 'black',
		'& a': {
			width: '100px',
			height: '30px',
			position: 'absolute',
			display: 'inline-block',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			textAlign: 'center',
			outline: 'none',
			background: 'rgba(255, 255, 255, 0.3)',
			fontSize: '1rem',
			lineHeight: '30px',
			color: 'white',
			border: 'none',
			textDecoration: 'none'
		},
		[media.below('lg')]: {
			width: '25%',
			height: '33.3333%'
		},
		[media.below('md')]: {
			width: '50%',
			height: '20%'
		},
		[media.below('xs')]: {
			width: '100%',
			height: '10%'
		}
	}
};
