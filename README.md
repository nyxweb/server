# NyxWeb Server (TypeScript)

`NyxWeb muonline website - server`

## Create an .env file

```
NODE_ENV = development
PORT = 5000
JWT_KEY = myJSONw3bt0k3n

TYPEORM_URL = mssql://sa:thepasswordis1@localhost:60143/MuOnline
```

## Additional columns

##### MEMB_INFO

```
jwt_token varchar(100)
admin_lvl int default 0
```
