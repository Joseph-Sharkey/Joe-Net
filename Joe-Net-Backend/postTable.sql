create table posts (
	post_id serial primary key,
	title varchar ( 255 ) not null,
	content varchar ( 2047 ) not null,
	ts timestamp default current_timestamp,
	author int references accounts(user_id)
);