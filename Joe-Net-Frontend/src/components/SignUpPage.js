import { useState } from 'react'
const SignUpPage = (Props) => {
	const [email, setEmail] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	function submit(e) {
		e.preventDefault();
		fetch("http://localhost:5000/signup", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"content-Type": "application/json",
				"credentials": "include"
			},
			body: JSON.stringify({email: email, username: userName, password: password})
		})
		.then(response => {
			if (response.status === 200) {
				return response.json()
			} else {
				console.log('error in request')
				setError(true)
			}
		})
		.then(data => {
			if (data !== undefined) {
			Props.changePage(data)
			}
		})
		.catch(err => {
			console.log(err);
			setError(true)
		})
	}

	return (
		<div className="loginPage">
			<h1 className='mainHeader'>Sign Up</h1>
			<form className="loginForm" onSubmit={(e) => submit(e)}>
				<input type='text' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)}/>
				<input type='text' placeholder='Username' onChange={(e) => setUserName(e.target.value)}/>
				<input type='password' placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
				<input type="submit"></input>
			</form>
			{error ? <h3 className="error">there was an error requesting data from the server</h3> : null}	
		</div>
	);
};

export default SignUpPage;