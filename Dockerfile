# FROM mcr.microsoft.com/mssql/server:2017-latest

# ENV ACCEPT_EULA="Y" \
#     SA_PASSWORD="thepasswordis1"

# docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=yourStrong(!)Password' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2017-latest

# CMD ["echo", "SQL Database Server Running"]