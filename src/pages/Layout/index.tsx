import React, { useState,useEffect } from "react"
import AsideMenu from "./AsideMenu"
import ComponentSettings from "./ComponentSettings"
import MainCanavs from "./MainCanavs"
import "./style.css"
import _ from "lodash";
import store from "../../redux/store"

interface jsonObj {
  id:string|number,
  name:string,
  type:string,
  title:string,
  Component:any,
  x:number,
  y:number,
  width?:number|string,
  height?:number|string,
  padding?:string,
  isEdit?:boolean,
  border?:string,
  style?:any,
  disableDragging?:boolean,   //是否不能拖动
  
}
export default function Layout() {
  let defaultX = 0
  let defaultY = 0
  // let defaultWidth = 100
  // let defaultHeight = 100
  const [json,setJson]=useState<jsonObj[]>([])
  const [myFullScreen,setMyFullScreen]=useState<boolean>(false)
  //初始化编辑时给一个style的padding和border作为可编辑的style
  const createComponent=(attr:string)=>{
    console.log('createComponent',attr)
    let obj:any = attr
    if(!obj.x) {obj.x = defaultX}
    if(!obj.y) {obj.y = defaultY}
    // if(!obj.width) {obj.width = 'auto'}
    // if(!obj.height) {obj.height = 'auto'}
    obj.id = Math.random()
    obj.style={
      border:'1px dotted',
      padding:'20px',
      width:obj.width||'auto',
      height:obj.height||'auto'
    }
    let oldjson = _.cloneDeep(json)
    oldjson.push(obj)
    console.log('oldjson',oldjson)
    setJson(oldjson)
  }
  const emitDelete=(index:number)=>{
    let oldjson = _.cloneDeep(json)
    oldjson.splice(index,1)
    setJson(oldjson)
  }
  const emitSave=(index:number)=>{
    let oldjson = _.cloneDeep(json)
    oldjson[index].disableDragging = true
    setJson(oldjson)
  }
  const emitEdit=(index:any)=>{
    let oldjson = _.cloneDeep(json)
    oldjson[index].disableDragging = false
    setJson(oldjson)
  }
  useEffect(()=>{
    store.subscribe(()=>{
      console.log(198,store.getState())
      setMyFullScreen(store.getState().fullScreen)
      })
  },[])
  const emitChangeJson=(item:any)=>{
    let id = item.id;
    let oldjson = _.cloneDeep(json);
    let idIndex = oldjson.findIndex((objitem:any)=>objitem.id === id);
    if(idIndex>-1){
      oldjson[idIndex] = item
    }
    setJson(oldjson)
  }

  return (
    <div>
      {
      <>
        <div style={myFullScreen?{display:'none'}:{}} className="left"><AsideMenu createComponent={(attr:any)=>createComponent(attr)}/></div>
        <div className={myFullScreen?"":"main"}><MainCanavs json={json} emitDelete={emitDelete} emitSave={emitSave} emitEdit={emitEdit} emitChangeJson={emitChangeJson}/></div>
      </>
      }
    </div>
  );
}
