import {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import globalIP from '../services/globalIP';
import registerSrv from '../services/registerSrv';

function Register(props){
  const navigate = useNavigate();
  
  const [Ip,setIp] = useState('');
  globalIP.getIP().then(data=>setIp(data));
  const [err,setErr] = useState();
  const passInput = useRef(); 

  const register = (event) =>{
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('gip',Ip);
    registerSrv.register(formData)
    // registerSrv.register()

        .then(response=>{
            // props.loginFun(response.data);
            sessionStorage.setItem("sid", response.data.sid);
            setErr(null);
            navigate('/main');
        })
        .catch(err=>{
          navigate('/home');

          // setErr(err.response.data);

        });
      }

      useEffect(()=>{
        globalIP.getIP().then(data=>{setIp(data)});
      },[]);
  
      const inputFocus = (event)=>{
      if(event.target.innerText === "Show Password"){
          passInput.current.type = "text";
          event.target.innerText = "Hide Password";
      }else{
          passInput.current.type = "password";
          event.target.innerText = "Show Password";
      }
    }

  return(
    <>
      <div id="reg">
      <h1>Greate Your Account</h1>

      <form method="POST" onSubmit={(event) => register(event)} id='regForm'>
      <input type="hidden" name="gip" value={Ip}/>

      <div class="q1">

      <label>User ID</label>
      <input name="user_id" placeholder="user id"  required/>
      </div>

      <div class="q2">

      <label>Password</label>
      <input type="password" name="pass" ref={passInput} placeholder="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*?]).{8,}" required/>
      </div>
      <div class="pw">
      <button type='button' onClick={(event)=>inputFocus(event)} class="show">Show Password</button>
      <p>(At least eight characters, including at least one number/ one lower letters/ one uppercase letters / one special characters)</p>
      
</div>
      <div class="q3">

      <label>E-mail</label>
      <input type="email" name="email" placeholder="email" required/>
      </div>

      <div class="q4">

      <label>Gender</label>
      <div class="q4option">
      <input class = "q44" name="gender" type = "radio" value="Male" required/>Male
      <input class = "q44" name="gender" type = "radio" value="Female" required/>Female
      <input class = "q44" name="gender" type = "radio" value="Non-binary" required/>Non-binary
      <input class = "q44" name="gender" type = "radio" value="Prefer not to say" required/>Prefer not to say
      </div>
      </div>
      <div class="q5">

      <label>Birthday</label>
      <input type="date" name="dob" required/>
      </div>
      <button type="submit">Register</button>
      </form>
    </div>
    </>
  )
}
export default Register;