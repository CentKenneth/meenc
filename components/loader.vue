<template>
  <div v-if="loading" class="loading-page">
    <div class="flex w-full mx-auto justify-center">
      <fade-loader
        class="center_loading"
        :loading="loading"
        :color="color"
        :size="size"
        :width="width"
        :height="height"
        :radius="radius"
        :margin="margin"
      />
    </div>
    <div class="flex w-full mx-auto justify-center -mt-1 ml-1">
      <img class="blink-image object-scale-down w-6 h-6" src="~assets/images/logo2.png">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      size: '10px',
      width: '10px',
      height: '20px',
      radius: '40px',
      margin: '5px 0px',
      color: '#48bb78'
    }
  },
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style>
.center_loading {
  margin: auto;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
}
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0,0.8);
  text-align: center;
  padding-top: 20%;
  font-size: 30px;
  font-family: sans-serif;
  z-index:100000;
}
.blink-image {
    -moz-animation: blink normal 2s infinite ease-in-out; /* Firefox */
    -webkit-animation: blink normal 2s infinite ease-in-out; /* Webkit */
    -ms-animation: blink normal 2s infinite ease-in-out; /* IE */
    animation: blink normal 2s infinite ease-in-out; /* Opera and prob css3 final iteration */
}
@-moz-keyframes blink {
    0% {
        opacity:1;
    }
    50% {
        opacity:0;
    }
    100% {
        opacity:1;
    }
}
@-webkit-keyframes blink {
    0% {
        opacity:1;
    }
    50% {
        opacity:0;
    }
    100% {
        opacity:1;
    }
}
/* IE */
@-ms-keyframes blink {
    0% {
        opacity:1;
    }
    50% {
        opacity:0;
    }
    100% {
        opacity:1;
    }
}
/* Opera and prob css3 final iteration */
@keyframes blink {
    0% {
        opacity:1;
    }
    50% {
        opacity:0;
    }
    100% {
        opacity:1;
    }
}
</style>
