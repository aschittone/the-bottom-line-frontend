import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'



class CardExampleGroups extends React.Component {
	constructor(props) {
		super(props)
		
	}

	handleClick = (address) => {
		this.props.handleClick(address)
	}

	goToListing = (address) => {
		debugger
		this.props.history.history.push(`/listing/${address}`)
		window.location.reload()
	}

	render() {
		let cards = null
		if (this.props.data !== '' && this.props.data[0] !== undefined) {
			cards = this.props.data[1].map(listing => {
				return (
						<Card>
						<Card.Content>
							<Card.Header>
								{listing.address}
							</Card.Header>
							<Card.Meta>
								Estimated Rent: ${listing.rent}
							</Card.Meta>
							<Card.Description>
								Steve wants to add you to the group <strong>best friends</strong>
							</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<div className='ui two buttons'>
								<Button basic color='green' onClick={() => this.goToListing(listing.address)}>Go To Listing</Button>
								<Button basic color='red' onClick={() => this.handleClick(listing.address)}>Unsave Listing</Button>
							</div>
						</Card.Content>
					</Card>
				)
			})
		}
		return (
			<div>
				<Card.Group>
					{cards}
				</Card.Group>
			</div>
		)
	}
}

export default CardExampleGroups