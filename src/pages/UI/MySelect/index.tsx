import React,{useEffect,useState} from "react"
import { Select } from 'antd';
import { isArray } from 'util';
import SelectCss from './SelectCss';
import CommonDrawer from './../../Common/CommonDrawer';
const {Option} = Select
interface Option{
  label:string,
  value:string
}
export default function MySelect(props:any){
  let testJson = [
    {label:"X1780",value:"X1780"},
    {label:"X1984",value:"X1984"}
  ]
  const [options,setOptions] = useState(testJson)
  const [placeholder,setPlaceholder] = useState("")
  const [visible,setVisible] = useState(false)
  interface params{
    key:string,
    placeholder:string
  }
  useEffect(()=>{
    if(props.options&&isArray(options)){
      setOptions(props.options)
    }
  },[props])
  const close=()=>{
    setVisible(false)
  }
  const emitParams=(params:any)=>{
    console.log(1,props)
    close();
    let item = props.item
    let keys:any = Object.keys(params)
    for(let i=0;i<keys.length;i++){
      let key = keys[i]
      item.componentChilren[key] = params[key]
    }
    console.log('item',item)
    let componentChilren = item.componentChilren
    let placeholder = componentChilren.placeholder
    setPlaceholder(placeholder)

  }
  return (
    <>
    <a className="commonSetting" onClick={()=>setVisible(true)}>設置</a>
      <Select style={{width:'100%',height:'100%'}} placeholder={placeholder} allowClear>
        {options&&options.length&&options.map((item:Option,index:number)=>(
          <Option key={index} value={item.value}>{item.label}</Option>
        ))}
      </Select>
      {visible&&<CommonDrawer
      visible={visible}
      content={<SelectCss/>}
      emitClose={()=>close()}
      />}

      <CommonDrawer
      // currentItem={currentItem}
      visible={visible}
      emitClose={()=>close()}
      content={
      <SelectCss item={props.item} emitParams={(params:any)=>emitParams(params)}/>
      }
      // content={<ComponentSettings item={currentItem} emitSuccess={(componentChilren:any)=>emitSuccess(componentChilren)}/>}
      />
    </>
  )
}