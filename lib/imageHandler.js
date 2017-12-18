const exec = require('child_process').exec
const fse = require('fs-extra')
const fs = require('fs')
const APP_CONFIG = require('../config/index')
const https = require('https')
const cheerio = require('cheerio')

const imageHandler = {
    //根据图片地址下载此图片文件
    getPngData(imgUrl, fileType, fileFloder, fileName) {
        return new Promise(function(resolve, reject) {
            https.get(imgUrl, function(res) {
                let imgData = ''
                res.setEncoding("binary")
                res.on("data", function(chunk) {
                    imgData += chunk
                })
                res.on("end", function() {
                    fse.ensureDir(fileFloder).then(() => {
                            fs.writeFileSync(fileFloder + fileName + '.' + fileType, imgData, { encoding: 'binary' })
                            resolve(fileFloder + fileName + '.' + fileType)
                        })
                        .catch(err => {
                            console.error(err)
                        })
                })
            })
        })
    },
    //png转换成svg【先转换成ppm然后转换成带path的svg的源码】
    convertPngToSvg(png_file, fileFloder, fileName, width, height) {
        return new Promise(function(resolve, reject) {
            let execone = 'convert -flatten ' + png_file + ' ' + fileFloder + fileName + '.ppm'
            exec(execone, function(error, stdout, stderr) {
                if (!error) {
                    let exectwo = APP_CONFIG.POTRACE + ' -s ' + fileFloder + fileName + '.ppm' + '  -o ' + fileFloder + fileName + '.svg'
                    exec(exectwo, function(error, stdout, stderr) {
                        if (!error) {
                            fs.readFile(fileFloder + fileName + '.svg', { encoding: 'utf8' }, function(err, svgSource) {
                                imageHandler.replaceSvgWidthAndHeight(svgSource, width, height).then(function(least) {
                                    resolve(least)
                                })
                            })
                        }
                    })
                } else {
                    reject(error)
                }
            })
        })
    },
    replaceSvgWidthAndHeight(data, width, height) {
        return new Promise(function(resolve, reject) {
            const $ = cheerio.load(data, { decodeEntities: false })
            $("svg").eq(0).attr("width", width).attr("height", height)
            $("metadata").text("Power by " + APP_CONFIG.SITE_URL)
            let svgOrgi = $('body').html()
            resolve(svgOrgi)
        })
    },
    //svg转换成jpg或者png
    convertSvgToImages(svg_url, convert_file_name, width, height, convert_quality) {
        return new Promise(function(resolve, reject) {
            let execone = 'svgexport ' + svg_url + ' ' + convert_file_name + ' ' + convert_quality + ' pad ' + width + ':' + height
            exec(execone, function(error, stdout, stderr) {
                if (!error) {
                    resolve('ok')
                } else {
                    reject('error')
                }
            })
        })
    }
}
module.exports = imageHandler