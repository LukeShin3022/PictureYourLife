import httpCommon from "./http-common";

class postLoadSrv{
    loadMainPost(){
        return httpCommon.post("/main.php");
    }
    loadDetailPost(formData){
        return httpCommon.post("/postDetail.php");
    }
}
export default new postLoadSrv();