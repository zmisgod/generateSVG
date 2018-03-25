var express = require('express')
var router = express.Router()
var imageHandler = require("../lib/imageHandler")
var fontHandler = require("../lib/fontHandler")
const APP_CONFIG = require('../config/index')

router.post('/pngToSvg', (req, res, next) => {
    let img_url = req.body.img_url
    let img_type = 'png'
    let width = req.body.width
    let height = req.body.height
    if (img_url == '') {
        res.send({
            code: 403,
            msg: 'empty img_url'
        })
        res.end()
        return
    }
    let nowDate = new Date()
    let nowYear = nowDate.getFullYear()
    let nowMonth = nowDate.getMonth() + 1
    let nowDay = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()
    let file_name = Date.now()
    let file_floder = APP_CONFIG.APP_PATH + '/upload/' + nowYear + '/' + nowMonth + '/' + nowDay + '/'
    imageHandler.getPngData(img_url, img_type, file_floder, file_name).then(file_path => {
        imageHandler.convertPngToSvg(file_path, file_floder, file_name, width, height).then(function(data) {
            res.send({
                code: 200,
                msg: 'successful',
                data: {
                    svgSourceCode: data,
                    svgAddress: file_floder + file_name + '.svg',
                    pngAddress: file_floder + file_name + '.png',
                    ppmAddress: file_floder + file_name + '.ppm'
                }
            })
            res.end()
            return
        }).catch(err => {
            console.log(err)
            res.send({
                code: 403,
                msg: 'empty img_url'
            })
            res.end()
            return
        })
    }).catch(err => {
        console.log(err)
        res.send({
            code: 403,
            msg: 'empty img_url'
        })
        res.end()
        return
    })
});

//svg转换jpg或者png
router.post('/svgToImages', (req, res, next) => {
    let svgPath = req.body.svgPath
    let outPutFileName = req.body.outPutFileName
    let outPutFloder = req.body.outPutFloder
    let outPutWidth = req.body.width
    let outPutHeight = req.body.height
    let type = req.body.type
    let convertQuality = req.body.convertQuality

    let originalFilePath = outPutFloder + outPutFileName + '.' + type
    imageHandler.convertSvgToImages(svgPath, originalFilePath, outPutWidth, outPutHeight, convertQuality).then((convResult) => {
        res.send({ "code": 200, "data": originalFilePath })
        res.end()
    }).catch((err) => {
        console.log(err)
    })
})

//字体转svg path
router.post('/fontToSvgPath', (req, res, next) => {
    let fontObject = req.body.fontObj

    // let fontObject = [{ font_url: 'test_font.otf', text: 'zmisgod', size: 12, letter_spacing: 0, anchor: 'left baseline' }]

    fontHandler.convertAllFont(fontObject).then(function(result) {
        let data = []
        let fontObj = []

        result.map(function(value, indexs) {
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
                fontObject[indexs].d = d
                fontObject[indexs].metrics = svgWidthAndHeight
                fontObject[indexs].bounding_box = bounding_box
            }
        })
        res.send({ 'code': 200, 'data': fontObject })
        res.end()
    }).catch(function(err) {
        console.log(err)
    })
})
module.exports = router