import React from 'react';
import { Rnd } from "react-rnd";
import Luckysheet from "../Luckysheet/index"
import "./styles.less"
import { useState } from 'react';
const Dashbord=()=>{
  let json = [
    {id:"1",x:0,y:0,width:"500px",height:"500px"},
  ]
  // const [json,setJson] = useState(myjson)
  const clickOne=(item:any,index:number)=>{
    findElement(item,index)
    // json[index] = one
    // console.log("json",json)
    // setJson(myjson)
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
  console.log("json111",json)
  return (
    <div style={{width:'100%',height:'100vh',padding:'20px'}} className="content">
      <div style={{background:'white',height:'100%'}}>
        {/* {json.map((item:any,index:number)=>(
          <Rnd
          onClick={()=>clickOne(item,index)}
          onResize={(e)=>resizeOne(e,item,index)}
          style={{background:'white',border:'1px solid gray'}}
          key={item.id}
          id={item.id}
          disableDragging={false}
          default={{
            x: item.x||0,
            y: item.y||0,
            width:item.width||0,
            height:item.height||0,
          }}
          bounds="parent"
        >
          <Luckysheet
          styles={{
            width:'100%',
            height:'100%',
            overflow:'hidden',
            background:'red'
          }}
          />
      </Rnd>
        ))} */}
      </div>

     
    </div>
  )
}
export default Dashbord