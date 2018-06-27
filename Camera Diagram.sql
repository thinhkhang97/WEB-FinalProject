create database camera;
use camera;
create table category(
catID int not null auto_increment,
catCode nvarchar(50),
catName nvarchar(50),
catInfo nvarchar(50),
primary key(catID)
);
-- Code: Tên của file hình vd: Canon_77d
-- Name: Tên của máy ảnh; Canon 77D
-- Available: Còn hàng hay hết
-- Quatity: Số lượng
-- CatID: 1 là DSRL, 2 là Dulich, 3 Laylien, 4 Mirr
-- ManID: 1 Canon, 2 Sony, 3 Nikon, 4 Fujifilm
-- Speed: Tốc độ chụp (fps)
-- SizeScree: Kích thước màn hình (inch)
-- MadeIn: Sản xuất tại
-- Size: Kích thước máy ảnh
-- Sup: Các phụ kiện đi kèm
create table product(
proID int not null auto_increment,
proCode nvarchar(50),
proName nvarchar(50),
proPrice int,
proView int,
proAvailable bool,
proQuantity int,
proCatID int,
proManID int,
proSpeed float,
proSizeScreen float,
proMadeIn nvarchar(30),
proSize nvarchar(50),
proSup nvarchar(255),
proDate date,
primary key(proID)
);
create table manufacture(
manID int not null auto_increment,
manName nvarchar(50),
manCountry nvarchar(50),
manInfo text,
primary key(manID)
);

insert into category values (0,'DSLR','DSLR','Máy ảnh cơ kỹ thuật số');
insert into category values (0,'DuLich','Du lịch','Máy ảnh nhỏ gọn, dễ dàng mang theo khi đi du lịch');
insert into category values (0,'LayLien','Lấy liền','Máy ảnh có khả năng in hình chụp');
insert into category values (0,'Mirr','Mirrorless','Máy ảnh không gương lật');

insert into manufacture values(0,'Canon','Nhật Bản','Canon là một cái tên rất nổi tiếng về các sản phẩm hình ảnh và và quang học. Hãng có kinh doanh trên rất nhiều lĩnh vực, bao gồm máy ảnh, máy quay phim, máy photocopy, máy in và có cả thiết bị y tế. Trụ sở chính của tập đoàn này nằm ở thành phố Tokyo, Nhật. ');
insert into manufacture values(0,'Sony','Nhật Bản','Công ty công nghiệp Sony gọi tắt là Sony, là một tập đoàn đa quốc gia của Nhật Bản, với trụ sở chính nằm tại Minato, Tokyo, Nhật Bản, và là tập đoàn điện tử đứng thứ 5 thế giới ');
insert into manufacture values(0,'Nikon','Nhật Bản','Nikon thành lập vào năm 1917, là một công ty đa quốc gia của Nhật Bản, đồng thời là công ty con của tập đoàn Mitshubishi. Nikon từ lâu đã là cái tên nổi tiếng về sản xuất máy ảnh và thiết bị quang. Ngày nay, Nikon mạnh nhất trong việc sản xuất dòng máy ảnh kỹ thuật số.');
insert into manufacture values(0,'Fujifilm','Nhật Bản','Máy ảnh Fujifilm là một trong những dòng máy ảnh không chạy theo xu hướng công nghệ hiện nay, mang trong mình nét cổ điển riêng biệt. Luôn được các tín đồ nhíp ảnh đánh giá cao, Fujifilm vẫn phát triển ổn định trong những năm qua.');

-- Khang
insert into product values(0,'Canon_77d','Canon 77D',21290000,10,true,12,1,1,6,3,'Đài Loan','131 x 99.9 x 76,2 mm', 'Thân máy, Ống kính, Cáp, Pin, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-6-19');
insert into product values(0,'Canon_80d','Canon 80D',24590000,15,true,12,1,1,7,3,'Nhật Bản','139 x 105 x 79 mm','Thân máy, Ống kính, Cáp, Pin, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-4-18');
insert into product values(0,'Canon_eos_5ds','Canon EOS 5DS',21290000,17,true,12,1,1,7,3.2,'Nhật Bản','152 x 113 x 75 mm', 'Thân máy, Ống kính, Cáp, Pin, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-5-19');
insert into product values(0,'Canon_eos_6d_2','Canon EOS 6D',26890000,19,true,12,1,1,4.5,3.0,'Nhật Bản','144.5 x 110.5 x 71.2 mm', 'Thân máy, Ống kính, Cáp, Pin, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-5-21');
insert into product values(0,'Canon_eos_1500d','Canon EOS 1500d',13100000,6,true,12,1,1,3,3,'Nhật Bản', '152 x 113 x 75 mm', 'Thân máy, Ống kính, Cáp, Pin, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-6-12');
insert into product values(0,'Canon_eos_3000d','Canon EOS 3000d',9600000,24,true,12,1,1,3,3,'Nhật Bản', '152 x 113 x 75 mm', 'Thân máy, Ống kính, Cáp, Pin, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-6-14');
insert into product values(0,'Canon_eos_m100','Canon EOS M1000',8600000,35,true,12,1,1,4.5,3,'Nhật Bản', '150 x 111 x 76 mm', 'Thân máy, Ống kính, Cáp, Pin, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-5-19');
insert into product values(0,'Nikon_d610','Nikon D610',26400000,10,true,22,1,3,6,3.2,'Nhật Bản', '154 x 113 x 74 mm', 'Thân máy, Ống kính, Cáp, Pin, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-6-20');
insert into product values(0,'Nikon_d5300','Nikon D5300',11900000,10,true,11,1,3,5,3.2,'Nhật Bản', '154 x 113 x 74 mm', 'Thân máy, Ống kính, Cáp, Pin, Sạc, Sách hướng dẫn, Thẻ bảo hành,Kèm ống 18-55mm VR II','2018-6-29');
insert into product values(0,'Nikon_d5600','Nikon D5600',14190000,10,true,16,1,3,6,3.2,'Nhật Bản', '124 x 97 x 70 mm', 'Thân máy, Ống kính, Cáp, Pin, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-6-19');
insert into product values(0,'Nikon_d7200','Nikon D7200',24900000,10,true,14,1,3,7,3.2,'Nhật Bản', '126 x 99 x 75 mm', 'Thân máy, Ống kính, Cáp, Pin, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-6-19');

-- Linh
insert into product values(0,'Nikon_d7200','Nikon D7200',22000000,25,true,20,1,3,7,3.2,'Thái Lan','LCD 3.2”',' Hộp, ống kính Nikkor 18-140mm f/3.5-5.6G ED VR, nắp trước, pin EN-EL15, sạc MH-15A, cáp USB UC-E17, eyepiece, eyecup, sách hướng dẫn, phiếu bảo hành','2018-5-23');
insert into product values(0,'Nikon_d7500','Nikon D7500',27500000,26,true,12,1,3,8,3.2,'Thái Lan	',' 13,55 x 10,4 x 7,25 cm', ' Pin EN-EL15a, Sạc MH-25A, Cáp USB UC-E20, Dây đeo, Ống ngắm DK-5, nắp đậy ống kính, hướng dẫn sử dụng','2018-4-19');
insert into product values(0,'Sony_a7_markII','Sony Alpha A7 markII',22490000,16,true,18,1,2,8,3.0,'Malaysia','LCD 3.0 inch', ' Hộp, thân máy Sony, pin Sony NP-FW50, cáp USB, dây đeo máy, đĩa CD, sách hdsd, phiếu bảo hành.','2018-6-16');
insert into product values(0,'Sony_a7r','Sony Alpha A7RIII',72990000,12,true,2,1,2,10,3.0,'Malaysia','LCD 3.0 inch', ' Hộp, thân máy Sony Alpha A7R, pin Sony NP-FW50, cáp USB, dây đeo máy, đĩa CD, sách hdsd, phiếu bảo hành.','2018-6-28');
insert into product values(0,'Sony_alpha_6500','Sony Alpha A6500',27490000,48,true,32,1,2,11,3.0,'Malaysia','LCD 3.0 inch', ' Hộp, thân máy Sony Alpha A6500, pin Sony NP-FW50, cáp USB, dây đeo máy, đĩa CD, sách hdsd, phiếu bảo hành.','2018-6-20');
insert into product values(0,'Sony_cybershot_dsc_rx10','Sony Cyber-shot DSC-RX1RII',72990000,16,true,5,1,2,10,3.0,'Malaysia','LCD 3.0 inch', 'Hộp, Máy ảnh Sony Cyber-shot DSC-RX1RM2, Bộ pin sạc NP-BX1, Bộ chuyển đổi, Cáp Micro USB, Dây đeo vai, Nắp đậy ống kính, Nắp cổng, Hướng dẫn sử dụng, Vải lau Bộ sạc pin.','2018-6-19');
insert into product values(0,'Canon_ixus_185','Canon IXUS 185',2390000,54,true,12,1,2,0.8,2.7,'China','2.7  inch', ' Máy ảnh Canon Ixus 185, Pin, Sạc pin, Dây đeo, Cataloge, Phiếu bảo hành.','2018-6-23');
insert into product values(0,'canon_powershot_g5x','Canon PowerShot G5 X',4800000,42,true,12,2,1,1.8,2.6,'China',' 112 x 76 x 44 mm', ' Hộp, thân máy Canon PowerShot G5 X, pin Canon NB-13L, sạc Canon CB-2LH, dây đeo, sách hdsd, thẻ bảo hành.','2018-4-19');
insert into product values(0,'canon_powershot_g7x','Canon PowerShot G7X',5690000,58,true,18,2,1,2.8,3.0,'China',' 98.0 x 57.9 x 30.8 mm', ' Hộp, thân máy Canon PowerShot G7 X, pin Canon NB-13L, sạc Canon CB-2LH, dây đeo, sách hdsd, thẻ bảo hành.','2018-6-20');
insert into product values(0,'canon_powershot_sx430','Canon PowerShot SX430 HS',7500000,65,true,24,2,1,2.8,3.0,'China',' LCD 3.0 inch', ' Máy ảnh Canon PowerShot SX730 HS, Pin NB-13L, Sạc CB-2LH, phiếu bảo hành chính hãng.','2018-6-25');
-- Nguyen
insert into product values(0,'Sony_alpha_a6000','Sony alpha a6000',12990000,15,true,10,4,2,10,7.5,'Nhật Bản','120 x 69.9 x 45.1 mm', 'Ống kính, Bộ chuyển đổi pin, Sách hướng dẫn, Thẻ bảo hành','2018-2-19');
insert into product values(0,'Sony_alpha_a7markII','Sony alpha a7markII',37990000,24,true,100,4,2,24,3.5,'Nhật Bản','126.9 x 95.7 x 59.7 mm', 'Ống kính, Bộ chuyển đổi pin, Báng tay cầm nối dài, Sách hướng dẫn, Thẻ bảo hành','2018-6-10');
insert into product values(0,'Canon_eos_m5','Canon eos m5',21500000,50,true,100,4,1,7,3.8,'Nhật Bản','115.6 x 89.2 x 60.6 mm', 'Dán màn hình, Thẻ nhớ, Túi xách, Thú bông Pokemon, Thẻ bảo hành','2018-6-24');
insert into product values(0,'Canon_m6','Canon m6',24300000,50,true,80,4,1,7,3.2,'Nhật Bản','115 x 85.6 x 65.5 mm', 'Dán màn hình, Thẻ nhớ, Túi xách, Thú bông Pokemon, Thẻ bảo hành','2018-4-19');
insert into product values(0,'Canon_m10','Canon m10',8800000,40,true,20,4,1,5,4.5,'Nhật Bản','108 x 66.6 x 35 mm mm', 'Dán màn hình, Thẻ nhớ, Túi xách, Thú bông Pokemon, Thẻ bảo hành','2018-5-20');
insert into product values(0,'Fujifilm_x_a3','Fujifilm x a3',21290000,10,true,12,4,4,6,3,'Indonesia','131 x 99.9 x 76.2 mm', 'Cáp, Pin, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-4-20');
insert into product values(0,'Fujifilm_x_e3','Fujifilm x e3',21990000,100,true,22,4,4,8,3.5,'Indonesia','132 x 96.9 x 75.2 mm', 'Áo thun, Pin, Bút lau, Sách hướng dẫn, Thẻ bảo hành','2018-6-19');
insert into product values(0,'Fujifilm_x_h1','Fujifilm x h1',46990000,200,true,50,4,4,14,3.2,'Nhật Bản','128.6 x 95.9 x 72.5 mm', 'Bộ sạc, Thẻ nhớ, Dán màn hình, Sách hướng dẫn, Thẻ bảo hành','2018-3-20');
insert into product values(0,'Fujifilm_x_t2','Fujifilm x t2',37500000,60,true,31,4,4,8,3,'Nhật Bản','129 x 90 x 47 mm', 'Dán màn hình, Thẻ nhớ, Thẻ bảo hành','2018-5-21');
insert into product values(0,'Fujifilm_x_e2s','Fujifilm x e2s',15000000,55,true,66,4,4,5,3.8,'Nhật Bản','129 x 74.9 x 37.2 mm', 'Bộ sạc, Thẻ nhớ, Dán màn hình, Thẻ bảo hành','2018-4-19');
insert into product values(0,'Fujifilm_x_t20','Fujifilm x t20',21790000,86,true,75,4,4,6,3,'Nhật Bản','118.4 x 82.8 x 41.4 mm', 'Thân máy, Hộp, Pin, Dây đeo, Dây sạc, Sách hướng dẫn, Thẻ bảo hành','2018-6-19');
-- Hai
insert into product values(0,'Sony_dsc_h400','Sony DSC H400',4990000,5,true,20,2,2,0.8,3,'Trung Quốc' ,'129.6 x 95.0 x 122.3 mm', 'Thân máy, Pin Sạc, Cáp, Dây đeo, Nắp đậy ống kính, Hướng dẫn sử dụng','2018-6-20');
insert into product values(0,'Sony_dsc_h300','Sony DSC H300',3490000,10,true,10,2,2,0.8,3,'Trung Quốc','127.5 x 89.0 x 91.7mm', 'Thân máy, Pin AA (không sạc), Cáp, Dây đeo, Nắp đậy ống kính, Hướng dẫn sử dụng','2018-4-19');
insert into product values(0,'Sony_wx500','Sony WX500',6400000,5,true,15,2,2,null,3,'Trung Quốc','101,6 x 58,1 x 35,5 mm', 'Thân máy, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-6-21');
insert into product values(0,'Sony_hx90v','Sony HX90V',8500000,10,true,30,2,2,null,3,'Đài Loan','102,0 x 58,1 x 35,4 mm', 'Thân máy, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-6-20');
insert into product values(0,'Fujifilm_instax_square_sq10','Fujifilm Instax Square Sq10',5790000,5,true,10,3,4,null,3,'Nhật Bản','119 x 127 x 47 mm', 'Máy, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-4-19');
insert into product values(0,'Fujifilm_instax_mini90neo','Fujifilm Instax Mini90 Neo',4000000,4,true,6,3,4,null,3,'Trung Quốc','113 x 92 x 57 mm', 'Máy, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-6-12');
insert into product values(0,'Fujifilm_instax_mini70black','Fujifilm Instax Mini70 Black',2690000,7,true,18,3,4,0.5,3,'Trung Quốc','113.7 x 99.2 x 53.2 mm', 'Máy, Sạc, Sách hướng dẫn, Thẻ bảo hành','2018-6-12');
insert into product values(0,'Fujifilm_instax_25',' Fujifilm Instax 25 ',2600000,10,true,12,3,4,null,null,'Trung Quốc','112 x 121 x 50 mm', 'Máy, Sách hướng dẫn, Thẻ bảo hành, Dây đeo tay','2018-6-21');
insert into product values(0,'Fujifilm_instax_mini9','Fujifilm Instax Mini9',1650000,3,true,9,3,4,null,null,'Đài Loan','116 x 118.3 x 68.2 mm', 'Máy, Dây đeo tay, 2 pin CR2, Sách hướng dẫn, phiếu bảo hành','2018-6-23');

alter table product
add constraint FK_manufacture_product
foreign key(proManID) references manufacture(manID);
alter table product
add constraint FK_category_product
foreign key(proCatID) references category(catID);

