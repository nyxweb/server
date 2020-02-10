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

##### MEMB_INFO

```
ALTER TABLE [dbo].[MEMB_INFO]
ADD
  [jwt_token] [varchar](100) NULL,
  [admin_lvl] [int] NULL DEFAULT(0),
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
