#Nodebike
MetroHacks 2016
##Authors
 - [Tom Koker](http://tomkoker.com)
 - [Ken Garber](http://kgarber.com)
 - [David Tandetnik](http://dtxcode.github.io)

##Run Locally using Docker
Download chat source code:
```bash
git clone https://github.com/nshshackers/nodebike.git
cd nodebike
```

Build our Docker image:
```bash
docker build -t node .
```

Run the image:
```bash
docker run -it --name nodebike --net="host" -v `pwd`:/home/user/src node
```
This should put you in a user shell of your container. Then install dependencies:
```bash
npm install
```
Start the server:
```bash
node server
```

You should now be able to visit the site at [localhost:3000](http://localhost:3000).

Re-enter the container:
```bash
docker start -ia nodebike
```