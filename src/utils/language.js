
const path = require('path')
let files = require.context('./language', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
    const name = path.basename(key, '.js')
    modules[name] = files(key).default || files(key)
})
export default modules