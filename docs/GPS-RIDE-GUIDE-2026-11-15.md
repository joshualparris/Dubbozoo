# GPS Ride Guide — live animal-exhibit companion

**Shipped:** 15 November 2026  
**Website:** https://dubbozoo-research.vercel.app/ride-guide.html  
**Source files:** [page](../ride-guide.html) · [browser logic](../assets/ride-guide.js) · [styles](../assets/ride-guide.css) · [exhibit data](../data/ride-exhibits.json) · [service worker](../ride-sw.js) · [PWA manifest](../ride.webmanifest)

## What the visitor can do

1. Open the **HTTPS** ride guide on a phone. Select **Start GPS ride guide** and grant precise location permission. The browser calls `navigator.geolocation.watchPosition` with high-accuracy mode and updates the reported accuracy in metres.
2. Browse a north-up **geographic point plot** and a list of mapped habitats sorted by straight-line proximity. This is **not** a road/track map or automatic recognition of which animal is actually visible.
3. When GPS reports 65 m accuracy or better, two consecutive close fixes for the same exhibit can automatically change the featured animal card. Manual card selection is respected for two minutes. The card never automatically scrolls the screen while moving.
4. Select any animal to see a curated licensed reference photo, factual field notes, a direct link to its full interactive research page, a **short speech-synthesised audio story**, and a real official Taronga Zoo Sydney video where the project already has one.
5. Optionally choose **Auto-audio on (when stopped)**. This is OFF by default. Automatic speech is attempted only after a stable nearby match and a browser-supplied stationary speed at or below 0.8 m/s. Some Android/browser combinations may prohibit unattended speech; manual Play remains available. No audio plays on initial page load.
6. If an exhibit has no independently verified GPS pin, select it from **More animals** and, while safely stopped at its signed *public viewing area*, tap **Save my viewing position**. Accuracy must be 75 m or better. Only that explicitly saved point goes into the browser's local storage; **none is committed to GitHub or uploaded to a server**. It overrides the community pin *on that device only*. Visitors can remove one saved point or erase all of them.
7. **Try a giraffe demo** works without location permission and clearly labels the simulation. The demo never permits saving a simulated location.
8. After one successful online opening, the service worker pre-caches the ride page, JavaScript, CSS, JSON catalogues, manifest and icon for a best-effort offline repeat visit. **Wildlife photos and YouTube require connectivity**, as do links to full research pages not pre-cached. Device speech synthesis and GPS functionality vary while offline.

## Data quality and verified sources

**23 stops** are in [the machine-readable catalogue](../data/ride-exhibits.json), comprising **16 independently sourced OpenStreetMap animal attraction nodes** and **7 official-map-only candidates** with deliberately `null` lat/lon. The catalogue now also carries a separate **photo-evidence layer for 7 animal groups / 36 exact supplied JPEGs**. [Photo geodata audit](PHOTO-GEODATA-AUDIT-2026-11-15.md).

The 16 mapped locations cover: two giraffe points, two zebra points, common hippo, eastern bongo, common eland, white rhino, black rhino, siamang, small-clawed otters, two Sumatran tiger points, ring-tailed lemurs, fallow deer, and addax. Every mapped point stores its individual **OpenStreetMap node ID and link**, retrieved through the corresponding Mapcarta page. All are community data, not confirmed by a Taronga survey, GPS path audit or current keeper sign.

The seven unlocated candidates include **Asian elephants, African wild dogs, meerkats, Galápagos tortoises, African lions, cheetahs, greater one-horned rhinoceroses**. Five of those groups (elephants, wild dogs, meerkats, tortoises and lions) now have Josh-supplied photo evidence, but the exact uploaded JPEGs contain **no retained EXIF/GPS**. Official map or visit information supports the exhibit identity, **not a precise lat/lon**. Keep them out of automatic nearest-exhibit detection until a valid viewing position or more reliable mapped coordinate exists. Do not derive a precise GPS location by pretending the [official 2026 illustrated map](https://www.taronga.org.au/siteassets/tzwp/files/twpz-map-online.pdf) is georeferenced: it is a diagram with grid labels and paths.

Source references:
- [Taronga official illustrated map, 2026 PDF](https://www.taronga.org.au/siteassets/tzwp/files/twpz-map-online.pdf) (exhibits and keeper locations; schedules subject to change).
- [Taronga visitor information](https://www.taronga.org.au/dubbo-zoo/plan/visitor-information) and [official app](https://play.google.com/store/apps/details?id=com.specialistapps.twpz) for up-to-date staff instructions, route directions and times.
- [OpenStreetMap contributors and ODbL attribution](https://www.openstreetmap.org/copyright); per-point node URLs in JSON.
- [Project's curated-photo registry](../data/curated-wildlife-images.json) for photographer/CC credit; these are **species references**, not pictures of the exact resident.
- [Project's official zoo-video catalogue](../data/official-dubbo-zoo-media.json) for six original keeper/animal-footage YouTube videos, loaded **only by visitor action**.

**Clarification:** a map dot near an elephant area does not mean the named elephant is there, that it is visible, or that its medical/behavioural state is known. The animal's broad habitat can be hundreds of metres across. GPS accuracy, signal multipath, no road-path model, public gate position and changes in animals/closures prevent guaranteed exact animal identification. The app should continue using language such as *possible nearby exhibit*, never *that is the animal directly in front of you*.

## Photo geodata integration

The Ride Guide now distinguishes **where a coordinate came from** from **whether Josh has photographic evidence for the animal**.

- **16 GPS-coordinate points** remain community-mapped OpenStreetMap exhibit points.
- **7 photo-backed animal groups** represent all **36 supplied field-journal JPEGs** currently registered in `data/observations.json`.
- Giraffe and siamang are both photo-backed and also have independently sourced OSM points. The photos do not validate those exact pins.
- Wild dogs, elephants, meerkat, tortoises and lions are photo-backed but remain **official-map-grid-only** because the photos contain no GPS.
- Cheetah and greater one-horned rhino remain official-map-grid-only without a supplied photo set.
- Automatic nearest-exhibit selection continues to ignore all grid-only records. A map-grid reference is never converted into a fake lat/lon.

Current official web/map references reviewed 15 November 2026 include giraffe Boardwalk **14F**, elephant **9J** / encounter **8K**, wild dogs **19B**, Waterhole **3R** / meerkat talk **2R**, tortoise **23L**, Lion Pride Lands **19R**, cheetah **9G**, one-horned rhino **9R** / encounter **9S**, and siamang **12Q**. These are visitor-map references, not surveyed coordinates.

## Privacy & riding safety

- Live location is processed **in the foreground of the browser**, not sent in fetch URLs or telemetry; the browser accesses device location only after the user grants permission. No backend location API or analytic SDK is used.
- The app reads local catalogue/media JSON from the website, and loads a Wikimedia image after a species card is selected. Video is opened on YouTube after an explicit tap. These third-party requests do **not** include live latitude or longitude, although ordinary browser networking and referrer behaviour can disclose IP information.
- Explicitly pinned viewing coordinates remain on the individual phone in `localStorage`. **Clear all saved viewing spots** deletes the local records. The user can stop the GPS watch with **Stop location**; leaving the page stops watch and spoken audio.
- A bike/cart rider must **stop safely before interacting with controls**, stay on designated visitor roads, obey one-way signs, and ask keepers about current exhibits.

## Verification checklist

- [x] JSON catalogue: 23 unique IDs, 16 coordinates within the Dubbo zoo area, 7 intentionally unlocated stops; per-OSM-node links.
- [x] JavaScript syntax checked before publication with V8 parser.
- [x] Page has all 32 required control IDs; UI and JS use matching selectors; manifest and service worker files committed.
- [x] Gallery/research link references tied to project-owned catalogues. Route audit caught and corrected a Galápagos tortoise slug.
- [x] All files committed to GitHub default branch and re-read. Production deployment recorded as READY at a checked commit on Vercel; real HTTP-browser acceptance remains outstanding.
- [x] **Simulated browser runtime**: with mocked geolocation, all data loads, a nearby siamang is automatically selected after two accurate fixes, a viewing pin saves locally, and the watch can be stopped. This is not a phone/location test.
- [ ] **Real-device acceptance**: on-site Android GPS accuracy, prompt permissions, distance sorting against actual signs/route, auto-selection stability, background/lock-screen behaviour and speech engine playback. Do not call this verified without a live field test.
- [x] **Photo geodata audit**: all 36 exact supplied zoo JPEGs currently registered in the field journal were matched and inspected; 0 retained EXIF/GPS. Photo-backed evidence is shown separately from coordinate evidence.
- [ ] **Exhibit geolocation audit**: verify actual public viewing points with Taronga's up-to-date maps or keeper, and refine the seven missing GPS locations. A community pin can lie inside an exhibit.
- [ ] **Photograph network QA**: ensure each remote Wikimedia image loads in Chrome Android (remote websites may throttle or change).
- [ ] **Audio/podcast enhancement**: record or license proper offline narration/podcast episodes, with rights cleared; phone-synthesised speech is a pragmatic first version, not a real produced podcast.
- [ ] **Outdoor usability**: confirm visibility and controls at 100%/200% text zoom, with reduced motion and a weak signal. Do not claim battery life or offline location performance without field tests.

## Follow-up design options

The next stage should add **surveyed public viewpoint pins** throughout the circuit, a track-aligned map and optional audio episodes recorded with proper permissions. Avoid background location harvesting or unrequested notifications. Make speech/hands-free opt-in, and do not play sounds near animal habitats where zoo rules prohibit it.
