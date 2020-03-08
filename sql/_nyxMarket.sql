USE [MuOnline]
GO

/****** Object:  Table [dbo].[_nyxMarket]    Script Date: 23-Feb-20 20:21:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[_nyxMarket]
(
  [account] [varchar](10) NOT NULL,
  [hex] [varchar](32) NOT NULL,
  [price] [nvarchar](500) NULL,
  [name] [varchar](15) NOT NULL,
  [id] [int] NOT NULL,
  [group] [int] NOT NULL,
  [level] [int] NOT NULL,
  [exo1] [int] NOT NULL,
  [exo2] [int] NOT NULL,
  [exo3] [int] NOT NULL,
  [exo4] [int] NOT NULL,
  [exo5] [int] NOT NULL,
  [exo6] [int] NOT NULL,
  [options] [int] NOT NULL,
  [ancient] [int] NOT NULL,
  [timestamp] [varchar](15) NOT NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[_nyxMarket] ADD  CONSTRAINT [DF__nyxMarket_level]  DEFAULT ((0)) FOR [level]
GO

ALTER TABLE [dbo].[_nyxMarket] ADD  CONSTRAINT [DF__nyxMarket_exo1]  DEFAULT ((0)) FOR [exo1]
GO

ALTER TABLE [dbo].[_nyxMarket] ADD  CONSTRAINT [DF__nyxMarket_exo2]  DEFAULT ((0)) FOR [exo2]
GO

ALTER TABLE [dbo].[_nyxMarket] ADD  CONSTRAINT [DF__nyxMarket_exo3]  DEFAULT ((0)) FOR [exo3]
GO

ALTER TABLE [dbo].[_nyxMarket] ADD  CONSTRAINT [DF__nyxMarket_exo4]  DEFAULT ((0)) FOR [exo4]
GO

ALTER TABLE [dbo].[_nyxMarket] ADD  CONSTRAINT [DF__nyxMarket_exo5]  DEFAULT ((0)) FOR [exo5]
GO

ALTER TABLE [dbo].[_nyxMarket] ADD  CONSTRAINT [DF__nyxMarket_exo6]  DEFAULT ((0)) FOR [exo6]
GO

ALTER TABLE [dbo].[_nyxMarket] ADD  CONSTRAINT [DF__nyxMarket_options]  DEFAULT ((0)) FOR [options]
GO

ALTER TABLE [dbo].[_nyxMarket] ADD  CONSTRAINT [DF__nyxMarket_ancient]  DEFAULT ((0)) FOR [ancient]
GO
