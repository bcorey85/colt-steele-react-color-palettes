import React, { Component } from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import { Link } from 'react-router-dom';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const styles = theme => ({
	root: {
		display: 'flex'
	},
	appBar: {
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	content: {
		flexGrow: 1,
		height: 'calc(100vh - 64px)',
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	}
});

class NewPaletteForm extends Component {
	static defaultProps = {
		maxColors: 20
	};
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			currentColor: 'teal',
			newColorName: '',
			colors: this.props.palettes[0].colors
		};
		this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
		this.handleDrawerClose = this.handleDrawerClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.updateCurrentColor = this.updateCurrentColor.bind(this);
		this.addNewColor = this.addNewColor.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.deleteColor = this.deleteColor.bind(this);
		this.clearColors = this.clearColors.bind(this);
		this.addRandomColor = this.addRandomColor.bind(this);
	}

	componentDidMount() {
		// custom rule will have name 'isPasswordMatch'
		ValidatorForm.addValidationRule('isColorNameUnique', value => {
			return this.state.colors.every(({ name }) => {
				return name.toLowerCase() !== value.toLowerCase();
			});
		});
		ValidatorForm.addValidationRule('isColorUnique', value => {
			return this.state.colors.every(({ color }) => {
				return color !== this.state.currentColor;
			});
		});
	}

	handleDrawerOpen() {
		this.setState({ open: true });
	}

	handleDrawerClose() {
		this.setState({ open: false });
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	deleteColor(colorName) {
		this.setState({
			colors: this.state.colors.filter(color => color.name !== colorName)
		});
	}
	updateCurrentColor(newColor) {
		this.setState({ currentColor: newColor.hex });
	}

	addNewColor() {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newColorName
		};
		this.setState({
			colors: [ ...this.state.colors, newColor ],
			newColorName: ''
		});
	}

	handleSubmit(newPaletteName) {
		const newPalette = {
			paletteName: newPaletteName,
			id: newPaletteName.toLowerCase().replace(/ /g, '-'),
			colors: this.state.colors
		};
		this.props.savePalette(newPalette);
		//redirect
		this.props.history.push('/');
	}
	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex)
		}));
	};

	clearColors() {
		this.setState({ colors: [] });
	}

	addRandomColor() {
		const allColors = this.props.palettes.map(p => p.colors).flat();
		const rand = Math.floor(Math.random() * allColors.length);
		const randomColor = allColors[rand];
		this.setState({ colors: [ ...this.state.colors, randomColor ] });
	}

	render() {
		const { classes, maxColors, palettes } = this.props;
		const { open, colors } = this.state;
		const paletteIsFull = colors.length >= maxColors;

		return (
			<div className={classes.root}>
				<PaletteFormNav
					open={open}
					classes={classes}
					palettes={palettes}
					handleSubmit={this.handleSubmit}
					handleDrawerOpen={this.handleDrawerOpen}
				/>
				<Drawer
					className={classes.drawer}
					variant='persistent'
					anchor='left'
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>

					<Divider />
					<Typography variant='h4'>Design Your Palette</Typography>
					<div>
						<Button
							variant='contained'
							color='secondary'
							onClick={this.clearColors}
						>
							Clear Palette
						</Button>
						<Button
							variant='contained'
							color='primary'
							onClick={this.addRandomColor}
							disabled={paletteIsFull}
						>
							{paletteIsFull ? 'Palette is Full' : 'Random Color'}
						</Button>
					</div>
					<ChromePicker
						color={this.state.currentColor}
						onChangeComplete={this.updateCurrentColor}
					/>
					<ValidatorForm onSubmit={this.addNewColor}>
						<TextValidator
							value={this.state.newColorName}
							name='newColorName'
							onChange={this.handleChange}
							validators={[
								'required',
								'isColorNameUnique',
								'isColorUnique'
							]}
							errorMessages={[
								'Enter a color name!',
								'Color name must be unique!',
								'Color already used!'
							]}
						/>
						<Button
							variant='contained'
							type='submit'
							color={'primary'}
							style={{
								backgroundColor: paletteIsFull
									? 'gray'
									: this.state.currentColor
							}}
							disabled={paletteIsFull}
						>
							{paletteIsFull ? 'Palette is Full' : 'Add Color'}
						</Button>
					</ValidatorForm>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						colors={this.state.colors}
						deleteColor={this.deleteColor}
						axis='xy'
						onSortEnd={this.onSortEnd}
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
