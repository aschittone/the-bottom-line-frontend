import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import UserListings from './UserListings'
import Auth from '../adapters/auth'


class GridExampleCelled extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: [undefined, 0]
		}
		
		Auth.me()
		.then((user) => {
			this.setState({
				data: user
			})
		})

	}

	deleteListing = (address) => {
		Auth.delete(address)
		.then((res) => {
			this.setState({
				data: res
			})
		})
	}


	render() {
		return (
			<Grid celled>
				<Grid.Row>
					<Grid.Column width={3}>
						{this.state.data[0] !== undefined ? <h1>Welcome, {this.state.data[0].name}</h1> : null}
					</Grid.Column>
					<Grid.Column width={13}>
						{typeof this.state.data[1] === "object" && this.state.data.length < 1 ? <div><h1>"You have not saved any listings!"</h1></div> : <UserListings {...this.state} handleClick={this.deleteListing}/>}
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={3}>
						<Image src='/assets/images/wireframe/image.png' />
					</Grid.Column>
					<Grid.Column width={10}>
						<Image src='/assets/images/wireframe/paragraph.png' />
					</Grid.Column>
					<Grid.Column width={3}>
						<Image src='/assets/images/wireframe/image.png' />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}


export default GridExampleCelled