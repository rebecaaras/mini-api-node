# Installation

### Docker installation
This application uses **Docker containers**. 

If you don't have Docker installed, please follow:
- [this tutorial](https://docs.docker.com/desktop/)
- go to *Install Docker Desktop*

and come back here after installing Docker.

### Api installation
Using *Git Bash* preferably, follow the steps below:

Clone the git repository:

    git clone https://github.com/rebecaaras/mini-api-node.git
    cd mini-api-node

Run the Docker image:

    docker-compose up

If everything is ok, you should see the following:

    WARN[0000] /home/rebeca/mini-api-node/docker-compose.yml: `version` is obsolete
    [+] Running 1/0
    ✔ Container mini-api-node-mini-api-node-1  Created                 0.0s
    Attaching to mini-api-node-1
    mini-api-node-1  |
    mini-api-node-1  | > mini-api-node@1.0.0 start
    mini-api-node-1  | > node src/index.js
    mini-api-node-1  |
    mini-api-node-1  | App listening on port 5000... Go to http://localhost:5000/api/artist/hozier/
    mini-api-node-1  | (Press CTRL+C to stop the app.)

# REST API

This is a REST API for collecting and editing data. In the example I used as example the data of one of my favourite musicians, Hozier.

The API has the endpoints described below. You can run all the GET requests simply going to the link in your browser, but to make POST and DELETE requests [curl](https://curl.se/) or any similar tool will be needed.

### Requests
#### Get artist data

`GET /hozier/`

    curl -X GET http://localhost:5000/api/artist/hozier

#### Get list of albums

`GET /albums/`

    curl -X GET http://localhost:5000/api/artist/hozier/albums/

#### Get album by id

`GET /albums/{album_id}`

    curl -X GET http://localhost:5000/api/artist/hozier/albums/{album_id}

#### Get list of top tracks

`GET /top-tracks/`

    curl -X GET http://localhost:5000/api/artist/hozier/top-tracks

#### List of favourite tracks

Below you can see how to post, delete and get songs from a list of your favourite ones.

#### GET list of favourite tracks
`GET /my-favourite-tracks/`

    curl -X GET http://localhost:5000/api/artist/hozier/my-favourite-tracks

#### POST track to list of favourite tracks
`POST /my-favourite-tracks/`

    curl -X POST http://localhost:5000/api/artist/hozier/my-favourite-tracks -H "Content-Type: application/json" -d '{"name": "{track_name}"}'

##### Response Example (200 OK)

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 27
    ETag: W/"1b-YhvplAMvQvlum00dvbBFcyehCE4"
    Date: Thu, 05 Sep 2024 07:23:44 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5   
    { [27 bytes data]
    100    48  100    27  100    21   9919   7714 --:--:-- --:--:-- --:--:-- 24000
    {"id":2,"name":"Francesca"}}

##### Response Example (400 Bad Request)
    HTTP/1.1 400 Bad Request
    X-Powered-By: Express
    Content-Type: text/html; charset=utf-8
    Content-Length: 48
    ETag: W/"30-CikzUDPZxqY5oNShsnOxVSdmhgs"
    Date: Thu, 05 Sep 2024 07:30:01 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    [48 bytes data]
    100    62  100    48  100    14  12108   3531 --:--:-- --:--:-- --:--:-- 20666
    "name" length must be at least 3 characters long

#### DELETE track from list of favourite tracks
`DELETE /my-favourite-tracks/{track_id}`

    curl -X DELETE http://localhost:5000/api/artist/hozier/my-favourite-tracks/{track_id}

##### Response Example (200 OK)

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 27
    ETag: W/"1b-KKjXcZUOSG18tSmB5eDACzmB318"
    Date: Thu, 05 Sep 2024 07:15:38 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    { [27 bytes data]
    100    48  100    27  100    21   9708   7551 --:--:-- --:--:-- --:--:-- 24000
    {"id":1,"name":"From Eden"}}


##### Response Example (404 error)

    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Content-Type: text/html; charset=utf-8
    Content-Length: 42
    ETag: W/"2a-4ILTudmV9gn4+sGUgNHGmV4ws5o"
    Date: Thu, 05 Sep 2024 07:17:23 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    { [42 bytes data]
    100    42  100    42    0     0  15250      0 --:--:-- --:--:-- --:--:-- 21000
    The track with the given id was not found.}