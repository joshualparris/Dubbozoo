# Evidence-first AI deep research — Dubbozoo adoption standard

**18 October 2026 — methodology proposal, not a claim that the 622-question atlas has been independently verified.**

## Why this was added

The repo's [large unanswered-question atlas](UNANSWERED_QUESTIONS_ATLAS_2026-10-18.md) is a valuable **research backlog**. It includes hundreds of generated follow-up questions and tentative answers, but **more questions, larger Markdown files and more citations do not automatically mean better evidence**. Some historic inventory figures have also changed as other research continues; always pin a source SHA and date before auditing counts.

A 2025 independently peer-reviewed Elicit comparison found that AI-assisted searching **missed sources** found using conventional systematic methods, even while locating some additional material. [Bernard et al. (2025)](https://doi.org/10.1186/s12874-025-02528-y). Multi-agent systems such as [OpenAI Deep Research](https://help.openai.com/en/articles/10500283-deep-research-faq/), [Stanford STORM](https://github.com/stanford-oval/storm), and [Google Co-Scientist](https://www.nature.com/articles/s41586-026-10644-y) can assist exploration, evidence gathering, hypothesis generation and synthesis; **their outputs still need human critical verification**.

[Cochrane's RAISE 2026 guidance](https://www.cochrane.org/about-us/news/cochrane-announces-selected-ai-tools-innovative-platform-study) separates AI tools requiring human verification from exploratory and locally validated uses. This supports a more defensible approach to a public natural-history journal.

## Strict question-resolution rule

For each question, save:

| Field | Minimum content |
| --- | --- |
| Question ID | Link to exact original primary/follow-up question |
| Claim | One atomic factual statement; separate facts from predictions or opinions |
| Time/place/taxon | Exact year, site and applicable species or lineage (if known) |
| Source | Stable URL, source name, publication year, source type |
| Evidence locator | Exact paragraph/section/table/page or reproducible data output |
| Source match | Direct support / indirect / contradicts / no support / cannot retrieve |
| Verification | Not checked / metadata checked / text checked / independently reproduced / rejected |
| Reviewer | Human name or review role, date; **never invent a human sign-off** |
| Confidence | Supported / provisional / disputed / unresolved |
| Answer | Explicitly cite and qualify; unknown where evidence is insufficient |
| Next research | What observation, record, experiment or Taronga contact would settle it |

A DOI, formal citation or trustworthy-sounding domain is **not enough**. A paper can exist but not support the sentence. The review must confirm both source existence **and** precise claim support. Never mark a statement "verified" merely because one AI agent said it and another agreed.

## Examples in this repository

| Question | Correct treatment |
| --- | --- |
| “How many giraffes are currently at Dubbo?” | Taronga's **April 2025 count** is historical; October 2026 roster **unresolved** without newer evidence. |
| “Which photographed giraffe is the reticulated species?” | Exact genetics/lineage **unverified**; coat pattern not a taxonomic test. |
| “Is that elephant Gung?” | A *Meet Gung* sign is not a matched individual photograph. |
| “Which siamang was in the hanging pose?” | Published duo Kasarna/Kasem are historic zoo residents, not keeper-verified IDs in the JPEG. |
| “Where is the siamang habitat?” | Taronga pages conflict (12Q versus 10G); record both, resolve with current map/keeper. |
| “How many platypuses live at Rescue HQ?” | Refuge **capacity for 65** is not an occupancy count. |
| “What Galápagos tortoise species did we see?” | Species/island lineage cannot be determined from shell appearance alone; taxonomy differs by checklist. |
| “Is the glass-front animal a meerkat?” | **Probable**, not a confirmed photographic classification with exact location. |
| “How old are zoo animals?” | No individual age inferred from relative size, posture or name without source records. |

## Pilot: twenty questions, not a new thousand

Use **20 diverse original questions** before attempting to "answer all" by generating more text:

- 10 claims with published primary evidence and exact dates.
- 5 contradictions, taxonomy changes or mixed evidence cases.
- 5 **known unanswerables** without missing keeper/location records.

For each, find at least one direct primary record, a counter-search, quote the supporting region, note the limitation, and log **reviewer-confirmed vs unverified**. Compare with existing atlas prose to calculate actual improvement.

**Record these metrics:** questions attempted; directly answered with text-checked evidence; historically answered only; disputed; correctly abstained; unsupported or mismatched citation count; incorrect taxon/date/unit; source retrieval failures; human minutes/claim; estimated API/search cost. If verification has not happened, report **zero verified during this pilot**, not a manufactured completion percentage.

## Deep research workflow

1. Define a question as a falsifiable claim with required observation/date/taxon.
2. Search across Taronga's dated public reports, NSW/IUCN primary resources and relevant scientific papers, not only pages repeating the same announcement.
3. Preserve a timestamped query/source ledger.
4. Extract exact evidence passages; distinguish zoo capacity, total animal count, mature-individual estimate, conservation program and visitor map.
5. Search deliberately for contradictions and counter-evidence.
6. Separate scientific interpretation from zoo-specific first-hand claims.
7. Ask a human to verify high-impact or controversial findings; request keeper/stockbook confirmation for individual identities.
8. Publish a claim-status update via GitHub PR with linked evidence, preserving previous conclusions and conflicts.
9. Only then promote a question from unresolved/provisional to supported.
10. Recheck when taxonomy, visitor maps, conservation assessments or date-scoped rosters change.

## Privacy safeguards

The public repo must **not** expose private original photographs of children/visitors, confidential keeper data, family details, hidden nest/den coordinates or account-connected metadata. If creating anonymised thumbnails, distinguish them from original checksum references and document rights/consent. A private research engine can access more information than a public field journal, but privacy-safe export is mandatory.

## Architecture decision

**Do not build another deep-research website for Dubbozoo at this stage.** The evidence-review workflow should be part of the existing **private ResearchAtlas** tools, using public source links and approved outputs for Dubbozoo.

Related project research:
- [Critical methodology review (private ResearchLibrary)](https://github.com/joshualparris/ResearchLibrary/blob/main/000-Computer-Science/AI-Deep-Research/AI-DEEP-RESEARCH-METHODS-AND-EVIDENCE-2026-10-18.md).
- [Research Evidence Engine design (private ResearchAtlas)](https://github.com/Parris-Tech-Services/ResearchAtlas/blob/main/docs/RESEARCH-EVIDENCE-ENGINE-SPEC-2026-10-18.md).
- [ResearchGems verified-knowledge learning bridge (private)](https://github.com/Parris-Tech-Services/ResearchGems/blob/main/docs/EVIDENCE-TO-LEARNING-2026-10-18.md).

**Done:** research and standards written. **Not done:** automated source checks, independent verification of all historic questions, new zoo animal identity confirmations, software implementation or deployed browser test. This distinction is intentional.
