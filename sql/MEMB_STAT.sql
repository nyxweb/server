USE [MuOnline]
GO

UPDATE [dbo].[MEMB_STAT]
   SET [memb___id] = <memb___id, varchar(10),>
      ,[ConnectStat] = <ConnectStat, tinyint,>
      ,[ServerName] = <ServerName, varchar(10),>
      ,[IP] = <IP, varchar(15),>
      ,[ConnectTM] = <ConnectTM, smalldatetime,>
      ,[DisConnectTM] = <DisConnectTM, smalldatetime,>
      ,[TotalTime] = <TotalTime, int,>
 WHERE <Search Conditions,,>
GO


