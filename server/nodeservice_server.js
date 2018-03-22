var PROTO_PATTH = __dirname + '/../nodeservice.proto'

var grpc = require('grpc')
var nodeservice = grpc.load(PROTO_PATTH).nodeservice

function Png2Svg(call, callback) {
    console.log(call.request.img_url)
    console.log(call.request.width)
    console.log(call.request.height)
    callback(null, {
        code: 1,
        message: "ok"
    })
}

function Svg2Images(call, callback) {

}

function Font2SvgPath(call, callback) {

}

function main () {
    var server = new grpc.Server()
    server.addService(nodeservice.NodeService.service, {Png2Svg:Png2Svg, Svg2Images:Svg2Images, Font2SvgPath:Font2SvgPath})
    server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure())
    server.start()
}
main();