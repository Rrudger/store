install:
	npm install

start-frontend:
	npm run start-frontend

start-backend:
	npm run start-server

start:
	make start-backend & make start-frontend
