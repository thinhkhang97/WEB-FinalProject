create table users(
ID int not null auto_increment,
username nvarchar(30) not null,
passwords nvarchar(1000) not null, 
email nvarchar(30),
primary key(ID)
);