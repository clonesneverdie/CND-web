<script lang="ts">
</script>

<img class="banner" src="/assets/mainbanner.jpeg" alt="main-banner" />

<div class="container">
  <div class="container-content">
    <div class="container-title">Clones Never Die Worldwide</div>
    <div class="container-paragraph">
      The god, who existed alone in the beginning,
      <br />
      directly split his body to be reborn as 101 clones with different appearances and identities.
      <br />
      <br />
      However, contrary to the original intention of building a country where various ideologies coexist,
      <br />
      101 clones with different tastes and ideologies failed to reach a consensus,
      <br />
      and decided to establish a country for each.
      <br />
      <br />
      The story begins with an army of lower-class 10,000 clones created by exchanging 101 clones’s divine powers to establish
      their planet.
    </div>
  </div>

  <div class="container-image">
    <img class="sub-image" src="/assets/worldwidepic.jpeg" alt="worldwide" />
    <div class="subtitle">Clones Never Die</div>
    <div class="subcontent">
      <a class="link" href="https://opensea.io/collection/clones-never-die" target="_blank"
        >Going to Opensea CxNxD Original collection</a
      >
    </div>
  </div>
</div>
<hr class="divide-line" />

<style lang="scss">
  .banner {
    width: 100%;
    margin-bottom: 30px;
  }

  .container-content {
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  .container-paragraph {
    margin-bottom: 10px;
    font-size: 1.2rem;
    line-height: 30px;
  }

  .container-image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 35%;

    img {
      width: 100%;
      border-radius: 10px;
    }
  }

  .sub-image {
    margin-bottom: 10px;
  }

  .link {
    color: $highlight-color;
  }

  @media screen and (max-width: 768px) {
    .container-content {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .container-image {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;

      img {
        width: 100%;
      }
    }
    .divide-line {
      margin: 40px 10px;
    }

    .container-paragraph {
      margin-bottom: 10px;
      font-size: 1rem;
      line-height: 26px;
    }
  }
</style>
