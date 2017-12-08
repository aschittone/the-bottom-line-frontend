class Auth {
	// Auth adapter for user authentication (used in other files)

	// fetches to backend to log user in
	static login(userParams) {
		const userJSON = JSON.stringify(userParams)
		return fetch('https://rentroll-api.herokuapp.com/api/v1/login', {
			method: 'post',
			body: userJSON,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			}
		})
			.then(res => res.json())
	}

	// fetches to backend to sign user up
	static signup(userParams) {
		const userJSON = JSON.stringify(userParams)
		return fetch('https://rentroll-api.herokuapp.com/api/v1/users', {
			method: 'post',
			body: userJSON,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			}
		})
			.then(res => res.json())
	}

	// fetches to backend for user info
	static me() {
		const jwtToken = localStorage.getItem("token")
		return fetch('https://rentroll-api.herokuapp.com/api/v1/me', {
			headers: {
				"Authorization": `Bearer ${jwtToken}`,
				"Accept": "application/json"
			}
		})
			.then(res => res.json())
	}

	// fetches to backend to save user listing
	static save(userListingParams) {
		const userJSON = JSON.stringify(userListingParams)
		const jwtToken = localStorage.getItem("token")
		return fetch('https://rentroll-api.herokuapp.com/api/v1/user/listings', {
			method: 'post',
			body: userJSON,
			headers: {
				"Authorization": `Bearer ${jwtToken}`,
				"Content-Type": "application/json",
				"Accept": "application/json"
			}
		})
			.then(res => res.json())
	}

	// deletes user info
	static delete(userListingParams) {
		const userJSON = JSON.stringify(userListingParams)
		const jwtToken = localStorage.getItem("token")
		return fetch(`https://rentroll-api.herokuapp.com/api/v1/user/listings/${userListingParams}`, {
			method: 'delete',
			body: userJSON,
			headers: {
				"Authorization": `Bearer ${jwtToken}`,
				"Content-Type": "application/json",
				"Accept": "application/json"
			}
		})
			.then(res => res.json())
	}

	static saveFinancialInfo(userListingParams) {
		const userJSON = JSON.stringify(userListingParams)
		const jwtToken = localStorage.getItem("token")
		return fetch('https://rentroll-api.herokuapp.com/api/v1/user/financials', {
			method: 'post',
			body: userJSON,
			headers: {
				"Authorization": `Bearer ${jwtToken}`,
				"Content-Type": "application/json",
				"Accept": "application/json"
			}
		})
			.then(res => res.json())
	}

	static getFinancialData() {
		const jwtToken = localStorage.getItem("token")
		return fetch('https://rentroll-api.herokuapp.com/api/v1/user/financials', {
			headers: {
				"Authorization": `Bearer ${jwtToken}`,
				"Accept": "application/json"
			}
		})
			.then(res => res.json())
	}


	static logOut() {
		localStorage.clear()
	}
}





export default Auth
