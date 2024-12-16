/* eslint-disable no-self-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
(async (a) => {
  //////////////////////////////////////////////////
  await fetch("./iconfont.svg")
    .then((response) => response.text())
    .then((svgText) => {
      console.log(svgText);
      window._iconfont_svg_string_4783308 = svgText;
    })
    .catch((e) => {
      console.error(e);
      window._iconfont_svg_string_4783308 = "";
    });
  //////////////////////////////////////////////////
  var l = (c = (c = document.getElementsByTagName("script"))[
      c.length - 1
    ]).getAttribute("data-injectcss"),
    c = c.getAttribute("data-disable-injectsvg");
  if (!c) {
    var h,
      t,
      p,
      M,
      z,
      i = function (l, c) {
        c.parentNode.insertBefore(l, c);
      };
    if (l && !a.__iconfont__svg__cssinject__) {
      a.__iconfont__svg__cssinject__ = !0;
      try {
        document.write(
          "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>",
        );
      } catch (l) {
        console && console.log(l);
      }
    }
    (h = function () {
      var l,
        c = document.createElement("div");
      (c.innerHTML = a._iconfont_svg_string_4783308),
        (c = c.getElementsByTagName("svg")[0]) &&
          (c.setAttribute("aria-hidden", "true"),
          (c.style.position = "absolute"),
          (c.style.width = 0),
          (c.style.height = 0),
          (c.style.overflow = "hidden"),
          (c = c),
          (l = document.body).firstChild
            ? i(c, l.firstChild)
            : l.appendChild(c));
    }),
      document.addEventListener
        ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
          ? setTimeout(h, 0)
          : ((t = function () {
              document.removeEventListener("DOMContentLoaded", t, !1), h();
            }),
            document.addEventListener("DOMContentLoaded", t, !1))
        : document.attachEvent &&
          ((p = h),
          (M = a.document),
          (z = !1),
          f(),
          (M.onreadystatechange = function () {
            "complete" == M.readyState && ((M.onreadystatechange = null), d());
          }));
  }
  function d() {
    z || ((z = !0), p());
  }
  function f() {
    try {
      M.documentElement.doScroll("left");
    } catch (l) {
      return void setTimeout(f, 50);
    }
    d();
  }
})(window);
