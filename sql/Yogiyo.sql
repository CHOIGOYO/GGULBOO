drop table if exists Yogiyo_table;

CREATE TABLE Yogiyo_table (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  email VARCHAR(255) NOT NULL,
  income INT(11) ,
  expenditure INT(11) ,
  expenditureReason VARCHAR(255)
);
select * from Yogiyo_table;