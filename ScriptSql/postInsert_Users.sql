-- Active: 1647262663293@@127.0.0.1@3306@tf_webapps_23_spa


USE tf_webapps_23_spa;
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE `tf_webapps_23_spa`.`users`;
TRUNCATE `tf_webapps_23_spa`.`user_donation`;

SET FOREIGN_KEY_CHECKS = 1;

insert into users (id, login, mdp, active)
VALUES
(1, "Sébastien", "Test12341", true ),
(2, "Aymeric", "Test12342", true ),
(3, "Amandine", "Test12343", false ),
(4, "Rémy", "Test12344", false ),
(5, "Ferdinando", "Test12345", true ),
(6, "Nicolas", "Test12346", true ),
(7, "Meroine", "Test12347", true);


insert into user_donation (id, `type`, qty_in_kg, expiration_date, `userId`)
VALUES
(1, "Croquettes pour chien", 25, "10/09/2023 09:28:37", 1),
(2, "Croquettes pour chien", 25, "10/09/2023 09:28:37", 4),
(3, "Croquettes pour chat", 25, "10/09/2023 09:28:37", 4),
(4, "Croquettes pour chat", 25, "10/11/2023 09:28:37", 1),
(5, "Croquettes pour chat", 25, "10/12/2023 09:28:37", 3),
(6, "Nourriture pour Bubule", 25, "10/04/2023 09:28:37", 3);


