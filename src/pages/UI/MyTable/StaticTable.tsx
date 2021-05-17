import React,{useState,useEffect} from "react"
import { Table, Tag, Space ,Input,Checkbox} from 'antd';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import _ from "lodash"
import { getDragDomById } from '@/plugins/utils';
import CommonModal from './../../Common/CommonModal';
import InterfaceModal from './Modal/InterfaceModal';
import MyPage from './MyPage';
export default function StaticTable(props:any){
  const [showColumns,setShowColumns] = useState<boolean>(false)
  const [dropVisible,setDropVisible] = useState<boolean>(false)
  const [scroll,setScroll] = useState<any>({})
  const [interfaceVisible,setInterfaceVisible] = useState<boolean>(false)
  

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags:any) => (
      <>
        {tags.map((tag:any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text:any, record:any) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
const [mycolumns,setMycolumns] = useState([])
const [mydata,setMydata] = useState([])
const [indeterminate, setIndeterminate] = useState(false);
const [checkAll, setCheckAll] = useState(true);
let defaultCurrentPage = 1
let defaultPageSize = 10
const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
const [pageSize, setPageSize] = useState(defaultPageSize);
const [total, setTotal] = useState(0);



useEffect(()=>{
  let id = props.item.id;
  let item:any = getDragDomById(id)
  if(item){
    let width = item.width
    let height = item.height
    let x = width>400?4000:0
    let y = height>400?200:0
     interface Scroll{
      x?:number,
      y?:number
    }
     let scroll:Scroll = {}
    if(x!==0){
      scroll.x = x
    }
    if(y!==0){
      scroll.y = y
    }
    setScroll(scroll)
  }
},[props.item])
//筛选columns数据
const columnsFilter=()=>{
  setShowColumns(true)
}
const changeChecked=(e:any)=>{
  console.log("e",e)
  let checked = e.target.checked
  let value = e.target.value
  let index = mycolumns.findIndex((item:any)=>item.dataIndex === value);
  let cloneColumns = _.cloneDeep(mycolumns);
  if(index>-1){
    cloneColumns[index].checked = checked
  }
  setMycolumns(cloneColumns)

  let checkedList = cloneColumns.filter((item:any)=>item.checked)
  setIndeterminate(!!checkedList.length && checkedList.length < cloneColumns.length);
  setCheckAll(checkedList.length === checkedList.length);
}
const changeWidth=(e:any,item:any)=>{
  item.width = Number(e.target.value)
}
const changeTitle=(e:any,item:any)=>{
  item.title = e.target.value
}
const changeSortColumns=(e:any,item:any)=>{
  let value = e.taget.value;
  
}

console.log("scroll",scroll)
const onCheckAllChange = (e:any) => {
  // setCheckedList(e.target.checked ? plainOptions : []);
  if(e.target.checked){
    mycolumns.forEach((item:any)=>item.checked = true)
  }else{
    mycolumns.forEach((item:any)=>item.checked = false)
  }
  setIndeterminate(false);
  setCheckAll(e.target.checked);
};

const menu = (
  <>
    <Menu style={{maxHeight:'400px',overflow:'auto'}}>
    {mycolumns?.length&&<Checkbox style={{margin:'1px 15px'}} indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
      全选
    </Checkbox>}
    {mycolumns?.length&&mycolumns.map((item:any,index:number)=>(
      <Menu.Item key={index}>
        <Checkbox value={item.dataIndex} defaultChecked={true} checked={item.checked} onChange={(e)=>changeChecked(e)}>{item.dataIndex}</Checkbox>
        <Input placeholder="排序" style={{width:60,marginRight:5}} onChange={(e)=>changeSortColumns(e,item)}></Input>
        <Input placeholder="宽度" defaultValue={item.width} style={{width:60,marginRight:5}} onChange={(e)=>changeWidth(e,item)}></Input>
        <Input placeholder="标题" defaultValue={item.title} style={{width:60}} onChange={(e)=>changeTitle(e,item)}></Input>
      </Menu.Item>
    ))}
  </Menu>
  </>

);
const emitTableParams=({tableData,columns,currentPage,pageSize,totalRow}:any)=>{
  console.log('tableData',tableData)
  console.log('columns',columns)
  if(columns?.length){
    columns.forEach((item:any,index:number)=>{item.checked = true})
  }
  setMycolumns(columns)
  setMydata(tableData)
  setCurrentPage(currentPage)
  setPageSize(pageSize)
  setTotal(totalRow)
}
const emitChangePage=(currentPage:number,pageSize:number)=>{
  console.log('emitChangePage',currentPage,pageSize)
  setCurrentPage(currentPage)
  setPageSize(pageSize)

}
  return (
    <div style={{width:'100%',height:'100%',overflow:'hidden'}}>
      <div style={props.item.disableDragging?{display:'none'}:{position:'fixed',top:'0px',float:'left',cursor:'pointer',height:"0px",left:160}} onClick={columnsFilter}>
      <Dropdown overlay={menu} trigger={['click']} visible={dropVisible&&!props.item.disableDragging} className="inline" >
      <a className="ant-dropdown-link" onClick={e => {e.preventDefault();setDropVisible(!dropVisible)}}>
        列设置
      </a>
      </Dropdown>
      {/* <div style={{marginLeft:5}} className="inline" onClick={bindColumns}>列绑定</div> */}
      </div>
      <div style={props.item.disableDragging?{display:'none'}:{position:'fixed',top:'0px',float:'left',cursor:'pointer',height:"0px",left:220}} onClick={columnsFilter}>
      <a className="ant-dropdown-link" onClick={()=>setInterfaceVisible(true)}>
        接口设置
      </a>
      </div>
      <Table pagination={false} scroll={scroll} size="small" style={{width:'100%',height:'90%',overflow:'auto'}} columns={mycolumns?.length?mycolumns.filter((item:any)=>item.checked):[]} dataSource={mydata} />
      <MyPage 
      currentPage={currentPage}
      pageSize={pageSize}
      total={total} 
      emitChangePage={emitChangePage}
      />
      {/* 接口设置 */}
      {interfaceVisible&&<InterfaceModal
      currentPage={currentPage}
      pageSize={pageSize}
      visible={interfaceVisible}
      emitClose={()=>setInterfaceVisible(false)}
      emitTableParams={emitTableParams}
      />}
      {/* 接口设置 end */}
   
    </div>
    
  )
}