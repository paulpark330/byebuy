insert into "users" ("userId", "nickname", "hashedPassword")
values ('000', 'admin', 'admin');


insert into "posts" ("userId", "title", "category", "price", "description", "location")
values ('000', 'Sample', 'test category', '100', 'this is a test', 'Irvine');

insert into "pictures" ("postId", "url")
values ('1', NULL)
