
import store from '@/store/index.js'
/**
 * 判断是否有权限。根据传入的权限标识，查看是否存在于用户的权限标识集合内。
 */
export function hasPermission(perms) {
    console.log(perms)
    console.log(store.state.permission)
    let hasPermission = false;
    let permission = store.state.permission;
    // for (var i = 0; i < permission.length; i++) {
    //     if (permission[i] === perms) {
    //         hasPermission = true;
    //         break;
    //     }
    // }
    permission.some(item=>{
        hasPermission =item==perms?true:false
    })
    console.log(hasPermission)
    return hasPermission;

}
