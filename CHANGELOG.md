# Changelog

## [2.1.1] - 2024-06-15

### Patch

- Change Zoomist first parameter type to `HTMLElement | string` to enhance the hints of IDE.

## [2.1.0] - 2024-06-14

### New Features

- Use `e.preventDefault()` instead of css `pointer-events: none;` when dragging and touching.
- Add options `disableDraggingClass` and `disableWheelingClass`.
- Add options `dragReleaseOnBounds` and `wheelReleaseOnMinMax` to enable page scrolling in some cases.
- Add methods `isOnBoundTop`, `isOnBounBottom`, `isOnBoundLeft`, `isOnBoundRight`, `isOnBoundX`, `isOnBoundY`, `isOnMinScale`, `isOnMaxScale`.

## [2.0.12] - 2024-06-06

### Patch

- Add attribute `type="button"` to default zoomer-buttons to prevent form submition.