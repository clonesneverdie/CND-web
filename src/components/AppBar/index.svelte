<script lang="ts">
  import Fa from 'svelte-fa'
  import { faTwitter, faDiscord, faMedium, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
  import { faBars } from '@fortawesome/free-solid-svg-icons'

  let navbarMenu = 'navbar_menu'
  let navbarIcons = 'navbar_icons'

  let toggleBtnActive = false
  function clickedToggleBtn() {
    toggleBtnActive = !toggleBtnActive
  }
</script>

<nav class="navbar">
  <div class="navbar_logo">
    <a href="/#/">
      <img class="logo-img" src="/assets/appbar_logo.png" alt="mainlogo" />
    </a>
  </div>

  <ul class="{toggleBtnActive === false ? 'navbar_menu' : 'navbar_menu_active'}">
    <li><a href="/#/mint" on:click="{clickedToggleBtn}">MINT</a></li>
    <li><a href="/#/wallet" on:click="{clickedToggleBtn}">WALLET</a></li>
    <li><a href="/#/vote" on:click="{clickedToggleBtn}">VOTE</a></li>
    <li><a href="/#/pax" on:click="{clickedToggleBtn}">$PAX</a></li>
    <li><a href="/#/comics" on:click="{clickedToggleBtn}">COMICS</a></li>
    <li><a href="/#/about" on:click="{clickedToggleBtn}">ABOUT</a></li>
  </ul>

  <ul class="{toggleBtnActive === false ? 'navbar_icons' : 'navbar_icons_active'}">
    <li><a href="https://twitter.com/clonesneverdie" target="_blank"><Fa icon="{faTwitter}" /></a></li>
    <li><a href="https://discord.gg/DNJ3sYCcGG" target="_blank"><Fa icon="{faDiscord}" /></a></li>
    <li><a href="https://medium.com/clones-never-die" target="_blank"><Fa icon="{faMedium}" /></a></li>
    <li><a href="https://www.instagram.com/clones_never_d1e" target="_blank"><Fa icon="{faInstagram}" /></a></li>
    <li>
      <a href="https://www.youtube.com/channel/UCU5TsS3qQYO1c8AhgNe6v_g" target="_blank"><Fa icon="{faYoutube}" /></a>
    </li>
    <li>
      <a href="https://opensea.io/collection/clones-never-die-v2" target="_blank"
        ><img class="opensea-logo" src="/assets/opensea-logo.png" alt="opensealogo" /></a
      >
    </li>
  </ul>

  <div class="navbar_toggleBtn" on:click="{() => (toggleBtnActive = !toggleBtnActive)}">
    <Fa icon="{faBars}" />
  </div>
</nav>

<style lang="scss">
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 12px;

    a {
      text-decoration: none;
      color: white;
    }

    .navbar_logo {
      width: 230px;
      font-size: 40px;
    }

    .logo-img {
      width: 30%;
    }

    .navbar_menu {
      display: flex;
      list-style: none;
      li {
        padding: 8px 12px;
      }
      li a:hover {
        color: $highlight-color;
      }
    }

    .navbar_menu_active {
      display: flex;
      list-style: none;
      li {
        padding: 8px 12px;
      }
      li a:hover {
        color: $highlight-color;
      }
    }

    .navbar_icons {
      list-style: none;
      display: flex;
      padding-left: 0;
      li {
        padding: 8px 12px;
      }
    }

    .navbar_icons_active {
      list-style: none;
      display: flex;
      padding-left: 0;
      li {
        padding: 8px 12px;
      }
    }

    .navbar_toggleBtn {
      display: none;
      position: absolute;
      right: 32px;
      font-size: 24px;
    }

    .opensea-logo {
      width: 16px;
      height: 16px;
    }
  }

  @media screen and (max-width: 768px) {
    .navbar {
      flex-direction: column;
      align-items: flex-start;
      padding: 12px 24px;

      .navbar_menu {
        display: none;
        width: 100%;
        flex-direction: column;
        align-items: center;
      }

      .navbar_icons {
        display: none;
        justify-content: center;
        width: 100%;
      }

      .navbar_toggleBtn {
        display: block;
        margin-top: 8px;
      }

      .navbar_menu_active {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
      }

      .navbar_icons_active {
        display: flex;
        justify-content: center;
        width: 100%;
      }
    }
  }
</style>
