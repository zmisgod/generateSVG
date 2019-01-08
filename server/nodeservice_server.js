var PROTO_PATH = __dirname + '/../nodeservice.proto'

const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var nodeservice = grpc.loadPackageDefinition(packageDefinition).nodeservice;

var APP_CONFIG = require('../config/index')
var imageHandler = require('../modules/imageHandler')
var fontHandler = require('../modules/fontHandler')

function Png2Svg(call, callback) {
    let img_url = call.request.img_url
    let img_type = 'gif'
    let width = call.request.width
    let height = call.request.height
    if (img_url == '') {
        return callback(null, {
            code: 2,
            msg: 'img_url为空'
        })
    }
    let nowDate = new Date()
    let nowYear = nowDate.getFullYear()
    let nowMonth = nowDate.getMonth() + 1
    let nowDay = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()
    let file_name = Date.now()
    let file_floder = APP_CONFIG.APP_PATH + '/upload/' + nowYear + '/' + nowMonth + '/' + nowDay + '/'
    imageHandler.getPngData(img_url, img_type, file_floder, file_name).then(file_path => {
        imageHandler.convertPngToSvg(file_path, file_floder, file_name, width, height).then(function (svgSourceCode) {
            return callback(null, {
                code: 1,
                msg: 'successful',
                svgAddress: file_floder + file_name + '.svg',
                pngAddress: file_floder + file_name + '.png',
                ppmAddress: file_floder + file_name + '.ppm',
                svgSourceCode: svgSourceCode
            })
        }).catch(err => {
            return callback(null, {
                code: 2,
                msg: err
            })
        })
    }).catch(err => {
        return callback(null, {
            code: 2,
            msg: err
        })
    })
}

function Svg2Images(call, callback) {
    let svgPath = call.request.svgPath
    let outPutFileName = call.request.outPutFileName
    let outPutFloder = call.request.outPutFloder
    let outPutWidth = call.request.width
    let outPutHeight = call.request.height
    let type = call.request.type
    let convertQuality = call.request.convertQuality

    let originalFilePath = outPutFloder + '/' + outPutFileName + '.' + type
    imageHandler.convertSvgToImages(svgPath, originalFilePath, outPutWidth, outPutHeight, convertQuality).then((convResult) => {
        callback(null, {
            code: 1,
            msg: 'ok',
            imgAddress: originalFilePath
        })
    }).catch((err) => {
        callback(null, {
            code: 2,
            msg: err
        })
    })
}

function Font2SvgPath(call, callback) {
    let fontObject = [{
        font_url: call.request.font_url,
        text: call.request.text,
        size: call.request.size,
        letter_spacing: call.request.letter_spacing,
        anchor: call.request.anchor
    }]

    fontHandler.convertAllFont(fontObject).then(result => {
        let data = []
        let fontObj = []
        result.map(function (value, indexs) {
            if (value && value.font) {
                let fontWidthInfo = value.font.getAdvanceWidth(fontObject[indexs].text, fontObject[indexs].size)
                let attr = {
                    x: 0,
                    y: 0,
                    fontSize: fontObject[indexs].size * 1,
                    letterSpacing: fontObject[indexs].letter_spacing * 1 / fontObject[indexs].size * 1,
                    anchor: fontObject[indexs].anchor
                }
                let path = value.getPath(fontObject[indexs].text, attr)
                let svgWidthAndHeight = value.getMetrics(fontObject[indexs].text, attr)
                let d = value.getD(fontObject[indexs].text, attr)
                let bounding_box = value.font.getPath(fontObject[indexs].text, 0, 0, fontObject[indexs].size * 1).getBoundingBox()
                fontObject[indexs].path = path
                fontObject[indexs].metrics = svgWidthAndHeight
                fontObject[indexs].bounding_box = bounding_box
            }
        })
        callback(null, {
            code: 1,
            msg: 'ok',
            path: fontObject[0].path,
        })
    }).catch(err => {
        callback(null, {
            code: 2,
            msg: err
        })
    })
}

function main() {
    var server = new grpc.Server()
    server.addService(nodeservice.NodeService.service, {
        Png2Svg: Png2Svg,
        Svg2Images: Svg2Images,
        Font2SvgPath: Font2SvgPath
    })
    server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure())
    server.start()
}
main();