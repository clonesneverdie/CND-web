<script lang="ts">
  import EventContent from './EventContent.svelte'

  interface EContent {
    progress: boolean
    name: string
    description: string
    img: string
    link: string
  }

  const eventData: Array<EContent> = [
    {
      progress: false,
      name: 'Original Holder Event',
      description: 'We airdrop CxNxD 萬 clone to the wallet address holding the CxNxD original until September 13th. ',
      img: '/assets/event1.jpeg',
      link: 'https://bit.ly/3k3VyAv'
    }
    // {
    //   progress: true,
    //   name: 'Follow Airdrop Event',
    //   description:
    //     'Follow our Twitter and participate in the discord, we will airdrop CxNxD 萬 clone to participating users.',
    //   img: '/assets/event2.jpeg',
    //   link: ''
    // }
  ]
</script>

<div class="container">
  <div class="container-title">Event</div>
  <div class="container-content">
    {#each eventData as item}
      <EventContent
        progress="{item.progress}"
        name="{item.name}"
        description="{item.description}"
        img="{item.img}"
        link="{item.link}"
      />
    {/each}
  </div>
</div>

<hr class="divide-line" />

<style lang="scss">
  .container-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: left;
    align-items: center;
  }
</style>
