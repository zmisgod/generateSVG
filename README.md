# nodeService for gRPC

> you can also use HTTP interface , just see [http version](https://github.com/zmisgod/nodeService/tree/http)

## install

2 software required , you can easily install it on macOS (you need install ```homebrew``` first)

imagemagick (macOS brew install imagemagick)

potrace (macOS brew install potrace)

```
cd /this/project/path
npm install svgexport -g
npm install

//run server
node server/nodeservice_server.js

//run client
node client/font2SvgPath.js
node client/png2svg.js
node client/svg2Images.js
```

## demo

使用golang进行远程调用此服务
首先生成nodeservice.pb.go文件
```
protoc --go_out=plugins=grpc:. nodeservice.proto 
//然后将生成的文件放到 $GOPATH/src/github.com/zmisgod/test 文件夹中(没有请新建)）

node server/nodeservice_server.js
go run main.go
```

## contact

[@zmisgod](https://weibo.com/zmisgod)

[zmis.me新博客](https://zmis.me)
