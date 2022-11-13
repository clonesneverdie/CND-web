<script lang="ts">
  import Fa from 'svelte-fa'
  import { faTwitter, faDiscord, faMedium, faInstagram } from '@fortawesome/free-brands-svg-icons'
  import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
</script>

<hr />

<div class="container">
  <div class="container-content">
    <div class="footer-content">
      <div class="footer-notice">
        <div class="footer-title">contact us</div>
      </div>
      <ul class="navbar_icons">
        <li><a href="https://twitter.com/clonecraftgame" target="_blank"><Fa icon="{faTwitter}" /></a></li>
        <!-- <li><a href="https://discord.gg/DNJ3sYCcGG" target="_blank"><Fa icon="{faDiscord}" /></a></li> -->
        <li><a href="mailto:support@dsclabel.co.kr" target="_blank"><Fa icon="{faEnvelope}" /></a></li>
      </ul>
      <div class="notice-content">
        copyrightⓒ 2021 All rights reserved by Clones Never Die.
        <br />
        Clone Never Die NFT does not include a license. The Clone Never Die license is entirely owned by the CND dev team
        (2ssul, Team Leader).
        <br />
        If you use a picture without permission, you can be legally punished.
      </div>
    </div>
    <div class="footer-logo-container">
      <div class="footer-logo">
        <img class="footer-img" src="/assets/logo-white.png" alt="logo" />
        <div class="logo-text">
          <b>CLONES NEVER DIE</b>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  hr {
    border: none;
    height: 10px;
    margin: 50px 0px;
    background-color: $highlight-color;
  }

  .container-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    max-width: 1280px;
    margin: 0px auto;
    margin-bottom: 50px;
  }

  .footer-content {
    width: 50%;
  }

  .footer-logo-container {
    width: 20%;
    text-align: center;
    margin-bottom: 30px;
  }

  .footer-img {
    width: 50%;
  }

  .logo-text {
    font-size: 1.4rem;
    text-align: center;
  }

  .footer-title {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }

  .footer-logo {
    width: 100%;
  }

  .notice-content {
    font-size: 0.8rem;
  }

  .navbar_icons {
    list-style: none;
    display: flex;
    padding-left: 0;
    margin-bottom: 30px;
    li {
      margin-right: 15px;
    }
  }

  @media screen and (max-width: 768px) {
    .container-content {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      flex-direction: column-reverse;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 50px;
    }

    .footer-logo-container {
      width: 100%;
      text-align: center;
      margin-bottom: 70px;
    }
    .footer-content {
      width: 100%;
    }
  }
</style>
