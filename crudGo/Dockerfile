FROM golang:alpine

WORKDIR /crudGo

COPY . .
RUN go mod download

RUN go build -o /exec

EXPOSE 4000

CMD ["/exec"]