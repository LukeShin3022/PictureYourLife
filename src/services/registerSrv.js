import httpCommon from "./http-common";
class RegisterSrv{
    register(data){
        return httpCommon.post("/register.php",data);
    }
}
export default new RegisterSrv();