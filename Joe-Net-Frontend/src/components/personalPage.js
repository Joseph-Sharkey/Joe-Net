import { useState } from "react";
import { useEffect } from "react";
import Post from "./Post";

const PersonalPage = (Props) => {
	const [error, setError] = useState(false)
	const [posts, setPosts] = useState([])
	useEffect(() => {
		const user_id = Props.user_id
		fetch(`http://localhost:5000/followerPosts?user_id=${user_id}`)
		.then(response => {
			if (response.status === 200) {
				return(response.json())
			} else if (response.status === 204) {
				console.log("no data from the server");
			} else if (response.status === 500) {
				setError(true);
			}
		})
		.then(jsonData => {
			setPosts(jsonData);	
		})
		.catch(err => {
			console.log(err);
			setError(true);
		})
	}, []) 

	return (
		<div className="personalPageDiv">
			<h1>Posts from people you are following</h1>
			<div className="personalPostsDiv" />
			{posts.map(post => {
				return (
					<Post title={post.title} content={post.content} ts={"timestamp"} author={post.author} key={post.post_id} user_id={Props.user_id} anotherProp={post.post_id}/>
				)
			})}
			<button className="homepageReturnButton"onClick={Props.changePageFunction}>Return home</button>
			{error ? <h3>error requesting data from the server</h3> : null}
		</div>
	);
};

export default PersonalPage;


