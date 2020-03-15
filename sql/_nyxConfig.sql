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
  (name, value)
values
  ('events', '[{"name": "Blood Castle", "hours": ["11:30", "15:30", "19:30", "00:30", "05:30", "10:30"]},{"name": "Devil Square", "hours": ["01:00", "05:00", "09:00", "12:00", "18:00", "22:00"]},{"name": "Sky Event", "hours": ["19:00"]},{"name": "Dragon Invasion", "hours": ["00:30", "02:30", "04:30", "06:30", "08:30", "10:30", "12:30", "14:30", "16:30", "18:30", "20:30", "22:30"]}]')

insert into _nyxConfig
  (name, value)
values
  ('online_time', '10')

insert into _nyxConfig
  (name, value)
values
  ('reset', '{"max_reset":30,"reset_level":400,"reset_zen":20000000,"reset_zen_formula":true,"reset_stats":true,"bonus_stats":[500,450,430,550,550]}')

insert into _nyxConfig
  (name, value)
values
  ('vip', '50')

insert into _nyxConfig
  (name, value)
VALUES
  ('resources', '["chaos","bless","soul","life","creation","rena","stone","bok1","bok2","bok3","bok4","bok5","boh","bol"]')

insert into _nyxConfig
  (name, value)
VALUES
  ('stats', '32767')

GO