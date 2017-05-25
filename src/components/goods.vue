<template>
<div class="goods">
     <div class="menu-wrapper" ref='menuWarapper'>
          <ul>
             <li  class="menu-item" v-for="item in datas.goods">
                  <span class="text">
                  <span v-show="item.type>0" class="iconMap" :class="icon[item.type]"></span>
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
                   <li v-for="food in item.foods" class="food-item">                     
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


<shopCar :deliveryPrice="datas.seller.deliveryPrice" :minPrice="datas.seller.minPrice"></shopCar>
</div>
</template>
<script>
import icon from '../../static/js/icon.js'
import Scroll from 'better-scroll'
import shopCar from './shopCar.vue'
import cartControl from './cartControl.vue'
export default{
	props:['datas'],
    data(){
     return{
      icon: icon
     }
    },
    methods:{ 
    scroll(){   

  
           /* eslint-disable no-new */
           //不要忘了这句注释的重要性
            new Scroll(this.$refs['foodsWarapper'],{click:true})
            new Scroll(this.$refs['menuWarapper'],{click:true})
            }
    },
    components:{
     shopCar,
     cartControl

    }   
	
}

</script>