import React,{useEffect} from 'react';
import { Button } from 'antd';
import {export_json_to_excel} from "../../plugins/Export2Excel"

// import "../../plugins/luckysheet/iconfont.css"
// import "../../plugins/luckysheet/luckysheet.css"
// import "../../plugins/luckysheet/pluginsCss.css"
// import "../../plugins/luckysheet/plugins.css"

// import "../../plugins/luckysheet/plugin.js"
// import "../../plugins/luckysheet/luckysheet.umd.js"
const getSheetData=(json:any,columns:any)=>{
  let data:any = []
  
  let obj = { "name": "表格1", color: "", "status": "1", "order": "0", "celldata": [], "config": {}, "index":0 }
  data.push(obj)
  //如果第一个表格中有数据，则在index=0的地方去加入celldata数据

  let arr = []
  //表头
  for(let i=0;i<columns.length;i++){
    let celldata = {
      "r":0,
      "c":i,
      "v": {
        ct: {fa: "General", t: "g"},
        m:columns[i].label,
        v:columns[i].label
      }
    }
    arr.push(celldata)
  }
  for(let i=0;i<json.length;i++){     //数据为行
    for(let j=0;j<columns.length;j++){  //表名为列
      let key:any = columns[j].key
      
      let celldata = {
        "r":i+1,
        "c":j,
        "v": {
          ct: {fa: "General", t: "g"},
          m:json[i][key],
          v:json[i][key]
        }
      }
      arr.push(celldata)
    }
  }
  data[0].celldata = arr
  return data
}
const Luckysheet=(props:any)=>{
  let bgConfig:any = {}
  let percentageReg = /%$/;
  let json = [
    {name:"bobo",age:12,like:"swim"},
    {name:"小明",age:22,like:"打篮球"},
    {name:"小明",age:22,like:"打篮球"},
    {name:"小明",age:22,like:"打篮球"},
  ]
  let columns = [
    {label:"姓名",key:"name"},
    {label:"爱好",key:"like"},
    {label:"年龄",key:"age"},
  ]
  let data = getSheetData(json,columns)
  useEffect(()=>{
    const luckysheet = window.luckysheet;
    luckysheet.create({
        container: "luckysheet",
        title: '表格名称', // 设定表格名称
        lang: 'zh', // 设定表格语言
        data:data,
        // showinfobar:false,  //不显示首行
        showsheetbarConfig:false,
        showtoolbar: false,  //头部工具栏
        showsheetbar:false, //底部工具
        showtoolbarConfig:{ //头部允许禁止显示设置
          undoRedo: true,
          fontSize: true, // '字号大小'
          bold: true, // '粗体 (Ctrl+B)'
          mergeCell: true, // '合并单元格'
          sortAndFilter: true, // '排序和筛选'
          textColor: true, // '文本颜色'
          fillColor: true, // '单元格颜色'
          horizontalAlignMode: true, // '水平对齐方式'
        },
        cellRightClickConfig:{  //自定义配置单元格右击菜单
          copyAs:false, //复制为
          matrix: false, // 矩阵操作选区
          sort: false, // 排序选区
          filter: false, // 筛选选区
          chart: false, // 图表生成
          image: false, // 插入图片
          link: false, // 插入链接
          data: false, // 数据验证
          cellFormat: false // 设置单元格格式
        },
        functionButton:'<button id="download" class="btn btn-primary" style="padding:3px 6px;font-size: 12px;margin-right: 10px;">下载</button> <button class="btn btn-primary btn-danger" style=" padding:3px 6px; font-size: 12px; margin-right: 10px;">导入</button> <button class="btn btn-primary btn-primary" style=" padding:3px 6px; font-size: 12px; margin-right: 10px;">保存</button>',
        // userInfo:false, // 不展示用户信息
    });
  },[])
  useEffect(() => {
		let listener = ()=>{
		}
		window.addEventListener('resize', listener)
		return () => {
			window.removeEventListener('resize', listener);
		}
	}, [])
  const luckyCss:any = {
    margin: '0px',
    padding: '0px',
    position: 'relative',
    width: '100%',
    height: '100%',
    left: '0px',
    top: '0px'
  }
  //Rnd移动的位置及大小
  let RndStyles:any={
    width:'100%',
    height:'500px',
    position: 'relative',
    // top:'100px'
  }
  useEffect(()=>{
    let downloadDom:any = document.getElementById("download")
    if(downloadDom){
      downloadDom.addEventListener('click',()=>{
        downloadFun()
      })
    }
  },[])
  const downloadFun=()=>{
    //下载data
    let luckysheetfile = luckysheet.getLuckysheetfile()
    console.log("luckysheetfile",luckysheetfile)
    let data = luckysheetfile[0].data
    let visibledatacolumn = luckysheetfile[0].visibledatacolumn   //表格with
    let arr = []
    for(let row=0;row<data.length;row++){
      let arrRow = [];
      for(let col=0;col<data[row].length;col++){
        let cellvalue = data[row][col];
        if(cellvalue){
          arrRow.push(cellvalue)
        }
      }
      if(arrRow&&arrRow.length){
        arr.push(arrRow)
      }
    }
    console.log('arr',arr)
    handledownload(arr)
  }
  const handledownload=(arr:any)=>{
     const multiHeader =
                            [
                              ['日期', '配送信息', '', '', '', ''], //第一行
                              ['', '姓名', '地址', '', '', ''] //第二行
                            ] // 前两行的表头数据，二维数组，不够的用空白补全
          const header = ['', '', '省份', '市区', '地址', '邮编'] // 最后一行的表头数据
          const filterVal = ['date', 'name', 'province', 'city', 'address', 'zip']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          const merges = ['A1:A3', 'B1:F1', 'B2:B3', 'C2:F2'] // 合并单元格的数据，如何合并参考上面图片的蓝色背景部分
          export_json_to_excel({
            multiHeader,
            header,
            merges,
            data,
            filename,
          })
  }
  const importExcel=()=>{

  }
  console.log("styles",props)
  return (
    <div style={props.styles||RndStyles}>
      <div id="luckysheet" style={luckyCss}></div>
    </div>
  )
}
export default Luckysheet