create table followers (
	follow_id serial primary key,
	follower int references accounts(user_id),
	following int references accounts(user_id)
);