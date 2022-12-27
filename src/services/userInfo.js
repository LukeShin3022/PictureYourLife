import httpCommon from "./http-common";
class userInfo{
    loadInfo(sid){
        let formdata = new FormData();
        formdata.append("sid", sid);
        return httpCommon.post('/sidChk.php', formdata,{
         header:{
             'content-type':'multipart/form-data'
         }
     });   
    }
}
export default new userInfo();