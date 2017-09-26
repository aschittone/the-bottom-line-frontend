// import React from 'react';
// import AutoComplete from 'material-ui/AutoComplete';
// import SearchBar from 'material-ui-search-bar'
// import LoadingScreen from './LoadingScreen'


// const colors = [
// 	"10 Vauxhall Road, East Brunswick, NJ 08816",
// 	'Orange',
// 	'1057 Coolidge Rd, Elizabeth, NJ 07208',
// 	"701 Ridge Hill Blvd UNIT 7N, Yonkers, NY 10710",
// ];

// class AutoCompleteExampleFilters extends React.Component {
// 	constructor(props) {
// 		super(props)

// 		this.state = {
// 			address: ''
// 		}
// 	}

// 	handleChange = (event) => {
// 		console.log(event)
// 		this.setState({
// 			address: event
// 		})
// 	}

// 	handleSubmit = () => {
// 		// this is where the state will be checked, and validation message will be added if the address is incorrect
// 		this.props.getListing(this.state.address)
// 		this.props.history.push('/listing')
// 	}


// 	render() {
// 		return (
// 			<div>
// 				<SearchBar
// 					filter={AutoComplete.caseInsensitiveFilter}
// 					dataSource={colors}
// 					maxSearchResults={5}
// 					onChange={this.handleChange}
// 					onRequestSearch={this.handleSubmit}
// 					style={{
// 						margin: '0 auto',
// 						maxWidth: 400
// 					}}
// 				/>
// 			</div>
// 		)
// 	}
// }

// export default AutoCompleteExampleFilters;

import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Loading from './LoadingScreen'
import Alert from './Alert'


class Demo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			address: '',
		}
		this.handleSelect = this.handleSelect.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleSelect(address) {
		this.setState({
			address,
			loading: true
		})
		this.props.getListing(this.state.address)
		this.props.history.push('/listing')
	}
	handleChange(address) {
		console.log(address)
		this.setState({
			address,
		})
	}

	render() {

		const cssClasses = {
			root: 'form-group',
			input: 'Demo__search-input',
			autocompleteContainer: 'Demo__autocomplete-container',
		}

		const AutocompleteItem = ({ formattedSuggestion }) => (
			<div className="Demo__suggestion-item">
				<i className='fa fa-map-marker Demo__suggestion-icon' />
				<strong>{formattedSuggestion.mainText}</strong>{' '}
				<small className="text-muted">{formattedSuggestion.secondaryText}</small>
			</div>)

		const inputProps = {
			type: "text",
			value: this.state.address,
			onChange: this.handleChange,
			onBlur: () => { console.log('Blur event!'); },
			onFocus: () => { console.log('Focused!'); },
			autoFocus: true,
			placeholder: "Search Places",
			name: 'Demo__input',
			id: "my-input-id",
		}


		return (

			<div className='page-wrapper'>
				<div className='container'>
					<PlacesAutocomplete
						autocompleteItem={AutocompleteItem}
						onEnterKeyDown={this.handleSelect}
						classNames={cssClasses}
						inputProps={inputProps}
						options={{ types: ['address'] }}
					/>
				</div>
				{this.props.data === undefined ? <Loading /> : null}
			</div>
		)
	}
}

export default Demo

