import React from 'react';
import { Pagination } from 'antd';

const MyPage=(props:any)=>{
  const changePage=(currentPage:any,pageSize:any)=>{
    props.emitChangePage(currentPage,pageSize)
  }
  return (
    <div>
    <Pagination
      total={props.total||0}
      current={props.currentPage||1}
      pageSize={props.pageSize||10}
      showSizeChanger
      showQuickJumper
      showTotal={total => `共 ${total} 条`}
      onChange={changePage}
      />
  </div>
  )
}
export default MyPage