-- todo_tasks.users definition

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `hash_password` text,
  `salt_key` text,
  `name` varchar(25) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  UNIQUE KEY `user_id_key` (`user_id`),
  UNIQUE KEY `users_email_key` (`email`),
  KEY `users_email_IDX` (`email`,`user_id`) USING BTREE,
  KEY `users_user_id_IDX` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- todo_tasks.tasks definition

CREATE TABLE `tasks` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(500) DEFAULT NULL,
  `subtitle` varchar(100) DEFAULT NULL,
  `image` longblob,
  `created_by` varchar(50) DEFAULT NULL,
  `created_on` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL,
  `updated_on` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `tasks_id_key` (`task_id`),
  KEY `FK_tasks_created_by` (`created_by`),
  CONSTRAINT `FK_tasks_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;