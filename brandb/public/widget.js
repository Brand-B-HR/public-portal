/*
 * The embeddable job widget.
 *
 * A business drops two lines on its own website and a role's application form appears in place:
 *
 *   <div data-brandb-role="k3m9x2p7qrst4vwy"></div>
 *   <script src="https://<portal>/public-portal/widget.js" async></script>
 *
 * It is an iframe rather than injected markup, and that is the whole design decision. Injecting a
 * form into someone else's page means inheriting their CSS, their form resets, their jQuery
 * plugins and their Content Security Policy — and every one of those is a way for the form to look
 * broken or stop working on a site nobody here can see. An iframe is isolated: the form looks the
 * same on every site, and a candidate's CV and details never pass through the host page's
 * JavaScript at all, which matters because they are personal data on a site we do not control.
 *
 * The one thing an iframe costs is height: a cross-origin frame cannot size itself to its content.
 * So the embedded page measures itself and posts its height out, and this listens. Without that
 * the widget would be a fixed box with an inner scrollbar, which is the thing that makes embedded
 * forms feel cheap.
 *
 * No dependencies, no build step, no globals beyond one guard flag.
 */
(function () {
  "use strict";

  // Guard against the script being included twice, which happens on sites that paste the snippet
  // into both a template and a page.
  if (window.__brandbWidgetLoaded) return;
  window.__brandbWidgetLoaded = true;

  var ATTRIBUTE = "data-brandb-role";
  var MESSAGE_TYPE = "brandb:height";

  /* The portal this script was served from, so a business never has to configure a second URL. */
  function portalOrigin() {
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].src || "";
      if (src.indexOf("widget.js") !== -1) {
        try {
          return new URL(src, window.location.href);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  }

  var scriptUrl = portalOrigin();
  if (!scriptUrl) return;

  /* The apply page, in its embedded form, for one role. */
  function applyUrl(slug, referrer) {
    var base = scriptUrl.href.replace(/widget\.js(\?.*)?$/, "");
    var url = base + "apply/?role=" + encodeURIComponent(slug) + "&embed=1";
    if (referrer) url += "&ref=" + encodeURIComponent(referrer);
    return url;
  }

  function mount(container) {
    var slug = container.getAttribute(ATTRIBUTE);
    if (!slug) return;

    // Already mounted: the snippet may be pasted twice, or a single-page site may re-run this.
    if (container.getAttribute("data-brandb-mounted") === "1") return;
    container.setAttribute("data-brandb-mounted", "1");

    var frame = document.createElement("iframe");

    frame.src = applyUrl(slug, container.getAttribute("data-brandb-ref"));
    frame.title = "Job application form";
    frame.loading = "lazy";

    // No border and full width, so it reads as part of the host page rather than as a panel
    // bolted on. The starting height is a sensible guess that the first message corrects.
    frame.style.width = "100%";
    frame.style.border = "0";
    frame.style.display = "block";
    frame.style.height = "720px";
    frame.style.transition = "height 120ms ease-out";

    // The form needs no camera, microphone, payment or geolocation, so it is given none. An
    // embedded frame should ask the host page's visitors for nothing.
    frame.setAttribute("allow", "");
    frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");

    container.appendChild(frame);
    container.__brandbFrame = frame;
  }

  function mountAll() {
    var containers = document.querySelectorAll("[" + ATTRIBUTE + "]");
    for (var i = 0; i < containers.length; i++) mount(containers[i]);
  }

  /*
   * Height messages from the embedded form.
   *
   * Checked three ways before anything is resized: the message must come from the portal's own
   * origin, it must carry our own type, and it must name a frame that this script created. A page
   * can receive messages from anywhere, and "resize whichever iframe you like to whatever height
   * you like" would be a gift to anyone embedding alongside us.
   */
  window.addEventListener("message", function (event) {
    if (event.origin !== scriptUrl.origin) return;

    var data = event.data;
    if (!data || data.type !== MESSAGE_TYPE) return;

    var height = parseInt(data.height, 10);
    if (!isFinite(height) || height < 200 || height > 20000) return;

    var containers = document.querySelectorAll("[" + ATTRIBUTE + "]");
    for (var i = 0; i < containers.length; i++) {
      var frame = containers[i].__brandbFrame;
      if (frame && frame.contentWindow === event.source) {
        frame.style.height = height + "px";
        return;
      }
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountAll);
  } else {
    mountAll();
  }

  // Sites that render their content after load — a CMS, a single-page app — get their containers
  // picked up when they appear, so the snippet works without the business knowing when to call us.
  if (typeof MutationObserver === "function") {
    new MutationObserver(mountAll).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }
})();
