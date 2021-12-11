<script lang="ts">
</script>

<div class="container">
  <div class="container-title">CxNxD 萬 (V2)</div>
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
        <div class="sub-content-title">About 'Clones Never Die 萬'</div>
        <div class="sub-content-paragraph">
          'Clones Never Die 萬' is version 2 of 'Clones Never Die'.
          <br />
          'CxNxD 萬' exists on the polygon blockchain.
          <br />
          Each unique part was used to create 10,000 NFTs.
          <br />
          There are no clones of the same form and they are unique.
          <br />
          And each clone has a rarity.
          <br />
          If you have clones, you can use the clone picture wherever you want and do various activities in the Clones Never
          Die world.
          <br />
          And 'CxNxD 萬' can also earn $Nectar from Lotus!
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
          <div class="info-box-title">Lotus</div>
          <div class="info-box-paragraph">This is where CxNxD clones work. Clones can earn $Nectar here.</div>
        </div>
        <div class="info-box">
          <div class="info-box-title">$Nectar</div>
          <div class="info-box-paragraph">
            $Nectar is a token used in the CxNxD world. It can be used to vote on governance or mint V3, and we are
            planning various other uses.
          </div>
        </div>
        <div class="info-box">
          <div class="info-box-title">Governance</div>
          <div class="info-box-paragraph">
            CxNxD team operates governance to reflect the opinions of holders. $Nectar holders can voice out their
            opinion and vote.
          </div>
        </div>
      </div>
    </div>
    <div class="sub-content-r">
      <img class="sample-img" src="/assets/token-distribute.png" alt="distribute" />
      <div class="sub-content-box">
        <div class="sub-content-title">Token distribution</div>
        <div class="sub-content-paragraph">
          CxNxD 萬 tokens are distributed as follows.
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
        <a class="sub-content-contract" href="https://opensea.io/collection/clones-never-die-v2" target="_blank"
          >Clones Never Die 萬 (V2)</a
        >
      </div>
    </div>
    <div class="sub-content">
      <div class="sub-content-box-center">
        CxNxD 萬 Contract Address
        <a
          class="sub-content-contract"
          href="https://polygonscan.com/token/0x6c15030A0055D7350c89EbbD460EB4F145462Fbd"
          target="_blank">0x6c15030A0055D7350c89EbbD460EB4F145462Fbd</a
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
