import httpCommon from "./http-common";
class dashboardLoad{
    load(data){
        let formdata = new FormData();
        formdata.append("uid", data);
        return httpCommon.post("/display.php", formdata, {
            headers: {
              'content-type':'multipart/form-data'
            }
        });
    }
} 

export default new dashboardLoad();