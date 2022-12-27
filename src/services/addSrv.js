import httpCommon from "./http-common";
class addSrv{
    add(data){
        return httpCommon.post("/addPost.php", data);
    }
};
export default new addSrv();