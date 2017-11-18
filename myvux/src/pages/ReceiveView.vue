<template>
    <div class="info">
      <timeline>
        <timeline-item>
          <h4 class="recent">【郑州】 已接收</h4>
          <p class="recent">2016-04-20 14:20:00</p>
        </timeline-item>
        <timeline-item>
          <h4 class="recent">【广东】 广州市 已发出</h4>
          <p class="recent">2016-04-17 12:00:00</p>
        </timeline-item>
        <timeline-item>
          <h4> 申通快递员 广东广州 收件员 xxx 已揽件</h4>
          <p>2016-04-16 10:23:00</p>
        </timeline-item>
        <timeline-item>
          <h4> 商家正在通知快递公司揽件</h4>
          <p>2016-04-15 9:00:00</p>
        </timeline-item>
      </timeline>
    </div>
</template>
<script>
  import { Timeline,TimelineItem,XButton } from 'vux';
    export default {
        data: function () {
            return {}
        },
      components:{
        Timeline,TimelineItem,XButton
      }
    }

</script>
<style scoped>

div.info{
  width: 100vh;
  height: 100vh;
  color: #333;
  font-size: 14px;
  margin-top: 45px;
  background: url("../assets/kuaidi.jpg");
  background-size:  100% 100%;
}
</style>
