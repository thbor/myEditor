import React from 'react';
import { Button } from 'antd';
import {useDispatch,useSelector} from "umi"
import { connect } from "dva";
import { useEffect } from 'react';

const Test=()=>{
  const selectState=(s:any)=>{
    console.log("selectState",s)
    return s.test
  }
  const dispatch = useDispatch()
  const state = useSelector((s: any) => selectState(s));
  
  console.log("11state",state)
  useEffect(()=>{
    getData()
  },[])
  const getData=()=>{
    // http://10.244.231.135:8080/dfmqa/api/search/getunchangeitem
    // http://jsonplaceholder.typicode.com/posts/1/comments
    // let data = fetch('/api/users')
    let data = fetch('/api/getunchangeitem')
    .then(function(response) {
    return response.json(); //返回响应的结果的promise。
    })
    .then(function(myJson) {
    console.log(myJson); //resolve回调
    });
    console.log("data12",data)

    
  }
  return (
    <>
     <Button onClick={()=>{
       dispatch({type:"test/addCount",payload:state})
     }}>{state}</Button>
     
    </>
  )
}
export default connect(({ test }) => ({ test }))(Test);