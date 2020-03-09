USE [MuOnline]
GO

/****** Object:  Table [dbo].[_nyxSerialTracker]    Script Date: 08-Mar-20 18:49:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[_nyxSerialTracker]
(
  [account] [varchar](10) NOT NULL,
  [hex] [varchar](32) NOT NULL,
  [destination] [varchar](50) NOT NULL,
  [timestamp] [bigint] NOT NULL,
  [ip] [varchar](40) NOT NULL
) ON [PRIMARY]
GO


