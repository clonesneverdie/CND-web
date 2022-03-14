<script lang="ts">
</script>

<div class="container">
  <div class="container-title">CxNxD Mu(萬) (V2)</div>
  <div class="container-content">
    <!-- <div class="youtube-frame">
      <iframe
        class="youtube"
        src="https://www.youtube.com/embed/ZlF9Mz1QUjY"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div> -->
    <div class="sub-content">
      <img class="sample-img" src="/assets/v2-sample.jpg" alt="sample" />
      <div class="sub-content-box">
        <div class="sub-content-title">About 'Clones Never Die Mu'</div>
        <div class="sub-content-paragraph">
          'Clones Never Die Mu' is version 2 of 'Clones Never Die'.
          <br />
          'CxNxD Mu' exists on the klaytn blockchain.
          <br />
          Each unique part was used to create 10,000 NFTs.
          <br />
          There are no clones of the same form and they are unique.
          <br />
          And each clone has a rarity.
          <br />
          If you have clones, you can use the clone picture wherever you want and do various activities in the Clones Never
          Die world.
        </div>
      </div>
    </div>
    <div class="sub-content">
      <div class="info">
        <div class="info-box">
          <div class="info-box-title">Rarity</div>
          <div class="info-box-paragraph">
            Each clone has a rarity. It is set from 0 to 10000 and all relevant data is stored in IPFS.
          </div>
        </div>
        <div class="info-box">
          <div class="info-box-title">PFP</div>
          <div class="info-box-paragraph">CxNxD Mu holders can use their clones as profile photos.</div>
        </div>
        <div class="info-box">
          <div class="info-box-title">$Nectar</div>
          <div class="info-box-paragraph">$Nectar is a token used in the CxNxD world.</div>
        </div>
        <div class="info-box">
          <div class="info-box-title">Vote</div>
          <div class="info-box-paragraph">
            CxNxD team operates vote to reflect the opinions of holders. CxNxD Mu holders can vote on the
            direction of the CxNxD project.
          </div>
        </div>
      </div>
    </div>
    <div class="sub-content-r">
      <img class="sample-img" src="/assets/token-distribute.png" alt="distribute" />
      <div class="sub-content-box">
        <div class="sub-content-title">NFT distribution</div>
        <div class="sub-content-paragraph">
          CxNxD Mu(萬) NFTs are distributed as follows.
          <br />
          <br />
          CxNxD Team: 500 Clones, (No. 0 ~ 499)
          <br />
          Airdrop: 500 Clones, (No. 500 ~ 999)
          <br />
          Sale: 9,000 Clones, (No. 1,000 ~ 9,999)
          <br />
          <br />
          The quantity received by the CxNxD team is distributed to ensure smooth governance in the future.
        </div>
      </div>
    </div>
    <div class="sub-content">
      <div class="sub-content-box-center">
        Opensea Collection
        <a class="sub-content-contract" href="https://opensea.io/collection/clones-never-die-mu" target="_blank"
          >Clones Never Die Mu (V2)</a
        >
      </div>
    </div>
    <div class="sub-content">
      <div class="sub-content-box-center">
        CxNxD Mu(萬) Contract Address
        <a
          class="sub-content-contract"
          href="https://scope.klaytn.com/nft/0x19FEb74A239fC7D6583d8C434A388880747E8dff"
          target="_blank">0x19FEb74A239fC7D6583d8C434A388880747E8dff</a
        >
      </div>
    </div>
  </div>
</div>
<hr class="divide-line" />

<style lang="scss">
  .container-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .sub-content {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
  }

  .info {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 30px;
  }

  .info-box {
    width: 20%;
  }

  .info-box-title {
    font-size: 1.1rem;
    margin-bottom: 10px;
    color: $highlight-color;
  }

  .info-box-paragraph {
    font-size: 0.9rem;
    line-height: 20px;
    height: 80px;
  }

  .sub-content-contract {
    font-size: 1rem;
    color: $highlight-color;
  }

  .sub-content-r {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
  }

  .sub-content-box {
    width: 50%;
    line-height: 24px;
    font-size: 18px;
    display: flex;
    flex-direction: column;
  }

  .sub-content-box-center {
    line-height: 24px;
    font-size: 18px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
  }

  .sub-content-title {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .sub-content-paragraph {
    width: 100%;
    line-height: 24px;
    font-size: 1rem;
  }

  .sample-img {
    width: 30%;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  /* .youtube-frame {
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
  }
  .youtube {
    width: 100%;
    height: 90vh;
  } */

  @media screen and (max-width: 768px) {
    /* .youtube-frame {
      width: 100%;
      text-align: center;
    }

    .youtube {
      width: 100%;
      height: 200px;
    } */

    .sub-content {
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
    }

    .sub-content-r {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 20px;
    }

    .sub-content-contract {
      font-size: 0.8rem;
    }

    .sub-content-title {
      font-size: 1.5rem;
      margin-bottom: 20px;
    }

    .sub-content-box {
      width: 100%;
      line-height: 24px;
      font-size: 18px;
      display: flex;
      flex-direction: column;
    }

    .sub-content-paragraph {
      width: 100%;
      line-height: 24px;
      font-size: 1rem;
    }

    .sample-img {
      width: 100%;
      border-radius: 10px;
      margin-bottom: 10px;
    }
    .info {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      padding: 20px;
    }
    .info-box {
      width: 100%;
    }

    .info-box-paragraph {
      font-size: 0.9rem;
      line-height: 20px;
      height: 80px;
    }
  }
</style>
