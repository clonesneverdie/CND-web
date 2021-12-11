<script lang="ts">
  export let percent: string
  export let img: string
  export let description: string
</script>

<div class="rate-container">
  <div class="rate-content">
    <div class="rate">{percent}</div>
    <div class="rate-img-box">
      <img class="rate-img" src="{img}" alt="roadmap" />
      <div class="rate-paragraph">
        {description}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .rate {
    font-size: 26px;
    margin-bottom: 10px;
    width: 100%;
  }

  .rate-img-box {
    width: 100%;
    margin-bottom: 10px;
  }

  .rate-img {
    width: 100%;
    margin-bottom: 10px;
  }

  .rate-container {
    display: flex;
    flex-direction: column;
    width: 20%;
    padding: 5px;
    box-sizing: border-box;
  }

  .rate-content {
    width: 100%;
  }

  .rate-paragraph {
    font-size: 0.9rem;
    width: 100%;
    height: 80px;
    line-height: 20px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 768px) {
    .rate-container {
      display: flex;
      flex-direction: column;
      width: 50%;
      padding: 5px;
      box-sizing: border-box;
    }

    .rate-paragraph {
      font-size: 0.9rem;
      width: 100%;
      line-height: 20px;
    }

    .rate-paragraph {
    font-size: 0.9rem;
    width: 100%;
    height: 110px;
    line-height: 20px;
    margin-bottom: 20px;
  }
  }
</style>
