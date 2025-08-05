create database if not exists ecommerse;
use ecommerse;


create table users (
   id int auto_increment primary key,
   name varchar(100) not null,
   email varchar(100) unique not null,
   password varchar(255) not null,
   role enum('user','admin') default 'user',
   created_at timestamp default current_timestamp
);

create table categories (
   id int auto_increment primary key,
   name varchar(100) not null
);

create table products (
    id int auto_increment primary key,
    name varchar(150) not null,
    description text,
    price decimal(10,2) not null,
    image varchar(255),
    category_id int,
    created_at timestamp default current_timestamp,
    foreign key (category_id) references categories(id) on delete set null

);

create table cart_items (
    id int auto_increment primary key,
    user_id int not null,
    product_id int not null,
    quantity int default 1,
    foreign key (user_id) references users(id) on delete cascade,
    foreign key (product_id) references products(id) on delete cascade
);

create table orders (
    id int auto_increment primary key,
    user_id int not null,
    total_price decimal(10,2) not null,
    status enum('pending','processing','shipped','delivered') default 'pending',
    created_at timestamp default current_timestamp,
    foreign key (user_id) references users(id) on delete cascade
);


create table order_items (

    id int auto_increment primary key,
    order_id int not null,
    foreign key (order_id) references orders(id) on delete cascade,
    product_id int not null,
    foreign key (product_id) references  products(id) on delete cascade,
    quantity int not null,
    price decimal(10,2) not null
    
);

