MiniProject2
In this project, we improve old project by using
1. Node.js
2. MongoDB
3. Docker

In Node.js we use the same pattern of code but change something to make this code can
use with mongodb.

Docker, we have pull 2 main image that are
node and mongo
and then we lunch our mongodb container by using : 
docker run -v "$(pwd)":/data --name mongo -d mongo mongod --smallfiles
then we connect to our database by:
docker run -it \
    --link mongo:mongo \
    --rm mongo sh \
    -c 'exec mongo "$MONGO_PORT_27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT/test"'
after that we run our node.js application that link to our database in port 8082 by:
docker run -it --name node -v "$(pwd)":/data --link mongo:mongo -w /data -p 8082:8082 node bash
then we can run our project

In database, we create 2 collection that are task and work to store our data as you can see it in
our application file
