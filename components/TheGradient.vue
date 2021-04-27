<template>
  <div
    ref="gradient"
    class="gradient"
    :class="[`gradient--${blockType}`, `gradient--${type}`]"
  >
    <canvas
      ref="gradient-canvas"
      class="gradient-canvas"
      :data-js-darken-top="blockType === 'hero'"
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
    this.gradient.initGradient(this.$refs["gradient-canvas"]);
  },
  methods: {
    updateGradientColors() {
      this.gradient.initGradient(this.$refs["gradient-canvas"]);
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
    --gradient-color-1: #1c3f8e;
    --gradient-color-2: #352FBA;
    --gradient-color-3: #1c3f8e;
    --gradient-color-4: #35549c;
  }

  &--predictor {
    --gradient-color-1: #e69e29;
    --gradient-color-2: #dfb10c;
    --gradient-color-3: #e18900;
    --gradient-color-4: #e69e29;
  }

  //   &--brand {
  //   --gradient-color-1: #1c3f8e;
  //   --gradient-color-2: #352FBA;
  //   --gradient-color-3: #1c3f8e;
  //   --gradient-color-4: #3e59cf;
  // }

  &--presence {
    --gradient-color-1: #3F935D;
    --gradient-color-2: #2b6b4b;
    --gradient-color-3: #3F935D;
    --gradient-color-4: #2D5E5D;
  }

  &--hedgehog {
    --gradient-color-1: #E25203;
    --gradient-color-2: #ED1C24;
    --gradient-color-3: #ED1C24;
    --gradient-color-4: #fa752d;
  }

  //   &--hedgehog {
  //   --gradient-color-1: #E25203;
  //   --gradient-color-2: #ED1C24;
  //   --gradient-color-3: #ED1C24;
  //   --gradient-color-4: #E25203;
  // }

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
</style>
