const express = require("express");
const app = express();
const pool = require("./postgresInit");
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

function parseTuple(t) {
    var items = t.replace(/^\(|\)$/g, "").split("),(");
    items.forEach(function(val, index, array) {
       array[index] = val.split(",").map(String);
    });
    return items;
};

//set cors headers

app.get("/", (req, res) => {
	console.log("getting at port 5000")
	res.send("hello world");
});

app.get("/login", (req, res) => {
	const email = req.query.email;
	const password = req.query.password;
	pool.query('select (user_id, password) from accounts where email=$1', [email])
	.then(response => {
		if (response.rows[0] === undefined) {
			res.status(401);
		} else {
			if (parseTuple(response.rows[0].row)[0][1] === password) {
				res.status(200).json(parseInt(parseTuple(response.rows[0].row)[0][0]));
			} else {
				res.status(403).json(null);
			}
		}
	})
	.catch(err => {
		console.log("login route error is " + err);
		res.status(500).json(null);
	});
});

app.post("/signup", (req, res) => {
	console.log(req.body);
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;

	console.log("email is " + email);
	pool.query("insert into accounts(username, email, password) values ($1, $2, $3) returning user_id", [username, email, password])
	.then(response => {
		res.status(200).json(response.rows[0].user_id); //responds with user_id. this technically violates ideal http but i think it's allowed lol 
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(null);
	})
});

app.get('/getPosts', (req, res) => {
	pool.query("select * from posts")
	.then(response => {
		if (response.rows[0] !== undefined) {
			res.status(200).json(response.rows);
		} else {
			res.status(204).json(null);
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(null);
	})
});

app.post("/createPost", (req, res) => {
	const title = req.body.title;
	const content = req.body.content;
	const user_id = req.body.user_id;
	pool.query("insert into posts (title, content, author) values ($1, $2, $3)", [title, content, user_id])
	.then(response => {
		res.status(200).json(null);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(null);
	});
});

app.get("/account", (req, res) => {
	const user_id = req.query.userid;
	pool.query("select * from accounts where user_id=$1", [user_id])
	.then(response => {
		if (response.rows[0] !== undefined) {
			res.status(200).json(response.rows[0]);
		} else {
			console.log("content")
			res.status(204).json(null);
		}
	})
	.catch(err => {
		console.log(err)
		res.status(500).json(null);
	});
});

app.get("/followerPosts", (req, res) => {
	const user_id = req.query.user_id;
	pool.query("select posts.* from posts inner join followers on followers.follower = $1 and followers.following = posts.author", [user_id])
	.then(response => {
		if (response.rows[0] !== undefined) {
			res.status(200).json(response.rows);
		} else {
			res.status(204).json(null)
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(null);
	});
});
app.post("/follow", (req, res) => {
	const user_id = req.body.user_id;
	const follow_id = req.body.follow_id;
	pool.query("insert into followers (follower, following) values ($1, $2)", [user_id, follow_id])
	.then(response => {
		res.status(200).json(null);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(null);
	})
})

app.post("/unfollow", (req, res) => {
	const user_id = req.body.user_id;
	const follow_id = req.body.follow_id;
	pool.query("delete from followers where follower = $1 and following = $2", [user_id, follow_id])
	.then(response => {
		res.status(200).json(null);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(null);
	})
})

app.get("/isFollowing", (req, res) => {
	const user_id = req.query.userid;
	const follow_id = req.query.followid
	pool.query("select * from followers where followers.follower=$1 and followers.following=$2", [user_id, follow_id])
	.then(response => {
		if (response.rows[0] !== undefined) {
			res.status(200).json(null)
		} else {
			res.status(403).json(null)
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(null);
	})
})


app.post("/likePost", (req, res) => {
	const postId = req.body.post_id;
	pool.query("update posts set likes = likes + 1 where post_id = $1", [postId])
	.then(response => {
		res.status(200).json(null);
	})
	.catch(err => {
		res.status(500).json(null)
	})
})

app.post("/dislikePost", (req, res) => {
	const postId = req.body.post_id;
	pool.query("update posts set likes = likes - 1 where post_id = $1", [postId])
	.then(response => {
		res.status(200).json(null);
	})
	.catch(err => {
		res.status(500).json(null)
	})
})

app.get("/getLikes", (req, res) => {
	const postId = req.query.post_id;
	pool.query("select likes from posts where post_id = $1", [postId])
	.then(response => {
		if (response.rows[0] !== undefined) {
			console.log(response.rows[0]);
			res.status(200).json(response.rows[0])
		} else {
			res.status(403).json(null);
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json(null);
	});
});

app.listen(5000, () => {
	console.log("listening on port 5000");
});


//figure out whether sending null in json works
//figure out whether testing for response.rows[0] === undefined works