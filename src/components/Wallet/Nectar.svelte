<script lang="ts">
  import { myNectarBalance } from '@/stores'
</script>

<div class="sub-title"><b>$Nectar</b></div>
<div class="sub-item">My $Nectar: {$myNectarBalance}</div>

<style lang="scss">
  .sub-title {
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: $highlight-color;
  }

  .sub-item {
    font-size: 1rem;
    margin-bottom: 30px;
  }
</style>
