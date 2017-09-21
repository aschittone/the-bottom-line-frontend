import React from 'react';
import ReactDOM from 'react-dom';
import ReactStreetview from 'react-streetview';
// <StreetView lng={parseFloat(this.props.data[0].address.longitude)} lat={parseFloat(this.props.data[0].address.latitude)} />


export default class Map extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		// see https://developers.google.com/maps/documentation/javascript 
		const googleMapsApiKey = 'AIzaSyBpYqc8q70vkZr0ysvv0ewTrODBwZi3MQw';

		// see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions 
		const streetViewPanoramaOptions = {
			position: { lat: this.props.lat, lng: this.props.lng },
			pov: { heading: 300, pitch: 0 },
			zoom: 1
		};

		return (
			<div style={{
				width: '95%',
				height: '300px',
				backgroundColor: '#eeeeee'
			}}>
				<ReactStreetview
					apiKey={googleMapsApiKey}
					streetViewPanoramaOptions={streetViewPanoramaOptions}
				/>
			</div>
		);
	}
}