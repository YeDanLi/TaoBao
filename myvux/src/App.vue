<template>
  <div>

    <router-view></router-view>
    <!--<footer-bar></footer-bar>-->
  </div>
</template>

<script>

//  import FooterBar from  './components/FooterBar'

  export default {
      name:'app',
    data:function(){
          return{

          }
    },
    components:{
//        FooterBar,
    }
  }

</script>

<style lang="less">

/*@import '~vux/src/styles/reset.less';*/
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  margin: 0;
}
</style>
