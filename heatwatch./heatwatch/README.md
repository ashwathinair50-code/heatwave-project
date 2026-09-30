# HeatWatch: Heatwave Intelligence System

A responsive educational heatwave portal built with plain HTML, CSS and JavaScript. No frameworks, no build step,
no internet connection needed (only the map on `media.html` loads from Google Maps).

## Run it
1. Extract the ZIP and keep all folders together.
2. Double-click `index.html` (or `navigation.html` for a list of every page).

## Where each lab task lives

**HTML lab**
| Task | File |
|---|---|
| 1 Home page, global attributes, tooltip | `index.html` |
| 2 Text-level tags | `alert-details.html` |
| 3 Block vs inline | `about-system.html` |
| 4 Lists | `sources.html` |
| 5 Hyperlinks | `navigation.html` |
| 6 Image map | `hotspot-map.html` (+ `images/region-map.svg`) |
| 7 Tables | `forecast.html` |
| 8 Forms | `subscribe.html` |
| 9 Media and frames | `media.html` (+ `media/`) |

**CSS lab**
| Task | File |
|---|---|
| 1 Inline CSS | `index.html` (header, h1, p) |
| 2 Internal CSS menu | `navigation.html` (`<style>` in head); external version in `css/nav.css` |
| 3 External theme | `css/style.css`, linked from every page |
| 4 Sidebar card | `css/layout.css` (`.sidebar-card`) |
| 5 Card layout | `css/cards.css` (used on `forecast.html`) |
| 6 Image gallery | `css/gallery.css` (used on `media.html`) |
| 7 Table styling | `css/table.css` |
| 8 Form styling | `css/form.css` |
| 9 Page layout | `css/layout.css` |
| 10 Glowing effect | `css/effects.css` (used on `alerts.html`) |

**JavaScript lab**
| Task | File |
|---|---|
| Form (HTML5 types) | `heatwave-form.html` |
| Validation tasks 2-5 | `heatwave-validation.html` |
| Analysis | `heatwave_analysis.html` |
| Warning decision | `heatwave_warning.html` |
| Object | `climate_object.html` |
| Arrays | `temperature_analysis.html` |
| Regex validation | `climate_validation.html` |
| Registration form | `climate_registration.html` |

The original HeatWatch pages are kept: `dashboard.html`, `alerts.html`, `subscribe.html`.

## Bugs fixed compared with the original repo
- jQuery from a CDN was required, and the whole subscription form stayed disabled without internet. Now plain JavaScript.
- Risk bands overlapped/gapped: text said 32-39 and 40-47, so 39.5 fell in no band. Now "32 to below 40", "40 to below 48".
- Dashboard table and selector used two copies of the same data. The table is now built from the one data object.
- Navigation only covered 4 pages; it now links every page. `<header>` CSS no longer leaks onto other headers.
- Phone field used `maxlength=10`, which silently cut pasted numbers instead of showing an error.
- Form relied on `novalidate` in HTML, so with JavaScript off there was no validation at all. Now added by JavaScript only.
- Dates are compared in local time (UTC would be a day off in India for part of the day).
- Raw `&` in HTML, duplicated per-page markup styles, and a footer narrower than the header are cleaned up.
- The lab sheet's decision table leaves 38-40 °C with low humidity undefined; `heatwave_warning.html` closes the gap (see the note on that page).

## Notes
- The video, audio and posters are generated sample files; replace them in `media/` and `images/` with real ones if needed.
- Email address (`example.com`) and helpline number (1078) on `navigation.html` are placeholders: confirm before real use.
- All data is simulated. Not for real warnings.
