# NyxWeb [SERVER]

`NyxWeb muonline website server-side written in typescript`

# Environmental variables

`Create an .env file with the following content`

```
NODE_ENV = <production/development>
PORT = 80
PORT_DEV = 5000
JWT_KEY = <your secret key>

SEQUELIZE_URL = mssql://<user>:<password>@<host>:<port>/<database>
```

# Additional columns and tables

### `Character`

```
ALTER TABLE [dbo].[Character]
ADD
  [HOFWins] [int] NOT NULL DEFAULT(0);
```

### `MEMB_INFO`

```
ALTER TABLE [dbo].[MEMB_INFO]
ADD
  [jwt_token] [varchar](100) NULL,
  [admin_lvl] [int] NOT NULL DEFAULT(0),
  [reg_ip] [varchar](30) NULL;
```

### `Nyx_Config`

```
CREATE TABLE [dbo].[Nyx_Config](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NULL,
	[value] [text] NULL
);
```

# Docker

### `new default machine`

this is for increasing docker default ram/cpu
SQLServer requires more ram memory than docker has by default

`delete the default docker VM`

```
docker-machine rm default
```

`create the new docker VM with more ram`

```
docker-machine create -d virtualbox --virtualbox-cpu-count=2 --virtualbox-memory=4096 --virtualbox-disk-size=50000 default
```

`stop the VM and restart terminal`

```
docker-machine stop
```

# Build using docker-compose

`create a docker-compose.yml file in the parent directory where your client/server folders are`

```
version: '3'
services:
  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    image: nyx/client
    ports:
      - '80:80'
    depends_on:
      - server
    container_name: nyxweb_client
  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    image: nyx/server
    ports:
      - '2000:80'
    networks:
      - nyx
    depends_on:
      - db
    container_name: nyxweb_server
  db:
    build:
      context: ./server
      dockerfile: Dockerfile-db
    image: nyx/db
    ports:
      - '1433:1433'
    networks:
      - nyx
    container_name: nyxweb_db
networks:
  nyx:
    external: true
```

`now we create a new network on which our containers will run`

```
docker network create nyx
```

`with this command we "compose" a new docker build /we start our app/`

```
docker-compose up --build -d
```

`with this command we stop our app`

```
docker-compose down
```

# -/ Creating SQLServer docker container /-

in case you want to only create the SQLServer docker container and run the server/client separately, useful for development

`creating new mssql docker container`

##### make sure to fill in your sql password

```
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=thepassword.is1" -e "MSSQL_PID=Express" --name nyxweb_db -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```

## restore database

`first we create a 'backup' folder in nyxweb_db docker container`

```
docker exec -it nyxweb_db mkdir /var/opt/mssql/backup
```

`then we copy 'MuOnline.bak' into our docker container`

#### make sure you specify the right path to your MuOnline.bak file

```
docker cp "D:\MuOnline.bak" nyxweb_db:/var/opt/mssql/backup
```

`now we finally restore the MuOnline.bak file`

```
docker exec -it nyxweb_db /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "thepassword.is1" -Q "RESTORE DATABASE MuOnline FROM DISK = '/var/opt/mssql/backup/MuOnline.bak' WITH MOVE 'MuOnline_Data' TO '/var/opt/mssql/data/MuOnline.mdf', MOVE 'MuOnline_Log' TO '/var/opt/mssql/data/MuOnline_Log.ldf'"
```
