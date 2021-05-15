import {Modal} from "antd";
import React, { useEffect, useState } from "react";

//Modal組件
function CommonModal(props:any){
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
	const close=()=>{
		props.emitClose()
	}
	return(
		<div>
			<Modal
			maskClosable={false}
			width={width}
			visible={visible}
			title={<div style={{color:'#222222',fontSize:'18px',fontWeight:'bold',textAlign:'center'}}>{title}</div>}
			onCancel={()=>close()}
			footer={[]}
			>
				{content}
			</Modal>
		</div>
	)
}
export default CommonModal