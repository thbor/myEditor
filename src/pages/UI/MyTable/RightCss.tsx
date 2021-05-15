import React, { useState } from 'react';
import { message } from 'antd';
export default function RightCss(props:any) {
  const [columnsJson,setColumnsJson] = useState<any[]>([])
  const [tableDataJson,setTableDataJson] = useState<any[]>([])
  const changeFile=(event:any)=>{
    console.log(event)
    let file = event.target.files[0]
    // var file = event
    if(!!file){
      var reader=new FileReader();
      reader.readAsText(file,"UTF-8");//gbk编码
      reader.onload=function () {
        console.log(this.result);//打印检查
        if(this.result&&typeof this.result==="string"){
          let columns = JSON.parse(this.result)
          setColumnsJson(columns)
          props.emitChangeColumns(columns)
        }else{
          message.error("上传数据有误")
        }
      };
    }else{
      message.error("上传数据有误")
    }
  }
  const changeDataFile=(event:any)=>{
    console.log(event)
    let file = event.target.files[0]
    // var file = event
    if(!!file){
      var reader=new FileReader();
      reader.readAsText(file,"UTF-8");//gbk编码
      reader.onload=function () {
        console.log(this.result);//打印检查
        if(this.result&&typeof this.result==="string"){
          let data = JSON.parse(this.result)
          setTableDataJson(data)
          props.emitChangeTableData(data)
        }else{
          message.error("上传数据有误")
        }
      };
    }else{
      message.error("上传数据有误")
    }
  }
  return (
    <div style={{color:'white'}}>
      <div className="center">組件樣式修改及數據綁定</div>
      <div>列字段绑定(json)</div>
      <input id="columnsFile" type="file" onChange={(e)=>changeFile(e)} />
      <div>数据绑定(json)</div>
      <input id="tableFile" type="file" onChange={(e)=>changeDataFile(e)} />
      
      {/* 列绑定 */}
      {/* 字段绑定 */}
      {/* 数据绑定 */}
    </div>
  );
}
