# Ride Guide phase 2 — family audio, private sightings, offline and installability

**Delivered:** 15 November 2026 · **Application:** https://dubbozoo-research.vercel.app/ride-guide.html

## Why this iteration

The first [GPS ride guide](GPS-RIDE-GUIDE-2026-11-15.md) could find nearby community-mapped exhibit points and speak a short factual sentence, but offered no real visit record or choice of listening depth. This phase is about **a useful companion while cycling around the zoo** without pretending that an approximate GPS fix identifies an individual elephant or validates exhibit occupancy.

## New features built

### Family-friendly and in-depth audio
- **14 animals have two distinct original narration scripts:** family (short, accessible) and deeper science (longer, with biological and conservation context). The scripts are in [`data/ride-audio-stories.json`](../data/ride-audio-stories.json), each tied to a specific Dubbozoo species guide.
- Family/deeper mode is selected in the ride app. A readable transcript is available for every animal. Animals without a custom episode fall back to the existing short evidence-labelled field prompt.
- The browser speaks **short, sequenced chunks** to reduce the risk of long Web Speech utterances cutting off on some phones. Speech remains user-initiated by default. Automatic narration is **opt-in**, is attempted only after a stable close GPS match **with a browser-reported stationary speed**, and may be blocked by Android/browser policies. These are **original synthetic audio guides, not recorded Taronga podcasts or a keeper impersonation**.
- Research scripts are about the *species*, not a live verified individual; do not infer sex, animal identity or wellbeing from a map marker.

### My safari — local visit journal
- The visitor must explicitly tap **“I saw this animal”**. Nearby GPS proximity alone **never** marks a sighting.
- A separate journal groups two mapped locations for the same species under one species record. It records a user-confirmed first sighting time and optional typed observations in browser `localStorage`. Unsaved draft notes are saved on selection changes, including an automatic GPS change.
- **“Not seen yet”** clears the seen flag without destroying notes. **Export my safari** downloads local Markdown with no latitude/longitude, and **Erase safari journal** removes local records (after confirmation). The journal module has **no fetch requests or location permissions**.
- Notes are rendered with `textContent` rather than injected as markup; exported notes are user-authored and should not be mistaken for a keeper-verified record.

### More reliable automatic nearby selection
- GPS readings with invalid accuracy or a `timestamp` more than **30 seconds old** are ignored, rather than used to change the animal card.
- Automatic selections are constrained to the approximate zoo vicinity, require **reported accuracy 65 m or better** and **two agreeing nearby fixes**, and respect manual choices for **two minutes**. The card does not scroll automatically.
- High-accuracy GPS still does **not** provide exact animal positions. Large habitats, separate public entrances, outages and trees can make a habitat pin misleading; visitor judgement and official maps take priority.

### Android installation and offline support
- **Add to home screen** offers the native installation prompt if Android/Chrome exposes one. Otherwise the page explains the browser menu route. A shortcut is still useful even when a browser does not consider the page a fully installable PWA.
- A network-safe **offline readiness indicator** checks whether the current page, main scripts, animal JSON and audio stories are actually present in Cache Storage.
- Versioned service worker cache **v3** includes the core page, scripts, manifest, styles and JSON. Once it has been successfully populated, the guide may reopen offline; remote Wikimedia photos and YouTube videos do not work offline, and some TTS/GPS functionality depends on the phone.
- App provides **no turn-by-turn road routing**. It is not a replacement for [Taronga's official interactive map and current talks](https://www.taronga.org.au/dubbo-zoo/plan/visitor-information).

## Validation performed

- [x] Source Javascript parsed successfully for the GPS and safari journal modules; manifests and narrated JSON parsed as valid JSON.
- [x] **47 referenced DOM controls** matched the markup at the time of the phase-2 test.
- [x] Simulated browser runtime loaded 23 exhibit points and 14 audio episodes, switched family/deep transcript, and played a deeper story via multiple speech chunks.
- [x] Mock geolocation ignored a 60-second-old GPS fix and automatically chose Siamangs after two fresh nearby accurate fixes.
- [x] Explicit “seen” entry, local observation note, Markdown export, and Stop GPS watch all passed simulated runtime tests.
- [x] Service worker lists every new audio/journal asset; JS source files were written to `main`.
- [ ] **Physical Android field test:** obtain consent for location, check under trees, confirm enough GPS precision, manually verify public viewing points and actual keeper signage, test Web Speech/TTS and background lock-screen behaviour.
- [ ] **Installability acceptance on Chrome Android:** test Add to Home Screen and browser support, especially whether PNG icon sizes are required rather than just the existing SVG manifest icon. Do not claim native Play Store app installation.
- [ ] **Full real browser visual playtest:** source/mock tests are not a substitute for browser rendering or touch usability on the user's phone.
- [ ] Independently survey the **seven unlocated exhibit stops**: Asian elephants, African wild dogs, meerkats, Galápagos tortoises, lions, cheetahs and one-horned rhinoceroses. Preserve `null` coordinates until verified or user saved a viewing position.

## Boundaries

The site does not upload live GPS, automatically collect location history or publish visitor photos. On-device saved viewing coordinates and notes can remain in browser storage until actively cleared. Browser data clearing removes them. Downloaded Markdown is the visitor's own file and its security is their device's responsibility. Automatic audio is designed to be opt-in, and the app encourages stopping before interacting while cycling or driving a cart.

**Original scientific sources and photo credits** remain in the linked species guides and photo registry. The narrator is not a keeper; official Taronga media stays explicitly labelled and opens only when tapped.
