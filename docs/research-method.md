# Research and maintenance methodology

**Research date:** 18 October 2026

## Priority order for evidence

1. Current primary conservation assessment: [IUCN Red List, 2025 *Lycaon pictus*](https://doi.org/10.2305/IUCN.UK.2025-2.RLTS.T12436A221299510.en).
2. Current official zoo itinerary/map: [Taronga Western Plains Zoo African Adventure](https://www.taronga.org.au/dubbo-zoo/plan/get-the-most-out-of-your-visit/african-adventure).
3. Dated historical zoo publications for breeding, species explanation and pack history, clearly distinguished from current observations.
4. First-party conservation organisations for projects they themselves deliver: [Painted Dog Conservation](https://www.painteddog.org/who-we-are).
5. Uploaded photographs for *visible* behaviours and physical markings, not unsupported individual IDs.

## Evidence labels

- **V — Verified published claim:** an official, dated source directly supports the specific assertion, with publication date retained.
- **O — Observed in image:** visual evidence alone supports the assertion.
- **I — Inferred:** plausible but unverified (e.g. the place from appearance and project title).
- **U — Unknown:** cannot determine with available sources; store as `null` instead of fabricating data.
- **H — Historical only:** true as a time-bounded source claim, not necessarily true today.

### Caution about numbers

The 2025 IUCN metric "mature individuals" models animals contributing to breeding, not the total population of all ages. This cannot be compared directly to older "adult individuals" or all-animal headcounts. The change from an estimate of 1,409 mature individuals in the earlier IUCN assessment to 1,676 in 2025 **does not prove recovery**: IUCN says population discoveries and estimation updates contribute to that difference, and its latest trend is still **decreasing**. Avoid generic headlines such as "only 1,676 dogs remain".

### Caution about source dates

Old Taronga news pages contain potentially inconsistent combinations of website posting dates and narrative references to pup ages/birth dates. Use explicit animal birth dates when stated and avoid inferring the year from a news post's visible publication timestamp alone. The 2023 named four-female group is **not** the verified group in any 2026 photo. An announced 2024 enclosure redevelopment is not proof of completed construction.

### Reproducibility

- Preserve source URL and date accessed/reviewed.
- Use original photo hashes for de-duplication and provenance.
- Record uncertain values as `null`.
- Do not label a photographed behaviour as feeding, hunting, play, fear or excitement unless directly evidenced.
- Prefer confirming current named animals and construction updates with Taronga staff before publishing them.
- Future zoo visits should have a distinct observation record with verified capture dates if possible.

## Suggested next additions

- Original (rights-cleared) photo gallery with captions, accessibility text, copyright and integrity hashes.
- Per-visit observations; no guessing who was there.
- Other species encountered during the zoo visit, each with its own IUCN assessment and sourced zoo notes.
- A repeatable source-check script or manual checklist for changed IUCN/zoo facts.

## Giraffe evidence rules (18 October 2026 update)

- The IUCN Giraffe and Okapi Specialist Group recognised **four** species in 2025 ([official press release](https://iucn.org/press-release/202508/four-giraffe-species-officially-recognised-major-conservation-reclassification)). Do not apply the older single-species 2016 'Vulnerable' category automatically to each new species.
- Even if a zoo giraffe resembles a reticulated giraffe, do not assign a precise species or 2018 reticulated Red List status without keeper-supported provenance.
- GCF's 2025 figures are **wild individuals across age classes**, not zoo totals or IUCN mature-individual metrics ([GCF State of Giraffe](https://giraffeconservation.org/state-of-giraffe/)).
- Taronga 2023 and April 2025 herd numbers are **historical news**, not verified 2026 inventory.
- A photographed giraffe can be individually re-identified from unique coat patches only using a verified reference catalogue; neither name nor sex is determinable from these supplied shots.

## Siamang evidence safeguards — 18 October 2026

- A reported Taronga pair does not verify animal identity from a photograph: Kasarna and Kasem are published 2026 zoo residents, not photo-identified animals.
- Original siamang photos include recognisable visitors; do not publish intact to public GitHub without consent or privacy-safe alteration and authorisation.
- No EXIF date or GPS survived in six chat-upload copies; do not use message submission timestamp as capture date.
- Taronga's [Wild Asia](https://www.taronga.org.au/dubbo-zoo/precincts-and-pitstops/wild-asia) says **12Q**, while [species page](https://www.taronga.org.au/wildlife-and-conservation/animals/detail/siamang) says **10G**. Preserve source conflict, not a guessed map ref.
- Conservation numbers require a source with matching year and population metric. No verified current global siamang headcount was established.
- Palm oil certification has evidence of benefits and serious limitations: [PNAS 2018 satellite study](https://pmc.ncbi.nlm.nih.gov/articles/PMC5776786/).
