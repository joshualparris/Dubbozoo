# Photo geodata audit — Dubbozoo GPS Ride Guide

**Audit date:** 15 November 2026  
**Status:** updated after original-camera ZIP was supplied.

## Result

The first audit checked the **36 field-journal JPEG copies** already registered in `data/observations.json`. All 36 had been stripped of EXIF/GPS.

Josh then supplied a Google Drive ZIP containing **20 additional JPEG file copies**:

- **13 original Samsung Galaxy A55 5G lion-area camera files** with retained EXIF GPS and capture time.
- **7 giraffe/elephant copies** without retained GPS.

Across both audit passes, **56 JPEG file copies** were inspected and **13 retained GPS**. Those 13 are all from the Lion Pride Lands-area sequence.

## Lion GPS evidence

The 13 original lion-area images contain:

- `DateTimeOriginal` from **15:12:57 to 15:20:01 on 15 November 2026**.
- `OffsetTimeOriginal`: **+11:00**.
- Camera: **Samsung Galaxy A55 5G**.
- GPS coordinates clustered within roughly **25 m** of their median.
- Approximate distinct GPS clusters: **5**.

For privacy, Dubbozoo does **not** publish every timestamped camera coordinate. The map stores only the median viewing-area point:

- **Latitude:** -32.2753719997
- **Longitude:** 148.5801494
- **Maximum source-photo distance from median:** 24.6 m

This is treated as a **photo-derived public viewing-area anchor**, not the animal's exact position and not a surveyed exhibit boundary.

## Map consequence

The Ride Guide changes from:

- **16 finite coordinate points / 7 grid-only stops**

to:

- **17 finite coordinate points / 6 grid-only stops**.

African lions / Lion Pride Lands now use genuine photo-derived GPS. The six remaining grid-only stops are:

- Asian elephants
- African wild dogs
- Meerkats / The Waterhole
- Galápagos giant tortoises
- Cheetahs
- Greater one-horned rhinoceroses

Giraffe and siamang still have independently sourced OSM points. Their uploaded copies do not contain camera GPS.

## Evidence rule

Dubbozoo now distinguishes four coordinate classes:

1. **User photo GPS** — original camera metadata supplied by Josh; only an aggregate public viewing coordinate is published.
2. **Locally saved viewing spot** — saved by the visitor in that browser while physically present.
3. **OpenStreetMap community point** — useful but not an authoritative surveyed public gate.
4. **Official Taronga map-grid only** — useful visitor-map context, but no precise lat/lon.

Automatic nearby-exhibit detection only uses finite coordinates from classes 1–3. A Taronga map-grid reference is never converted into a fake coordinate.

## Privacy

The source ZIP and full-resolution originals are not committed to the repository. Individual GPS coordinates, per-photo timestamps and the user's movement path are not published. The repository stores the aggregate lion viewing point, capture-date range, source count and spread needed to justify the map update.

## Remaining opportunity

If original camera files for the giraffe, elephant, wild dog, meerkat, tortoise or other zoo observations are supplied later and still contain GPS, repeat this process and replace grid-only/community positions only where the original metadata provides stronger evidence.
