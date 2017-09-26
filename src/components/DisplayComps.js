import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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
		this.state = {
			data: ''
		}
	}

	getListing = (address) => {
		this.setState({
			data: undefined
		})
		this.props.getListing(address)
	}

	render() {
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
								subtitle={<span><b>{comp.address.street + ", " + comp.address.city + ", " + comp.address.state}</b></span>}
								actionIcon={<IconButton onClick={() => this.getListing(comp.address.street + ", " + comp.address.city + ", " + comp.address.state)}><StarBorder color="white" /></IconButton>}>
								<img src={`https://maps.googleapis.com/maps/api/staticmap?&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7Clabel:%7C${comp.address.latitude},${comp.address.longitude}&key=AIzaSyA7UaZXsb4sfJVh-WkvY5sMMX8acA8Miw4`} />
							</GridTile>
						))}
					</GridList>
				</div >
			</div>
		)
	}
}

export default GridListExampleSimple;