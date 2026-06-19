ALTER TABLE `sessions` RENAME COLUMN "sessionUuid" TO "session_uuid";--> statement-breakpoint
DROP INDEX `sessions_sessionUuid_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `uq_user_session_uuid` ON `sessions` (`user_id`,`session_uuid`);