import media from './mediaQueries';
import bg from './bg.svg';

export default {
	root: {
		height: '100vh',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		/* background by SVG Background */
		backgroundColor: '#1e8feb',
		backgroundImage: `url(${bg})`,
		overflow: 'scroll',
		'& h1': {
			fontSize: '2rem'
		}
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
