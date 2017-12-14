create table user (
    id serial primary key,
    name text not null,
    qq text not null,
    phone text not null,
    dorm text not null,
    uid text not null
);

create table bonus (
    id serial primary key,
    points int not null default 0,
    foreign key (user_id) references user(id)
);

create table cloth (
    id serial primary key,
    type text not null,
    num int not null,
    add_bonus int not null,
    img_dir text not null,
    add_at timestamp default now(),
    foreign key (user_id) references user(id)
);

create table food (
    id serial primary key,
    type text not null,
    hun int not null default 0,
    su int not null default 0,
    img_dir text not null,
    add_at timestamp default now(),
    foreign key (user_id) references user(id)
);

create table bus (
    add_at timestamp default now(),
    foreign key (user_id) references user(id),
    img_dir text not null
);