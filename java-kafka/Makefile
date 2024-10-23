.PHONY: up down get

up: down
	docker-compose up -d # daemon

down:
	docker-compose down -v # volume

get:
	go get -u github.com/IBM/sarama
