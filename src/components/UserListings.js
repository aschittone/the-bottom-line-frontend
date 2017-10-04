


import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { Button } from 'semantic-ui-react'


const style = { flex: 1 };

export default class translate extends React.Component {
	constructor(props) {
		super(props)
	}


	handleClick = (address) => {
		this.props.handleClick(address)
	}

	goToListing = (address) => {
		this.props.history.push(`/listing/${address}`)
		window.location.reload()
	}

	render() {
		let items = []
		if (this.props.data !== '' && this.props.data[0] !== undefined) {
			this.props.data[1].map((listing, i) => {
				items.push(<div>
					<ListItem
						key={i}
						href={`https://the-bottom-line.herokuapp.com/listing/${listing.address}`}
						primaryText={listing.address} />
					<Button basic color='red' onClick={() => this.handleClick(listing.address)}> Unsave Listing</Button>
				</div >
				)
			}
			)
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

// rightAvatar = {<strong > { record.total }$</strong >}
// leftAvatar = { customers[record.customer_id] ? <Avatar src={`${customers[record.customer_id].avatar}?size=32x32`} /> : <Avatar /> }


