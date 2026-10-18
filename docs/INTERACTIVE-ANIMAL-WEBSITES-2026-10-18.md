# Individual interactive research websites for all 89 animals

**Published to `main`: 18 October 2026** · **Primary site:** https://dubbozoo-research.vercel.app/

Every row in the [89-entry animal research catalogue](../data/all-time-animal-inventory.json) now has a distinct shareable animal profile URL, for example:

- [#001 Addax](https://dubbozoo-research.vercel.app/animals/001-addax)
- [#004 African wild dog](https://dubbozoo-research.vercel.app/animals/004-african-wild-dog)
- [#073 Northern hairy-nosed wombat](https://dubbozoo-research.vercel.app/animals/073-northern-hairy-nosed-wombat)
- [#089 Leopard tortoise](https://dubbozoo-research.vercel.app/animals/089-leopard-tortoise)

## How it works

**89 distinct public URLs share one maintained, responsive site template** (`animal.html` + `assets/animal.js` + `assets/animal.css`) with a [Vercel rewrite](../vercel.json) of `/animals/:slug` → `/animal.html`. The numbered animal URL selects exactly one record from the first-party [inventory](../data/all-time-animal-inventory.json). It isn't 89 unrelated, manually maintained copies.

Each profile includes:
- **Photo:** original photo source, named author, licence, source-file link and statement that the picture is a reference taxon photo, not a personally verified Dubbo animal. The photo source comes from the existing [curated 89-image registry](../data/curated-wildlife-images.json), rather than the earlier fragile live Wikimedia image search.
- **Overview:** animal name, geographical group, scientific taxon only where documented, historical evidence grade, research introduction and field observation interpretation.
- **Deep research:** the complete species-specific original Markdown guide, fetched from this site's public `/docs/` directory and rendered safely without injecting raw HTML. Headings open and close interactively.
- **Conservation:** IUCN global extinction-risk classification, separate wild population trend, source type, assessed date, publication year and supporting link; an unavailable fact is shown as unknown, never fabricated.
- **Questions:** original 622-question ledger entries matched only to the first 61 species from the old snapshot, with a distinct AI source-verification marker. The later 28 animal guides display their actual species-specific open question sections where present, rather than incorrectly attributing another animal's questions.
- **My field notes:** date, observed animal count and freeform notes stored **on the visitor's own browser only** using first-party localStorage. Explicit save, delete with confirmation, and JSON export. Notes are not synced to a user account, GitHub or Vercel.
- **Explore nearby research:** other animals in the same region and previous/next animal navigation.

The homepage now adds an **Interactive profile** link to all 89 animal cards. No new third-party JavaScript frameworks, authentication services, trackers or GitHub Actions were added. CSS explicitly respects the HTML `hidden` attribute, preventing the old negative **Show more animals** button from being visible once there are no matching animals left.

## Critical limitations

These are **89 independently navigable animal *research profiles***, not a keeper-verified website for every individually named animal ever housed at the zoo. Specific animal names, photo identification, dates and the current zoo roster remain undocumented for many entries. If a named individual is substantiated, its record can eventually be added beneath the corresponding species page.

The guides are served directly from the public GitHub-deployed website. Source files and image hosts can fail to load independently: if a guide cannot be retrieved, the profile provides a link to the original GitHub Markdown; if a curated photo fails, there is a source-file link. Shared pages keep the historic zoo sources separate from global IUCN status.

**No full independent visual/interaction test on an actual Android or desktop browser has yet been completed in this tool session.** Syntax, internal file existence, number uniqueness, URL construction and Vercel project deployment status can be checked without asserting a successful manual playtest.

## Code and deployment evidence

- `animal.html`: common responsive page with five accessible ARIA tab sections.
- `assets/animal.js`: animal-specific state, Markdown parsing using safe DOM nodes, source links, related animal navigation and local browser notes.
- `assets/animal.css`: mobile-first styles and portrait photos.
- `vercel.json`: site routing for 89 distinct animal paths.
- `index.html`: 89 corresponding interactive profile links.
- `data/all-time-animal-inventory.json`: canonical numbered index.
- `data/iucn-assessment-audit-2026-10-18.json`: graded conservation evidence.
- `data/curated-wildlife-images.json`: 89 photo credits and reference image sources.

Acceptance of a deployed route should mean an actual HTTP response and a rendered page whose correct record, photograph, guide, tabs and note controls can be used. A successful Vercel build or static JavaScript syntax check is **not** a substitute for that complete runtime proof.
