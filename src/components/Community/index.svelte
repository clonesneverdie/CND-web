<script lang="ts">
</script>

<div class="container">
  <div class="container-title">Community</div>
  <div class="container-content">
    <div class="sub-content">
      We hope that CxNxD users can communicate through the community. So we run Discord Community and Twitter! We plan
      to share various events and information in the community. We want this SNS to be a place of communication! Please
      enjoy Clones Never Die together!
    </div>
    <div class="sub-btn">
      <a href="https://discord.gg/DNJ3sYCcGG" target="_blank"><div class="btn"><b>Discord</b></div></a>
      <a href="https://twitter.com/clonesneverdie" target="_blank"><div class="btn"><b>Twitter</b></div></a>
    </div>
  </div>
</div>

<hr class="divide-line" />

<style lang="scss">
  .container-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .sub-content {
    width: 60%;
    line-height: 22px;
    font-size: 18px;
    margin-bottom: 20px;
  }

  .sub-btn {
    width: 30%;
  }
  .btn {
    width: 100%;
    height: 40px;
    background-color: $highlight-color;
    margin-bottom: 10px;
    border-radius: 10px;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    padding: 10px;
  }

  .btn:active {
    opacity: 0.7;
  }

  @media screen and (max-width: 768px) {
    .sub-content {
      width: 100%;
      font-size: 1rem;
    }

    .sub-btn {
      width: 100%;
    }
  }
</style>
