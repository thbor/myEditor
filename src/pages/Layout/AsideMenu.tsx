import React from "react";
import "./style.css"
import store from "../../redux/store"
import { useEffect, useState } from "react";
import "./style.css"
import "../global.css"
import StaticTable from '../UI/MyTable/StaticTable';
import MyInput from './../UI/MyInput/index';
import Luckysheet from './../Luckysheet/index';
export default function AsideMenu(props:any) {
  const [UI,setUI] = useState(store.getState().UI)
  useEffect(()=>{
    let subscribtion = store.subscribe(()=>{
      let UI = store.getState().UI
      setUI(UI)
    })
    return subscribtion
  },[])
  //新建一个静态表格
  const CreateStaticTable=()=>{
    props.createTable("static")
  }
  const createComponent=(item:any)=>{
    props.createComponent(item)
  }
  let uiJson = [
    {title:"Luckysheet",name:'table',type:'static',Component:Luckysheet,width:500,height:500},
    {title:"antd表格",name:'table2',type:'static2',Component:StaticTable},
    // {title:"动态表格",name:'table',type:'dynatic',Component:<StaticTable/>},
    // {title:"文字",name:'Text',type:'Text',Component:<MyText/>},
    // {title:"按钮",name:'Button',type:'Button',Component:<MyButton/>},
    {title:"Input",name:'Input',type:'Input',Component:MyInput},
    // {title:"表单",name:'Input',type:'Input',Component:<MyInput/>},
  ]
  return (
    <div className="mainColor">
      <div>当前UI:{UI}</div>
      <div className="mt-1">
        {uiJson.map((item:any,index:number)=>(
          <div className="block inline"  key={index} onClick={()=>createComponent(item)}>{item.title}</div>
          ))}
        {/* <div className="block" onClick={CreateStaticTable}>静态表格</div> */}
      </div>
    </div>
  );
}
