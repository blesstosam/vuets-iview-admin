!(function(d) {
  let e,
    n =
      '<svg><symbol id="icon-language" viewBox="0 0 1088 1024"><path d="M729.6 294.4c19.2 57.6 44.8 102.4 89.6 147.2 38.4-38.4 64-89.6 83.2-147.2H729.6z m-422.4 320h166.4l-83.2-224z" fill="" ></path><path d="M947.2 0h-768c-70.4 0-128 57.6-128 128v768c0 70.4 57.6 128 128 128h768c70.4 0 128-57.6 128-128V128c0-70.4-51.2-128-128-128zM633.6 825.6c-12.8 12.8-25.6 12.8-38.4 12.8-6.4 0-19.2 0-25.6-6.4s-12.8 0-12.8-6.4-6.4-12.8-12.8-25.6-6.4-19.2-12.8-32l-25.6-70.4h-224L256 768c-12.8 25.6-19.2 44.8-25.6 57.6-6.4 12.8-19.2 12.8-38.4 12.8-12.8 0-25.6-6.4-38.4-12.8-12.8-12.8-19.2-19.2-19.2-32 0-6.4 0-12.8 6.4-25.6s6.4-19.2 12.8-32l140.8-358.4c6.4-12.8 6.4-25.6 12.8-38.4s12.8-25.6 19.2-32 12.8-19.2 25.6-25.6c12.8-6.4 25.6-6.4 38.4-6.4 12.8 0 25.6 0 38.4 6.4 12.8 6.4 19.2 12.8 25.6 25.6 6.4 6.4 12.8 19.2 19.2 32 6.4 12.8 12.8 25.6 19.2 44.8l140.8 352c12.8 25.6 19.2 44.8 19.2 57.6-6.4 6.4-12.8 19.2-19.2 32z m352-249.6c-70.4-25.6-121.6-57.6-166.4-96-44.8 44.8-102.4 76.8-172.8 96l-19.2-32c70.4-19.2 128-44.8 172.8-89.6-44.8-44.8-83.2-102.4-96-166.4h-64v-25.6h172.8c-12.8-19.2-25.6-44.8-38.4-64l19.2-6.4c12.8 19.2 32 44.8 44.8 70.4h160v32h-64c-19.2 64-51.2 121.6-89.6 160 44.8 38.4 96 70.4 166.4 89.6l-25.6 32z" fill="" ></path></symbol></svg>',
    t = (e = document.getElementsByTagName('script'))[e.length - 1].getAttribute('data-injectcss');
  if (t && !d.__iconfont__svg__cssinject__) {
    d.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  !(function(e) {
    if (document.addEventListener)
      if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) setTimeout(e, 0);
      else {
        var t = function() {
          document.removeEventListener('DOMContentLoaded', t, !1), e();
        };
        document.addEventListener('DOMContentLoaded', t, !1);
      }
    else
      document.attachEvent &&
        ((c = e),
        (o = d.document),
        (i = !1),
        (l = function() {
          try {
            o.documentElement.doScroll('left');
          } catch (e) {
            return void setTimeout(l, 50);
          }
          n();
        })(),
        (o.onreadystatechange = function() {
          'complete' == o.readyState && ((o.onreadystatechange = null), n());
        }));
    function n() {
      i || ((i = !0), c());
    }
    let c, o, i, l;
  })(function() {
    let e, t;
    ((e = document.createElement('div')).innerHTML = n),
      (n = null),
      (t = e.getElementsByTagName('svg')[0]) &&
        (t.setAttribute('aria-hidden', 'true'),
        (t.style.position = 'absolute'),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = 'hidden'),
        (function(e, t) {
          t.firstChild
            ? (function(e, t) {
                t.parentNode.insertBefore(e, t);
              })(e, t.firstChild)
            : t.appendChild(e);
        })(t, document.body));
  });
})(window);
