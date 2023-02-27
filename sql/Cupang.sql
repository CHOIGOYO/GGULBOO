drop table if exists Cupang_table;

CREATE TABLE Cupang_table (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  email VARCHAR(255) NOT NULL,
  income INT(11) ,
  expenditure INT(11) ,
  expenditureReason VARCHAR(255)
);
select * from Cupang_table;