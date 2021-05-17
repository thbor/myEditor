import {Drawer} from "antd";
import React, { useEffect, useState } from "react";

function CommonDrawer(props:any){
	const [visible,setVisible] = useState(false);
	const [title,setTitle] = useState("");
	const [content,setContent] = useState(props.content);
	const [width,setWidth] = useState(props.width||1000);
	useEffect(()=>{
		let visible = props.visible;
		let title = props.title;
		let content = props.content;
		let width = props.width;
		setVisible(visible)
		setTitle(title)
		setContent(content)
		setWidth(width)
	},[props])
	const onClose=()=>{
		props.emitClose()
	}
	return(
		<div>
		  <Drawer
      title={title||"屬性設置"}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      {content}
    </Drawer>
		</div>
	)
}
export default CommonDrawer