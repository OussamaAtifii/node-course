-- Creación de la db
CREATE DATABASE moviesdb;

-- Utilizar la db
USE moviesdb;

-- Crear tabla movies
CREATE TABLE movie (
	id BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
	title VARCHAR(255) NOT NULL,
	year INT NOT NULL,
	director varchar(255) not null,
	duration int not null,
	poster text,
	rate decimal(2,1) not null
);

create table genre (
	id int auto_increment primary key,
	name varchar(255) not null unique
);

create table movie_genre (
	movie_id binary(16) references movie(id),
	genre_id int references genre(id),
	primary key (movie_id, genre_id)
);

insert into genre (name) values
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi'),
('Romance');

insert into movie(id, title, year, director, poster, rate) values
(UUID_TO_BIN(UUID()), "Inception", 2010, "Christopher Nolan", 180, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8),
(UUID_TO_BIN(UUID()), "Pulp Fiction", 1994, "Quentin Tarantino", 140, "https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg", 7.0),
(UUID_TO_BIN(UUID()), "Forrest Gump", 1994, "Robert Zemeckis", 130, "https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg", 9.0);

insert into movie_genre(movie_id, genre_id) values
(
    (select id from movie where title ='Inception'), (select id from genre where name = 'Sci-Fi'),
    (select id from movie where title ='Inception'), (select id from genre where name = 'Action'),
    (select id from movie where title ='Pulp Fiction'), (select id from genre where name = 'Crime'),
    (select id from movie where title ='Pulp Fiction'), (select id from genre where name = 'Romance'),
    (select id from movie where title ='Forrest Gump'), (select id from genre where name = 'Drama'),
    (select id from movie where title ='Forrest Gump'), (select id from genre where name = 'Romance'),
);

select * from movies;
