<template>
<div class="cartcontrol">
    <transition class="fadeRotate">
			<div class="cart-decrease" v-show="food.count>0" @click.stop="decrease()">
			     <span class="icon-remove_circle_outline inner" ></span>
			</div>
	</transition>
	<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
	<div class="cart-add" @click.stop="addCart()">
	     <i class="icon-add_circle"></i>
	</div>	
</div>
</template>
<script>
//去父组件找food,很简单，直接绑定就可以， 然后强制添加count 属性,用全局Vue
import Vue from 'vue'
import {mapMutations,mapState} from 'vuex'
export default{	
	props:['food'],
methods:{
      //在方法里引入vuex存放方法函数的文件，里面引入其相应的方法
      ...mapMutations([
        'vxaddCart',
        'vxdecreaseCart'
      ]),
	   // 在添加之前，先判断food里 有没有count 属性，如果没有，就添加，添加后数量增加
	   addCart(){
		    //console.log(event) 
		    //if(!event._constructed){return false}
		    if(typeof this.food.count === 'undefined'){           
			      Vue.set(this.food, 'count' ,0)
			      Vue.set(this.food, 'active' ,true)
		        }
	        this.food.count++ 
	        if(this.food.active){
	            this.vxaddCart(this.food)
	            this.food.active=false
	          }
        },
	   decrease(){
	        //if(!event._constructed){return false}
	        return this.food.count-- 
		    if(this.food.count=== 0){
		    this.vxdecreaseCart(this.food)
		    }
	    }
},
//在实时计算的属性方法集合里，引入 vuex 中实时变化的数组文件 此例的state.js 中的数组vxfood 
computed:{
	...mapState(['vxfood'])
    }
}

</script>

<style>

</style>