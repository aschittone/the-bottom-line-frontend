import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Alert from './Alert'
import Button from './Button'

const styles = {
	main: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		height: '200px'
	}
}

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
		if (localStorage.getItem('token') && !localStorage.getItem('search')) {
			// Parse the serialized data back into an aray of objects
			let a = JSON.stringify([address]);
			// Push the new data (whether it be an object or anything else) onto the array
			// Alert the array value
			localStorage.setItem('search', a);
		} else if (localStorage.getItem('token') && localStorage.getItem('search')) {
			let searches = JSON.parse(localStorage.getItem('search'))
			searches.push(address)
			localStorage.setItem('search', JSON.stringify(searches));
		}
		this.props.history.push(`/listing/${address}`)
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
			autoFocus: true,
			placeholder: "Search Places",
			name: 'Demo__input',
			id: "my-input-id",
		}


		return (

			<div style={{ ...styles.main }} className='page-wrapper div-with-bg'>
				<div className='container' style={{ ...styles.container }}>
					<PlacesAutocomplete
						autocompleteItem={AutocompleteItem}
						onSelect={this.handleSelect}
						onEnterKeyDown={this.handleSelect}
						classNames={cssClasses}
						inputProps={inputProps}
						options={{ types: ['address'] }}
					/>
				</div>
			</div>
		)
	}
}

export default Demo

