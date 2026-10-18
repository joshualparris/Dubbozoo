# Submitted photographs — integrity and publication status

Five JPEGs were supplied by Josh in chat. Their file properties were inspected **without editing or recompressing the source copies**. These notes preserve their identity for later archival upload.

> **The photo binaries are not yet hosted in this GitHub repository.** The hashes below document the copies analysed, not a verified GitHub image upload. The site deliberately does not pretend that missing photos are online.

| Filename | Bytes | Pixel dimensions | SHA-256 |
| --- | ---: | --- | --- |
| `1000104120.jpg` | 600,601 | 1152 × 1536 | `c0a7c4f98977f836430f627213fc839a61ce364c3cb08a9f75c71b753a9a6f91` |
| `1000104121.jpg` | 439,214 | 1152 × 1536 | `a617da9f4f82ad2d64cf789c651af105a9445164fb8d2fcde94f82346d8b4466` |
| `1000104122.jpg` | 429,329 | 1152 × 1536 | `9da05a7d828dc9932f1567baabbcde17fcf382dcf48d562c9b945ef4531397da` |
| `1000104123.jpg` | 631,920 | 1152 × 1536 | `4e12ad4f7f20906ab4cf1888e51e26d8755a1f2331abc0d15b548ed6a51e1ecd` |
| `1000104124.jpg` | 385,740 | 1152 × 1536 | `4a7e71113221167dab3523579b05ed09dff493ddfb45325ad0688c1f35da802f` |

All five uploaded copies lack retained EXIF tags, including photo capture timestamp and GPS. **Research date is not the photo's capture date.** There is no confirmed per-photo animal identity.

## Next step: include Josh's actual photos

1. Confirm you have permission to publish the images publicly. This repository is public.
2. In the GitHub repository's file browser, use **Add file → Upload files** and upload the five original JPEGs into `photos/originals/`. Alternatively, push them using Git from a computer.
3. Verify SHA-256 checksums match the originals above. If you opt to redact/optimise them, store the processed hashes separately and preserve originals privately.
4. Update `repository_path` and `committed_binary` for each photo in `data/observations.json`.
5. Display the images on the site **only after the referenced paths actually exist**. Record photographer, licence, capture date and exact site details after confirmation.

Files should never be silently replaced by AI-generated animals or guessed locations.

## Photo handling policy

- Retain original filenames, originals' SHA-256 and known metadata.
- Keep source photographs separate from cropped/optimised derivatives.
- Publish only images authorised by their rights-holder.
- Do not disclose the faces or identifying information of visitors without permission; the wide photograph includes a person.
- Do not infer GPS, sex, current pack membership, or health from the photographs.
