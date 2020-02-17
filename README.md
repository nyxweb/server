# NyxWeb Server (TypeScript)

`NyxWeb muonline website - server`

## Create an .env file

```
NODE_ENV = development/production   <- pick one dependion on your environment
PORT = 5000                         <- desired server port
JWT_KEY = myJSONw3bt0k3n            <- random key, change it to whatever you like

SEQUELIZE_URL = mssql://<user>:<password>@<host>:<port>/<database>
```

## Additional columns and tables

##### Character

```
ALTER TABLE [dbo].[Character]
ADD
  [HOFWins] [int] NOT NULL DEFAULT(0);
```

##### MEMB_INFO

```
ALTER TABLE [dbo].[MEMB_INFO]
ADD
  [jwt_token] [varchar](100) NULL,
  [admin_lvl] [int] NOT NULL DEFAULT(0),
  [reg_ip] [varchar](30) NULL;
```

##### Nyx_Config

```
CREATE TABLE [dbo].[Nyx_Config](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NULL,
	[value] [text] NULL
);
```

# Docker

##### new default machine

```cmd
docker-machine rm default

docker-machine create -d virtualbox --virtualbox-cpu-count=2 --virtualbox-memory=4096 --virtualbox-disk-size=50000 default

docker-machine stop

exit
```

##### new mssql image

```
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=thepassword.is1" -e "MSSQL_PID=Express" --name nyxweb_sql -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```

##### restore database

```
docker exec -it nyxweb_sql mkdir /var/opt/mssql/backup

docker cp "D:\fullDB NyxWeb.bak" nyxweb_sql:/var/opt/mssql/backup

docker exec -it nyxweb_sql /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "thepassword.is1" -Q "RESTORE FILELIST ONLY FROM DISK = '/var/opt/mssql/backup/fullDB NyxWeb.bak'"

docker exec -it nyxweb_sql /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "thepassword.is1" -Q "RESTORE DATABASE MuOnline FROM DISK = '
/var/opt/mssql/backup/fullDB NyxWeb.bak' WITH MOVE 'MuOnline_Data' TO '/var/opt/mssql/data/MuOnline.mdf', MOVE 'MuOnline_Log' TO '/var/opt/m
ssql/data/MuOnline_Log.ldf'"
```
