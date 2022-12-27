import {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import globalIP from '../services/globalIP';
import loginService from '../services/loginService';


function Login(props){ 
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  } 

  const passInput = useRef();
  
  const [Ip,setIp] = useState('');
  globalIP.getIP().then(data=>setIp(data));

  const [err,setErr] = useState();

  const login = (event) =>{
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append('gip',Ip);
    loginService.login(formData)
        .then(response=>{
            props.loginFun(response.data);
            sessionStorage.setItem("sid", response.data.sid);
            setErr(null);
            navigate('/main');
        })
        .catch(err=>{
            setErr(err.response.data);
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
    <div id="login">
      <h1>Welcome to PURL</h1>
      {/* <h1>Log in</h1> */}
        <form onSubmit={(event) => login(event)} id='loginForm'>
          <input type="hidden" name="gip" value={Ip}/>
          <div class="q1">
          <label>User ID</label>
          <input type="text" name="uName" placeholder="Write username" required/>
          </div>

          <div class="q2">
          <label>Password</label>
          <input type="password" name="pass" ref={passInput}placeholder="Write password" required/>
          
          </div>
          <button type='button' onClick={(event)=>inputFocus(event)} class="show">Show Password</button>

          <button type="submit">Log In</button>
        </form>
        {err!==null ? <h1>{err}</h1> : null}
        <p>Don't have an account?</p>
      <button onClick={goToRegister} class="gotoreg">Create an New Account</button>
      </div>
    </>
  )
}
export default Login;