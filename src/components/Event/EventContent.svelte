<script lang="ts">
  export let progress: boolean
  export let name: string
  export let description: string
  export let img: string
  export let link: string
</script>

<div class="event-box">
  <img class="event-img" src="{img}" alt="event-img" />
  <div class="event-sub-box">
    {#if progress}
      <div class="event-mark">Progressing</div>
    {:else}
      <div class="end-event-mark">Event End</div>
    {/if}
    <div class="event-title">{name}</div>
    <div class="event-content">
      {description} Check out the details <a class="link-style" href="{link}" target="_blank">here</a>.
    </div>
  </div>
</div>

<style lang="scss">
  .event-box {
    width: 31%;
    box-sizing: border-box;
    border: 1px solid lightgray;
    border-radius: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .event-sub-box {
    margin: 10px;
  }

  .event-mark {
    width: fit-content;
    padding: 3px;
    background-color: $highlight-color;
    border-radius: 3px;
    margin-bottom: 20px;
    font-size: 0.8rem;
  }

  .end-event-mark {
    width: fit-content;
    padding: 3px;
    background-color: lightgray;
    color: black;
    border-radius: 3px;
    margin-bottom: 20px;
    font-size: 0.8rem;
  }

  .event-title {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }

  .event-content {
    width: 100%;
    font-size: 0.9rem;
    line-height: 1rem;
    height: 75px;
  }

  .event-img {
    width: 100%;
    border-radius: 9px 9px 0px 0px;
  }

  @media screen and (max-width: 768px) {
    .event-box {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid lightgray;
      border-radius: 10px;
      margin-bottom: 30px;
    }
  }
</style>
