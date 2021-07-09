CREATE TABLE galeria_user(
	id varchar(255) primary key,
	name varchar(255) not null,
    nickname varchar(64) unique not null,
    password varchar(255) not null,
    email varchar(255) unique not null
);

CREATE TABLE galeria_tag(
	id varchar(255) primary key,
    name varchar(255) unique
);

CREATE TABLE galeria_collection(
	id varchar(255) primary key,
    name varchar(255) not null,
    author_id varchar(255) not null,
    FOREIGN KEY (author_id) REFERENCES galeria_user(id)
);

CREATE TABLE galeria_image(
	id varchar(255) primary key,
	subtitle varchar(255) not null,
    date datetime not null,
	file varchar(255) not null,
    author_id varchar(255) not null,
    FOREIGN KEY (author_id) REFERENCES galeria_user(id),
    collection_id varchar(255) not null,
    FOREIGN KEY (collection_id) REFERENCES galeria_collection(id)
);