USE [MuOnline]
GO

-- ALTER TABLE [dbo].[Character] DROP COLUMN [HOFWins];
ALTER TABLE [dbo].[Character] ADD [HOFWins] INT DEFAULT(0) NOT NULL;

GO