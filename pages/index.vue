<template>
  <div class="container">
    <div>
      <section class="hero container section">
        <TheGradient type="brand" block-type="hero" />
      </section>
      <div style="height: 100px;"></div>
      <section class="hero container section">
        <TheGradient type="hedgehog" block-type="product" />
      </section>
      <div style="height: 300px;"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
:root {
  // border
  --radius: 14px;
  --radius-img: 7px;

  // spacing
  --spacing-step: 10px;
  --space-xxs: 1 * var(--spacing-step);
  --space-xs: 2 * var(--spacing-step);
  --space-sm: 3 * var(--spacing-step);
  --space-md: 4 * var(--spacing-step);
  --space-lg: 5 * var(--spacing-step);
  --space-xl: 6 * var(--spacing-step);
  --space-xxl: 7 * var(--spacing-step);
  --space-xxxl: 12 * var(--spacing-step);
  --default-font: "PolySans", "Helvetica Neue Light", "Helvetica Neue",
    "Helvetica", "Arial", sans-serif;

  // colors
  --deep-black: #000000;
  --black: #333333;
  --hairline-black: rgba(0, 0, 0, 0.7);
  --white: #ffffff;
  --hairline-white: rgba(255, 255, 255, 0.7);
  --warm-gray: #f4f1ef;
  --red: #ff4b4b;
}

body {
  padding: 0;
  margin: 0;
  background: var(--warm-gray);
}
.section {
  position: relative;
  margin-bottom: var(--spacing-step);

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--spacing-step);
    right: var(--spacing-step);
    border: 1px solid var(--hairline-black);
    border-radius: var(--radius);
    pointer-events: none;
    content: "";
  }
}

.hero {
  position: relative;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  color: var(--white);
  height: 100vh;
  min-height: 550px;
  background-repeat: no-repeat;
  background-size: cover;

  &::before {
    top: var(--spacing-step);
    bottom: var(--spacing-step);
    z-index: 4;
  }
}
</style>
