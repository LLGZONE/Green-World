create table users (
    id serial primary key,
    name text not null,
    qq text not null,
    phone text not null,
    dorm text not null,
    uid text not null unique
);

create table bonus (
    id serial primary key,
    points int not null default 0,
    user_id text not null,
    foreign key (user_id) references users(uid)
);

create table cloth (
    id serial primary key,
    type text not null,
    num int not null,
    add_bonus int not null,
    img_dir text not null,
    add_at timestamp default now(),
    user_id text not null,
    foreign key (user_id) references users(uid)
);

create table food (
    id serial primary key,
    type text not null,
    hun int not null default 0,
    su int not null default 0,
    img_dir text not null,
    add_at timestamp default now(),
    user_id text not null,
    foreign key (user_id) references users(uid)
);

create table bus (
    add_at timestamp default now(),
    user_id text not null,
    foreign key (user_id) references users(uid),
    img_dir text not null
);