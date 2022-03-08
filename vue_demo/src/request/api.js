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
    tableList: p => post('/susutest/table/list', p,true,'加载中....'),
    aaa: p => get('/dev/c31597bf-27f1-40b9-b569-268fdc614147/订单配送服务1646721023844.xls', p),
}
export default link;
