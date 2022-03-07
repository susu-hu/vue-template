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

    // 表格数据
    tableList: p => post('/table/list', p),
    userExit: p => post('/user/exit', p),
    userUpdatePwdCurr: p => get('/user/updatePwdCurr', p),
}
export default link;
