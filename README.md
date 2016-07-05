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
