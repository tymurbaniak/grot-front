FROM node:alpine AS build
RUN mkdir /usr/src
RUN mkdir /usr/src/app 
RUN mkdir /usr/src/app/grot-front
WORKDIR /usr/src/app/grot-front

COPY . .
RUN npm install

CMD envsubst ./src/environments/environment.template.ts > ./src/environments/environment.ts
RUN npm ci && npm run build --prod

FROM nginx:alpine
COPY --from=build /usr/src/app/grot-front/dist/grot-front /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
