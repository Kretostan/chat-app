ALTER TABLE `sessions` ADD `sessionUuid` text;--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_sessionUuid_unique` ON `sessions` (`sessionUuid`);