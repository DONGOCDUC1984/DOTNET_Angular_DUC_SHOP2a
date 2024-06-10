Insert into "Districts" ("Id", "Name", "ProvinceCityId")
VALUES 
 (1,'Ba Dinh' , 1 ),
 ( 2,'Cau Giay' , 1 ),
 ( 3, 'Hoan Kiem' , 1 ),
 ( 4,'Go Vap' , 2 ),
 ( 5,'Phu Nhuan' , 2 ),
 ( 6, 'Tan Binh' , 2 ),
 ( 7, 'Do Son' , 3 ),
 ( 8, 'Hong Bang' , 3 ),
 ( 9, 'Le Chan' , 3 ),
 ( 10, 'Ngo Quyen' , 3 );

Insert into "Products" ("Id", "Name","Description","Price","CategoryId",
"DistrictId","ImageUrl" )
VALUES 
(1, 'Apple 1', 'Sweet.Made in Germany', 3, 1, 1, 'Resources\\Images\\Apple1.jpg'),
(2, 'Apple 2', 'Good.Made in Sweden', 8, 1, 2, 'Resources\\Images\\Apple2.jpg'),
(3, 'Apricot', 'Sweet.Made in Vietnam', 6, 1, 3, 'Resources\\Images\\Apricot.jpg'),
(4, 'Banana', 'Sweet.Made in Vietnam', 2, 1, 4, 'Resources\\Images\\Banana.jpg'),
(5, 'Bell Pepper', 'Made in Vietnam', 5, 1, 5, 'Resources\\Images\\Bell Pepper.jpg'),
(6, 'Bread 1', 'Sweet.Made in Germany', 4, 2, 6, 'Resources\\Images\\Bread1.jpg'),
(7, 'Broccoli', 'Made in Vietnam', 6, 1, 7, 'Resources\\Images\\Broccoli.jpg'),
(8, 'Cabbage', 'High quality, made in Germany', 9, 1,  8, 'Resources\\Images\\Cabbage.jpg'),
(9, 'Carrot', 'Delicious, made in Britain', 2, 1,  9, 'Resources\\Images\\Carrot.jpg'),
(10, 'Cauliflower', 'High quality, made in Denmark', 11, 1, 10, 'Resources\\Images\\Cauliflower.jpg'),
(11, 'Cherry', 'High quality.Made in Denmark', 12, 1,  1, 'Resources\\Images\\Cherry.jpg'),
(12, 'Cow Milk', 'With sugar.Made in Germany', 8, 3,  2, 'Resources\\Images\\Cow Milk.jpg'),
(13, 'Croissant', 'Made in Finland', 3, 2,  3, 'Resources\\Images\\Croissant.jpg'),
(14, 'Cucumber 1', 'Made in Germany', 2, 1,  4, 'Resources\\Images\\Cucumber1.jpg'),
(15, 'Cucumber 2', 'Made in Laos', 4, 1, 5, 'Resources\\Images\\Cucumber2.jpg'),
(16, 'French loaf', 'Made in Vietnam', 5, 2, 6, 'Resources\\Images\\French loaf.jpg'),
(17, 'Ginger', 'Made in Poland', 1, 1, 7, 'Resources\\Images\\Ginger.jpg'),
(18, 'Grapefruit', 'High quality, made in Sweden', 4, 1, 8, 'Resources\\Images\\Grapefruit.jpg'),
(19, 'Grapes 1', 'Good.Made in Finland', 3, 1, 9, 'Resources\\Images\\Grapes1.jpg'),
(20, 'Grapes 2', 'Good.Made in Norway', 7, 1, 10, 'Resources\\Images\\Grapes2.jpg'),
(21, 'Soy Milk', 'Good.Made in Poland', 5, 3, 1, 'Resources\\Images\\Soy Milk.jpg'),
(22, 'Tommaso', 'Good.Made in Norway', 2, 2, 2, 'Resources\\Images\\Tommaso.jpg');  

