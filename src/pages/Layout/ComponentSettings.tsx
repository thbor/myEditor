import React from 'react';
import {  Button,Input } from 'antd';
export default function ComponentSettings(props:any) {
  console.log(props.item)
  let componentChilren = props.item.componentChilren    //組件內的值，點擊事件等
 
  console.log('componentChilren',componentChilren)

  let keys = componentChilren&&Object.keys(componentChilren)
 
  const changeValue=(e:any,key:string)=>{
    componentChilren[key] = e.target.value 
  }
  const saveAttr=()=>{
    console.log('componentChilren',componentChilren)
    props.emitSuccess(componentChilren)
  }
  return (
    <div>
      <div className="center">組件樣式修改及數據綁定</div>
      {keys&&keys.length&&keys.map((key:any,index:number)=>{
          let ref:any = React.createRef()
          return (
          typeof (componentChilren[key]) === "string"?
         <div key={index}>
           <Input placeholder={"請輸入"+key} ref={ref} defaultValue={componentChilren[key]} style={{marginTop:'5px'}} onChange={(e)=>changeValue(e,key)}></Input>
        </div>:
        ""
        )
      })}
      <br/>
      <Button type="primary" onClick={saveAttr}>保存</Button>
    </div>
  );
}
