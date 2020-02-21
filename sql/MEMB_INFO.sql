USE [MuOnline]
GO

UPDATE [dbo].[MEMB_INFO]
   SET [memb___id] = <memb___id, varchar(10),>
      ,[memb__pwd] = <memb__pwd, varchar(50),>
      ,[memb_name] = <memb_name, varchar(50),>
      ,[sno__numb] = <sno__numb, varchar(50),>
      ,[post_code] = <post_code, nvarchar(6),>
      ,[addr_info] = <addr_info, nvarchar(50),>
      ,[addr_deta] = <addr_deta, nvarchar(50),>
      ,[tel__numb] = <tel__numb, nvarchar(20),>
      ,[phon_numb] = <phon_numb, nvarchar(15),>
      ,[mail_addr] = <mail_addr, nvarchar(50),>
      ,[fpas_ques] = <fpas_ques, nvarchar(50),>
      ,[fpas_answ] = <fpas_answ, nvarchar(50),>
      ,[job__code] = <job__code, nvarchar(2),>
      ,[appl_days] = <appl_days, smalldatetime,>
      ,[modi_days] = <modi_days, smalldatetime,>
      ,[out__days] = <out__days, smalldatetime,>
      ,[true_days] = <true_days, smalldatetime,>
      ,[mail_chek] = <mail_chek, nvarchar(1),>
      ,[bloc_code] = <bloc_code, nvarchar(1),>
      ,[ctl1_code] = <ctl1_code, nvarchar(1),>
      ,[IsVip] = <IsVip, int,>
      ,[VipExpirationTime] = <VipExpirationTime, int,>
      ,[reg_ip] = <reg_ip, nvarchar(50),>
      ,[admin_lvl] = <admin_lvl, int,>
      ,[jwt_token] = <jwt_token, varchar(255),>
 WHERE <Search Conditions,,>
GO
