USE [MuOnline]
GO

/****** Object:  Table [dbo].[_nyxSerialTracker]    Script Date: 23-Feb-20 20:39:59 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[_nyxSerialTracker]
(
  [account] [varchar](10) NOT NULL,
  [hex] [varchar](32) NOT NULL,
  [destination] [varchar](50) NOT NULL,
  [timestamp] [varchar](15) NULL,
  [ip] [varchar](40) NOT NULL
) ON [PRIMARY]
GO


