USE [MuOnline]
GO

/****** Object:  Table [dbo].[_nyxAccountLogs]    Script Date: 08-Mar-20 18:48:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[_nyxAccountLogs]
(
  [account] [varchar](10) NOT NULL,
  [module] [varchar](20) NULL,
  [timestamp] [bigint] NOT NULL,
  [message] [varchar](5000) NOT NULL,
  [hidden] [varchar](5000) NULL,
  [ip] [varchar](40) NOT NULL
) ON [PRIMARY]
GO


