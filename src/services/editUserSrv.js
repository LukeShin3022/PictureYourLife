import httpCommon from "./http-common";
class editUserSrv{
    edit(data){
        return httpCommon.post("/editUser.php", data);
    }
}
export default new editUserSrv();