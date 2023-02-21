Hibernate: 
    
    drop table if exists User_Table
Hibernate: 
    
    create table User_Table (
       userId bigint not null auto_increment,
        userBirthDay bigint not null,
        userBirthMonth bigint not null,
        userBirthYear bigint not null,
        userEmail varchar(255) not null,
        userName varchar(255) not null,
        userPw varchar(255) not null,
        primary key (userId)
    ) engine=InnoDB
Hibernate:

    alter table User_Table
       add constraint UK_fan7yjcenp3iumbfsiatuv0iy unique (userEmail)
