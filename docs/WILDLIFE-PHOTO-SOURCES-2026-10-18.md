# Wildlife photograph source audit — 89 linked taxon reference photos

**Updated:** 18 October 2026. **Current production structure:** 89 static animal cards link directly to 89 named wildlife photograph resources (**88 Wikimedia Commons files + one 2025 Queensland Government northern hairy-nosed wombat camera-trap photograph**). Their individual photo URL, named creator, file/source page, applicable CC reuse terms and catalogue number are recorded in the [machine-readable photo registry](../data/curated-wildlife-images.json).

**Important:** This is a **fixed source catalogue**, not a claim that 89 photographs have been independently visually loaded on the user's Android device. It also is not evidence that the depicted animals lived at the historical Dubbo Zoo.

## What changed following the Android screenshots

The first implementation queried Wikipedia, Wikimedia Commons and iNaturalist from the visitor's mobile browser. Many cards displayed "No licence-verified match" and the site still used an illustrated wild dog in its homepage hero. A configured photo search is not the same as an actually displayed photograph.

The rebuilt website now:

1. Embeds the **89 specific photo URLs in `index.html`**, with photographer, source and licence links. It does not ask an external API to discover a card's normal image each time the page loads.
2. Uses an actual African wild dog photograph for the homepage hero, with the source and reuse licence beneath its name. The old illustration remains as a safe fallback if the third-party image fails.
3. Includes a same-origin [cached wildlife metadata service](../api/wildlife-metadata.js) for Wikimedia/Wikipedia/iNaturalist fallback if a curated file fails. This avoids an Android device needing direct cross-origin metadata API access for fallback search.
4. Counts **actual browser image `load` events**, and warns if some images have not loaded yet or failed. It does not report 89 successes before fetching the pictures.
5. Continues to label every photograph as a **species reference** rather than personal zoo photography, individual animal identification or current zoo-holding evidence.
6. Keeps [the prior 89 taxon-search manifest](../data/wildlife-photo-queries.json) only for fallback investigations, not for the primary gallery.

## Sources, attribution and licence handling

- **88 Wikimedia Commons photos:** Each photo registry entry has its file title, source page, named photographer, licence and licence URL; image display uses Commons `Special:FilePath/` with a sensible thumbnail width. Wikimedia source pages, not filenames, are authoritative for copyright terms and photographer corrections.
- **One Queensland Government 2025 photo:** The [Queensland Government original northern hairy-nosed wombat conservation announcement](https://www.detsi.qld.gov.au/our-department/news-media/mediareleases/2025/first-wild-born-wombats-sighted) links the actual camera image. It is credited to © State of Queensland (Department of the Environment, Tourism, Science and Innovation) and reuses the department's published **CC BY 4.0** licence terms, subject to any notice on the source.
- The page states **“display cropped”** because the responsive `object-fit:cover` area can exclude edges of a photo without changing the underlying remote file.
- Original media files remain hosted by their respective owners. An image may be removed, moved or have its licence corrected, so the source file page should be reviewed regularly. If the file URL does not load in a visitor's browser, a Commons search link is displayed as fallback.
- **Excluded:** all-rights-reserved, unknown, noncommercial (NC) and no-derivatives (ND) images; personal visitor photographs and private Google Drive or Dewey media have not been published.

Wikimedia [Commons licensing](https://commons.wikimedia.org/wiki/Commons:Licensing), [reuse attribution](https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia), [MediaWiki API](https://commons.wikimedia.org/wiki/Commons:API/MediaWiki) and [Queensland Government 2025 original image](https://www.detsi.qld.gov.au/__data/assets/image/0015/410118/rcnx0080.jpg) are the relevant source references.

## Taxonomic / historical limitations

- Some older exhibition names are broad or debatable (e.g. “Guineafowl”, “Oryx”, Galápagos giant tortoise island lineage, historical tiger ancestry and forest buffalo); a taxon reference image **does not settle precise historical genetic identity**. [Historical zoo evidence audit](coverage-audit.md).
- **Northern hairy-nosed wombat** (#73) was especially sensitive: an old Commons file labelled `Lasiorhinus krefftii` had an explicit potential misidentification. **Do not use it.** The government camera-trap photo directly identifies *L. krefftii* and is unrelated to a claimed 1996–97 captive individual.
- Confirmed zoo holdings, visitor historic sightings and temporary wildlife hospital animals remain separate evidence grades; the photo itself does not upgrade those historical claims.

## Verification checklist (18 October 2026)

- [x] 89 unique numbered photo registry records corresponding to the 89 historical animal entries.
- [x] 89 static HTML `<img>` references with source pages and photographer/CC attribution.
- [x] 88 Commons file-specific entries and one official Queensland Government camera photo.
- [x] Original illustrated hero retained as fallback behind a real wild dog photo.
- [x] No personal photographs, private source files or Google Drive exports embedded in the public page.
- [x] Dynamic search removed from normal photo loads and kept as last-resort fallback.
- [x] Photo-counter source updated to count actual `load` events, not configured URLs.
- [ ] All 89 image URLs individually rendered and inspected for correct species on a real Android browser.
- [ ] Every third-party Commons redirect confirmed to return a usable image from the exact viewer's network.
- [ ] Image/attribution error logs confirmed on Android after a hard refresh.

The repo being updated and Vercel reporting READY are **not sufficient evidence** that every external image was visibly rendered successfully.
