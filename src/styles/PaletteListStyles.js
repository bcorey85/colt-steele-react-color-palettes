import media from './mediaQueries';

export default {
	root: {
		backgroundColor: 'blue',
		height: '100vh',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	container: {
		width: '50%',
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'column',
		flexWrap: 'wrap',
		[media.below('lg')]: {
			width: '80%'
		},
		[media.below('md')]: {
			width: '90%'
		}
	},
	nav: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: 'white',
		'& a': {
			color: 'white'
		}
	},
	palettes: {
		boxSizing: 'border-box',
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 30%)',
		gridGap: '5%',
		[media.below('md')]: {
			gridTemplateColumns: 'repeat(2, 50%)',
			gridGap: '2%'
		},
		[media.below('xs')]: {
			gridTemplateColumns: '1fr',
			gridGap: '1%'
		}
	}
};
