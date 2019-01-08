const TextToSVG = require('text-to-svg')
const APP_CONFIG = require('../config/index')

const fontHandler = {
    convertAllFont(fontPathArr) {
        let fontObj = []
        fontPathArr.map(value => {
            fontObj.push(this.getFontInfo(value))
        })
        return Promise.all(fontObj)
    },
    getFontInfo(fontInfo) {
        return new Promise((resolve, reject) => {
            TextToSVG.load(APP_CONFIG.APP_PATH + '/../upload/' + fontInfo.font_url, (err, textToSvgObj) => {
                if (err !== null) {
                    reject(err)
                } else {
                    resolve(textToSvgObj)
                }
            })
        })
    }
}

module.exports = fontHandler