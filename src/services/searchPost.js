import httpCommon from "./http-common";
class searchPostSrv{
    search(data){
        return httpCommon.post("/search.php", data);
    }
}
export default new searchPostSrv();