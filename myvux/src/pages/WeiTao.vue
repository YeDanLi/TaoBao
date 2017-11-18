<template>
  <div>
     <x-header>微淘页面</x-header>
    <div class="content">
      <div>
        <img src="../assets/car.jpg" alt="">
        <p class="wenzi"> 在一个天平上，你得到越多，那么也就势必要承受更多，每一个看似低的起点，
          都是通往更高峰的必经之路。让自己的心情更平和一点，更豁达一点，对身边
          的过错淡然，让自己更宽容一点，那么阳光也就常驻。
        </p>
      </div>
      <div>
        <img src="../assets/submit.jpg" alt="">
        <p class="wenzi"> 轻轻飘向有你的地方，我不曾遗忘，那些美好的瞬间，亦不曾忘记，蓝天下的幻想
          ，你的笑。假如不曾错过，我就不会徜徉在这孤独的夜里，想念那些绚烂的场景，也不会跌跌撞撞
          地走着人生
        </p>
      </div>
      <div>
        <img src="../assets/bg.jpg" alt="">
        <p class="wenzi"> 淡淡素笺，浓浓墨韵，典雅的文字，浸染尘世情怀；悠悠岁月，袅袅茶香，别致的杯盏
          ，盛满诗样芳华；云淡风轻，捧茗品文，灵动的音符，吟唱温馨暖语；春花秋月，红尘阡陌，
          放飞的思绪..
        </p>
      </div>
    </div>
      <div class="footer">
        <footer-bar> </footer-bar>
      </div>
    </div>
</template>
<script>

import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
  import FooterBar from  '../components/FooterBar'
    export default {
      directives: {

   TransferDom

  },

 components: {
  XHeader,
Actionsheet,
 ButtonTab, ButtonTabItem, FooterBar,
},
        data: function () {
            return {

            }
        },

    }

</script>
<style scoped>
.vux-header{
    background:linear-gradient(left,#ff9000,#ff5000);
  position: fixed;
  top:0;
  width: 100%;
  }
  .footer{
    position: fixed;
    z-index: 999;
  }
.content{
   margin-top: 44px;
  height: 100vh;
  background: url("../assets/shouhuo.jpg") 100vh 100vh;

}
.content div{
  border-bottom: solid 1px #a752cd;
  overflow: hidden;
}
.content img{
  margin: 30px 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  float: left;
}
  .content p.wenzi{
    padding: 20px 10px;
    width: 240px;
    color: #333;
    font-size: 14px;
    float: right;

  }
nav{
  line-height: 45px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background:linear-gradient(left,#ff9000,#ff5000);
  color: #fff;
}
nav > a{
  position: absolute;
  left: 20px;
  font-size: 30px;
  top: 6px;
  color: #fff;
  text-decoration: none;
}


</style>
