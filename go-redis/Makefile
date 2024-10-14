.PHONY: up down

init:
	go mod init bronya.com/go-redis
	npm init

get:
	go get -u github.com/redis/go-redis/v9
	npm install redis

up:
	touch ./my.cnf
	docker up -d

down:
	docker down -v

redis:
	docker exec -it redis redis-cli # interactive tty
