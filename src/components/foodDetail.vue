<template>
<transition name="move">

<div class="detailWrapper" ref="detailWrapper" v-show="showDetail">
		<div class="foodDetail">	
	        <div @click="showDetail = !showDetail" class="back">
	          <i class="icon-arrow_lift"></i>
	        </div>
	        <img :src="foodDetails.image" height="425" width="100%" alt=""/>
	        <div class="info">
		         <div class="title">{{foodDetails.name}} </div>
		         <div class="desc">
		              <span>月售{{foodDetails.sellCount}}</span>
		              <span>好评率{{foodDetails.rating}}%</span>
		         </div>
		         <div class="price">${{foodDetails.price}}</div>
		         
		         <transition name="fade">
				         <div class="shopCart" v-show="foodDetails.count === 0 || foodDetails.count == undefined" @click="add()">
		                       <div class="text">加入购物车</div> 
				         </div>
		         </transition>
		         <cartcontrol ref="cartcontrol" :food="foodDetails"></cartcontrol>
		    </div>
		    <div class="divider"></div>
		    <div class="desc">
		         <div class="title">商品介绍</div>
		         <div class="content">{{foodDetails.info}}</div>
		    </div>
		    <div class="divider"></div>
		    <div class="evaluation">
                  <div class="title">商品评价</div>
                  <div class="classify">
                       <span class="item" :class="{'active':item.active,'bad':index===2,'badActive':index===2&&item.active}" v-for="(item,index) in classify" @click="classifyclick(item)">
                             {{item.name}}
                             <span class="count">{{item.count}}</span>
                       </span>
                  </div>
                  <div class="switch"  @click="flag=!flag">
                       <span class="icon-check_circle" :class="{'on':flag}"></span>
                       <span class="text">只看有评论的内容</span>
                  </div>
                  <div class="evel-list">
                       <ul>
                           <li class="evel" v-for="self in commontsS">
                                <div class="userInfo">
                                    <div class="time">{{self.rateTime}} </div>
                                    <div class="user">
                                        <span>{{self.rateTime}}</span>
                                        <img :src="self.avatar" width="12" height="12" alt="">
                                    </div>
                                </div>
                                <div class="content">
                                       <span class="icom" :class="self.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                                       <span class="text">{{self.text}}</span>

                                </div>
                           </li>
                       </ul>
                  </div>


		    </div>
		</div>
</div>
</transition>

</template>
<script>
import cartcontrol from './cartcontrol.vue'
import Scroll from 'better-scroll'
export default{
    props:['foodDetails'],
     data(){
           return{ 
              showDetail:false,
              classify:[
                   {name:'全部',count: 0,active:true,commont:[]},
                   {name:'推荐',count: 0,active:false,commont:[]},
                   {name:'吐槽',count: 0,active:false,commont:[]}                   
              ],
              commonts:[],
              flag:false

           }
       },
	components:{
	         cartcontrol
	   },
	methods:{
            foodshow(){
                this.showDetail=true
                            	            
	            this.$nextTick(function(){
			          this.commonts = this.foodDetails.ratings
			          this.foodDetails.ratings.forEach(val => {
			            this.classify[0].count++
			            this.classify[0].commont.push(val)
			            if (val.rateType) {
			              this.classify[2].count++
			              this.classify[2].commont.push(val)
			            } else {
			              this.classify[1].count++
			              this.classify[1].commont.push(val)
			            }
			          })
                       if(!this.cs){
                       this.cs=new Scroll(this.$refs['detailWrapper'],{click:true})
                       }else{
                          this.cs.refresh()
                       }	                      
	                 })
	               
	        },	
	       add(){
                this.$refs['cartcontrol'].addCart()
	           },
	       classifyclick(item){ 
                   this.commonts =item.commont
                  this.classify.forEach(function(val){
                         val.active = false

                  })
                item.active=true
            },
            updateSc(){

                 this.$nextTick(function(){this.cs.refresh()})
            }
	},
	mounted(){
	  
	},
	computed:{

	    commontsS(){
              //定义一个数组 存放 评论内容
              this.updateSc()
	          let arr=[]
	          
              if(this.flag){
                   this.commonts.forEach(function(val){
                        if(val.text.length>0){
                            arr.push(val)                        
                              }
                      })
                   return  arr 
                     }else{
                           return this.commonts
                        }


	    }
	}   

}


</script>