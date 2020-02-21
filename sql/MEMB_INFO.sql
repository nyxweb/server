USE [MuOnline]
GO

-- ALTER TABLE [dbo].[MEMB_INFO] DROP COLUMN [memb__pwd];
-- ALTER TABLE [dbo].[MEMB_INFO] ADD [memb__pwd] VARCHAR(10);
ALTER TABLE [dbo].[MEMB_INFO] ADD [reg_ip] VARCHAR(30);
ALTER TABLE [dbo].[MEMB_INFO] ADD [admin_lvl] INT;
ALTER TABLE [dbo].[MEMB_INFO] ADD [jwt_token] VARCHAR(255);

GO
