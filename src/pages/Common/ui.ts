import Luckysheet from "../Luckysheet";
import MyInput from "../UI/MyInput";
import StaticTable from "../UI/MyTable/StaticTable";
import MyButton from './../UI/MyButton/index';
import MySelect from './../UI/MySelect/index';
// bindKey  與後台綁定的key值
// value  用戶輸入的對應bindKey的值
// defaultValue 默認初始值
// eventFunction 允許操作事件的方法
let json = [
  {"title":"Luckysheet","name":"table","type":"static","Component":Luckysheet,width:500,height:500},
  {"title":"antd表格","name":"table2","type":"static2","Component":StaticTable},
  {"title":"Button","name":"Button","type":"Button","Component":MyButton},
  {"title":"Select","name":"Select","type":"Select","Component":MySelect,componentChilren:{}},
  {"title":"Input","name":"Input","type":"Input","Component":MyInput,
  "componentChilren":{bindKey:"",value:"",defaultValue:"",placeholder:"",eventFunction:["onclick","onchange"]}
  },

]
export default json