PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_chat_rooms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`is_private` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_chat_rooms`("id", "name", "is_private", "created_at") SELECT "id", "name", "is_private", "created_at" FROM `chat_rooms`;--> statement-breakpoint
DROP TABLE `chat_rooms`;--> statement-breakpoint
ALTER TABLE `__new_chat_rooms` RENAME TO `chat_rooms`;--> statement-breakpoint
PRAGMA foreign_keys=ON;