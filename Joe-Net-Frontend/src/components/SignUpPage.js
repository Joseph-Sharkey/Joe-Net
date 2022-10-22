import { useState } from 'react'
const SignUpPage = () => {
	const [email, setEmail] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	function submit(e) {
		e.preventDefault();
	}

	return (
		<div className="signUpPageDiv">
			<h1>Sign Up</h1>
			<form onSubmit={(e) => submit(e)}>
				<input type='text' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)}/>
				<input type='text' placeholder='Username' onChange={(e) => setUserName(e.target.value)}/>
				<input type='password' onChange={(e) => setPassword(e.target.value)}/>
				<input type="submit"></input>
			</form>
		</div>
	);
};

export default SignUpPage;