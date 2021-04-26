import React,{useState} from "react"
import menus from "./plugins/menus"
import {Menu} from "antd"
import {history} from "umi"
import 'handsontable/dist/handsontable.full.css'
import "handsontable/languages/zh-CN";

export default function IndexPage(children:any) {
  const [width,setWidth] = useState(200)
  const changeMenu=(menu:any)=>{
    history.push(menu.key)
  }
  const getContentStyle:any={
    width:window.innerWidth - width,
    left:width,
    position:"absolute",
    top:0,
  }
  return (
    <div>
      <Menu
      theme={"dark"}
      onClick={changeMenu}
      className="menu"
      style={{ width: width,height:'100vh', }}
      mode="inline"
      defaultSelectedKeys={[menus[0].path]}
      defaultOpenKeys={[menus[0].path]}
      >
      {menus.map((item:any)=>(
        <Menu.Item key={item.path}>{item.label}</Menu.Item>
      ))}
      </Menu>
      <div style={getContentStyle}>{ children.children }</div>
    </div>
  );
}