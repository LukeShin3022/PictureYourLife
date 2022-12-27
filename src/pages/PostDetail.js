// import { map } from 'jquery';
import { useState, useEffect } from 'react';
import {json, useLocation} from 'react-router-dom';
import userimg from '../img/user.png';
import downloadimg from '../img/download.png';
import preimg from '../img/pre.png';
import nextimg from '../img/next.png';

import vidloc from '../img/location.mp4';

// import locationimg from '../img/location.png';

function PostDetail(){
  const location = useLocation();
  const imgIdx = location.state;
  const [postIdx, setPostIdx]=useState(imgIdx);
  const pData = JSON.parse(sessionStorage.pData);
  const maxPostIdx = Object.keys(pData).length - 1
   
  const previousPost = (event)=>{
    event.preventDefault();
    if(postIdx <= 0){
       setPostIdx(maxPostIdx);
    }else{
      setPostIdx((idx)=>{
        return idx-1;
      })
     }
  } 
  
  const nextPost = (event)=>{
    event.preventDefault();
    if (postIdx >= maxPostIdx){
      setPostIdx(0);
    } else {
      setPostIdx((idx)=>{
        return idx+1;
      })
    }
  }
  console.log(`Current postIdx: (${postIdx}/${maxPostIdx})`)

  return(
    <>
      {/* <h1>PostDetail Page</h1> */}
      <section id="detail">
        <div id="postsmall">
        {pData.map((value,idx)=>(
          idx == postIdx ? 
          <figure key={idx}>
            <img src ={value.photo_src} alt ={'img_'+idx}/> 
            <figcaption>
              {/* <h6>Tags</h6> */}
              <p>#{value.tags}</p>
              
            </figcaption> 
          </figure>:false
        ))}
        </div>

        {/* <div id="postbig"> */}
        {pData.map((value,idx)=>(
          idx == postIdx ? 
            <article key={idx} id="postbig">
              <figure>
                <img src = {value.photo_src} className="photo"/>
              </figure>
              <section id="postinfo">
                <div id="postuser">
                    <img src={userimg} className="user" alt="user photo"/>

                    <div class="info">
                    <p>{value.user_id}</p>
                    <p>{value.post_date}</p>
                    </div>
                  
                  <div class="changepage">
                  <button onClick={(event)=>previousPost(event)}>{""}
                  <img src={preimg} className="pre" alt="pre photo"/>
                  </button>
                  <button onClick={(event)=>nextPost(event)}>{""}
                  <img src={nextimg} className="next" alt="next photo"/>
                  </button>
                  </div>
                </div>
                
                <div id="postother">

                <div class='left'>
                  {/* <a href={value.photo_src} download>Download</a> */}
                  <h3>#{value.tags}</h3>
                  
                  <a href={value.photo_src} download>
                    
                  <img src={downloadimg} className="download" alt="download photo"/>
                    </a>
                </div>
                
                
                <div class='right'>
                {/* <img src={locationimg} className="location" alt="location photo"/> */}
                {/* <iframe width={450} height={250} frameBorder="0" style={{border:0}}  */}
                <video muted autoPlay loop className='location'>
            <source src={vidloc} type='video/mp4'/>
        </video>
                <iframe width={450} height={250} frameBorder="0" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBunR-4sODBjn5hcvBJmzf9L7_pKF905R4&q=${value.addr}`}
          allowFullScreen></iframe>
          </div>
          </div>
              </section>
            </article>:false))}
            {/* </div> */}
      </section>
    </>
  )
}
export default PostDetail;