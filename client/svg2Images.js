var PROTO_PATH = __dirname + '/../nodeservice.proto';
var APP_CONFIG = require('../config/index')

var protoLoader = require('@grpc/proto-loader');
var grpc = require("grpc")
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var nodeservice = grpc.loadPackageDefinition(packageDefinition).nodeservice;

function main() {
    var client = new nodeservice.NodeService('localhost:50051', grpc.credentials.createInsecure());
    var sendObj = {
        svgPath: APP_CONFIG.APP_PATH + '/../upload/2018/3/25/1521980696465.svg',
        outPutFileName: 'starzmisgod', //输出文件的文件名称（不包括扩展名）
        outPutFloder: APP_CONFIG.APP_PATH + '/../upload/tem', //输出的要转换图片的文件夹
        type: 'jpg', //输出文件的文件类型（仅支持jpg与png）
        width: 300, //svg的宽度，例如300
        height: 300, //svg的高度，例如300
        convertQuality: '80%', //转换图片的质量，例如100%（以百分号结尾）
    }
    client.Svg2Images(sendObj, (err, response) => {
        if (response.code == 1) {
            console.log(response.imgAddress)
        } else {
            console.log(response.msg)
        }
    })
}

main();