use camera;
create table users(
ID int not null auto_increment,
hoten nvarchar(40) not null,
gioitinh nvarchar(3),
dthoai char(11) not null,
ngaysinh date,
diachi nvarchar(100) not null,
email nvarchar(30),
username nvarchar(30) not null,
passwords nvarchar(1000) not null,
role nvarchar(20),
primary key(ID)
);