<template>
<div class="shopCart">


	<div class="content" @click="showA">
      <div class="content-left">
         <div class="logo-wrapper">
           <div class="logo active">
              <i class="icon-shopping_cart"></i>
           </div>
           <div class="badge" v-show="totalPrice > 0">{{totalCount}}</div>
         </div>
         <div class="price" :class="{'active': totalPrice}">{{totalPrice}}</div>
         <div class="desc" v-show="totalPrice<99">另需要配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="{'enough':totalPrice > minPrice}">
        <div class="pay">{{PayDesc}}</div>
      </div>
      <div class="shopcart-list" v-show="totalPrice > 0 && show">
          <div class="list-header">
               <h1 class="title">购物车</h1>
               <span class="empty" @click="empty">清空</span>
          </div>

          <transition name="transHeight" >
              <div class="list-content" ref="selectedWapper">
                   <ul>
                       <li class="food" v-for="item in food">
                           <span class="name">{{item.name}}</span>
                           <div class="price">
                                <span>{{item.price}}</span>                            
                           </div>
                           <div class="cartcontrol-wrapper">
                                <cartcontrol :food="item"> </cartcontrol>
                                <!--接收props里得来的 food-->
                          </div>                  
                       </li>
                   </ul>
              </div>
          </transition>
      </div> 

	</div>
</div>
</template>
<script>
import cartcontrol from './cartcontrol.vue'
import Scroll from 'better-scroll'
export default{
	props: ['deliveryPrice','minPrice','food'],
  data(){
    return{
    show:false
    }
  },
  //接收包涵count 的food 们，然后 算总价价格 用实时计算属性方法 computed
   computed: {
      // 总金额
      totalPrice () {
        let total = 0
        this.food.forEach(food => {
          total += food.price * food.count
        })
        return total
      },
      totalCount(){
         let count =0
         this.food.forEach(function(food){
            count=count+food.count
         })
         return count
      },
      PayDesc(){
          if(this.totalPrice ===0){ 
          return `${this.minPrice}起送`
          }else if(this.totalPrice<this.minPrice){
           return `还差 ${this.minPrice-this.totalPrice}起送`
          }else{ return `去结算`}
      }
    },
    methods:{
             empty(){
                  this.food.forEach(function(val){
                  val.count=0
                  })
                  this.show=false
             },
             showA(){
                 this.show=!this.show

                 this.$nextTick(function(){
                 if(!this.sc){
                 this.sc=new Scroll(this.$refs['selectedWapper'],{click:true})
                 }else {
                 //强制重新计算高度
                 this.sc.refresh()
                      }                     
              })

              }
    },
    components:{
    cartcontrol
    }
      

}
</script>