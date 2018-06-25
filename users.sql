use camera;
create table users(
ID int not null auto_increment,
hoten nvarchar(40) not null,
dthoai char(11) not null,
diachi nvarchar(100) not null,
email nvarchar(30),
username nvarchar(30) not null,
passwords nvarchar(1000) not null, 
primary key(ID)
);