var PROTO_PATH = __dirname + '/../nodeservice.proto';

var grpc = require("grpc")
var node_service = grpc.load(PROTO_PATH).nodeservice;

function main() {
    var client = new node_service.NodeService('localhost:50051', grpc.credentials.createInsecure());

    client.Png2Svg({
        // img_url: "http://potrace.sourceforge.net/img/icosasoft.gif",
        img_url: "https://d30y9cdsu7xlg0.cloudfront.net/png/120046-200.png",
        width: 300,
        height: 300
    }, (err, response) => {
        if (err) {
            console.log(err)
        } else {
            if (response.code == 1) {
                console.log(response.svgAddress)
                console.log(response.pngAddress)
                console.log(response.ppmAddress)
                console.log(response.svgSourceCode)
            } else {
                console.log(response.msg)
            }
        }

    })
}

main();