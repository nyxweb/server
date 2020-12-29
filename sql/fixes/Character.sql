USE [MuOnline]
GO

ALTER TABLE [dbo].[Character]
    ADD [BanChatTime] INT DEFAULT NULL
    GO

ALTER TABLE [dbo].[Character]
    ADD [BanCharTime] INT DEFAULT NULL
    GO

ALTER TABLE [dbo].[Character]
    ADD [BanPostTime] INT DEFAULT NULL
    GO

ALTER TABLE [dbo].[Character]
    ADD [SkyEventWins] INT DEFAULT 0
    GO

ALTER TABLE [dbo].[Character]
    ADD [TotalTime] INT DEFAULT 0
    GO

ALTER TABLE [dbo].[Character]
    ADD [VipExpirationTime] INT DEFAULT 0
    GO

ALTER TABLE [dbo].[Character]
    ADD [GrandResets] INT DEFAULT 0
    GO

ALTER TABLE [dbo].[Character]
    ADD [BanPost] INT DEFAULT 0
    GO

ALTER TABLE [dbo].[Character]
    ADD [IsMarried] INT DEFAULT 0
    GO

ALTER TABLE [dbo].[Character]
    ADD [MarryName] VARCHAR(50) DEFAULT NULL
    GO

ALTER TABLE [dbo].[Character]
    ADD [QuestNumber] INT DEFAULT 0
    GO

ALTER TABLE [dbo].[Character]
    ADD [QuestMonsters] INT DEFAULT 0
    GO

ALTER TABLE [dbo].[Character]
    ADD [QuestInCurse] INT DEFAULT 0
    GO

ALTER TABLE [dbo].[Character]
    ADD [QuestInProgress] INT DEFAULT 0
    GO

ALTER TABLE [dbo].[Character]
    ADD [IsVip] INT
    GO
