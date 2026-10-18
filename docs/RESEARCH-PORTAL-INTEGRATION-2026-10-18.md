# Dubbozoo Research Portal — site, Dewey integration and privacy

**Built:** 18 October 2026. **Production project:** [Dubbozoo Research on Vercel](https://dubbozoo-research.vercel.app/). **Vercel deployment:** `dpl_Eb8GGYDZhArSyU9k6kmY2HABqvhn`, reported **READY** after deploying GitHub commit `886766c3e08689d1aac6e537eb0cf64c6dd662e9`. Vercel deployment protection was disabled intentionally to publish this **public research** website; the separate Dewey/ResearchAtlas repositories remain private. **A full independent live HTTP/browser visual check has not been performed** in this environment.

## What is connected

- [Public Dubbozoo homepage](../index.html): mobile-first editorial site with filters and all **89 static animal research cards**. Each links to its canonical GitHub species guide and primary/graded zoo evidence.
- [Dewey ResearchLibrary](https://github.com/joshualparris/ResearchLibrary) is a **private** catalogue. A new DDC **590 Zoology** entry and reciprocal pointer were added to its `catalogue/repositories.json`, `README.md` and `docs/github-research-library.md`. Related local subject codes are **591, 599, 333, 020**. These codes are Dewey-inspired shelf tags, not official authenticated Dewey classification.
- [Public-safe research links](../data/research-network.json) contain **15 GitHub repositories confirmed public on 18 October 2026**, grouped into Environment, Methods, Health, Technology and Humanities. The website lists those links and broad repository-directory URLs, **not a copied private research index**.
- [All historical species data](../data/all-time-animal-inventory.json), [question verification ledger](../data/question-verification-ledger-2026-10-18.json) and [IUCN source audit](../data/iucn-assessment-audit-2026-10-18.json) are the original source datasets.

## What the website does

| Feature | Implementation | Privacy/accuracy note |
| --- | --- | --- |
| Search 89 historical animal entries | HTML cards with client-side text, evidence and region filters | Guide exists is **not** zoo animal accession proof |
| Filter by region and confidence | Native buttons/select and DOM `hidden` | Uses evidence grades from 18 October snapshot |
| Browse 15 public research repositories | Static public-safe registry; subject chips | Each GitHub visibility checked before publication |
| Open private Dewey 590 shelf | Direct GitHub link requiring authorised sign-in | No private document titles, Drive links or JSON copied |
| Explore 622 parent questions | On-demand `fetch` of existing ~700 KB JSON ledger | Does **not** load on initial page; 49 AI source checks vs 573 without individual review |
| Original observation records | Readable public JSON/source guides | No original private photo JPEGs or named visitors published |
| CSS + vanilla JavaScript | `assets/site.css` and `assets/site.js`, no dependencies | No analytics, remote scripts, build pipeline or cookies |

### Current evidence counters

- **89 research records**, **14 formal animal-holding evidence gaps**, **6 unresolved exact taxa/lineages**: these are *catalogue* figures from 18 October, not a count of formally held zoo species.
- **622 questions** with revised AI responses; **49** dated AI-assisted source-text checks and **573** questions still requiring individual source verification. **0 human verified**; **1,866 generated follow-up questions** remain open.
- **15 public linked research projects** from the 32-entry *private* Dewey catalogue. The private catalogue has other repositories and material **intentionally excluded** from the public portal.

## Maintenance and deployment

1. Correct facts at the **canonical source**: `data/all-time-animal-inventory.json`, relevant `docs/*.md`, `data/iucn-assessment-audit-2026-10-18.json` and question ledger. Do not treat page counters as auto-synced from data; this version embeds static cards.
2. Regenerate cards, counters and public repo network when the research changes. Always compare data against rendered HTML. For repository links, independently verify `private === false` before including them in `data/research-network.json`. **Never publish private Dewey metadata** or a list of linked personal files.
3. The existing Vercel deployment was initiated from GitHub `main` through Vercel. The site is dependency-free, **no GitHub Actions were enabled**. Verify Vercel's Git connection settings before assuming *future* pushes auto-deploy. If not connected, trigger a new deployment deliberately.
4. Source path validation: every referenced internal file must exist on the repository default branch. For evidence claims, external citations still require actual HTTP/manual source verification; existence of a link is not its correctness.
5. User photographs are **not** in the public GitHub source. Check rights, consent for recognisable visitors, personal metadata and appropriate licence before allowing future uploads.

## Local QA and acceptance checklist

- [x] 89 static catalogue cards, one per unique historical research entry.
- [x] 15 repository cards, matching all 15 intentionally public registry records.
- [x] JavaScript syntax valid and standalone; no external imports, analytics or service workers.
- [x] 622-question data source exists and only loads after explicit user action.
- [x] GitHub repo tree contains referenced styles, scripts, JSON and study documents.
- [x] Vercel production deployment `READY`, sign-in protection disabled.
- [ ] Live HTTP + user-visible desktop/mobile render verified from an independent browser.
- [ ] Keyboard and screen-reader *interactive* playtest from an independent browser.
- [ ] Future push-to-production auto-deployment proven.
- [ ] External citation targets individually checked for live pages and factual accuracy.

**Important:** The **current public page code is static** and should not silently extract any connected private research files. Any future automation must explicitly scope to public repositories and preserve source-visibility checks.
