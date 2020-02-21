USE [MuOnline]
GO

/****** Object:  Table [dbo].[_nyxConfig]    Script Date: 20-Feb-20 22:58:09 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[_nyxConfig]
(
  [id] [int] IDENTITY(1,1) NOT NULL,
  [name] [varchar](50) NULL,
  [value] [text] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

insert into _nyxConfig
values
  ('events', '[{"name": "Blood Castle", "hours": ["11:30", "15:30", "19:30", "00:30", "05:30", "10:30"]}]')
