import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import { Redirect } from 'react-router-dom'
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FontIcon from 'material-ui/FontIcon';

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	gridList: {
		width: 500,
		height: 450,
		overflowY: 'auto',
	},
	headline: {
		fontSize: 24,
		fontWeight: 400,
	},
};

class GridListExampleSimple extends React.Component {
	constructor(props) {
		super(props)
	}

	goToListing = (address) => {
		if (localStorage.getItem('token') && !localStorage.getItem('search')) {
			let a = JSON.stringify([address]);
			localStorage.setItem('search', a);
		} else if (localStorage.getItem('token') && localStorage.getItem('search')) {
			let searches = JSON.parse(localStorage.getItem('search'))
			searches.push(address)
			localStorage.setItem('search', JSON.stringify(searches));
		}
		this.props.history.history.push(`/listing/${address}`)
		window.location.reload()
	}


	render() {
		if (this.props[1] !== "Error: comps not available for the specified property identifier") {
			return (
				<div >
					{ //this.state.data === undefined ? <LoadingModal /> : null
					}
					<h2 style={styles.headline}>Comparable Properties</h2>
					<div style={styles.root}>
						<GridList
							cellHeight={180}
							style={styles.gridList}>
							{this.props[1].map((comp, index) => (
								<GridTile
									key={index}
									title={comp.address.street}
									subtitle={<span><b>{comp.address.city + ", " + comp.address.state}</b></span>}
									actionIcon={<IconButton onClick={() => this.goToListing(comp.address.street + ", " + comp.address.city + ", " + comp.address.state)}>
										<i className="material-icons">forward</i></IconButton>}>
									<img src={`https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${comp.address.latitude},${comp.address.longitude}&heading=151.78&pitch=-0.76&key=AIzaSyDR9LJjTcuvQJGBuWHWUhzQPCVR5hPnGto`} />
								</GridTile>
							))}
						</GridList>
					</div >
				</div>
			)
		}
	}
}

export default GridListExampleSimple;