<template>
  <div class="sidebar">
    <span class="reddot" @click="closeWindow" style="margin-left: 4px"></span>
    <span class="yellowdot" @click="minimizeWindow"></span>
    <span class="greendot" @click="maximizeWindow"></span>
    <a @click="changeTab(0)">1</a>
    <a @click="changeTab(1)">2</a>
    <a @click="changeTab(2)">3</a>
    <a @click="changeTab(3)">4</a>
    <a @click="changeTab(4)">5</a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tabs: [
          'https://www.givecard.io/',
          'https://www.facebook.com/',
          'https://www.apple.com/',
          'https://www.google.com/',
          'https://app.slack.com/client'
        ]
      }
    },
    methods: {
      changeTab (index) {
        this.$electron.ipcRenderer.send('changeToTab', this.tabs[index])
      },
      maximizeWindow () {
        var window = this.$electron.remote.getCurrentWindow()
        if (window.isMaximized()) {
          window.unmaximize()
        } else {
          window.maximize()
        }
      },
      closeWindow () {
        this.$electron.remote.getCurrentWindow().close()
      },
      minimizeWindow () {
        this.$electron.remote.getCurrentWindow().minimize()
      }
    }
  }
</script>

<style>
.sidebar {
  height: 100%;
  width: 50px;
  min-width: 50px;
  position: fixed;
  top: 0;
  left: 0;
  /* background-color: #D09D9D; */
  background-image: linear-gradient(to bottom right, purple, pink);
  overflow-x: hidden;
  -webkit-app-region: drag;
}

.sidebar a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #FFF;
  display: block;
  padding-top: 20px;
}

.greendot {
  height: 12px;
  width: 12px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

.greendot:hover {
  height: 12px;
  width: 12px;
  background-color: #00CA4E;
  border-radius: 50%;
  display: inline-block;
}

.yellowdot {
  height: 12px;
  width: 12px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

.yellowdot:hover {
  height: 12px;
  width: 12px;
  background-color: #FFBD44;
  border-radius: 50%;
  display: inline-block;
}

.reddot {
  height: 12px;
  width: 12px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

.reddot:hover {
  height: 12px;
  width: 12px;
  background-color: #FF605C;
  border-radius: 50%;
  display: inline-block;
}
</style>
