create table users (
    id serial primary key,
    name text,
    qq text,
    phone text,
    dorm text,
    uid text not null unique,
    gender int
);

create table bonus (
    id serial primary key,
    points real not null default 0,
    user_id text not null unique,
    foreign key (user_id) references users(uid)
);

create table cloth (
    id serial primary key,
    type text not null,
    num int not null,
    add_bonus real,
    img_dir text not null,
    add_at timestamp default now(),
    user_id text not null,
    foreign key (user_id) references users(uid)
);

create table food (
    id serial primary key,
    hun int not null default 0,
    su int not null default 0,
    img_dir text not null,
    add_at timestamp default now(),
    user_id text not null,
    add_bonus real,
    foreign key (user_id) references users(uid)
);

create table bus (
    id serial primary key,
    add_at timestamp default now(),
    user_id text not null,
    img_dir text not null,
    add_bonus real,
    foreign key (user_id) references users(uid)
);

create table recycle (
    id serial primary key,
    user_id text not null unique,
    recycle_date date not null,
    recycle_time text not null,
    recycle_place text not null,
    reduce_bonus real,
    foreign key (user_id) references users(uid)
);

create table steps (
    id serial primary key,
    user_id text not null,
    step_date date not null default now() unique,
    steps int not null,
    add_bonus real not null,
    reduce_carbon real,
    foreign key (user_id) references users(uid)
);