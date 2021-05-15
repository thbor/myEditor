/**@description 获取所有的拖拽节点 */
export const getDragsDom=()=>{
  let alldrags = document.querySelectorAll('.react-draggable')
  return alldrags
}
/**@description 根据id获取拖拽节点的信息 */
export const getDragDomById=(id:string|number)=>{
  let alldoms = getDragsDom();
  if(id&&alldoms?.length){
    for(let item of alldoms){
      if(item.id+"" === id+""){
        return item
      }
    }
  }
  return false
}