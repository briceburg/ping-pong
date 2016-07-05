# ping-pong

ping-pong is a simple [Express](http://expressjs.com/) app that
responds to /ping with "pong" -- useful for debugging http services.

## usage

### cli

```sh
docker run -p 7777:80 -it --rm briceburg/ping-pong
```

binds ping-pong to :7777 on localhost. `ctrl-c` to exit. test in a new terminal

```sh
~ curl localhost:7777/ping
pong
```

### docker-compose + nginx-proxy

I use ping-pong to test upstream load balancers like
[nginx-proxy](https://github.com/jwilder/nginx-proxy) and automatic [LetsEncrypt](https://letsencrypt.org/)
SSL cert generation via the [letsencrypt-nginx-proxy-companion](https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion) container.

Here's an example v1 `docker-compose.yml` assuming nginx-proxy + letsencrypt companion are running on the docker host.

```yml
---
ping-pong:
  image: briceburg/ping-pong
  #ports:
    #- "7777:80"

  environment:

    # ROUTING (for nginx-proxy container)
    #####################################
    VIRTUAL_HOST: ssl-test.mydomain.net
    LETSENCRYPT_HOST: ssl-test.mydomain.net
    LETSENCRYPT_EMAIL: devops+ssl@mydomain.net
```

```sh
docker-compose up
```

## custom route handlers

As a convenience, the Express routes have been abstracted to an include file.
This allows you to build an image based on briceburg/ping-pong with custom
behavior. Here, we build an image based
on the provided [Dockerfile](custom-Dockerfile) and [routefile](custom-routes.js) examples.

```sh
cd /path/to/ping-pong repo

docker build -t custom-ping-pong -f custom-Dockerfile .
docker run -it --rm -p 7777:80 custom-ping-pong
```

&& viola! a 204 is returned.

```sh
~ curl -I localhost:7777
HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Tue, 05 Jul 2016 21:05:05 GMT
Connection: keep-alive
```
