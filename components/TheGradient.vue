<template>
  <div
    ref="gradient"
    class="gradient"
    :class="[`gradient--${blockType}`, `gradient--${type}`]"
  >
    <canvas
      ref="gradient-canvas"
      class="gradient-canvas"
      data-js-lighten-top
      data-transition-in
    />
  </div>
</template>
<script>
import Gradient from "@/lib/Gradient";
export default {
  props: {
    type: {
      type: String,
      default: "brand"
    },
    blockType: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {
      gradient: false
    };
  },
  watch: {
    type(newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      this.updateGradientColors();
    }
  },
  mounted() {
    /*
     * Initializing the Gradient class, assigning a canvas to it and calling Gradient.connect() which initializes everything,
     * Use Gradient.pause() and Gradient.play() for controls.
     *
     * Here are some default property values you can change anytime:
     * Amplitude:    Gradient.amp = 0
     * Colors:       Gradient.sectionColors (if you change colors, use normalizeColor(#hexValue)) before you assign it.
     *
     *
     * Useful functions
     * Gradient.toggleColor(index)
     * Gradient.updateFrequency(freq)
     */
    this.gradient = new Gradient();
    // gradient.amp = 0
    this.gradient.initGradient(this.$refs["gradient-canvas"]);
  },
  methods: {
    updateGradientColors() {
      // const newColors = [
      //   '0x333633',
      //   '0xffff00',
      //   '0x222222',
      //   '0x1c3f8e',
      //   '0x8a92a6',
      //   '0xfffff',
      // ]

      console.log("update gradient colors");
      // this.gradient.sectionColors(newColors)
    }
  }
};
</script>
<style lang="scss">
.gradient {
  --top: 0;
  --bottom: 0;
  --left-right: -10%;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 100vh;
  transform: translateY(-50%);
  pointer-events: none;

  --gradient-color-background: var(--warm-gray);
  &--brand {
    --gradient-color-1: #27365e;
    --gradient-color-2: #352fba;
    --gradient-color-3: #1c3f8e;
    --gradient-color-4: #8a92a6;
  }

  &--presence {
    --gradient-color-1: #2d5e5d;
    --gradient-color-2: #838758;
    --gradient-color-3: #3f935d;
    --gradient-color-4: #7f825f;
  }

  &--hedgehog {
    --gradient-color-1: #bc1b1b;
    --gradient-color-2: #e25203;
    --gradient-color-3: #ed1c24;
    --gradient-color-4: #e27817;
  }

  &--connectors {
    --gradient-color-1: #ad6491;
    --gradient-color-2: #af2525;
    --gradient-color-3: #df2652;
    --gradient-color-4: #99334c;
  }

  &--hero {
    --top: -30%;
    --bottom: 55%;
    height: 100vh;
  }

  &--product {
    --top: -20%;
    --bottom: 5%;
    height: 100vh;
  }

  &--page {
    --top: -15%;
    --bottom: 5%;
    height: 125vh;
  }
}

.gradient-canvas {
  width: 100%;
  height: 100%;
  position: absolute;
}

// .vignette {
//   position: absolute;
//   left: 0px;
//   top: 0px;
//   z-index: 5;
//   height: 100%;
//   width: 100%;
//   background: red;
//   box-shadow: inset 0 0 50px var(--warm-gray), 0 0 800px var(--warm-gray);
// }
</style>
