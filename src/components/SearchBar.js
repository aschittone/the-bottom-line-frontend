import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
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
			</div>
		)
	}
}

export default Demo

