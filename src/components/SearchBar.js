import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import SearchBar from 'material-ui-search-bar'
import LoadingScreen from './LoadingScreen'


const colors = [
  "10 Vauxhall Road, East Brunswick, NJ 08816",
	'Orange',
	'1057 Coolidge Rd, Elizabeth, NJ 07208',
];

class AutoCompleteExampleFilters extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			address: ''
		}
	}

	handleChange = (event) => {
		console.log(event)
		this.setState({
			address: event
		})
	}

	handleSubmit = () => {
		this.props.getListing(this.state.address)
	}

 
	render() {
		return (
			<div>
				<SearchBar
					filter={AutoComplete.caseInsensitiveFilter}
					dataSource={colors}
					maxSearchResults={5}
					onChange={this.handleChange}
					onRequestSearch={this.handleSubmit}
					style={{
						margin: '0 auto',
						maxWidth: 400
					}}
				/>
			</div>
		)
	}
}

export default AutoCompleteExampleFilters;