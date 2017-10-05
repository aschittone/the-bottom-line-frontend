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
		height: '200px',
		textAlign: 'center',
		zIndex: 1
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
			let a = JSON.stringify([address]);
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
			placeholder: "Property Address to Analyze (must be an actual street address)",
			name: 'Demo__input',
			id: "my-input-id",
		}

		return (

			<div style={{ ...styles.main }} className='page-wrapper div-with-bg'>
				<div className="blur"></div>
				<div className='container' style={{ ...styles.container }}>
					<h1 className='title'>Figure out your bottom line.</h1>
					<h2 className='sub-title'>Simply analyze potential cash flow for rental properties.</h2>
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

