/**
 * api接口统一管理
 */
import { get, post } from './http';

const link = {

    /**
     * 基础信息
     * @param {*} p
     * @returns
     */

    // 用户管理
    userLogin: p => post('/user/login', p),
    userExit: p => post('/user/exit', p),
    userUpdatePwdCurr: p => get('/user/updatePwdCurr', p),

}
export default link;
