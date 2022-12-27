import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import imgLoadSrv from '../services/imgLoadSrv';
 
function Content(props){
  const navigate = useNavigate();
  const goToPostDetail = (idx) => {
    sessionStorage.setItem('pData', JSON.stringify(props.imgData));
    navigate("/postdetail",{state: idx} );
  };
  useEffect(()=>{
    imgLoadSrv.load()
    .then(response =>{
      props.setImg(response.data);
    })
    .catch(err=>{
      console.log(err);
    });
  }, []);
  return(
    <>
      <div id="main">
      {props.imgData.map((value, idx) => (
        <figure key={idx} className="content" onClick={()=>goToPostDetail(idx)}>
          <img src ={value.photo_src} alt ={'img_'+idx}/>
          <figcaption>
            {/* <h6>Tags</h6> */}
            <p>#{value.tags}</p>
          </figcaption>
        </figure>
      ))}
      </div>
    </>
  )
}

function Main(props){
  // localStorage.setItem("userId", "cweald9")
  // const loggedUser = props.loggedUser;
  return(
    <>
      {/* <Content user={loggedUser}/> */}
      <Content setImg={props.setImg} imgData={props.imgData}/>
    </>
  )
}
export default Main;