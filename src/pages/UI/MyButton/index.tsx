import React from "react"
import { Button } from 'antd';

export default function MyButton(props:any){
  const clickHandle=()=>{
    console.log("關聯需要綁定的字段",props)
    // 目前全部綁定頁面上的字段

  }
  return (
    <>
     <Button type="primary" onClick={()=>clickHandle()}>
      {props.title||"查詢"}
    </Button>
    </>
  )
}