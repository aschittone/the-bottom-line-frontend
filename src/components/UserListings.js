import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const style = { flex: 1 };
const iconStyle = { margin: 5 };

const iconButtonElement = (
	<IconButton
		touch={true}
		tooltip="more"
		tooltipPosition="bottom-left"
	>
		<MoreVertIcon color={"#A9A9A9"} />
	</IconButton>
);

export default class translate extends React.Component {
	constructor(props) {
		super(props)
	}


	handleClick = (address) => {
		this.props.handleClick(address)
	}

	goToListing = (address) => {
		this.props.history.push(`/listing/${address}`)
	}

	render() {
		let items = []
		if (this.props.data !== '' && this.props.data[0] !== undefined) {
			this.props.data[1].map((listing, i) => {
				items.push(<div>
					<ListItem
						key={i}
						primaryText={listing.address}
						rightIconButton={<IconMenu iconButtonElement={iconButtonElement}>
							<MenuItem onClick={() => this.goToListing(listing.address)}>Go To Property</MenuItem>
							<MenuItem onClick={() => this.handleClick(listing.address)}>Delete</MenuItem>
						</IconMenu>}
					/>
				</div >
				)
			})
		} else { null }
		return (
			<Card style={style}>
				<CardTitle title='Saved Properties' subtitle="Here's a list of your recent searches. Click on any of them below to analyze the property again." />
				<List>
					{items}
				</List>
			</Card>
		)
	}
}

