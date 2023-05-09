-- Active: 1647262663293@@127.0.0.1@3306@tf_webapps_23_spa


USE tf_webapps_23_spa;
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE `tf_webapps_23_spa`.`users`;

SET FOREIGN_KEY_CHECKS = 1;

insert into users (id, login, mdp, active)
VALUES
(1, "Sébastien", "Test12341", true ),
(2, "Aymeric", "Test12342", true ),
(3, "Amandine", "Test12343", true ),
(4, "Rémy", "Test12344", true ),
(5, "Ferdinando", "Test12345", true ),
(6, "Nicolas", "Test12346", true ),
(7, "Meroine", "Test12347", true);


