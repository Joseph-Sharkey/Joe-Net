import { useEffect } from 'react';
import { useState } from 'react';
import Post from './Post';

const HomePage = (Props) => {
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(false);
	useEffect(() => {
		fetch('http://localhost:5000/getPosts')
		.then(response => {
			if (response.status === 200 ) {
				return response.json()	
			} 
			else if (response.status === 204) {
				console.log("no posts found")
			}
			else {
				console.log("error while requesting homepage data")
				setError(true)	
			}
		})
		.then(jsonResponse => {
			setPosts(jsonResponse)
		})
		.catch(err => {
			console.log(err);
		})
	}, []);

	return (
		<div className="homepage">
			<h1 className="mainPageHeader postHeader">Posts</h1>
			<div className="postsDiv">
			{posts.map(post => {
				return (
					<Post title={post.title} content={post.content} ts={post.ts} author={post.author} key={5} user_id={Props.user_id} anotherProp={post.post_id}/> 
				)
			})}
			</div>
			{error ? <h3>error while requesting data from server</h3> : null}
		</div>
	);
};

export default HomePage;