drop table if exists AccountBook_Table

    create table AccountBook_Table (
       id bigint not null auto_increment,
        date datetime(6) not null,
        expenditure bigint,
        expenditureReason varchar(255),
        income bigint,
        platform varchar(255),
        user_id bigint,
        primary key (id)

);
    alter table AccountBook_Table
       add constraint FKcibnp0r018y25tc6sv1a3a538
       foreign key (user_id)
       references User_Table (userId)