import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import editUserSrv from '../services/editUserSrv';

function EditUser(props) {
  let userData = props.User;
  const navigate = useNavigate();

	const [inputval, setInput] = useState({
		email: props.User.email,
    dob: props.User.birthday,
    gender: props.User.gender
	});

  const editUserFunc = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    formData.append("uid", userData.user_uid);

    editUserSrv.edit(formData)
    .then(response =>{
      console.log(response);
      if(response.data == "DONE"){
        props.editUserFun(p=>(
          {...p, email:inputval.email, birthday:inputval.dob, gender:inputval.gender}
          ))
        navigate("/main")
      }
    })
    .catch(err=>{
      console.log(err);
    });
  }

	const onInputChange = (e) => {
		setInput(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};

  return (
    <div id="editU">
      <h1>User Information</h1>
    <form method='POST' onSubmit={(event)=>editUserFunc(event)} id="editUser">
		  <div className='q1'>
        <label>E-mail</label>
      <input type='email' name='email' placeholder='Enter new email' value={inputval.email} onChange={onInputChange}
			required/>
      </div>

      <div className='q2'>
      <label>Birthday</label>
		  <input type='date' name='dob' value={inputval.dob} onChange={onInputChange} required></input>
		  </div>
      <div className='q3'>
      <label>Gender</label>
      <select name='gender' defaultValue={inputval.gender} onChange={onInputChange} required>
        <option disabled>Gender</option>
        <option>Female</option>
        <option>Male</option>
        <option>Non-binary</option>
        <option>Other</option>
        <option>Prefer not to say</option>
		  </select>
      </div>
      <button type='submit'>Submit</button> 
    </form>
    </div>
  );
};
export default EditUser;