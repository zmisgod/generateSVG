var PROTO_PATH = __dirname + '/../nodeservice.proto';
var APP_CONFIG = require('../config/index')

var grpc = require("grpc")
var node_service = grpc.load(PROTO_PATH).nodeservice;

function main() {
    var client = new node_service.NodeService('localhost:50051', grpc.credentials.createInsecure());
    var sandData = {
        font_url: 'test_font.otf',
        text: 'star zmisgod',
        size: 32,
        letter_spacing: 0,
        anchor: 'left top'
    }
    client.Font2SvgPath(sandData, (err, response) => {
        if (response.code == 1) {
            console.log(response.path)
            console.log(response.d)
        } else {
            console.log(response.msg)
        }
    })
}

main();