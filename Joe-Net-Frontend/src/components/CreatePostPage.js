import { useState } from 'react';

const CreatePostPage = (Props) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [error, setError] = useState(false);

	function createPost(e) {
		e.preventDefault();
		console.log(Props.user_id)
		fetch("http://localhost:5000/createPost", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"content-Type": "application/json",
				"credentials": "include"
			},
			body: JSON.stringify({title: title, content: content, user_id: Props.user_id})
		})
		.then(response => {
			if (response.status === 200) {
				Props.submitFunction();
			} else {
				console.log("there was an error")
				setError(true);
			}
		})
		.catch(err => {
			console.log(err);
		})
	}
	return (
		<div className="createPostPage">
			<h1 className="mainPageHeader">Create Post</h1>
			<form onSubmit={(e) => createPost(e)}>
				<input type="text" placeholder="title" className="postTitle" onChange={(e) => setTitle(e.target.value)}></input>
				<input type="text" placeholder="content" className="postContent"onChange={(e) => setContent(e.target.value)}></input>
				<input type='submit'></input>
			</form>
			{error ? <h3>error requesting data from server</h3>: null}
		</div>
	);
};
export default CreatePostPage;