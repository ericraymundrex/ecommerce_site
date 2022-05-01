const {createProxyMiddleware} =require("http-proxy-middleware")
module.exports=app=>{
    app.use(
        createProxyMiddleware('/home',{
            target:"http://127.0.0.1:5000",
            // changeOrigin:true
        })
    )
    app.use(
        createProxyMiddleware('/merchant/login',{
            target:"http://127.0.0.1:5000",
            changeOrigin:true
        })
    )
    app.use(
        createProxyMiddleware('/merchant',{
            target:"http://127.0.0.1:5000",
            changeOrigin:true 
        })
    )
    app.use(
        createProxyMiddleware('/product/1'),{
            target:"http://127.0.0.1:5000",
            changeOrigin:true  
        }
    )
}

// const {createProxyMiddleware} =require("http-proxy-middleware")
// module.exports=app=>{
//     app.use(
//         createProxyMiddleware('/home',{
//             target:"http://localhost:5000",
//             changeOrigin:true
//         })
//     )
//     app.use(
//         createProxyMiddleware('/merchant/login',{
//             target:"http://localhost:5000",
//             changeOrigin:true
//         })
//     )
// }