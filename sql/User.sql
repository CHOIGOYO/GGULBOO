drop table if exists User_Table;

create table User_Table (
   userId bigint not null auto_increment, -- pk
   userEmail varchar(255) not null, --이메일
   userName varchar(255) not null, --이름
   userPw varchar(255) nost null, -- 비밀번호
   userBirthDay
   primary key (UserId)
) ;