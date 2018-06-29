use camera;
/*DROP TABLE IF EXISTS orderdetails;*/
CREATE TABLE orderdetails (
  ID int unsigned NOT NULL AUTO_INCREMENT,
  OrderID int NOT NULL,
  ProID int NOT NULL,
  Quantity int NOT NULL,
  Price  int NOT NULL,
  Amount bigint(20) NOT NULL,
  PRIMARY KEY (ID)
);
/*DROP TABLE IF EXISTS orders;*/
CREATE TABLE orders (
  OrderID int unsigned NOT NULL AUTO_INCREMENT,
  OrderDate datetime NOT NULL,
  UserID int NOT NULL,
  Ship int NOT NULL,
  Total bigint(20) NOT NULL,
  Status nvarchar(20) NOT NULL,
  PRIMARY KEY (OrderID)
);

insert into orders (OrderDate,UserID,Ship,Total,Status) values ('2018-6-8',123,1,123400000,'Chưa giao');
insert into orders (OrderDate,UserID,Ship,Total,Status) values ('2018-6-18',3,1,201350000,'Chưa giao');
insert into orders (OrderDate,UserID,Ship,Total,Status) values ('2018-6-28',1,1,4520000,'Chưa giao');
insert into orders (OrderDate,UserID,Ship,Total,Status) values ('2018-6-8',11,1,20111000,'Chưa giao');
insert into orders (OrderDate,UserID,Ship,Total,Status) values ('2018-6-8',13,1,123000100,'Chưa giao');
insert into orders (OrderDate,UserID,Ship,Total,Status) values ('2018-6-8',23,1,1230000,'Chưa giao');