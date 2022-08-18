import elementuiRouter from './modules/elementuiRouter';
import websocketRouter from './modules/websocket';
// 配置项目中没有涉及权限的公共路由
export default [
    //饿了么ui篇章
    ...elementuiRouter,
    //websocket篇章
    ...websocketRouter,
]