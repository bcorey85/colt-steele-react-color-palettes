import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';
import Toggler from './Toggler';
import seedColors from './seedColors';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		const savedPalettes = JSON.parse(
			window.localStorage.getItem('palettes')
		);
		this.savePalette = this.savePalette.bind(this);
		this.state = {
			palettes: savedPalettes || seedColors
		};
		this.findPalette = this.findPalette.bind(this);
		this.deletePalette = this.deletePalette.bind(this);
	}
	findPalette(id) {
		return this.state.palettes.find(palette => {
			return palette.id === id;
		});
	}
	savePalette(newPalette) {
		this.setState(
			{ palettes: [ ...this.state.palettes, newPalette ] },
			this.syncLocalStorage
		);
	}
	syncLocalStorage() {
		window.localStorage.setItem(
			'palettes',
			JSON.stringify(this.state.palettes)
		);
	}
	deletePalette(id) {
		console.log('hit');
		this.setState(
			st => ({
				palettes: st.palettes.filter(palette => palette.id !== id)
			}),
			this.syncLocalStorage
		);
	}
	render() {
		const { palettes } = this.state;
		return (
			<Route
				render={({ location }) => (
					<TransitionGroup>
						<CSSTransition
							classNames='fade'
							timeout={500}
							key={location.key}
						>
							<Switch location={location}>
								<Route
									exact
									path='/palette/new'
									render={routeProps => (
										<Page>
											<NewPaletteForm
												savePalette={this.savePalette}
												{...routeProps}
												palettes={palettes}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path='/'
									render={routeProps => (
										<Page>
											<PaletteList
												palettes={palettes}
												deletePalette={
													this.deletePalette
												}
												{...routeProps}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path='/palette/:id'
									render={routeProps => (
										<Page>
											<Palette
												palette={generatePalette(
													this.findPalette(
														routeProps.match.params
															.id
													)
												)}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path='/palette/:paletteId/:colorId'
									render={routeProps => (
										<Page>
											<SingleColorPalette
												colorId={
													routeProps.match.params
														.colorId
												}
												palette={generatePalette(
													this.findPalette(
														routeProps.match.params
															.paletteId
													)
												)}
											/>
										</Page>
									)}
								/>
								<Route
									render={routeProps => (
										<Page>
											<PaletteList
												palettes={palettes}
												deletePalette={
													this.deletePalette
												}
												{...routeProps}
											/>
										</Page>
									)}
								/>
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				)}
			/>
		);
	}
}

export default App;
