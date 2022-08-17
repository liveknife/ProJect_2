// 导入 fs,path,http 模块
const fs = require('fs')
const path = require('path')
const http = require('http')
// 创建一个 web 服务器
const server = http.createServer()
// 监听 request 事件 , 监听服务器是否被访问
server.on('request', (req, res) => {
    // 获取用户输入的 url 地址
    const url = req.url
    // console.log(url)
    // 什么一个空字符串
    let fpath = ''
    // 判断用户输入的地址,默认显示首页,否则就显示用户输入的地址内容
    if (url === '/') {
        fpath = path.join(__dirname, './clock/index.html')
    } else {
        // 处理 Js Css 显示页面 中文会有乱码 使用响应头 Content-Type 解决
        if (path.extname(url) === '.js') {
            res.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        }
        if (path.extname(url) === '.css') {
            res.setHeader('Content-Type', 'text/css;charset=utf-8')
        }
        fpath = path.join(__dirname, './clock', url)
    }
    fs.readFile(fpath, 'utf-8', (err, str) => {
        // 如果 输入地址错误 或文件夹没有内容 则显示 404 Not found!!
        if (err) return res.end('404 Not found!!')
        res.end(str)
    })
})
// 启动服务器
server.listen(8080, () => {
    console.log('server runing! at http://127.0.0.1:8080');
})