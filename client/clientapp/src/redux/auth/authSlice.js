//create redux slice
import { createSlice,createAsyncThunk, isPending } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import axios from 'axios';

//make http req using redux-tunk middleware
export const userAuthorLoginThunk= createAsyncThunk('user-author-login',async(userCredObj,thunkApi)=>{
  try{
    if(userCredObj.userType==='user'){
      const res= await axios.post('http://localhost:4001/user-api1/login',userCredObj)
      if(res.data.message==="login success"){
        //store token in local/session storage
        // localStorage.getItem() to get the data
        // localStorage.setItem() to set the data
        // localStorage.removeItem() to remove the data
        //simalryly with sessionStorage
        //sessionStorage.getItem
        localStorage.setItem('token',res.data.token)
        //return data
      }else{
        return thunkApi.rejectWithValue(res.data.message)
      }
      return res.data;
    }

    if(userCredObj.userType==='author'){
      const res=await axios.post('http://localhost:4001/author-api/login',userCredObj)
      if(res.data.message==="login success"){
        localStorage.setItem('token',res.data.token)
          //return data
      }else{
        return thunkApi.rejectWithValue(res.data.message)
      }
      return res.data;
    }
  }catch(err){
      return thunkApi.rejectWithValue(err)}
  
})

//
 export const authSlice = createSlice({
  name: "user-author-login",
  initialState:{
    isPending:false,
    loginUserStatus:false,
    currentUser:{},
    errerOccurred:false,
    errMsg:''
  },
  reducers: {
    resetState:(state,action)=>{
      state.isPending=false;
      state.currentUser={};
      state.loginUserStatus=false;
      state.errerOccurred=false;
      state.errMsg=""

    }
  },
  extraReducers:(builder)=>builder
  .addCase(userAuthorLoginThunk.pending,(state,action)=>{
    state.isPending=true;
  })
  .addCase(userAuthorLoginThunk.fulfilled,(state,action)=>{
      state.isPending=false;
      state.currentUser=action.payload.user;
      state.loginUserStatus=true;
      state.errerOccurred=false;
      state.errMsg=""
  })
  .addCase(userAuthorLoginThunk.rejected,(state,action)=>{
      state.isPending=false;
      state.currentUser={};
      state.loginUserStatus=false;
      state.errerOccurred=true;
      state.errMsg=action.payload;
  })
});

//exportaction creator function
export const {resetState
} = authSlice.actions;

//export root reducer of this slice
export default authSlice.reducer;
