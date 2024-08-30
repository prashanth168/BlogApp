import { useForm } from 'react-hook-form';
import { userAuthorLoginThunk } from '../redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



function LoginPage() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let {loginUserStatus,errerOccurred,
    errMsg,currentUser}=useSelector(state=>state.authorUser)
  let dispatch=useDispatch()
  let navigate=useNavigate()


  function onLoginSubmit(userObj) {
    console.log(userObj);
    dispatch(userAuthorLoginThunk(userObj))

  }

  useEffect(()=>{
    if(loginUserStatus===true){
      if(currentUser.userType==="author"){
        navigate('/author-profile')}
      else{
        navigate('/user-profile')
      }
      }
  },[loginUserStatus,currentUser])

  return(
  <div className="container mt-5">
      <div className='row justify-content-center mt-5'>
        <div className='col-lg-3 col-md-4 col-sm-5'>
          <div className='card shadow'>
            <div className='card-title text-center border-bottom'>
              <h2 className='p-3'>Signin</h2>
            </div>
            <div className='card-body'>
              <form onSubmit={handleSubmit(onLoginSubmit)}>
                {/* Radio buttons */}
                <div className='mb-4'>
                  <label htmlFor='user' className='form-check-label d-block m-auto ' style={{ fontSize: "18px" }}>
                    signin as
                  </label>
                  <div className='form-check d-flex justify-content-evenly'>
                    <input
                      type='radio'
                      className='form-check-input  '
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

                {/* Submit button */}
                <div className='d-grid'>
                  <button type="submit" className='btn btn-primary'>
                    Login
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

export default LoginPage;
