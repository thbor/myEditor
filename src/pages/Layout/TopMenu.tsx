import React from "react"
import {Select, Tooltip} from "antd"
import { useState,useEffect } from "react";
import store from "../../redux/store"
import { setUI,setFullScreen,setSaveJson } from "../../redux/action";
import { FullscreenOutlined ,FullscreenExitOutlined, PropertySafetyFilled} from "@ant-design/icons";
const {Option} = Select
export default function TopMenu(props:any) {
  const [currentUI,setCurrentUI] = useState("Antd")
  const [myFullScreen,setMyFullScreen] = useState(store.getState().fullScreen)
  const changeUi=(value:string)=>{
    setCurrentUI(value)
    store.dispatch(setUI(value))
  }
  const onFullScreen=()=>{
    //放大
    store.dispatch(setFullScreen(true))
    //将json数据保存在redux里面
    store.dispatch(setSaveJson(props.json))
  }
  const exitFullScreen=()=>{
    store.dispatch(setFullScreen(false))
  }
  useEffect(()=>{
    store.subscribe(()=>{
      setMyFullScreen(store.getState().fullScreen)
      })
  },[])
  const saveDoms=()=>{
    console.log("props.json",props.json)
    let id = (Math.random()+"").slice(3)
    
  }
  return (
    <div style={{float:'right'}}>
      {/* UI：
      <Select onChange={changeUi} value={currentUI} style={{width:"150px",textAlign:'center'}}>
        <Option value="Antd">Antd</Option>
        <Option value="ElementUI">ElementUI</Option>
      </Select> */}

      <div style={myFullScreen?{display:'none'}:{cursor:'pointer',height:0}} onClick={onFullScreen}>
        <Tooltip title="全屏">
          <FullscreenOutlined />
        </Tooltip>
      </div>
      <div style={myFullScreen?{cursor:'pointer',height:0}:{display:'none'}} onClick={exitFullScreen}>
        <Tooltip title="退出全屏">
          <FullscreenExitOutlined />
        </Tooltip>
      </div>
      <div style={{position:'relative',right:'40px',cursor:'pointer',}} onClick={saveDoms}>保存</div>
      {/* <div style={{float:'right',cursor:'pointer',fontSize:20}}><FullscreenExitOutlined /></div> */}
      {/* <FullscreenExitOutlined /> */}
    </div>
  );
}
