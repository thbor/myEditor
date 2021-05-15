import React, { useState,useEffect } from 'react';
import {  message, Button,Input } from 'antd';
import { Select } from 'antd';
import request from 'umi-request';
import { Modal } from 'antd';
import CommonModal from './../../../Common/CommonModal';
const {Option} = Select
const { TextArea } = Input;
export default function InterfaceModal(props:any) {
  const [columnsJson,setColumnsJson] = useState<any[]>([])
  const [tableDataJson,setTableDataJson] = useState<any[]>([])
  const [methodStr,setMethodStr] = useState<"GET"|"POST">("GET")
  const [href,setHref] = useState<string>("")
  const [token,setToken] = useState<string>("")
  const [params,setParams] = useState<string>("")
  let tokenstr = {Authorization: `Bearer ${token}`}

  useEffect(()=>{
    console.log("init初始化")
    if(params){
      let paramsJSON = JSON.parse(params)
      console.log('paramsJSON',paramsJSON)
      paramsJSON.page = props.currentPage;
      paramsJSON.currentPage = props.currentPage;
      paramsJSON.pageSize = props.pageSize;
      let paramsJson = JSON.stringify(paramsJSON)
      setParams(paramsJson)
      getDataByUrl(paramsJson)
    }
  },[props.currentPage,props.pageSize])
  const getUrlData=(e:any)=>{
    let href = e.target.value;
    setHref(href)
  }
  const changeMethod=(value:'GET'|'POST')=>{
    setMethodStr(value)
  }
  const getParams=(e:any)=>{
    let params = (e.target.value).trim();
    if(params){
      let paramsJson = (params)
      setParams(paramsJson)
    }
  }
  const getDataByUrl=(requestPlayLoadParams?:any)=>{
    if(methodStr==="POST"){
    //1.Request Playload為params
    if(params){
      let paramsJSON = JSON.parse(params)
      // let tokenstr = {Authorization: `Bearer ${token}`}
      let api = {
        params:{},
        data:paramsJSON,
        headers:tokenstr
      }
      let promise = request.post(href,api)
      // let promise = request.post(href, {params:{},data:paramsJSON})
      promise.then((res)=>{
        if(res){
          let data = res.data.data;
          let currentPage = res.data.page
          let pageSize = res.data.pageSize
          let totalRow = res.data.totalRow
          data.forEach((item:any,index:number)=>item.key=index+1)
          let columns = getDefaultColumns(data)
          setTableDataJson(data)
          props.emitTableParams({tableData:data,columns,currentPage,pageSize,totalRow})
        }
        // props.emitChangeTableData(data)
        // props.emitChangeColumns(columns)
      }) 
    }
    }
    else if(methodStr==="GET"){
      let api = {
        params:{},
        headers:tokenstr
      }
      let promise = request.get(href,api)
      promise.then((res)=>{
        if(res){
          let data = res.data;
          console.log('ddd',data)
          data.forEach((item:any,index:number)=>item.key=index+1)
          setTableDataJson(data)
          let columns = getDefaultColumns(data)
          let totalRow = data.length
          props.emitTableParams({tableData:data,columns,currentPage:1,pageSize:totalRow,totalRow})
        }
      })
    }else{
      message.error("暫不支持")
    }
     
    
  }
  const getDefaultColumns=(data:any)=>{
    let arr = []
    if(data?.length){
      let obj = data[0];
      let keys = Object.keys(obj);
      for(let i=0;i<keys.length;i++){
        let columnsObj =  {"label":keys[i],"key":keys[i],"dataIndex":keys[i],"title":keys[i]};
        arr.push(columnsObj)
      }
    }
    return arr;
  }
  return (
    <CommonModal
    visible={props.visible}
    title="接口设置"
    emitClose={()=>props.emitClose()}
    content={
    <div>
      <div>
        <Select value={methodStr} onChange={(value:'GET'|'POST')=>changeMethod(value)}>
          <Option value="GET">GET</Option>
          <Option value="POST">POST</Option>
        </Select>
      </div>
      <div style={{marginTop:10}}>
        <Input placeholder="请输入接口" onChange={(e)=>getUrlData(e)}/>
      </div>
     <div style={{marginTop:10}}>
      <TextArea rows={3} placeholder="请输入Request PayLoad参数" onChange={(e)=>getParams(e)}/>
     </div>
     <div style={{marginTop:10}}>
        <Input placeholder="请输入TOKEN" onChange={(e)=>setToken(e.target.value)}/>
      </div>
     <div style={{marginTop:10}}>
       <Button type="primary" onClick={()=>getDataByUrl(params)}>获取接口数据</Button>
     </div>
      
    </div>
    }
    />
    
  );
}
