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
			<h2 className="postComponentTitle">{Props.title}</h2>
			<p className="postComponentContent">{Props.content}</p>
			<div>
				<h3 className="postAuthor">{author.username}</h3>
				<div className="buttonsDiv">
					<p className='likes'>{likes}</p>
					<button className="opinionButton likeButton" onClick={likePost}>Like</button>
					<button className="opinionButton dislikeButton" onClick={dislikePost}>Dislike</button>
					{isFollowing ? <button className="postButton unfollowButton" onClick={unfollow}>Following</button> : <button className="postButton followButton" onClick={follow}>Follow</button>}
				</div>
			</div>
		</div>
	)
}

export default Post;