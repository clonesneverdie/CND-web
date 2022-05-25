<script lang="ts">
  import Member from './Member.svelte'

  interface Member {
    memberImage: string
    name: string
    description: string
    twitter: string
  }

  const teamData: Array<Member> = [
    {
      memberImage: '/assets/M1.jpeg',
      name: '2SSUL | Artist',
      description:
        'I met such great developers that I made this great project. I always tried to make something through my own art. I will make fun stories through clones. Thank you.',
      twitter: 'https://twitter.com/clonesneverdie'
    },
    {
      memberImage: '/assets/M2.jpeg',
      name: 'ELIXIR | Developer',
      description:
        "I have created a blockchain called Popcateum. I'm serious about blockchain and I really like it. And I like clones, too.",
      twitter: 'https://twitter.com/elixirevo'
    },
    {
      memberImage: '/assets/M3.jpeg',
      name: 'ARVITOR | Director',
      description:
        'I have experience in successfully launching a PFP called Doge Sound Club in Korea. I really liked his ambition and talent to create several metaverse clothing brands and got involved.',
      twitter: 'https://twitter.com/DSC_ARVITOR'
    },
    {
      memberImage: '/assets/M4.jpeg',
      name: 'YUNKO | Advisor',
      description: 'Founder of Yunko association, software developer, and NFT enthusiast.',
      twitter: 'https://twitter.com/yunko1803'
    }
  ]
</script>

<div class="container">
  <div class="container-title">Team</div>
  <div class="container-content">
    {#each teamData as item}
      <Member
        memberImage="{item.memberImage}"
        name="{item.name}"
        description="{item.description}"
        twitter="{item.twitter}"
      />
    {/each}
  </div>
</div>

<style lang="scss">
  .container-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
  }
</style>
