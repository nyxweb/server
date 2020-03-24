USE [MuOnline]
GO

ALTER TABLE [dbo].[Character]
ADD
  [HOFWins] INT DEFAULT(0) NOT NULL;

ALTER TABLE [dbo].[Character]
ADD
  [mainCharacter] INT DEFAULT(0) NOT NULL;

GO