var PROTO_PATH = __dirname+'/../nodeservice.proto';

var grpc = require("grpc")
var node_service = grpc.load(PROTO_PATH).nodeservice;

function main () {
    var client = new node_service.NodeService('localhost:50051', grpc.credentials.createInsecure());

    client.Png2Svg({img_url:"asdasdasd", width:123, height:23423}, (err, response) => {
        console.log(response)
    })
}

main ();