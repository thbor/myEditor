const Test={
  namespace:"test",
  state:0,
  reducers:{
    //执行yield put里面type对应的方法
    add(state){
      console.log('reducer--add执行了',state)
      return state+1
    }
  },
  //解决异步副作用，用generator函数改异步为同步
  effects:{
    *addCount({ payload }, { call, put }){
      console.log("addCount执行了",payload)
      // yield call(myTestApi);
      yield put({ type: 'add' });
    }
  },
  subscriptions: {
    //发送初始化请求
    setup({ dispatch }) {
      console.log("setup执行了")
      dispatch({
        type: 'addCount',
        payload: 0,
      });
    },
  }

}
export default Test