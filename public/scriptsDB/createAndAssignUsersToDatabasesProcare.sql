CREATE DATABASE procare_db_dev;
CREATE DATABASE procare_db_test;
CREATE USER procare_dev IDENTIFIED BY 'procare_sw_2';
CREATE USER procare_test IDENTIFIED BY 'procare_sw_2';
GRANT ALL PRIVILEGES ON procare_db_dev.* TO 'procare_dev';
GRANT ALL PRIVILEGES ON procare_db_test.* TO 'procare_test';


