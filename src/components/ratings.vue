<template>
<div class="ratingsWrapper" ref="ratingsWrapper">

    <div class="ratings-content">
       <div class="info">
            <div class="mark">
                <div class="num">{{datas.seller.score}}</div>
                <div class="text">综合评分</div>
                <div class="contrast">高于周边商家{{datas.seller.rankRate}}%</div>
            </div>
            <div class="stars">
                 <div class="serviceScore">
                       <span class="text">服务态度</span>
                       <star :size="36" :score="datas.seller.serviceScore"></star>
                       <span class="num">{{datas.seller.serviceScore}}</span>
                 </div>
                 <div class="foodScore">
                       <span class="text">商品评分</span>
                       <star :size="36" :score="datas.seller.serviceScore"></star>
                       <span class="num">{{datas.seller.foodScore}}</span>
                 </div>
                 <div class="deliveryTime">
                       <span class="text">送达时间</span>
                       <span class="time">{{datas.seller.deliveryTime}}</span>
                 </div>
            </div>
       </div>
       <div class="divider"></div>
       <div class="evaluation">
            <div class="classify">
                 <span class="item" v-for="(item,index) in classify" @click="classifyClick(item)" :class="{'active':item.active,'bad':index===2,'badActive':index===2&&item.active}">
                         {{item.name}}
                         <span class="count">{{item.count}}</span>
                 </span>                 
            </div>
            <div class="switch"  @click="flag = !flag">
                  <span class="icon-check_circle" :class="{'on':flag}"></span>
                  <span class="text">只看有内容的评价</span>
            </div>
            <div class="evel-list">
                  <ul>
                      <li class="evel" v-for="evel in commontsS">
                           <div class="avatar">
                                <img :src="evel.avatar" width="28" height="28" alt=" "/>
                           </div>
                           <div class="content">
                               <div class="user">
                                   <span class="name">{{evel.username}}</span>
                                   <span class="rateTime">{{evel.rateTime}}</span>
                               </div>                           
                               <div class="star-wrapper">
                                    <star :size="24" :score="evel.score"></star>
                                    <span class="deliveryTime">{{evel.deliveryTime}}分钟送达</span>
                               </div>
                               <div class="text">{{evel.text}}</div>
                               <div class="recommend">
                                   <span class="icon" :class="evel.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                                   <span class="dish" v-for="dish in evel.recommend">{{dish}}</span>
                               </div>
                               
                           </div>
                      </li>
                  </ul>
            </div>
       </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
import star from './star.vue'
import Scroll from 'better-scroll'

export default{
props:['datas'],	
	data(){
        return{
	        ratings:[],
	        classify:[
	             {name:'全部',count: 0,active:true,commont:[]},
	             {name:'推荐',count: 0,active:false,commont:[]},
	             {name:'吐槽',count: 0,active:false,commont:[]} 
	            ],
          commonts:[],
          flag:false
        }
	},
  
	mounted(){	  
       axios.get('./static/json/data.json').then(res=>{
        this.ratings=res.data.ratings           
         //用循环遍历得到ratings里的内容，并放到classify 数组里
         this.ratings.forEach(val=>{
              this.classify[0].count++
              this.classify[0].commont.push(val)
              if(val.rateType){
                  this.classify[2].count++
                  this.classify[2].commont.push(val)
              }else{
                  this.classify[1].count++
                  this.classify[1].commont.push(val)
              }
         })
          this.commonts=this.ratings
          this.$nextTick(function(){
                    /* eslint-disable no-new */
                    this.cs=new Scroll(this.$refs['ratingsWrapper'],{click:true})
          })       

       })
	},
  methods:{

          classifyClick(item){
                this.commonts=item.commont
                this.classify.forEach(function(val){
                        val.active=false
                         })
                 item.active=true               
                },
          updateHeight(){
          
                this.$nextTick(function(){this.cs.refresh()})
          }      
  },
	activated(){
	},
	components:{
	   star
	},
computed:{

      commontsS(){
              //定义一个数组 存放 评论内容
            this. updateHeight()
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

