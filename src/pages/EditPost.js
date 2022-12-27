import { useNavigate } from "react-router-dom";
import { useState } from "react";
import editSrv from "../services/editSrv";

function EditPost(props){
  const navigate = useNavigate();

  const tags = props.Post.tags;
  const addr = props.Post.addr;
  const uid = props.Post.post_uid;

  const goToPostDashboard = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    formData.append("uid", uid);

    editSrv.edit(formData) 
    .then(response =>{
      if(response.data == "Edit"){
        navigate("/dashboard");
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }; 

  return(
    <>
      <div id="editP">
      <h1>Edit Your Post</h1>
      <form onSubmit={(event)=>goToPostDashboard(event)} id="editPost">
      <div class="q1">
      <label>Tags</label>
      <input type="text" name="tags" defaultValue={tags}/>
      </div>
      <div class="q2">
      <label>Address</label>

      <input type="text" name="addr" defaultValue={addr}/>
      </div>
      <button type="submit">Edit</button>
      </form>
      </div>
    </>
  )
}
export default EditPost;