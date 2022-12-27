import httpCommon from "./http-common";
class editSrv{
    edit(data){
        return httpCommon.post("/editPost.php", data);
    }
}
export default new editSrv();
