import pinyin from './pinyin'

function arraySearch(target) {
    for (let name in pinyin) {
        if (pinyin[name].indexOf(target) !== -1) {
            return ucfirst(name)
        }
    }
    return false
}

function ucfirst(target) {
    if (target.length > 0) {
        let first = target.substr(0, 1).toUpperCase()
        let spare = target.substr(1, target.length)
        return first + spare
    }
}

export const transitionPinyin = (target) => {
    let targetLen = target.length
    let toPinyinStr = ''
    let reg = new RegExp('[a-zA-Z0-9]')
    for (let i = 0; i < targetLen; i++) {
        let val = target.substr(i, 1)
        let name = arraySearch(val)
        if (reg.test(val)) {
            toPinyinStr += val
        } else if (name !== false) {
            toPinyinStr += name
        }
    }
    toPinyinStr = toPinyinStr.replace(/ /g, '-')
    while (toPinyinStr.indexOf('--') > 0) {
        toPinyinStr = toPinyinStr.replace('--', '-')
    }
    return toPinyinStr
}