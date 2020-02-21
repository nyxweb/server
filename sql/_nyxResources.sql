USE [MuOnline]
GO

/****** Object:  Table [dbo].[_nyxResources]    Script Date: 20-Feb-20 22:58:32 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[_nyxResources]
(
  [account] [varchar](10) NOT NULL,
  [storage] [varchar](7680) NULL,
  [zen] [int] NULL,
  [credits] [int] NULL,
  [chaos] [int] NULL,
  [bless] [int] NULL,
  [soul] [int] NULL,
  [life] [int] NULL,
  [creation] [int] NULL,
  [stone] [int] NULL,
  [rena] [int] NULL,
  [guardian] [int] NULL,
  [satan] [int] NULL,
  [angel] [int] NULL,
  [unilia] [int] NULL,
  [dino] [int] NULL,
  [bok1] [int] NULL,
  [bok2] [int] NULL,
  [bok3] [int] NULL,
  [bok4] [int] NULL,
  [bok5] [int] NULL,
  [boh] [int] NULL,
  [bol] [int] NULL,
  [heart] [int] NULL,
  CONSTRAINT [PK__nyxResources] PRIMARY KEY CLUSTERED 
(
	[account] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF__nyxResources_zen]  DEFAULT ((0)) FOR [zen]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF__nyxResources_credits]  DEFAULT ((0)) FOR [credits]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF__nyxResources_chaos]  DEFAULT ((0)) FOR [chaos]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1]  DEFAULT ((0)) FOR [bless]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_1]  DEFAULT ((0)) FOR [soul]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_2]  DEFAULT ((0)) FOR [life]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_3]  DEFAULT ((0)) FOR [creation]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_4]  DEFAULT ((0)) FOR [stone]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_5]  DEFAULT ((0)) FOR [rena]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_6]  DEFAULT ((0)) FOR [guardian]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF__nyxResources_satan]  DEFAULT ((0)) FOR [satan]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_7]  DEFAULT ((0)) FOR [angel]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_8]  DEFAULT ((0)) FOR [unilia]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF__nyxResources_dino]  DEFAULT ((0)) FOR [dino]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_9]  DEFAULT ((0)) FOR [bok1]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_10]  DEFAULT ((0)) FOR [bok2]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_11]  DEFAULT ((0)) FOR [bok3]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_12]  DEFAULT ((0)) FOR [bok4]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_13]  DEFAULT ((0)) FOR [bok5]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_14]  DEFAULT ((0)) FOR [boh]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_15]  DEFAULT ((0)) FOR [bol]
GO

ALTER TABLE [dbo].[_nyxResources] ADD  CONSTRAINT [DF_Table_1_chaos1_16]  DEFAULT ((0)) FOR [heart]
GO
