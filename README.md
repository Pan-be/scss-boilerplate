# One-page scss starter code

Starter code for scss projects with functions to computing sizes - based on [Coder Coder](https://github.com/thecodercoder) project.

## v2: old browsers

Pages built on this starter have to work on old phones too: Xiaomi's MIUI Browser runs an old Chromium (61 and up), old iPhones stop at iOS 16.3. The mixins and `static/js/feature-detect.js` handle the common breakages; keep to these rules when writing the SCSS:

- Media queries only through `breakpoint()` / `breakpoint-down()`. Never the range syntax (`width >= 700px`): before Chrome 104 / Safari 16.4 the whole block is dropped.
- Font sizes through `fs-fluid()`, widths like `min(100%, 1140px)` through `width-min()`. Plain `clamp()` / `min()` are dropped before Chrome 79.
- `gap` on a **flex** container only through `flex-gap()` (or `flex-gap-wrap()`), with the direction the container has at that point. Pseudo-elements and text nodes don't get the fallback margin: give them their own margin under `.no-flex-gap`.
- `gap` on a **grid** container: write `grid-gap` on the line before it.
- Physical properties (`padding-left`, `margin-top`...), not `padding-inline` / `margin-block` / `inset` (Chrome 87).
- `justify-content: flex-start / flex-end` in flex containers, not `start` / `end`: Chromium before 93 accepts them but lays them out as `flex-start`.
- A plain value before anything with `env()` (`bottom: 14px; bottom: calc(14px + env(safe-area-inset-bottom));`).
- Colours as `#rrggbb` or `rgba()`, not 8-digit hex.
- No CSS nesting outside SCSS (plain `<style>` blocks included). `:focus-visible` in its own rule, never in a selector list.
- JavaScript in ES5 (`var`, `function`, `for` loops instead of `NodeList.forEach`); `localStorage` inside `try { } catch (e) { }`.
- Compile with autoprefixer (browserslist `chrome 49, safari 10, ios_saf 10, firefox 52, last 2 versions, > 0.5%`).

Before handing a page over, compare it in Chromium 61 and a current Chrome: page height within about 1 %, same h1 size.
