# Api moments

# how to install

It is necessary to create a .env file equal to env.example

npm i

docker run -d \                                                                          
    --name mysql-container \
    -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=123456 \
    -e MYSQL_DATABASE=moment_database2 \
    mysql:5.7

npm run start:dev

# OR

docker-compose up -d 
