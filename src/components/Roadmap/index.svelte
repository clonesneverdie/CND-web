<script lang="ts">
  import Tile from './Tile.svelte'
  interface Roadmap {
    percent: string
    img: string
    description: string
  }

  const roadmapData: Array<Roadmap> = [
    {
      percent: '20%',
      img: '/assets/roadmap1.png',
      description:
        'Lotus staking is activated. In addition, an exhibition of clones will begin at Sandbox. Please enjoy the game-like exhibition!'
    },
    {
      percent: '40%',
      img: '/assets/roadmap2.png',
      description: "History of the clones will be told in 10 comic. Only the holders will be able to watch it's comic!"
    },
    {
      percent: '60%',
      img: '/assets/roadmap3.png',
      description: "Clones' own fashion takes place in the metaverse"
    },
    {
      percent: '80%',
      img: '/assets/roadmap4.png',
      description: "Clones will present its own NFT art collection. Let's collect the art together!"
    },
    {
      percent: '100%',
      img: '/assets/roadmap5.png',
      description:
        'The Clones Never Die V3 development and various projects will begin. Please look forward to upcoming developments!'
    }
  ]
</script>

<div class="container">
  <div class="container-title">Roadmap</div>
  <div class="container-content">
    <div class="sub-content">
      <div class="sub-content-paragraph">
        We will implement each CxNxD 萬 roadmap item at various milestones, based on the sales performance.
        <br />
        We are doing this for the long term. We had set some goals for ourselves.
        <br />
        When the target sales rate is reached, we will start working to realize the stated target.
      </div>
    </div>
    {#each roadmapData as item}
      <Tile percent="{item.percent}" img="{item.img}" description="{item.description}" />
    {/each}
    <div class="mobile-occupy"></div>
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
    width: 100%;
    margin-bottom: 15px;
    line-height: 22px;
  }

  .sub-content-paragraph {
    width: 100%;
  }

  .mobile-occupy {
    display: none;
    flex-direction: column;
    font-size: 0.9rem;
    width: 50%;
    padding: 5px;
    box-sizing: border-box;
  }

  @media screen and (max-width: 768px) {
    .sub-content {
      width: 100%;
      font-size: 1rem;
    }

    .sub-content-paragraph {
      width: 100%;
    }
    .mobile-occupy {
      display: flex;
      flex-direction: column;
      font-size: 0.9rem;
      width: 50%;
      padding: 5px;
      box-sizing: border-box;
    }
  }
</style>
