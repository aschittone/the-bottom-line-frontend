import React from 'react'


function authorize(RenderedComponent, props) {

	return class extends React.Component {

		componentWillMount() {
			if (!localStorage.getItem('token')) {
				debugger
				this.props.history.push("/login")
			}
		}

		render() {
			return (<RenderedComponent {...props} {...this.props} />)
		}
	}
}


export default authorize
