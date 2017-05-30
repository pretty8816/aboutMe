<template>
<div class="seller-wrapper" ref="sellerWrapper">
     <div class="seller-content">
          <div class="info">
               <div class="title">
                    <div class="text">{{datas.seller.name}}</div>
                    <div class="star-wrapper">
                         <star :size="36" :score="datas.seller.score"></star>
                         <span class="rate-count">{{datas.seller.ratingCount}}</span>
                         <span class="sell-count">月售{{datas.seller.sellCount}}单</span>       

                    </div>
                    <div class="collect"  @click="flag=!flag">
                         <span class="icon-favorite" :class="{'active':flag}"> </span>
                         <span class="text">{{flag?'已收藏':'收藏'}}</span>
                    </div>
               </div>
               <div class="remark">
                    <div class="block">
                         <h2>起送价</h2>
                         <div class="content">
                               <span class="num">{{datas.seller.minPrice}}元</span> 
                         </div>
                    </div>
                    <div class="block">
                         <h2>商家配送</h2>
                         <div class="content">
                               <span class="num">{{datas.seller.deliveryPrice}}元</span> 
                         </div>
                    </div>
                    <div class="block">
                         <h2>平均配送时间</h2>
                         <div class="content">
                               <span class="num">{{datas.seller.deliveryTime}}元</span> 
                         </div>
                    </div>
               </div>
          </div>
          <div class="divider"></div>
          <div class="activities">
               <div class="bulletin">
                    <h1>公告与活动</h1>
                    <div class="content">
                    {{datas.seller.bulletin}}
                    </div>
               </div>
          </div>
          <div class="supports">
               <ul>
                   <li class="item" v-for="item in datas.seller.supports"> 
                       <span class="iconMap" :class="icon[item.type]"> </span>
                        <span class="text">{{item.description}} </span>    
                   </li>
               </ul>

          </div>


     </div>
</div>
</template>


<script>
import icon from '../../static/js/icon.js'
import Scroll from 'better-scroll'
import star from './star.vue'
export default{
props:['datas'],
data(){
	
	return{
        flag:false,
        icon:icon


	}
},
components:{
	star
},
mounted(){
	
	 let self=this
	 self.$nextTick(function(){
          /* eslint-disable no-new */
	  new Scroll(this.$refs['sellerWrapper'],{click:true})

	 })
	  
}


}

</script>





