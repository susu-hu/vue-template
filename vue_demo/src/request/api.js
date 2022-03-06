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
    tableList: p => post('/9fb92020-4e3d-4c40-8e1f-e6f81d231a71', p),
    userExit: p => post('/user/exit', p),
    userUpdatePwdCurr: p => get('/user/updatePwdCurr', p),

}
export default link;
