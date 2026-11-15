# Photo geodata audit — Dubbozoo GPS Ride Guide

**Audit date:** 15 November 2026  
**Scope:** every exact user-supplied zoo JPEG currently registered in `data/observations.json`  
**Result:** **36/36 files contain no retained EXIF; 0/36 contain GPS tags; 0/36 contain a retained camera capture timestamp.**

## Why this matters

Josh asked for the GPS interactive zoo map to use geodata from his photographs. The exact JPEG copies available to Dubbozoo were therefore matched to the structured observation register and inspected as raw image files before any map coordinate was changed.

The uploaded copies do **not** contain camera geodata. A photo can still provide strong evidence that an animal or habitat was visited, but it cannot be converted into a latitude/longitude coordinate when its GPS fields are absent. Dubbozoo therefore does **not** infer a precise camera position from scenery, animal identity, upload time, or an illustrated map grid.

## Files audited

| Field observation | Animal | Supplied JPEGs | EXIF retained | GPS retained |
| --- | --- | ---: | ---: | ---: |
| 0001 | African wild dog | 5 | 0 | 0 |
| 0002 | Giraffe | 7 | 0 | 0 |
| 0003 | Siamang | 6 | 0 | 0 |
| 0004 | Galápagos giant tortoise | 4 | 0 | 0 |
| 0005 | Asian elephant | 5 | 0 | 0 |
| 0006 | Probable meerkat | 1 | 0 | 0 |
| 0007 | Asian elephant | 2 | 0 | 0 |
| 0008 | African lion | 6 | 0 | 0 |
| **Total** | **7 animal groups / 8 observation records** | **36** | **0** | **0** |

The filenames, byte sizes and SHA-256 provenance remain in `data/observations.json`. The audit used the exact Library copies matching those filenames and sizes rather than screenshots or resized website derivatives.

## How the map now uses photo evidence

The ride-guide catalogue records two separate evidence dimensions:

1. **Coordinate evidence** — a finite GPS point from the existing OpenStreetMap community dataset, or a public viewing position explicitly saved by the user on the device.
2. **Photo evidence** — Josh has supplied one or more photographs for that animal/exhibit context.

A photo-backed animal can therefore appear as:

- **GPS mapped + photo backed** — currently giraffe and siamang. Their photographs support the field observation, while their latitude/longitude remains independently sourced from OpenStreetMap.
- **Official map-grid only + photo backed** — African wild dogs, Asian elephants, probable meerkat, Galápagos tortoises and African lions. Their photographs strengthen the exhibit/animal record but do not make a GPS coordinate available.
- **GPS mapped without supplied field photos** — other OSM-mapped species.
- **Official map-grid only without supplied field photos** — cheetahs and greater one-horned rhinoceroses.

No photo-derived coordinate is used for automatic nearest-exhibit detection unless actual GPS metadata is present in a future source file.

## Current official map-grid references checked for the ride guide

These are **map-grid references, not latitude/longitude**:

- Giraffe Boardwalk / encounter: **14F** on current Taronga web itinerary.
- Asian elephants: **9J**; encounter **8K**.
- African wild dogs: **19B**.
- Meerkats / Waterhole context: **3R**; keeper talk **2R**.
- Galápagos giant tortoises: **23L**.
- Lion Pride Lands: **19R**; African Adventure also provides a secondary lion view around **17P**.
- Cheetahs: **9G**.
- Greater one-horned rhinoceroses: **9R**; encounter **9S**.
- Siamangs / Wild Asia: **12Q**.

Map grids can move when Taronga revises visitor maps. Every reference is therefore stored with a review date and should be rechecked periodically.

## Accuracy safeguard

An attempted grid-to-GPS conversion was rejected. The official illustrated zoo map is not a surveyed/georeferenced GIS layer; fitting its grid to known community GPS points produced errors too large for reliable proximity detection. Publishing those estimates as precise coordinates would create false accuracy.

The safe path is:

- retain independently sourced OSM points where available;
- show official Taronga map-grid evidence separately;
- mark photo-backed animal groups visibly;
- let Josh save a precise public viewing position using live phone GPS while safely stopped;
- replace community/locally saved points only when a stronger surveyed or authoritative coordinate source becomes available.

## Privacy

No user live GPS coordinates are included in this audit or committed to GitHub. The existing Ride Guide processes live phone position in the browser. Locally saved viewing positions stay on that device unless the user separately chooses to export them.
