import httpCommon from "./http-common";

class imgLoadSrv{
    load(){
        return httpCommon.post("/main.php");
    }
    loadDetailPost(formData){
        return httpCommon.post("/postDetail.php");
    }
}
export default new imgLoadSrv();