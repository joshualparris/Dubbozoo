# Wildlife reference photos: sources, licensing and limits

**Updated:** 18 October 2026 · **Catalogue coverage:** 89 of 89 animal research entries have image search instructions and an image slot in the published website source.

## How a photograph is selected

1. The site reads [wildlife-photo-queries.json](../data/wildlife-photo-queries.json), a curated list of **89 reference taxa/article titles** matched to the same numbered historic catalogue. The list is source *queries*, not 89 manually licensed image binaries.
2. The visitor's browser asks the [English Wikipedia API](https://www.mediawiki.org/wiki/API:Page_images) for the article's lead photograph, which is usually reviewed as an illustration of the identified taxon rather than a historical photo of Dubbo Zoo.
3. Before a photograph can appear, it checks that file on the [Wikimedia Commons MediaWiki API](https://commons.wikimedia.org/wiki/Commons:API/MediaWiki) for a URL, file description page, creator, licence, dimensions and photo file type. A file with a missing or non-free licence is **rejected**, including CC BY-NC, CC BY-ND, all-rights-reserved and unknown.
4. If there is no acceptable article lead image, the site searches Wikimedia Commons by the scientific/common name. It prioritises photographs rather than diagrams, maps, posters, taxidermy or illustrations, and again checks author and licence metadata.
5. As a fallback, the site queries only research-grade openly licensed iNaturalist observations and checks that the scientific taxon matches the query before displaying a photo.
6. If all attempts fail or an image cannot be loaded, the card shows a **Wikimedia Commons search link** with an explicit missing-photo label. It does not fabricate a match or use a non-free picture.

The website uses **the file's current URL and current licence metadata at load time**; because no image binary is copied, there is no static per-animal photographer/URL to list before a successful lookup. Each live photo caption displays a source link, the photographer/credit, a link to the licence and an indication that a cropped view is shown. The African wild dog hero photograph, when loaded, also includes a credit/licence link.

## Reuse terms

The implementation allows **CC0, public-domain, CC BY and CC BY-SA** files. It excludes **CC BY-NC**, **CC BY-ND**, unknown and explicitly restricted files. Some files have extra personal, trademark or depiction concerns not expressed in copyright licence data; technical license checking is **not a legal review**. The file's Commons page remains authoritative if its metadata changes.

Relevant Wikimedia references:
- [API reference: retrieve imageinfo and extmetadata](https://commons.wikimedia.org/wiki/Commons:API/MediaWiki).
- [Wikimedia Commons machine-readable creator and licensing metadata](https://commons.wikimedia.org/wiki/Commons:Machine-readable_data).
- [Wikimedia attribution/licence requirements](https://attribution.wikimedia.org/attribution-signals/license.html).
- [iNaturalist photos and licences](https://www.inaturalist.org/pages/help#photo_licenses).

**Credit standard:** source file · named creator · licence name with the original legal-terms link · the caption indicates the image has been cropped for the responsive layout.

## Scientific and historical scope

All images are **open-licence wildlife references** unless an original zoo image is explicitly, separately authenticated. They **do not prove**:
- that a pictured individual lived at Dubbo Zoo,
- that the animal is currently exhibited,
- names/sex/age/genetics of zoo animals,
- an animal's precise historical subspecies, island lineage or parentage.

The JSON marks **15 historic/taxonomic edge cases** as representative because the older zoo collection may have used a generic label (e.g., 'Guineafowl', 'Oryx', 'Galápagos tortoise', Bengal-labelled tiger, forest buffalo or wallaroo). These are not labelled independently verified historic specimens. The source zoo animal inventory has **14 formal holding/arrival evidence gaps**. Reference photographs must not erase those uncertainties.

## Privacy and operating limits

- Only Wikimedia Commons, Wikipedia and openly licensed iNaturalist photographs are retrieved; **no private ResearchLibrary, Drive, personal zoo photo or child images** are fetched or copied.
- Browser visitors will contact Wikimedia/iNaturalist image hosts. These are external network requests visible to those providers; the site itself has no tracking scripts, cookies or user-submitted credentials.
- Wikimedia Commons images and licences can change. A user may see a loading state or Commons search fallback if the remote API is blocked, unavailable or rate-limited.
- Photo matching by a page lead image and filename is **automated**, not a manual expert review of every picture. First-hand visual/taxon validation remains necessary before describing the gallery as 89 scientifically certified photographs.
- No GitHub Actions or ongoing paid photo synchronisation is enabled.

## Implementation and acceptance

- [x] Source manifest: 89 entries, contiguous numbering, article and Commons search title per entry.
- [x] Static website: 89 photo slots, source/licence captions, source-page links and count/status feedback.
- [x] Commons metadata licence allow-list enforced; no unknown and noncommercial/non-derivative files intentionally displayed.
- [x] Wikipedia article lead image checked on Commons rather than treated as automatically reusable.
- [x] Fallback when a file has no valid photo or licence, and a fallback when an image request fails.
- [x] No original copyrighted/visitor-photo binaries copied to public repo.
- [ ] Independently interact with the deployed site in a browser and verify all 89 photographs actually loaded and depict the correct species.
- [ ] Manually inspect the 15 taxonomic/historical edge cases with their exact image file pages.
- [ ] Record a frozen per-image file URL, creator, licence and attribution if a fully offline/reproducible curated gallery is later required.

**Important:** "89 photo slots implemented" is **not** the same as "89 file licences and images individually verified from the live service". This limitation must not be hidden in completion reports.
