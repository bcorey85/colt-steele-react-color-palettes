import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stage: 'form',
			newPaletteName: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.showEmojiPicker = this.showEmojiPicker.bind(this);
		this.savePalette = this.savePalette.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
			return this.props.palettes.every(
				({ paletteName }) =>
					paletteName.toLowerCase() !== value.toLowerCase()
			);
		});
	}

	handleClose = () => {
		this.setState({ stage: 'closed' });
	};
	showEmojiPicker() {
		this.setState({ stage: 'emoji' });
	}

	savePalette(emoji) {
		const palette = {
			paletteName: this.state.newPaletteName,
			emoji: emoji.native
		};
		this.props.handleSubmit(palette);
	}
	render() {
		const { newPaletteName } = this.state;
		const { hideForm } = this.props;

		return (
			<div>
				<Dialog open={this.state.stage === 'emoji'} onClose={hideForm}>
					<DialogTitle id='form-dialog-title'>
						Choose a Palette Emoji
					</DialogTitle>
					<Picker onSelect={this.savePalette} />
				</Dialog>
				<Dialog
					open={this.state.stage === 'form'}
					onClose={hideForm}
					aria-labelledby='form-dialog-title'
				>
					<DialogTitle id='form-dialog-title'>
						Choose a Palette Name
					</DialogTitle>
					<ValidatorForm onSubmit={this.showEmojiPicker}>
						<DialogContent>
							<DialogContentText>
								Please enter a name for your new beautiful
								palette. Make sure it's unique!
							</DialogContentText>

							<TextValidator
								label='Palette Name'
								name='newPaletteName'
								value={newPaletteName}
								onChange={this.handleChange}
								fullWidth
								margin='normal'
								validators={[
									'required',
									'isPaletteNameUnique'
								]}
								errorMessages={[
									'Enter palette name',
									'Name already used'
								]}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={hideForm} color='primary'>
								Cancel
							</Button>
							<Button
								variant='contained'
								color='primary'
								type='submit'
							>
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		);
	}
}

export default PaletteMetaForm;
