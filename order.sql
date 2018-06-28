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
  PRIMARY KEY (OrderID)
);