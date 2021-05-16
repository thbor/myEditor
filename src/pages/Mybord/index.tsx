import React from "react"
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
      {saveJson.map((item:any,index:number)=>(
        <div key={index}>{getComponent(item)}</div>
      ))}
    </div>
  )
}
export default Mybord