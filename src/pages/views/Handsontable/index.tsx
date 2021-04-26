import React from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from "handsontable"
const Table=()=>{
  // let data = [
  //   ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
  //   ['2016', 10, 11, 12, 13],
  //   ['2017', 20, 11, 14, 13],
  //   ['2018', 30, 15, 12, 13],
  // ]
  let data = Handsontable.helper.createSpreadsheetData(6, 10)

  const settings={
    language: 'zh-CN',
    data: Handsontable.helper.createSpreadsheetData(5, 5),
    colHeaders: true,
    contextMenu: {
      items: { // 右键菜单列表
        row_above: { // Insert row above 自定义名称
          name: '在此上方插入行（自定义的名称）',
        },
        row_below: {}, // Insert row below
        separator: Handsontable.plugins.ContextMenu.SEPARATOR, // 分割线
        clear_custom: { // 自定义的菜单项
          name: '清除所有单元格（自定义菜单）',
          callback: function() {
            // this是Handsontable实例
            this.clear();
          },
        },
      },
    },
  };

  return (
    <div>
      <HotTable
          data={data}
          colHeaders={true}
          rowHeaders={true}
          width="600"
          height="300"
          stretchH="all"
          language="zh-CN"
          licenseKey='non-commercial-and-evaluation'
          settings={settings}
        />
    </div>
  )
}
export default Table