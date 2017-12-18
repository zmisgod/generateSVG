const TextToSVG = require('text-to-svg')

const fontHandler = {
    convertAllFont(data) {
        let nameObj = []
        data.map(value => {
            nameObj.push(this.handleFont(value))
        })
        return Promise.all(nameObj)
    },
    getFontInfo(fontUrl) {

    }
}

module.exports = fontHandler