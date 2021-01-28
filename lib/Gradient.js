/* eslint-disable eqeqeq */
/* eslint-disable require-await */
/* eslint-disable no-console */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-sequences */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-void */
/* eslint-disable yoda */
import MiniGl from "./MiniGl";
import { vertex } from "./shaders/vertex";
import { noise } from "./shaders/noise";
import { blend } from "./shaders/blend";
import { fragment } from "./shaders/fragment";

// Converting colors to proper format
function normalizeColor(hexCode) {
  return [
    ((hexCode >> 16) & 255) / 255,
    ((hexCode >> 8) & 255) / 255,
    (255 & hexCode) / 255
  ];
}

// Sets initial properties
function e(object, propertyName, val) {
  return (
    propertyName in object
      ? Object.defineProperty(object, propertyName, {
          value: val,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (object[propertyName] = val),
    object
  );
}

["SCREEN", "LINEAR_LIGHT"].reduce(
  (hexCode, t, n) =>
    Object.assign(hexCode, {
      [t]: n
    }),
  {}
);

class Gradient {
  constructor(...t) {
    e(this, "el", void 0),
      e(this, "cssVarRetries", 0),
      e(this, "maxCssVarRetries", 200),
      e(this, "angle", 0),
      e(this, "isLoadedClass", !1),
      e(this, "isScrolling", !1),
      /* e(this, "isStatic", o.disableAmbientAnimations()), */ e(
        this,
        "scrollingTimeout",
        void 0
      ),
      e(this, "scrollingRefreshDelay", 200),
      e(this, "isIntersecting", !1),
      e(this, "shaderFiles", void 0),
      e(this, "vertexShader", void 0),
      e(this, "sectionColors", void 0),
      e(this, "computedCanvasStyle", void 0),
      e(this, "conf", void 0),
      e(this, "uniforms", void 0),
      e(this, "t", 1253106),
      e(this, "last", 0),
      e(this, "width", void 0),
      e(this, "minWidth", 1111),
      e(this, "height", 600),
      e(this, "xSegCount", void 0),
      e(this, "ySegCount", void 0),
      e(this, "mesh", void 0),
      e(this, "material", void 0),
      e(this, "geometry", void 0),
      e(this, "minigl", void 0),
      e(this, "scrollObserver", void 0),
      e(this, "amp", 320),
      e(this, "seed", 5),
      e(this, "freqX", 14e-5),
      e(this, "freqY", 29e-5),
      e(this, "freqDelta", 1e-5),
      e(this, "activeColors", [1, 1, 1, 1]),
      e(this, "isMetaKey", !1),
      e(this, "isGradientLegendVisible", !1),
      e(this, "isMouseDown", !1),
      e(this, "handleScroll", () => {
        clearTimeout(this.scrollingTimeout),
          (this.scrollingTimeout = setTimeout(
            this.handleScrollEnd,
            this.scrollingRefreshDelay
          )),
          this.isGradientLegendVisible && this.hideGradientLegend(),
          this.conf.playing && ((this.isScrolling = !0), this.pause());
      }),
      e(this, "handleScrollEnd", () => {
        (this.isScrolling = !1), this.isIntersecting && this.play();
      }),
      e(this, "resize", () => {
        (this.width = window.innerWidth),
          this.minigl.setSize(this.width, this.height),
          this.minigl.setOrthographicCamera(),
          (this.xSegCount = Math.ceil(this.width * this.conf.density[0])),
          (this.ySegCount = Math.ceil(this.height * this.conf.density[1])),
          this.mesh.geometry.setTopology(this.xSegCount, this.ySegCount),
          this.mesh.geometry.setSize(this.width, this.height),
          (this.mesh.material.uniforms.u_shadow_power.value =
            this.width < 600 ? 5 : 6);
      }),
      e(this, "handleMouseDown", e => {
        this.isGradientLegendVisible &&
          ((this.isMetaKey = e.metaKey),
          (this.isMouseDown = !0),
          !1 === this.conf.playing && requestAnimationFrame(this.animate));
      }),
      e(this, "handleMouseUp", () => {
        this.isMouseDown = !1;
      }),
      e(this, "animate", e => {
        if (!this.shouldSkipFrame(e) || this.isMouseDown) {
          if (
            ((this.t += Math.min(e - this.last, 1e3 / 15)),
            (this.last = e),
            this.isMouseDown)
          ) {
            let e = 160;
            this.isMetaKey && (e = -160), (this.t += e);
          }
          (this.mesh.material.uniforms.u_time.value = this.t),
            this.minigl.render();
        }
        if (0 !== this.last && this.isStatic)
          return (
            this.minigl.render(),
            void this.disconnect()
            /* this.isIntersecting && */
          );
        (this.conf.playing || this.isMouseDown) &&
          requestAnimationFrame(this.animate);
      }),
      e(this, "addIsLoadedClass", () => {
        /* this.isIntersecting && */ !this.isLoadedClass &&
          ((this.isLoadedClass = !0),
          this.el.classList.add("isLoaded"),
          setTimeout(() => {
            this.el.parentElement.classList.add("isLoaded");
          }, 3e3));
      }),
      e(this, "pause", () => {
        this.conf.playing = false;
      }),
      e(this, "play", () => {
        requestAnimationFrame(this.animate), (this.conf.playing = true);
      }),
      e(this, "initGradient", selector => {
        this.el = selector; /// We're now just passing the element straight in from refs // document.querySelector(selector)
        this.connect();
        return this;
      });
  }
  async connect() {
    (this.shaderFiles = {
      vertex,
      noise,
      blend,
      fragment
    }),
      (this.conf = {
        presetName: "",
        wireframe: false,
        density: [0.06, 0.16],
        zoom: 1,
        rotation: 0,
        playing: true
      }),
      document.querySelectorAll("canvas").length < 1
        ? console.log("DID NOT LOAD CANVAS")
        : ((this.minigl = new MiniGl(this.el, null, null, !0)),
          requestAnimationFrame(() => {
            this.el &&
              ((this.computedCanvasStyle = getComputedStyle(this.el)),
              this.waitForCssVars());
          }));
    /*
      this.scrollObserver = await s.create(.1, !1),
      this.scrollObserver.observe(this.el),
      this.scrollObserver.onSeparate(() => {
          window.removeEventListener("scroll", this.handleScroll), window.removeEventListener("mousedown", this.handleMouseDown), window.removeEventListener("mouseup", this.handleMouseUp), window.removeEventListener("keydown", this.handleKeyDown), this.isIntersecting = !1, this.conf.playing && this.pause()
      }), 
      this.scrollObserver.onIntersect(() => {
          window.addEventListener("scroll", this.handleScroll), window.addEventListener("mousedown", this.handleMouseDown), window.addEventListener("mouseup", this.handleMouseUp), window.addEventListener("keydown", this.handleKeyDown), this.isIntersecting = !0, this.addIsLoadedClass(), this.play()
      }) */
  }
  disconnect() {
    this.scrollObserver &&
      (window.removeEventListener("scroll", this.handleScroll),
      window.removeEventListener("mousedown", this.handleMouseDown),
      window.removeEventListener("mouseup", this.handleMouseUp),
      window.removeEventListener("keydown", this.handleKeyDown),
      this.scrollObserver.disconnect()),
      window.removeEventListener("resize", this.resize);
  }
  initMaterial() {
    this.uniforms = {
      u_time: new this.minigl.Uniform({
        value: 0
      }),
      u_shadow_power: new this.minigl.Uniform({
        value: 5
      }),
      u_darken_top: new this.minigl.Uniform({
        value: "true" === this.el.dataset.jsDarkenTop ? 1 : 0
      }),
      u_active_colors: new this.minigl.Uniform({
        value: this.activeColors,
        type: "vec4"
      }),
      u_global: new this.minigl.Uniform({
        value: {
          noiseFreq: new this.minigl.Uniform({
            value: [this.freqX, this.freqY],
            type: "vec2"
          }),
          noiseSpeed: new this.minigl.Uniform({
            value: 5e-6
          })
        },
        type: "struct"
      }),
      u_vertDeform: new this.minigl.Uniform({
        value: {
          incline: new this.minigl.Uniform({
            value: Math.sin(this.angle) / Math.cos(this.angle)
          }),
          offsetTop: new this.minigl.Uniform({
            value: -0.5
          }),
          offsetBottom: new this.minigl.Uniform({
            value: -0.5
          }),
          noiseFreq: new this.minigl.Uniform({
            value: [3, 4],
            type: "vec2"
          }),
          noiseAmp: new this.minigl.Uniform({
            value: this.amp
          }),
          noiseSpeed: new this.minigl.Uniform({
            value: 10
          }),
          noiseFlow: new this.minigl.Uniform({
            value: 3
          }),
          noiseSeed: new this.minigl.Uniform({
            value: this.seed
          })
        },
        type: "struct",
        excludeFrom: "fragment"
      }),
      u_baseColor: new this.minigl.Uniform({
        value: this.sectionColors[0],
        type: "vec3",
        excludeFrom: "fragment"
      }),
      u_waveLayers: new this.minigl.Uniform({
        value: [],
        excludeFrom: "fragment",
        type: "array"
      })
    };
    for (let e = 1; e < this.sectionColors.length; e += 1)
      this.uniforms.u_waveLayers.value.push(
        new this.minigl.Uniform({
          value: {
            color: new this.minigl.Uniform({
              value: this.sectionColors[e],
              type: "vec3"
            }),
            noiseFreq: new this.minigl.Uniform({
              value: [
                2 + e / this.sectionColors.length,
                3 + e / this.sectionColors.length
              ],
              type: "vec2"
            }),
            noiseSpeed: new this.minigl.Uniform({
              value: 80 + 0.3 * e //changed [11] to 80
            }),
            noiseFlow: new this.minigl.Uniform({
              value: 20 + 0.3 * e
            }),
            noiseSeed: new this.minigl.Uniform({
              value: this.seed + 100 * e
            }),
            noiseFloor: new this.minigl.Uniform({
              value: 0.1
            }),
            noiseCeil: new this.minigl.Uniform({
              value: 0.45 + 0.07 * e
            })
          },
          type: "struct"
        })
      );
    return (
      (this.vertexShader = [
        this.shaderFiles.noise,
        this.shaderFiles.blend,
        this.shaderFiles.vertex
      ].join("\n\n")),
      new this.minigl.Material(
        this.vertexShader,
        this.shaderFiles.fragment,
        this.uniforms
      )
    );
  }
  initMesh() {
    (this.material = this.initMaterial()),
      (this.geometry = new this.minigl.PlaneGeometry()),
      (this.mesh = new this.minigl.Mesh(this.geometry, this.material));
  }
  shouldSkipFrame(e) {
    return (
      !!window.document.hidden ||
      !this.conf.playing ||
      parseInt(e, 10) % 2 == 0 ||
      void 0
    );
  }
  updateFrequency(e) {
    (this.freqX += e), (this.freqY += e);
  }
  toggleColor(index) {
    this.activeColors[index] = 0 === this.activeColors[index] ? 1 : 0;
  }
  showGradientLegend() {
    this.width > this.minWidth &&
      ((this.isGradientLegendVisible = !0),
      document.body.classList.add("isGradientLegendVisible"));
  }
  hideGradientLegend() {
    (this.isGradientLegendVisible = !1),
      document.body.classList.remove("isGradientLegendVisible");
  }
  init() {
    this.initGradientColors(),
      this.initMesh(),
      this.resize(),
      requestAnimationFrame(this.animate),
      window.addEventListener("resize", this.resize);
  }
  /*
   * Waiting for the css variables to become available, usually on page load before we can continue.
   * Using default colors assigned below if no variables have been found after maxCssVarRetries
   */
  waitForCssVars() {
    if (
      this.computedCanvasStyle &&
      -1 !==
        this.computedCanvasStyle
          .getPropertyValue("--gradient-color-1")
          .indexOf("#")
    )
      this.init(), this.addIsLoadedClass();
    else {
      if (
        ((this.cssVarRetries += 1), this.cssVarRetries > this.maxCssVarRetries)
      ) {
        return (
          (this.sectionColors = [16711680, 16711680, 16711935, 65280, 255]),
          void this.init()
        );
      }
      requestAnimationFrame(() => this.waitForCssVars());
    }
  }
  /*
   * Initializes the four section colors by retrieving them from css variables.
   */
  initGradientColors() {
    this.sectionColors = [
      "--gradient-color-1",
      "--gradient-color-2",
      "--gradient-color-3",

      "--gradient-color-4"
    ]
      .map(cssPropertyName => {
        let hex = this.computedCanvasStyle
          .getPropertyValue(cssPropertyName)
          .trim();
        // Check if shorthand hex value was used and double the length so the conversion in normalizeColor will work.
        if (4 === hex.length) {
          const hexTemp = hex
            .substr(1)
            .split("")
            .map(hexTemp => hexTemp + hexTemp)
            .join("");
          hex = `#${hexTemp}`;
        }
        return hex && `0x${hex.substr(1)}`;
      })
      .filter(Boolean)
      .map(normalizeColor);
  }
}

export default Gradient;
