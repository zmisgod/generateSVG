var PROTO_PATH = __dirname+'/../nodeservice.proto';

var grpc = require("grpc")
var node_service = grpc.load(PROTO_PATH).nodeservice;

function main () {
    var client = new node_service.NodeService('localhost:50051', grpc.credentials.createInsecure());

    client.Png2Svg({img_url:"", width:300, height:300}, (err, response) => {
        if(response.code == 1) {
            console.log(response.svgAddress)
            console.log(response.pngAddress)
            console.log(response.ppmAddress)
            console.log(response.svgSourceCode)
        }else{
            console.log(response.msg)
        }
    })
}

main ();