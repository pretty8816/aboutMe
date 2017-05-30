<template>
<div class="goods">
     <div class="menu-wrapper" ref='menuWarapper'>
          <ul>
             <li  class="menu-item" v-for="item in datas.goods">
                  <span class="text">
                  <span v-show="item.type>0" class="iconMap" :class="icon[item.type]">
                  </span>
                     {{item.name}}
                  </span>                  
             </li>
         </ul>
     </div>
     <div class="foods-wrapper" ref="foodsWarapper">
         <ul>
             <li v-for="item in datas.goods"  class="food-list food-list-hook">
               <h1 class="title">{{item.name}}</h1>              
               <ul>
                   <li v-for="food in item.foods" class="food-item" @click="xiangqing(food)">                     
                      <div  class="icon">
                        <img :src="food.icon" alt="" width="57" height="57"/>
                      </div>
                      <div class="content">
                        <h2 class="name">{{food.name}}</h2>                        
                        <p class="description">{{food.description}}</p>
                        <div class="sell-info">
                           <span class="sellCount">月售{{food.sellCount}}份</span>
                           <span class="rating">好评率{{food.rating}}</span>
                      
                            <div class="price">
                                 <span class="newPrice">￥{{food.price}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                 <cartControl :food="food"></cartControl>
                            </div>
                        </div>
                      </div>
                  </li>
               </ul>
            </li>
         </ul>         
     </div> 

<shopCar :food="food"  :deliveryPrice="datas.seller.deliveryPrice" :minPrice="datas.seller.minPrice">
</shopCar>

<foodDetail :foodDetails="foodDetails" ref="foodDetail"></foodDetail>

</div>
</template>
<script>
import icon from '../../static/js/icon.js'
import Scroll from 'better-scroll'
import shopCar from './shopCar.vue'
import cartControl from './cartControl.vue'
import foodDetail from './foodDetail.vue'
export default{
	props:['datas'],
    data(){
     return{
      icon: icon,
      foodDetails:{}
     
     }
    },
    computed: {
      food () {
        let arr = []
        //                 回调里的参数 1.value 2.index
        this.datas.goods.forEach(goods => {
          goods.foods.forEach(foods => {
            if (foods.count > 0) {
              arr.push(foods)
            }
          })
        })
        return arr
       
      }
    },
    mounted () {
      // dom更新完之后 === window.onload
      // dom更新完 => new Scroll() => ajax获取到了数据 => dom
      this.$nextTick(() => {
      })
    },
    
    methods:{ 
            scroll(){     
                   /* eslint-disable no-new */
                   //不要忘了这句注释的重要性
                    new Scroll(this.$refs['foodsWarapper'],{click:true})
                    new Scroll(this.$refs['menuWarapper'],{click:true})
                   
                    },
            xiangqing(value){//用ref 传递过来的foodDetail.vue $refs接收后，可以任意使用里面的数值，包括showDetail：false
            
               let self=this
               self.$refs['foodDetail'].foodshow()
               self.foodDetails=value

            }        

    },
    components:{
     shopCar,
     cartControl,
     foodDetail

    } 



	
}

</script>