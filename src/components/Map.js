import React, { PropTypes } from "react"
import { compose, withProps, withState, withHandlers } from "recompose";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
} from "react-google-maps";


class Map extends React.Component {
	constructor(props) {
		super(props)

	}

	shouldComponentUpdate(nextProps, nextState) {
		this.props !== nextProps
	}

	render() {
		let lng = this.props.lng
		let lat = this.props.lat

		const MapWithControlledZoom =

			compose(
				withProps({
					googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDq7JeeXa3PF4HGZfZjkARuGnrjxQYSonA&libraries=geometry,drawing,places",
					loadingElement: <div style={{ height: `100%` }} />,
					containerElement: <div style={{ height: `85%` }} />,
					mapElement: <div style={{ height: `100%` }} />,
				}),
				withState('zoom', 'onZoomChange', 15),
				withHandlers(() => {
					const refs = {
						map: undefined,
					}

					return {
						onMapMounted: (prps) => ref => {
							refs.map = ref
						},
						onZoomChanged: ({ onZoomChange }) => () => {
							onZoomChange(refs.map.getZoom())
						}
					}
				}),
				withScriptjs,
				withGoogleMap
			)

				(props =>
					<GoogleMap
						defaultCenter={{ lat: lat, lng: lng }}
						zoom={props.zoom}
						ref={props.onMapMounted}
						onZoomChanged={props.onZoomChanged}
					>
						<Marker
							position={{ lat: lat, lng: lng }}
							onClick={props.onToggleOpen}
						>
						</Marker>
					</GoogleMap>
				);

		return (
			<MapWithControlledZoom />
		)
	}
}

export default Map;
