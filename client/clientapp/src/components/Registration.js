import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Register() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();
  let [err,setErr]=useState('')
  let {currentUser}=useSelector(
    (state)=>state.authorUser
  );

  async function onRegisterSubmit(userObj) {
    //make http post req
    if(userObj.userType==='user'){
      let res=await axios.post('http://localhost:4001/user-api1/user',userObj)
      console.log(res)
      if(res.data.message==="User created"){
        navigate('/login');}
      else{
        setErr(res.data.message)}
      }
      if(userObj.userType==='author'){
        let res=await axios.post('http://localhost:4001/author-api/author',userObj)
        console.log(res)
        if(res.data.message==="Author created"){
          navigate('/login');}
        else{
          setErr(res.data.message)}
      
      }
  }
  console.log(err)

  return (
    <div className="container mt-5">
      <div className='row justify-content-center mt-5'>
        <div className='col-lg-3 col-md-4 col-sm-5'>
          <div className='card shadow'>
            <div className='card-title text-center border-bottom'>
              <h2 className='p-3'>Signup</h2>
            </div>
            <div className='card-body'>
              {/* display user signuo error message */}
              {err.length!==0 && <p className='text-danger fs-3'>{err} </p>}
              <form onSubmit={handleSubmit(onRegisterSubmit)}>
                {/* Radio buttons */}
                <div className='mb-4'>
                  <label htmlFor='user' className='form-check-label d-block m-auto' style={{ fontSize: "18px" }}>
                    signup as
                  </label>
                  <div className='form-check d-flex justify-content-evenly'>
                    <input
                      type='radio'
                      className='form-check-input'
                      id='author'
                      value="author"
                      {...register("userType")}
                    />
                    <label htmlFor='author' className='form-check-label'>
                      Author
                    </label>
                    <input
                      type='radio'
                      className='form-check-input'
                      id='user'
                      value="user"
                      {...register("userType")}
                    />
                    <label htmlFor='user' className='form-check-label'>
                      User
                    </label>
                  </div>
                </div>

                {/* Username */}
                <div className='mb-4'>
                  <label className='form-label' htmlFor="formBasicUsername">
                    Username
                  </label>
                  <input
                    className='form-control'
                    type="text"
                    placeholder="Enter username"
                    {...register("username")}
                  />
                </div>

                {/* Password */}
                <div className='mb-4'>
                  <label className='form-label' htmlFor="formBasicPassword">
                    Password
                  </label>
                  <input
                    className='form-control'
                    type="password"
                    placeholder="Enter password"
                    {...register("password")}
                  />
                </div>

                {/* Email */}
                <div className='mb-4'>
                  <label className='form-label' htmlFor="formBasicEmail">
                    Email
                  </label>
                  <input
                    className='form-control'
                    type="email"
                    placeholder="Enter email"
                    {...register("email")}
                  />
                </div>

                {/* Submit button */}
                <div className='d-grid'>
                  <button type="submit" className='btn btn-primary'>
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
