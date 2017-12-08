import React from 'react'

function authorize(RenderedComponent, props) {

	return class extends React.Component {

		// authorizes a user before the component is rendered
		componentWillMount() {
			if (!localStorage.getItem('token')) {
				this.props.history.push("/login")
			}
		}

		render() {
			return (<RenderedComponent history={this.props.history} />)
		}
	}
}

export default authorize
