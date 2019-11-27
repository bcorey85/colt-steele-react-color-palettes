import { DRAWER_WIDTH } from '../constants';
import media from './mediaQueries';

const drawerWidth = DRAWER_WIDTH;
const styles = theme => ({
	root: {
		display: 'flex'
	},
	appBar: {
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		heigth: '64px'
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	hide: {
		display: 'none'
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20
	},
	navBtns: {
		display: 'inline-block',
		marginRight: '1rem',
		'& a': {
			textDecoration: 'none'
		},
		[media.below('xs')]: {
			marginRight: '.5rem'
		}
	},
	button: {
		margin: '0 0.5rem',
		[media.below('xs')]: {
			margin: '0.2rem',
			padding: '0.2rem'
		}
	}
});

export default styles;
