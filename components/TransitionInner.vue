<template>
  <div class="animation-transtion"></div>
</template>

<script>
export default {
  data() {
    return {
      lottie: {}
    };
  },

  created() {},

  mounted() {
    this._handleMuatate();
  },

  computed: {},

  methods: {
    _handleMuatate() {
      // BodyMoniv подключил
      let bdMovin = bodymovin;
      let animationContainer = document.querySelector(".animation-transtion");

      // некорректный json

      let animationData = {
        v: "5.5.9",
        fr: 29.9700012207031,
        ip: 0,
        op: 50.0000020365418,
        w: 1440,
        h: 810,
        nm: "Lines 2",
        ddd: 0,
        assets: [],
        layers: [
          {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: "Martell-Test Outlines",
            sr: 1,
            ks: {
              o: { a: 0, k: 100, ix: 11 },
              r: { a: 0, k: 0, ix: 10 },
              p: { a: 0, k: [720, 405, 0], ix: 2 },
              a: { a: 0, k: [960, 540, 0], ix: 1 },
              s: { a: 0, k: [100, 100, 100], ix: 6 }
            },
            ao: 0,
            shapes: [
              {
                ty: "gr",
                it: [
                  {
                    ind: 0,
                    ty: "sh",
                    ix: 1,
                    ks: {
                      a: 0,
                      k: {
                        i: [[-318.826, 105.816], [-292.46, 94.593]],
                        o: [[520.455, -172.735], [22.902, -7.407]],
                        v: [[250.051, 197.6], [1602.42, -315.048]],
                        c: false
                      },
                      ix: 2
                    },
                    nm: "Path 1",
                    mn: "ADBE Vector Shape - Group",
                    hd: false
                  },
                  {
                    ty: "st",
                    c: { a: 0, k: [1, 1, 1, 1], ix: 3 },
                    o: { a: 0, k: 100, ix: 4 },
                    w: { a: 0, k: 1, ix: 5 },
                    lc: 1,
                    lj: 1,
                    ml: 10,
                    bm: 0,
                    nm: "Stroke 1",
                    mn: "ADBE Vector Graphic - Stroke",
                    hd: false
                  },
                  {
                    ty: "tm",
                    s: {
                      a: 1,
                      k: [
                        {
                          i: { x: [0.667], y: [1] },
                          o: { x: [0.333], y: [0] },
                          t: 4.795,
                          s: [0]
                        },
                        { t: 38.0000015477717, s: [100] }
                      ],
                      ix: 1
                    },
                    e: {
                      a: 1,
                      k: [
                        {
                          i: { x: [0.667], y: [1] },
                          o: { x: [0.333], y: [0] },
                          t: 19,
                          s: [0]
                        },
                        { t: 49.25875200635, s: [100] }
                      ],
                      ix: 2
                    },
                    o: { a: 0, k: 0, ix: 3 },
                    m: 1,
                    ix: 3,
                    nm: "Trim Paths 1",
                    mn: "ADBE Vector Filter - Trim",
                    hd: false
                  },
                  {
                    ty: "tr",
                    p: { a: 0, k: [-11.797, 449.166], ix: 2 },
                    a: { a: 0, k: [0, 0], ix: 1 },
                    s: { a: 0, k: [100, 100], ix: 3 },
                    r: { a: 0, k: 0, ix: 6 },
                    o: { a: 0, k: 100, ix: 7 },
                    sk: { a: 0, k: 0, ix: 4 },
                    sa: { a: 0, k: 0, ix: 5 },
                    nm: "Transform"
                  }
                ],
                nm: "Group 1",
                np: 3,
                cix: 2,
                bm: 0,
                ix: 1,
                mn: "ADBE Vector Group",
                hd: false
              },
              {
                ty: "gr",
                it: [
                  {
                    ind: 0,
                    ty: "sh",
                    ix: 1,
                    ks: {
                      a: 0,
                      k: {
                        i: [
                          [-108.093, 19.63],
                          [-173.278, 90.682],
                          [-16.652, 9.295]
                        ],
                        o: [
                          [781.879, -141.988],
                          [14.94, -7.819],
                          [132.355, -73.875]
                        ],
                        v: [
                          [277.029, 265.958],
                          [1672.709, -217.475],
                          [1720.201, -243.327]
                        ],
                        c: false
                      },
                      ix: 2
                    },
                    nm: "Path 1",
                    mn: "ADBE Vector Shape - Group",
                    hd: false
                  },
                  {
                    ty: "st",
                    c: { a: 0, k: [1, 1, 1, 1], ix: 3 },
                    o: { a: 0, k: 100, ix: 4 },
                    w: { a: 0, k: 1, ix: 5 },
                    lc: 1,
                    lj: 1,
                    ml: 10,
                    bm: 0,
                    nm: "Stroke 1",
                    mn: "ADBE Vector Graphic - Stroke",
                    hd: false
                  },
                  {
                    ty: "tm",
                    s: {
                      a: 1,
                      k: [
                        {
                          i: { x: [0.667], y: [1] },
                          o: { x: [0.333], y: [0] },
                          t: 15,
                          s: [0]
                        },
                        { t: 33.0000013441176, s: [100] }
                      ],
                      ix: 1
                    },
                    e: {
                      a: 1,
                      k: [
                        {
                          i: { x: [0.667], y: [1] },
                          o: { x: [0.333], y: [0] },
                          t: 25,
                          s: [0]
                        },
                        { t: 42.5900017347263, s: [100] }
                      ],
                      ix: 2
                    },
                    o: { a: 0, k: 0, ix: 3 },
                    m: 1,
                    ix: 3,
                    nm: "Trim Paths 2",
                    mn: "ADBE Vector Filter - Trim",
                    hd: false
                  },
                  {
                    ty: "tr",
                    p: { a: 0, k: [-38.957, 584.442], ix: 2 },
                    a: { a: 0, k: [0, 0], ix: 1 },
                    s: { a: 0, k: [100, 100], ix: 3 },
                    r: { a: 0, k: 0, ix: 6 },
                    o: { a: 0, k: 100, ix: 7 },
                    sk: { a: 0, k: 0, ix: 4 },
                    sa: { a: 0, k: 0, ix: 5 },
                    nm: "Transform"
                  }
                ],
                nm: "Group 2",
                np: 3,
                cix: 2,
                bm: 0,
                ix: 2,
                mn: "ADBE Vector Group",
                hd: false
              },
              {
                ty: "gr",
                it: [
                  {
                    ind: 0,
                    ty: "sh",
                    ix: 1,
                    ks: {
                      a: 0,
                      k: {
                        i: [
                          [-346.629, 95.563],
                          [-221.71, 95.765],
                          [-118.701, 43.46]
                        ],
                        o: [
                          [421.611, -116.235],
                          [135.504, -58.53],
                          [174.523, -63.899]
                        ],
                        v: [
                          [234.754, 241.045],
                          [1294.063, -132.799],
                          [1677.962, -295.552]
                        ],
                        c: false
                      },
                      ix: 2
                    },
                    nm: "Path 1",
                    mn: "ADBE Vector Shape - Group",
                    hd: false
                  },
                  {
                    ty: "st",
                    c: { a: 0, k: [1, 1, 1, 1], ix: 3 },
                    o: { a: 0, k: 100, ix: 4 },
                    w: { a: 0, k: 1, ix: 5 },
                    lc: 1,
                    lj: 1,
                    ml: 10,
                    bm: 0,
                    nm: "Stroke 1",
                    mn: "ADBE Vector Graphic - Stroke",
                    hd: false
                  },
                  {
                    ty: "tm",
                    s: {
                      a: 1,
                      k: [
                        {
                          i: { x: [0.667], y: [1] },
                          o: { x: [0.333], y: [0] },
                          t: 0,
                          s: [0]
                        },
                        { t: 28.0000011404634, s: [100] }
                      ],
                      ix: 1
                    },
                    e: {
                      a: 1,
                      k: [
                        {
                          i: { x: [0.667], y: [1] },
                          o: { x: [0.333], y: [0] },
                          t: 16,
                          s: [0]
                        },
                        { t: 43.0000017514259, s: [100] }
                      ],
                      ix: 2
                    },
                    o: { a: 0, k: 0, ix: 3 },
                    m: 1,
                    ix: 3,
                    nm: "Trim Paths 3",
                    mn: "ADBE Vector Filter - Trim",
                    hd: false
                  },
                  {
                    ty: "tr",
                    p: { a: 0, k: [3.223, 509.876], ix: 2 },
                    a: { a: 0, k: [0, 0], ix: 1 },
                    s: { a: 0, k: [100, 100], ix: 3 },
                    r: { a: 0, k: 0, ix: 6 },
                    o: { a: 0, k: 100, ix: 7 },
                    sk: { a: 0, k: 0, ix: 4 },
                    sa: { a: 0, k: 0, ix: 5 },
                    nm: "Transform"
                  }
                ],
                nm: "Group 3",
                np: 3,
                cix: 2,
                bm: 0,
                ix: 3,
                mn: "ADBE Vector Group",
                hd: false
              }
            ],
            ip: 0,
            op: 599.400024414063,
            st: 0,
            bm: 0
          },
          {
            ddd: 0,
            ind: 2,
            ty: 1,
            nm: "Black Solid 1",
            sr: 1,
            ks: {
              o: { a: 0, k: 100, ix: 11 },
              r: { a: 0, k: 0, ix: 10 },
              p: { a: 0, k: [720, 405, 0], ix: 2 },
              a: { a: 0, k: [960, 540, 0], ix: 1 },
              s: { a: 0, k: [100, 100, 100], ix: 6 }
            },
            ao: 0,
            sw: 1920,
            sh: 1080,
            sc: "none",
            ip: 0,
            op: 600.000024438501,
            st: 0,
            bm: 0
          }
        ],
        markers: []
      };

      let params = {
        container: animationContainer,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "none"
        }
      };

      this.lottie = bdMovin.loadAnimation(params);

      this.$bus.$emit('lottie:init', this.lottie);
    }
  },
  
  watch: {
    $route (rou) {
      this.$bus.$emit('lottie:init', this.lottie);
    }
  }
};
</script>

<style lang="scss">
.animation-transtion {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 99;

  &.is-hidden {
     visibility: hidden;
  }
}
</style>