import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import getAxiosWithToken from '../axiosWithToken';
import {FcClock} from "react-icons/fc"
import{CiEdit, ciEdit} from "react-icons/ci"
import {MdDelete} from "react-icons/md"
import {FcCalendar} from "react-icons/fc"
import {FcComments} from "react-icons/fc"
import {FcPortraitMode} from "react-icons/fc"
import {BiCommentAdd} from "react-icons/bi"
import {MdRestore} from "react-icons/md"

function Article() {
  let {currentUser}=useSelector(
    (state)=>state.authorUser
  );
  let {register,handleSubmit}=useForm();
  let [comment,setComment]=useState('')
  let [articleEditStatus,setArticleEditStatus]=useState(false)
  let navigate=useNavigate();
  let {state}=useLocation()

  let [currentArticle,setCurrentArticle]=useState(state)

  const deleteArticle= async()=>{
    let axiosWithToken=getAxiosWithToken();
    let art={...currentArticle}
    delete art._id;
    let res=await axiosWithToken.put(`http://localhost:4001/author-api/article/${currentArticle.articleId}`,art)
    if(res.data.message==='article deleted')
      setCurrentArticle({...currentArticle,status:res.data.payload})

  }
  const restoreArticle=async ()=>{
    let axiosWithToken=getAxiosWithToken();
    let art={...currentArticle}
    delete art._id;
    let res=await axiosWithToken.put(`http://localhost:4001/author-api/article/${currentArticle.articleId}`,art)
    if(res.data.message==='article restored')
      setCurrentArticle({...currentArticle,status:res.data.payload})
  }

  //add comments top an article by user
  const WriteComment=async (commentObj)=>{
    const axiosWithToken=getAxiosWithToken();
    commentObj.username=currentUser.username;
    let res=await axiosWithToken.post(`http://localhost:4001/user-api1/comment/${state.articleId}`,commentObj)
    if(res.data.message==='Comment posted'){
      setComment(res.data.message)
    }
  }

  // unable edit state
  const enableEditState=()=>{
    setArticleEditStatus(true)
  }

  //disable edit state
  const savemodifiedArticle=async (editedArticle)=>{
    let modifiedArticle={...state,...editedArticle}
    //change date of modification
    modifiedArticle.dateOfModification=new Date();
    console.log("Modifed Article",modifiedArticle)

    //remove _id as it is in string 
    delete modifiedArticle._id;

    //make http put req to save the modified article in db
    let axiosWithToken=getAxiosWithToken();
    let res=await axiosWithToken.put('http://localhost:4001/author-api/article',modifiedArticle)
    if(res.data.message==='Article modified'){
      navigate(`/author-profile/article/${modifiedArticle.articleId}`,{state:res.data.article})
    setArticleEditStatus(false)
    }
  }

  function IOStoUTC(iso){
    let date=new Date(iso).getUTCDate();
    let day=new Date(iso).getUTCDay();
    let year =new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  }
  // function handleSubmit(userObj){

  // }
  return (
    <div>{
      articleEditStatus===false?<><div>
      <div className='d-flex justify-content-between'>
        <div>
          <p className='display-3 me-4'>{state.title}</p>
          <span className='py-3'>
          <samll className="text-secondary me-4">
            <FcCalendar className='fs-4'/>
            Created on:{IOStoUTC(state.dateOfCreation)}
          </samll>  
          <samll className="text-secondary ">
            < FcClock className='fs-4'/>
            Modified on:{IOStoUTC(state.dateOfModification)}
          </samll>  
          </span>          
        </div>
        <div>
          {currentUser.userType==='author' && (
            <>
            {" "}
            <button className='me-2 btn btn-warning' onClick={enableEditState}>
            <CiEdit className='fs-3'/></button>
            {currentArticle.status===true ?(
            <button className='me-2 btn btn-danger' onClick={deleteArticle}>
            <MdDelete className='fs-3'/></button>):(
            <button className='me-2 btn btn-primary'onClick={restoreArticle} >
            <MdRestore className='fs-3'/></button>)
            }
            </>
          )}
        </div>
      </div>
        <p className='lead mt-3' style={{whiteSpace:'pre-line'}}>
          {state.content}
        </p>
        {/* //user comment */}
        <div>
          
        {/* read existing comment */}
        <div className='comments my-4'>
            {state.comments.length==0?(
              <p className='display-3'>No comments yet...</p>
            ):(
              state.comments.map((commentObj,ind)=>{
                return (
                  <div key={ind} className='bg-light p-3'>
                    <p className='fs-4'
                    style={{
                      color:"dodgerblue",
                      textTransform:"capitalize",
                    }}>
                      <FcPortraitMode className='fs-2 me-2'/>
                    {commentObj.username}
                    </p>
                    <p className='fs-4'
                    style={{
                      color:"blueviolet",
                      fontFamily:'fantasy',
                    }}>
                      <FcComments className=' me-3'/>
                    {commentObj.comment}
                    </p>
                    </div>
                )
              })
            )
          }
        </div>
        <h1 className='fs-1 text-dark'>Comments</h1>
          <h1 className='bg-seconary'>{comment}</h1>
          {/* //write comment by user// */}
          {currentUser.userType==='user' && (
            <form onSubmit={handleSubmit(WriteComment)}>
              <input 
              type='text'
              id='comment' 
              {...register('comment')}
              className='form-control mb-4' 
              placeholder='Write your comment here....'
              />
              <button type='submit' className='btn btn-success d-block m-auto'>Add comment<BiCommentAdd className='fs-3'/> </button>
            </form>
          )}
        </div>
      </div>
      </>:
      <form onSubmit={handleSubmit(savemodifiedArticle)}>
      <div className="form-group mb-3">
        <label htmlFor="title" className='form-label'>Title</label>
        <input
          type="text"
          id="title"
          className="form-control"
          {...register('title')}
          defaultValue={state.title}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="category">Select a Category</label>
        <select
          id="category"
          {...register('category')}
          className="form-select"
          defaultValue={state.category}
        >
          <option value="">Select a category</option>
          <option value="Programming">Programming</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className="form-control"
          rows="10"
          {...register('content')}
          defaultValue={state.content}
        ></textarea>
      </div>
      <div className="form-group mb-3">
        <button type="submit" className="btn btn-primary d-block m-auto">Save</button>
      </div>
    </form>
      }

    </div>
      
  )
}

export default Article