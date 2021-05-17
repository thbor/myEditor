import React, { useEffect } from "react"
import TopMenu from "./TopMenu"
import "./style.css"
import { useState } from "react";
import MyComponnet from './../MyComponnet/index';
import { Rnd } from "react-rnd";
import Luckysheet from "../Luckysheet/index"
import ComponentSettings from './ComponentSettings';
import store from "../../redux/store"
import { Drawer } from 'antd';
import CommonDrawer from './../Common/CommonDrawer';
import CommonModal from './../Common/CommonModal';
export default function MainCanavs(props:any) {
  const [drawerVisible,setDrawerVisible] = useState(false)
  const [currentItem,setCurrentItem] = useState({})
  const [propsJson,setPropsJson] = useState([])
  useEffect(()=>{
  console.log("json2",props.json)
  setPropsJson(props.json)
  },[props.json])
 
  const clickOne=(item:any,index:number)=>{
    console.log('123')
    findElement(item,index)
  }
  const resizeOne=(e:any,item:any,index:number)=>{
    var timeout:any;
    clearTimeout(timeout)
    timeout = setTimeout(()=>{
      let dom = e.path[2]
      let offsetHeight = dom.offsetHeight
      let offsetWidth = dom.offsetWidth
      item.width = offsetWidth
      item.height = offsetHeight
    },1000)
  }
  const findElement=(one:any,index:number)=>{
		let id = one.id;
		let dom = document.getElementById(id);
		let transform = dom?.style.transform;
		let width = dom?.style.width;
		let height = dom?.style.height;
		if(transform){
			let str1 = transform?.split("(");
			let str2 = str1[1].split(")");
			let str3 = str2[0];
			let str4 = str3.split(",")
			let x = Number(str4[0].split('px')[0])
			let y = Number(str4[1].split('px')[0])
			one.x = x-20
			one.y = y-20
			one.width = width
      one.height = height
    }
    return one
  }
  const deleteOne=(index:number)=>{
    props.emitDelete(index)
  }
  const showCssChange=(index:any)=>{
    props.emitEdit(index)
  }
  const save=(index:any)=>{
    props.emitSave(index)
  }
  const getDragsById=(targetId:any)=>{
    let alldrags:any = document.querySelectorAll('.react-draggable')
    if(alldrags?.length){
      for(let item of alldrags){
        if(item.id+"" === targetId+""){
          return {targetItem:item}
        }
      }
    }
  }
  const changeAttr=(item:any)=>{
    // setDrawerVisible(true)
    setCurrentItem(item)
  }
  const emitSuccess=(componentChilren:any)=>{
    setCurrentItem(componentChilren)
    // setDrawerVisible(false)
    console.log('currentItem',currentItem)
    props.emitChangeJson(currentItem)
  }
  console.log("props.json",propsJson)
  return (
    <div>
      <div className="topMenu" >
        <TopMenu json={propsJson} />
      </div>
      <div className="mainCanvas">
      <div style={{width:'100%',height:'calc(100vh - 2px)',padding:'10px'}} className="content">
      <div style={{background:'white',height:'100%'}}>
        {propsJson&&propsJson.length&&propsJson.map((item:any,index:number)=>(
          <Rnd
          onClick={()=>clickOne(item,index)}
          onResize={(e)=>resizeOne(e,item,index)}
          style={{background:'white',border:'1px solid gray'}}
          key={item.id}
          id={item.id}
          disableDragging={item.disableDragging}
          enableResizing={!item.disableDragging}
          default={{
            x: item.x||0,
            y: item.y||0,
            // width:item.width>400?400:item.style.width||0,
            // height:item.height>400?400:item.style.height||0,
            width:item.name.indexOf("table")>-1?400:item.style.width||0,
            height:item.name.indexOf("table")>-1?400:item.style.height||0,
          }}
          bounds="parent"
        >
          <div style={{float:'right',position:'fixed',zIndex:999}}>
            <a style={{marginRight:10}} onClick={()=>showCssChange(index)}>编辑</a>
            <a style={{color:'red',marginRight:10}} onClick={()=>deleteOne(index)}>删除</a>
            <a style={item.disableDragging?{display:'none'}:{marginRight:10}} onClick={()=>save(index)}>保存</a>
            <a style={item.disableDragging?{display:'none'}:{marginRight:10}} onClick={()=>changeAttr(item)}>屬性設置</a>

          </div>
          <div style={{padding:20,width:'100%',height:'100%'}}>
            {<item.Component styles={{width:'100%',height:'100%',overflow:'hidden'}} item={item} />}
          </div>
      </Rnd>
        ))}
          {/* <div className="right" style={store.getState().fullScreen?{display:'none'}:{}}>
            <ComponentSettings/>
          </div> */}
        </div>
      </div>

      </div>
      {/* {drawerVisible&&
      <CommonDrawer
      currentItem={currentItem}
      visible={drawerVisible}
      emitClose={()=>setDrawerVisible(false)}
      // content={currentItem.cssContent}
      // content={<ComponentSettings item={currentItem} emitSuccess={(componentChilren:any)=>emitSuccess(componentChilren)}/>}
      />
      } */}

    </div>
  );
}