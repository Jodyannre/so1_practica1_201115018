#Step 1 Build de react

FROM node:16 AS builder

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
#RUN npm run build
EXPOSE 3000
CMD ["npm","start"]

#STEP 2 crear el servidor de nginx

#FROM nginx:alpine AS produciton
#COPY --from=builder /app/build /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
#CMD ["nginx","-g","dameon off;"]