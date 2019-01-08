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
    var sandData = {
        font_url: 'test_font.otf',
        text: 'star zmisgod',
        size: 32,
        letter_spacing: 0,
        anchor: 'left top'
    }
    client.Font2SvgPath(sandData, (err, response) => {
        console.log(response)
    })
}

main();