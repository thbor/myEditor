import React,{useEffect,useState} from "react"
import { Input } from 'antd';

export default function MyInput(props:any){
  let defaultPlaceholder = "請輸入"
  const [placeholder,setPlaceholder] = useState(props.item.componentChilren.placeholder||defaultPlaceholder)
  const [defaultValue,setDefaultValue] = useState(props.item.componentChilren.defaultValue||"")
  const [value,setValue] = useState(props.item.componentChilren.value||"")    //value需要綁定字段

  useEffect(()=>{
    setPlaceholder(props.item.componentChilren.placeholder||defaultPlaceholder)
    // setValue(props.item.componentChilren.value||"")
    setDefaultValue(props.item.componentChilren.defaultValue||"")
  },[props])
  let ref:any = React.createRef()
  console.log('ref',ref)
  return (
    // value={value}  disabled={props.item.disableDragging}
     <Input ref={ref} placeholder={placeholder} defaultValue={defaultValue} style={{width:'100%',height:'100%'}} />
  )
}