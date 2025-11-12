create table courses
(
    id          bigint auto_increment
        primary key,
    course_code varchar(20)  not null,
    course_name varchar(255) not null,
    units       int          not null,
    constraint course_code
        unique (course_code)
);

create table roles
(
    id   bigint auto_increment
        primary key,
    name varchar(50) not null,
    constraint name
        unique (name)
);

create table users
(
    id         binary(16) default (uuid_to_bin(uuid())) not null
        primary key,
    email      varchar(150)                             not null,
    password   varchar(255)                             not null,
    created_at datetime   default (curdate())           not null,
    constraint email
        unique (email)
);

create table students
(
    id         bigint auto_increment
        primary key,
    user_id    binary(16)   not null,
    first_name varchar(100) not null,
    last_name  varchar(100) not null,
    year_level int          not null,
    constraint students_ibfk_1
        foreign key (user_id) references users (id)
            on delete cascade
);

create table enrollments
(
    id         bigint auto_increment
        primary key,
    student_id bigint not null,
    course_id  bigint not null,
    constraint student_id
        unique (student_id, course_id),
    constraint enrollments_ibfk_1
        foreign key (student_id) references students (id)
            on delete cascade,
    constraint enrollments_ibfk_2
        foreign key (course_id) references courses (id)
            on delete cascade
);

create index course_id
    on enrollments (course_id);

create index user_id
    on students (user_id);

create table user_roles
(
    user_id binary(16) not null,
    role_id bigint     not null,
    primary key (user_id, role_id),
    constraint user_roles_ibfk_1
        foreign key (user_id) references users (id)
            on delete cascade,
    constraint user_roles_ibfk_2
        foreign key (role_id) references roles (id)
            on delete cascade
);

create index role_id
    on user_roles (role_id);

