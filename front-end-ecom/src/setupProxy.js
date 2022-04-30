const {createProxyMiddleware} =require("http-proxy-middleware")
module.exports=app=>{
    app.use(
        createProxyMiddleware('/home',{
            target:"http://localhost:5000",
            changeOrigin:true
        })
    )
    app.use(
        createProxyMiddleware('/merchant/login',{
            target:"http://localhost:5000",
            changeOrigin:true
        })
    )
}