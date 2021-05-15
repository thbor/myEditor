
import React from "react"
import StaticTable from '../UI/MyTable/StaticTable';

export default function MyComponnet(props:any){
  let json = [{name:"table",type:'static',component:<StaticTable/>}]
  let name = props.name;
  let type = props.type;
  let index = json.findIndex((item:any)=>item.name === name&&item.type === type)
  return (
    <div>
     {index>-1&&json[index].component}
    </div>
  )
}