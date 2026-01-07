import axios from 'axios'
import ElementUI from 'element-ui';
const request = axios.create({
    // 配置后端接口的基础地址，所有通过request发起的请求都会拼接这个地址，
    // 这是前端指定“要和哪个后端地址交互”的核心配置，直接指向后端9090端口
    baseURL: 'http://localhost:9090',
    timeout: 30000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let manager = localStorage.getItem("manager") ? JSON.parse(localStorage.getItem("manager")) : null
    if (manager) {
        config.headers['token'] = manager.token;  // 设置请求头
    }
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        //当权限验证不通过时给出提示
        if (res.code === '401') {
            ElementUI.Message({
                message: res.msg,
                type: 'error'
            })

        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request

