import { useNavigate } from "react-router-dom";
import {useState} from "react";
import dashboardLoad from "../services/dashboardLoad";
import deletePostSrv from "../services/deletePostSrv";

function Rows(props){
  const navigate = useNavigate();
  const goToEditPost = () => {
    props.EditPostFunc(props.table[props.index]);
    navigate("/editpost");
  }; 

  const deletePost = () => {
    deletePostSrv.delete(props.table[props.index].post_uid)
    .then(response =>{
      console.log(response);
    })
    .catch(err=>{
      console.log(err);
    });
  }

  return(
    <tr>
      {/* <td>{props.table[props.index].user_id}</td>
      <td>{props.table[props.index].user_uid}</td>
      <td>{props.table[props.index].post_uid}</td> */}
      <td><img src={props.table[props.index].photo_src}/></td>
      <td>{props.table[props.index].post_date}</td>
      <td>{props.table[props.index].tags}</td>
      <td>{props.table[props.index].addr}</td>
      <td><button onClick={goToEditPost}>Edit </button></td>
      <td><button onClick={deletePost}>Delete </button></td>
    </tr>
  )
}

function PostDashboard(props){
  const user = props.User;
  const [table,setTable] = useState([]);

  dashboardLoad.load(user.user_id)
  .then(response =>{
    setTable(response.data);
  })
  .catch(err=>{
    console.log(err);
  });

  return(
    <>
      <div id="postDB">
      <h1>Your All Post</h1>
      <table id="posttb">
        <thead>
          <tr>
            {/* <th>User ID</th>
            <th>User UID</th>
            <th>Post UID</th> */}
            <th>Photo</th>
            <th>Post date</th>
            <th>Tags</th>
            <th>Addr</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {table.map((post,idx)=>{
            return <Rows key={idx} post={post} index={idx} table={table} EditPostFunc={props.EditPostFunc}/> 
          })}
        </tbody>
      </table>  
      </div>    
    </>
  )
}
export default PostDashboard;