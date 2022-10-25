import { useEffect } from "react";
import { useState } from "react";

const Post = (Props) => {
	const [author, setAuthor] = useState([]);
	const [isFollowing, setIsFollowing] = useState(false);
	const [likes, setLikes] = useState(0);
	useEffect(() => {
		console.log(Props)
		fetch(`http://localhost:5000/account?userid=${Props.author}`)
		.then(response => {
			if (response.status === 200) {
				return response.json()
			} else {
				//this should never happen
				console.log("error, no user found")
			};
		})
		.then(jsonData => {
			if (jsonData !== undefined) {
				setAuthor(jsonData);
			}
		})
		.catch(err => {
			console.log(err);
		})

		fetch(`http://localhost:5000/isFollowing?userid=${Props.user_id}&followid=${Props.author}`)
		.then(response => {
			if (response.status === 200) {
				setIsFollowing(true);
			} else {
				console.log("status was not 200")
				setIsFollowing(false);
			}
		});

		fetch(`http://localhost:5000/getLikes?post_id=${Props.anotherProp}`)
		.then(response => {
			if (response.status === 200) {
				return response.json()
			} else {
				console.log("could not retrieve likes");
			}
		})
		.then(data => {
			if (data !== undefined) {
				setLikes(data.likes);
			}
		})
		
	}, []) 

	function follow() {
		fetch("http://localhost:5000/follow", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"content-Type": "application/json",
				"credentials": "include"
			},
			body: JSON.stringify({user_id: Props.user_id, follow_id: Props.author})
		})
		.then(response => {
			if (response.status === 200) {
				setIsFollowing(true);
			} else {
				console.log("follow failed due to internal server error")
			}
		})
	}
	function unfollow() {
		fetch("http://localhost:5000/unfollow", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"content-Type": "application/json",
				"credentials": "include"
			},
			body: JSON.stringify({user_id: Props.user_id, follow_id: Props.author})
		})
		.then(response => {
			if (response.status === 200) {
				setIsFollowing(false);
			} else {
				console.log("unfollow failed due to internal server error");
				//change later to show user
			}
		})
	}

	function likePost() {
		fetch("http://localhost:5000/likePost", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"content-Type": "application/json",
				"credentials": "include"
			},
			body: JSON.stringify({post_id: Props.anotherProp})
		})
		.then(response => {
			if (response.status === 200) {
				setLikes(likes + 1)
				console.log(likes);
			} else {
				console.log("error while liking post");
			}
		})
	}
	function dislikePost() {
		fetch("http://localhost:5000/dislikePost", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"content-Type": "application/json",
				"credentials": "include"
			},
			body: JSON.stringify({post_id: Props.anotherProp})
		})
		.then(response => {
			if (response.status === 200) {
				setLikes(likes - 1);
			} else {
				console.log("error while disliking post");
			}
		})
		.catch(err => {
		})
	};

	return (
		<div className="post">
			<h2>{Props.title}</h2>
			<p>{Props.content}</p>
			<div>
				<h3>{author.username}</h3>
				{isFollowing ? <button onClick={unfollow}>Following</button> : <button onClick={follow}>Follow</button>}
				<button onClick={likePost}>Like post</button>
				<button onClick={dislikePost}>Dislike post</button>
				<p className='likes'>{likes}</p>
			</div>
		</div>
	)
}

export default Post;