import { useState } from 'react';
import SignUpPage from './SignUpPage';

const LoginPage = () => {
	const [displaySignUpPage, setDisplaySignUpPage] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function submit(e) {
		e.preventDefault();
		//send data to rest api on backend, then receive response and redirect user
	}

	if (!displaySignUpPage) {
		return (
			<div className='loginPage'>
				<h1>Log in</h1>
				<form onSubmit={(e) => submit(e)}>
					<input type='text' placeholder='email address' onChange={(e) => setEmail(e.target.value)}></input>
					<input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
					<input type="submit"></input>
				</form>
				<button className='signUpButton' onClick={() => setDisplaySignUpPage(true)}>Create New Account</button>
			</div>
		);
	} else {
		return (
			<SignUpPage />
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