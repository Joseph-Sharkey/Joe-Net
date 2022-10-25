import { useState } from 'react';
import SignUpPage from './SignUpPage';

const LoginPage = (Props) => {
	const [displaySignUpPage, setDisplaySignUpPage] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false)

	function submit(e) {
		e.preventDefault();
		fetch(`http://localhost:5000/login?email=${email}&password=${password}`)
		.then(response => {
			if (response.status === 200) {
				return response.json();
			} else {
				setError(true)
			}
		})
		.then(jsonResponse => {
			if (jsonResponse !== undefined) {
				console.log(jsonResponse);
				Props.changePage(jsonResponse)
			}
		})
		.catch(err => {
			console.log(err)
			setError(true)
		})
	}

	if (!displaySignUpPage) {
		return (
			<div className='loginPage'>
				<h1 class="mainHeader">Log in</h1>
				<form  class="loginForm" onSubmit={(e) => submit(e)}>
					<input type='text' placeholder='email address' onChange={(e) => setEmail(e.target.value)}></input>
					<input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
					<input type="submit"></input>
					<button className='signUpButton' onClick={() => setDisplaySignUpPage(true)}>Create New Account</button>
				</form>
				{error ? <h2 className="error">error while requesting data</h2> : null}
			</div>
		);
	} else {
		return (
			<SignUpPage changePage={Props.changePage}/>
		)
	}
};


export default LoginPage;

/*
login page functionality:
either log in or sign up
the sign up page will be a separate subpage
login page will have email, and password
sign up page will have email, username and password
*/