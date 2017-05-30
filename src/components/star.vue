<template>
<div class="star" :class="'star-'+size">
<span class="star-item" :class="item"  v-for="item in count">   </span>
</div>
</template>
<script>
export default {
	props:['score','size'],
	computed:{
     count () {
         let arr = []
         let self = this        
         let integer = Math.floor(self.score)
         let decimal = (self.score-integer) >= 0.5

         for(let i= 0;i< integer;i++) {   
               arr.push('on')
         }
         if(decimal){
             arr.push('half')
         }
        while(arr.length<5){
            arr.push('off')
        }
        return arr
     }

	}
}

</script>