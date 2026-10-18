# Dubbozoo — a researched wildlife field journal

A personal, evidence-led guide to animals observed at **Taronga Western Plains Zoo, Dubbo, NSW, Australia**.

**Photographed subjects:** African wild dogs, giraffes, siamangs, Galápagos giant tortoises, Asian elephants, and one **probable** meerkat. The dates and named individuals in the new photos remain unverified. **Research collection:** the working historical animal catalogue now contains **89 evidence-labelled, linked profiles**. Visitor-derived candidates, government-confirmed sanctuary holdings and personal-photo observations have separate evidence grades.

## Real wildlife photography — 89 directly linked species references

**[Open the photo gallery](https://dubbozoo-research.vercel.app/#archive)**. After a failed mobile-browser photo search was reported on 18 October 2026, the fragile search-on-every-visit approach was replaced with **89 fixed, file-specific wildlife-photo references** embedded directly in [the static website](index.html). The [photo registry](data/curated-wildlife-images.json) records **88 Wikimedia Commons image files and one Queensland Government conservation camera photograph**, including the original source page, photographer, Creative Commons licence and link to reuse terms.

Every animal card has a real image URL, visible photographer and licence credit, and a caption noting that it is a **species reference, not verified photography of that individual at Dubbo Zoo**. These images are not committed as binaries: the browser still needs network access to load from Commons or Queensland Government. The animal cards no longer depend on dynamic Wikimedia API searches to discover their normal images. A cached same-origin API lookup [provides fallback](api/wildlife-metadata.js) if an individual curated image fails.

**Rare northern hairy-nosed wombat:** a purported Commons photo was rejected when its identification was disputed. The [official Queensland Government 2025 camera-trap image](https://www.detsi.qld.gov.au/our-department/news-media/mediareleases/2025/first-wild-born-wombats-sighted) is used instead, with explicit Queensland Government credit and published CC BY 4.0 reuse conditions.

**Visual QA limit:** Repository verification can confirm 89 URLs, captions and source records, but **not 89 independently completed image loads on an Android browser**. The image counter now counts actual browser `load` events, not just photo references configured. Broken sources remain visible via a Wikimedia search/fallback link rather than silently claiming success. Images from outside Wikimedia cause third-party network requests; no analytics or private visitor photos were added.

[Photograph sourcing, licence and validation notes](docs/WILDLIFE-PHOTO-SOURCES-2026-10-18.md).

## Start here

## 89 individual interactive animal websites

Every animal research record now opens its own **shareable, mobile-friendly website**, not just a GitHub Markdown document. Examples:

- [Addax](https://dubbozoo-research.vercel.app/animals/001-addax)
- [African wild dog](https://dubbozoo-research.vercel.app/animals/004-african-wild-dog)
- [Northern hairy-nosed wombat](https://dubbozoo-research.vercel.app/animals/073-northern-hairy-nosed-wombat)
- [Leopard tortoise](https://dubbozoo-research.vercel.app/animals/089-leopard-tortoise)

Each has a credited animal photo, tabs for ecology and complete deep research, its IUCN source/date/trend, relevant research questions, related animals, and a **private field observation notebook** with local save/export/delete. The 89 routes reuse one maintainable page template and the original species documents.

**[Implementation and accuracy report](docs/INTERACTIVE-ANIMAL-WEBSITES-2026-10-18.md)** · [Full animal index](data/all-time-animal-inventory.json). These are 89 **research entries**, not authenticated biographies of 89 named captive individuals. The Vercel deployment should be manually playtested in a browser; successful source checks do not demonstrate every interaction works on Android.

## Research website · now deployed

**[Open the Dubbozoo Research Portal](https://dubbozoo-research.vercel.app/)**. Vercel reported the first production deployment **READY** on 18 October 2026, with public access enabled; a live browser/HTTP visual acceptance test remains outstanding.

The rebuilt [static website source](index.html) includes a responsive wildlife design, **89** searchable historical animal guide cards, conservation/historical evidence filters, an on-demand **622-question explorer**, and **15 verified public GitHub research links** organised by subject. It loads the question ledger only after interaction and does not publish original user-photo binaries.

**Dewey 590 integration:** Dubbozoo is reciprocally indexed by the **[private ResearchLibrary](https://github.com/joshualparris/ResearchLibrary)** (authorised accounts only). [The public-safe cross-repository index](data/research-network.json) contains *only* repositories checked as public and does not mirror private research documents, Drive filenames or personal information. [Read the integration and QA record](docs/RESEARCH-PORTAL-INTEGRATION-2026-10-18.md).


## Comprehensive unanswered-question research atlas (18 October 2026)

**[Read the corrected answers to all 622 parent research questions](docs/UNANSWERED_QUESTIONS_ATLAS_2026-10-18.md)**. The old 61-animal snapshot contained answerable questions incorrectly labelled 'unresolved', including Q0007. **[Verification status and examples](docs/QUESTION-VERIFICATION-STATUS-2026-10-18.md)** document 49 dated AI source-text checks, 573 parent questions without an independent question-specific source review, no human verification and 1,866 generated follow-up questions still open. A written answer or specific evidence requirement is not certification that an unpublished fact has been found.


- **[Platypus — species and Dubbo Rescue HQ guide](docs/platypus.md)**
- **[Full platypus 2026 evidence audit: status, ecology, local and national research](docs/platypus-2026-evidence-review.md)**
- **[Machine-readable platypus research entry (no invented photo)](data/platypus.json)**

- **[Siamang research: ecology, Dubbo pair, conservation and photo evidence](docs/siamang.md)**
- [Siamang Islands six-photo observation with integrity hashes](observations/siamang-undated.md)

- **[NEW: Giraffes — 2025 taxonomy, conservation and Dubbo herd research](docs/giraffe.md)**
- **[Giraffe photographic observation and SHA-256 records](observations/giraffes-undated.md)**

- [African wild dog: researched species profile](docs/african-wild-dog.md)
- [Photographic observation and evidence register](observations/african-wild-dogs-undated.md)
- [Machine-readable observation catalogue](data/observations.json)
- [Original photo manifest and upload instructions](photos/README.md)
- [Research methodology, sources and maintenance](docs/research-method.md)
- [Research portal source](index.html) — responsive static HTML, local CSS and JS; no tracking, cookies or external scripts.


### Research library — 89 historical animal leads and profiles

**[Browse all 89 numbered entries and their linked research guides](docs/all-time-animal-inventory.md)**. This is **not** proof that exactly 89 species were ever held at Dubbo Zoo or that they're displayed today.

- [New discovery: historical 1995 diary, 1999 photos and two confirmed zoo conservation programmes](docs/historical-leads-1995-1999-2026-10-18.md).
- [Full historic evidence audit and outstanding leads](docs/coverage-audit.md).
- [IUCN source-grade audit across 89 entries](docs/iucn-assessment-audit-2026-10-18.md) — 10 earlier direct IUCN assessments, 8 additional indexed IUCN entries, an original category-change table, other graded/indirect records and **58 still needing a taxon-specific cross-check**.
- [Machine-readable 89-entry historical animal inventory](data/all-time-animal-inventory.json) and [species profile catalogue](data/species-catalogue.json).
- [Prepared but unsent archival records request](docs/archival-records-request.md).

**Major fresh evidence:** A 1996 NSW parliamentary answer directly documents **nine Bridled Nailtail Wallabies** in Western Plains Zoo's conservation sanctuary. An Australian Government recovery plan confirms a former **mala** breeding programme that ended after enclosure-related losses in 2001.

**Further historical leads:** collared peccary, nilgai, sambar, chital, 1990s capybaras, several additional wallabies and kangaroos, domestic guinea pigs and possibly leopard tortoises. These visitor/plan-based entries **require accession confirmation**. Chester the white tiger's Dubbo visit is first-party government confirmed, but a white tiger is **not an extra species**.

### Outstanding archival and scientific verification

**14 formal collection/provenance questions** now include the **three earlier unverified holdings** (Indian peafowl, smooth yabby and white-browed woodswallow) plus **11 new visitor/photo or planned-arrival leads**. **Six exact taxon/lineage questions** remain, including the newly sourced historic eastern wallaroo label. The 1997 map's possible giant anteater must **not** be counted as held without additional proof.

An IUCN original [2025-1 change table](https://nc.iucnredlist.org/redlist/content/attachment_files/2025-1_RL_Table_7.pdf) records **mala's change from Vulnerable to Near Threatened**, while Australian legal conservation categories must be handled independently.

**Photo-backed journal species** are separate: African wild dog, giraffe, siamang, Galápagos tortoise, Asian elephant and probable meerkat. Original photographs showing visitors are not assumed fit for public upload.

## All-time animal research checklist

**89/89 existing catalogue links have guides**, not 89 certified historical zoo species. A definitive list from the **1977 opening to 2026** requires Dubbo-only year-by-year animal accession, transfers and historical map evidence, including pre-digital records.

## What we know

The first set of **five photographs** shows **two African wild dogs** walking, standing and looking toward the camera in a grassy, wooded enclosure. The location is consistent with the African wild dog exhibit at Taronga Western Plains Zoo, but the uploaded images contain **no EXIF date or GPS**, so neither the day photographed nor the individuals' names can be independently verified.

The **African wild dog** is **Endangered**. The *IUCN Red List 2025 assessment* estimates **1,676 mature individuals**, warns of a **decreasing** global trend, and places the number of packs globally **below 700**. Here, *mature individuals* is a technical IUCN population metric; it is **not** the total count of every wild dog, including non-breeders and juveniles. Older web pages cite approximately 6,600 adult dogs, based on older assessments. Never present those differently defined quantities as directly comparable.

### New giraffe observation

Two additional giraffe photographs were supplied on 18 October 2026. They show multiple giraffes in a wooded paddock, with at least six discernible in the wide frame. Both copies lack capture-date/GPS EXIF. Research on the IUCN's **2025 recognition of four giraffe species** and Taronga's historic **25-giraffe total in April 2025** is separated from direct observation. The specific giraffe species, individual identities and October 2026 zoo herd size are **not verified**. See [the full guide](docs/giraffe.md) and [photo register](observations/giraffes-undated.md).

### Siamangs added

Six new photos document a pond-and-ropes island habitat and at least one likely siamang hanging from a rope. Taronga named **Kasarna and Kasem** as its resident pair in early 2026, but the photographed animal is **not individually identified**. Taronga visitor sources disagree on map location **12Q vs 10G**. All photos lack retained EXIF and four show identifiable visitors. See the [siamang guide](docs/siamang.md), with all uncertainties preserved.

### Platypus Rescue HQ research — no sighting invented

Taronga Western Plains Zoo opened **Platypus Rescue HQ in February 2024**. It has **capacity for 65 platypuses during emergencies** (not an occupancy count), map **21M**, and Taronga lists an adult male public ambassador named **Mackenzie**. Platypus remains **Near Threatened internationally**; federal legal listing and state classifications differ. The Commonwealth's **2026 Vulnerable nomination was not prioritised for assessment**, with possible reconsideration in 2027. There were **no platypus photos or personally verified sightings supplied**, so this is intentionally a **species research record**, not a fourth photographic observation. See [full study](docs/platypus.md) for ecological research, rescue timelines, modelling uncertainties and cited primary sources.

### New field photography (10 photos, October 2026 submission)

Four photographs of a **Galápagos giant tortoise**, five of **Asian elephants**, and one **probable meerkat** are catalogued with exact-copy SHA-256, dimensions, image notes and privacy restrictions. [Tortoise photos](observations/galapagos-tortoise-undated.md) · [Elephant photos](observations/asian-elephants-undated.md) · [Meerkat photo](observations/meerkat-undated.md). Zoo documentation, including historic Gung signage, does not establish individual animal identity. The source JPEG binaries are **not** published because visitors and children appear in them and photo rights have not been verified.

## Evidence-first AI research

- [Question verification ledger: all 622 questions audited for review status](docs/QUESTION-VERIFICATION-STATUS-2026-10-18.md) · [machine-readable per-question index](data/question-verification-ledger-2026-10-18.json). This is **not** a claim that every answer was independently verified; only the explicitly linked primary-source subset received new source-text checks.

- [AI deep research verification and question-resolution methodology](docs/AI-RESEARCH-EVIDENCE-ADOPTION-2026-10-18.md) — a practical method for validating the question atlas and refusing unsupported answers. This is a process specification, not proof that all claims were reviewed.

## Evidence standard

- **Verified source:** an attributed and dated published zoo or scientific source.
- **Direct observation:** visible in Josh's supplied photos, without identifying individual animals.
- **Inference:** plausible from context, explicitly marked.
- **Unknown:** not established (e.g. date, keeper names, pack membership, individual age or sex).

No animal should be named or sexed based solely on coat pattern or a photograph. Zoo population news from 2023 is historical, not a reliable assertion about its composition in 2026.

## Credits and permissions

Research and curation prepared on 18 October 2026. Twenty-three submitted photographs (five wild dog, two giraffe, six siamang, four tortoise, five elephant, one probable meerkat) are inventoried but **not included as binaries in the GitHub repository**; this avoids claiming they have been published when they have not. Their SHA-256 hashes are recorded for later matching. This repo cannot display images that are not actually uploaded. **Photo copyright/licence is not specified**, so publishing or reusing the images outside this owner's repo should be confirmed before licensing them.

This is an **independent field journal, not an official Taronga website**. Species and zoo claims are linked to their sources in the profile. For current visitor information consult [Taronga's official website](https://www.taronga.org.au/).

## Research question verification update (18 October 2026)

- [Corrected 622-parent-question atlas](docs/UNANSWERED_QUESTIONS_ATLAS_2026-10-18.md): Q0007 and many other generic 'unresolved' placeholders replaced with sourced biological answers, dated historical information or the exact original records needed to settle them.
- [AI source-verification status](docs/QUESTION-VERIFICATION-STATUS-2026-10-18.md): 49 question-specific source-text checks, 573 remaining without an independent source review, **zero human-verified**; 1,866 generated follow-ups remain future research.
- [Per-question JSON ledger](data/question-verification-ledger-2026-10-18.json): original answer retained, revised answer, source-review grade and provenance.

**Hosting check:** the Vercel production deployment is READY, but a separate live browser visual/HTTP test and external-source-link audit have not been completed.
