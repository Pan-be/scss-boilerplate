// Runs in <head>, before first paint. Adds `no-flex-gap` to <html> when the browser
// can't use `gap` on flex containers (Chrome < 84, Safari < 14.1, Firefox < 63, IE11),
// which switches on the margin fallbacks from the flex-gap() SCSS mixin.
(function() {
    var root = document.documentElement;
    var flex = document.createElement('div');
    var child = document.createElement('div');

    flex.style.display = 'flex';
    flex.style.flexDirection = 'column';
    flex.style.rowGap = '1px';
    flex.appendChild(child);
    flex.appendChild(child.cloneNode(false));
    root.appendChild(flex);

    // Two empty children are 0px tall, so the container is 1px tall only if the gap works.
    var supported = flex.scrollHeight === 1;
    root.removeChild(flex);

    if (!supported) {
        root.className += ' no-flex-gap';
    }
})();
