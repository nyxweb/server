USE [MuOnline]
GO

/****** Object:  Table [dbo].[_nyxNews]    Script Date: 22-Mar-20 14:05:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[_nyxNews]
(
  [id] [int] IDENTITY(1,1) NOT NULL,
  [account] [varchar](10) NOT NULL,
  [author] [varchar](20) NOT NULL,
  [title] [nvarchar](50) NOT NULL,
  [content] [nvarchar](max) NOT NULL,
  [timestamp] [bigint] NOT NULL,
  [ip] [varchar](50) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


