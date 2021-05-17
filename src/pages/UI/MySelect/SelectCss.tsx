import React,{useState} from "react"
import {Input, Button} from "antd"
const SelectCss=(props:any)=>{
  const [key,setKey] = useState("")
  const [placeholder,setPlaceholder] = useState("")
  const save=()=>{
    let params = {
      key,
      placeholder
    }
    props.emitParams(params)
  }
  const changeKey=(e:any)=>{
    setKey(e.target.value)
  }
  const changePlaceHolder=(e:any)=>{
    setPlaceholder(e.target.value)
  }
  let componentChilren = props.item&&props.item.componentChilren
  return (
    <>
    <div>綁定屬性key:<Input defaultValue={componentChilren&&componentChilren.key} onChange={(e)=>changeKey(e)} placeholder="請輸入綁定值"/></div>
    <div>placeholder:<Input defaultValue={componentChilren&&componentChilren.placeholder} onChange={(e)=>changePlaceHolder(e)} placeholder="請輸入提示值"/></div>
    <Button onClick={()=>save()}>保存</Button>
    </>
  )
}
export default SelectCss