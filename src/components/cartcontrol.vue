<template>
<div class="cartcontrol">
    <transition class="fadeRotate">
			<div class="cart-decrease">
			     <span class="icon-remove_circle_outline inner" v-show="food.count>0" @click="decrease()"></span>
			</div>
	</transition>
	<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
	<div class="cart-add">
	     <i class="icon-add_circle" @click="addCart()"></i>
	</div>
	
</div>
</template>

<script>

//去父组件找food,很简单，直接绑定就可以， 然后强制添加count 属性,用全局Vue
import Vue from 'vue'
export default{
	
	props:['food'],

methods:{
	

	   // 在添加之前，先判断food里 有没有count 属性，如果没有，就添加，添加后数量增加
	   addCart(){          
	   if(typeof this.food.count==='undefined'){
	      Vue.set(this.food,'count',0)
	   }
         return this.food.count++
	   },
	   decrease(){ return this.food.count-- }

}

}

</script>

<style>

</style>