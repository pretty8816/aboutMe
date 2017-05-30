<template>
  <div id="app">   
    <vheader :seller="datas.seller"></vheader>
    <div class="tab">
         <div class="tab-item">
              <router-link to="/goods">商品</router-link>
          </div>    
          <div class="tab-item">    
              <router-link to="/ratings">评价</router-link>
          </div>     
          <div class="tab-item">    
              <router-link to="/seller">商家</router-link>
         </div>
    </div> 
    <keep-alive>
       <router-view :datas="datas" ref="myScroll"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import vheader from './components/header.vue'
import axios from 'axios'
export default {
  name: 'app',
  data(){
    return{
       datas:{
        seller:{},
        goods:[],
        //ratings:[]
       }
    }
  },
mounted(){
   let self=this
  axios.get('./static/json/data.json').then(function(res){
     self.datas.seller = res.data.seller 
     self.datas.goods = res.data.goods 
     self.datas.ratings = res.data.ratings   
     
      self.$nextTick(() =>{
       self.$refs.myScroll.scroll()

     })
  })
},
  components:{
  vheader
  }
}
</script>
<style>
.tab .tab-item .router-link-active{color:pink}
</style>

