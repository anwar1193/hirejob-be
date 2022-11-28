create table users(
    id VARCHAR primary key, 
    fullname varchar not null,
    email varchar not null, 
    phone text,
    password varchar not null, 
    confirmpassword varchar not null,
    role VARCHAR not null,
    jobdesk varchar,
    domisili varchar,
    company varchar,
    position varchar,
    skill varchar,
    descript text,
    instagram varchar,
    github varchar,
    linkedin varchar,
    photo varchar
);

INSERT INTO users(id,email,password,fullname, username) VALUES (${id}, '${email}', '${password}', '${fullname}', '${username}')
insert into users(id,email,passwordUser,fullname,username,role) values ('1','hana@gmail.com', 'hana17', 'Farhana Achmad', 'hana', 'user');


create table portfolio(
    id varchar primary key,
    app_name varchar(50),
    link_repo varchar(255),
    app_type varchar(50),
    image varchar,
    user_id varchar,
    constraint fk_users
    foreign key (user_id)
    references users(id)
);

create table skills(
    id varchar primary key,
    skill_name varchar(50),
    user_id varchar,
    constraint fk_users
    foreign key (user_id)
    references users(id)
);

create table experience(
    id varchar primary key,
    position varchar(20),
    company_name varchar(50),
    work_time varchar(20),
    descript text,
    user_id varchar,
    constraint fk_users
    foreign key (user_id)
    references users(id)
);

constraint fk_users
foreign key (user_id)
references users(id)