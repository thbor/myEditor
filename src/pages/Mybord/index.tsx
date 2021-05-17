import React from "react"
import {Rnd} from "react-rnd"
const json = require("../Common/ui") 
let uiJson = json.default
console.log('123',uiJson)

const Mybord=()=>{
  let saveJsonstr = sessionStorage.getItem("saveJson")
  let saveJson = []
  if(saveJsonstr){
    saveJson = JSON.parse(saveJsonstr)
    console.log('saveJson',saveJson)
  }
  const getComponent=(item1:any)=>{
    console.log('item',item1)
    let index = uiJson.findIndex((item:any)=>item1.name===item.name&&item1.type===item.type&&item.title===item1.title)
    if(index>-1){
      let currentItem = uiJson[index]
      return <currentItem.Component item={currentItem} />
    }
  }
  return (
    <div>
      {saveJson&&saveJson.length&&saveJson.map((item:any,index:number)=>(
         <Rnd
         style={{background:'white'}}
         key={item.id}
         id={item.id}
         disableDragging={true}
         enableResizing={false}
         default={{
           x: item.x||0,
           y: item.y||0,
           width:item.name.indexOf("table")>-1?400:item.style.width||0,
           height:item.name.indexOf("table")>-1?400:item.style.height||0,
         }}
         bounds="parent"
       >
         <div style={{padding:20,width:'100%',height:'100%'}}>
           {getComponent(item)}
         </div>
       </Rnd>
      ))}
    </div>
  )
}
export default Mybord