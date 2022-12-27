import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import searchPost from "../services/searchPost";
import imgLoadSrv from "../services/imgLoadSrv";

import logoimg from '../img/logo.png';
import userimg from '../img/user.png';
import searchimg from '../img/search.png';

import vidword from '../img/introword.mp4';
// import vidsrc from '../img/introword.mp4';


const RoutingLayout = (props) => {
  const [err, setErr] = useState(); 
  const navigate = useNavigate();
  const goToMain = () => {
    navigate("/");
  }
  
  const logout = () => {
    if(sessionStorage.getItem('sid') != null){
      sessionStorage.removeItem('sid');
      props.LogoutFunc("");
      navigate('/');
    }
  }

  const search = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    searchPost.search(formData)
    .then(response =>{
      if((typeof response.data) == "object"){
        props.setImg(response.data);
        setErr();
      }else{
        setErr(response.data);
        imgLoadSrv.load()
          .then(response =>{
            props.setImg(response.data);
          })
          .catch(err=>{
            console.log(err);
          });
      }
    })
    .catch(err=>{
      console.log(err);
    });
  }

  return(
    <>
      <nav id='top-side'>
        <figure class="intro-photo">
            <img src={logoimg} className="logo" onClick={goToMain} alt="logo photo"/>
            <video muted autoPlay loop className='intro-word'>
            <source src={vidword} type='video/mp4'/>
        </video>
        </figure>      
       
       
        
        <div id="top-info">
          <form onSubmit={(event)=>search(event)}>
            <input type='text' name="keyword" placeholder="Search"/>
            <button type="submit">
              
            <img src={searchimg} className="search" alt="search photo"/>

              
              </button>
          </form>
          <details>
            <summary>
              <aside>
            <img src={userimg} className="user" alt="user photo"/>
</aside></summary>
            <ul>
              {props.loggedUser == "" ? <li><Link className={"link-styles"} to="/login">Login</Link></li> : null}
              {props.loggedUser == "" ? null : <li><Link className={"link-styles"} to="/addpost">Add a post</Link></li>}
              {props.loggedUser == "" ? null : <li><Link className={"link-styles"} to="/dashboard">Edit post</Link></li>}
              {props.loggedUser == "" ? null : <li><Link className={"link-styles"} to="/edituser">Edit user</Link></li>}
              {props.loggedUser == "" ? null : <li className="logout" onClick={logout}>Logout</li>}
            </ul>
          </details>
        </div>
      </nav>
      {err != null ? <h1>{err}</h1> : null}
      <Outlet/>
    </>
  );
}
export default RoutingLayout;