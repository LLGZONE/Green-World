create table users (
    id serial primary key,
    name text,
    phone text,
    dorm text,
    college text,
    uid text not null unique,
    student_id text unique,
    session_key text
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
    type text not null,
    date date not null,
    user_id text not null,
    foods_code text not null,
    calory real,
    foreign key (user_id) references users(uid)
);

create table recycle (
    id serial primary key,
    user_id text not null,
    recycle_date date not null,
    recycle_time text not null,
    recycle_place text not null,
    foreign key (user_id) references users(uid)
);

create table recycle_items (
    id serial primary key,
    stdid text not null,
    paper int not null,
    bottle int not null,
    cloth int not null,
    date date
);

create table steps (
    id serial primary key,
    user_id text not null,
    date date not null,
    steps int not null,
    add_bonus real not null,
    reduce_carbon real,
    foreign key (user_id) references users(uid)
);