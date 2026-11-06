// ES5 helpers for old browsers (MIUI Browser = Chromium 61+, iOS <= 16.3, Chrome 49, IE11).
// Each one replaces a newer API that throws or is missing there. Everything sits on one
// global, `BP`, so nothing clashes with core scripts or a template's own functions.
// Load it before the template's own scripts: <script src="static/js/helpers.js"></script>
(function(window, document) {
    var BP = window.BP || {};

    // NodeList.forEach (Chrome 51): BP.each(document.querySelectorAll('.card'), function(el, i) { ... });
    // Works on NodeList, HTMLCollection, arrays and other array-likes.
    BP.each = function(list, fn) {
        for (var i = 0; i < list.length; i++) {
            fn(list[i], i);
        }
    };

    var proto = window.Element && window.Element.prototype;
    var matches = proto && (proto.matches || proto.webkitMatchesSelector || proto.msMatchesSelector);

    // Element.matches (Chrome 34 unprefixed, IE11 only as msMatchesSelector).
    BP.matches = function(el, selector) {
        return !!(el && el.nodeType === 1 && matches && matches.call(el, selector));
    };

    // Element.closest (Chrome 41, IE11 never): nearest ancestor-or-self matching the selector, or null.
    BP.closest = function(el, selector) {
        while (el && el.nodeType === 1) {
            if (BP.matches(el, selector)) {
                return el;
            }
            el = el.parentNode;
        }
        return null;
    };

    // String.padStart (Chrome 57) for counters: BP.pad2(7) -> '07'.
    BP.pad2 = function(n) {
        n = Math.floor(Math.abs(n));
        return n < 10 ? '0' + n : String(n);
    };

    // localStorage throws in private mode on old Safari and when storage is blocked.
    // A failed read gives the fallback, a failed write gives false; neither throws.
    BP.store = {
        get: function(key, fallback) {
            try {
                var value = window.localStorage.getItem(key);
                return value === null ? fallback : value;
            } catch (e) {
                return fallback;
            }
        },
        set: function(key, value) {
            try {
                window.localStorage.setItem(key, String(value));
                return true;
            } catch (e) {
                return false;
            }
        }
    };

    // Runs fn once the DOM is parsed, or right away if it already is.
    BP.onReady = function(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    };

    // Element.scrollBy({ left, behavior }) (Chrome 61, Safari 14): horizontal scroll for sliders.
    // Smooth where scroll-behavior works, a plain jump elsewhere. Sets the absolute position x.
    BP.scrollToX = function(el, x) {
        if (typeof el.scrollTo === 'function' && 'scrollBehavior' in document.documentElement.style) {
            el.scrollTo({ left: x, behavior: 'smooth' });
        } else {
            el.scrollLeft = x;
        }
    };

    window.BP = BP;
})(window, document);
