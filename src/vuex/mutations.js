export default{
  // 默认第一个接收的参数是 vuex里所定义的数据，在此例中指state.js里的数据 即vxfood:[]
  vxaddCart(state,val){

   //console.log(arguments)

  state.vxfood.push(val)

  },
  vxdecreaseCart(state,food){

       state.vxfood.forEach(function(value,index){

       	if(value.name===food.name){

       		state.vxfood.splice(index,1)
       	}
       })

  }


}

