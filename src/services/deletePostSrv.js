import httpCommon from "./http-common";
class deletePostSrv{
    delete(uid){
      let formdata = new FormData();
      formdata.append("uid", uid);
      return httpCommon.post("/deletePost.php", formdata, {
        headers: {
          'content-type':'multipart/form-data'
        }
      });
    }
}
export default new deletePostSrv();