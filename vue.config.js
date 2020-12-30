module.exports = {
    // 打包部署至github
    publicPath: process.env.NODE_ENV === 'production'
        ? '/flip-introduce'
        : '/',
}