# Dubbozoo — Zoo App & Website Benchmark Backlog

**Audit date:** 15 November 2026  
**Repo checked:** `joshualparris/Dubbozoo` after internal field-note pages and real Taronga media were merged.  
**Rule:** only features not currently implemented in Dubbozoo are listed below. Existing features such as the 89-animal research archive, six internal field-note pages, 1977–2026 timeline, 622-question explorer, research network and six official Taronga Dubbo videos are excluded.

## Benchmarks reviewed

Official/current sources reviewed:
- Taronga Western Plains Zoo official app (iOS/Android): interactive map, location, directions, distance estimates, What's On, My Day, reminders, self-guided adventures, daily updates and alerts.
- Taronga Zoo Sydney app: iBeacons/proximity facts and Wild Squad missions.
- San Diego Zoo / Safari Park app: GPS map, digital ticket/membership wallet, day planner, today's schedule, dining and activities.
- Chester Zoo app: animal search, directions, nearest toilet, daily programme and talk reminders.
- Mandai Wildlife Reserve app/site: wayfinding, transport ETA, presentation reminders, itineraries, animal sightings, QR scanning, mobile food ordering, 360 tours, digital trails, audio tours, AR and reward quests.
- Smithsonian National Zoo: live animal cams, animal-cam bingo, behaviour observation/ethogram activities and advanced animal filters.
- Zoos Victoria: multilingual interactive maps, sensory overlays, child gallery mode, social scripts, quiet-time guidance, Access Keys, signed accessibility content, member content and education resources.

## Numbered feature backlog

1. [ ] **[P0] Interactive Taronga Western Plains Zoo map** — render the zoo circuit and major exhibit/facility points inside Dubbozoo rather than linking to a static PDF.
2. [ ] **[P0] Live “You are here” location dot** — optional browser geolocation with a clear on/off privacy control.
3. [ ] **[P0] Turn-by-turn in-zoo directions** — route from the visitor's current position to an animal, talk or facility.
4. [ ] **[P0] Distance estimate to destination** — show metres/kilometres from current position.
5. [ ] **[P0] Estimated walking time to destination** — calculate practical travel time between stops.
6. [ ] **[P0] Multi-mode routing** — separate route options for walking, bicycle, cart and car.
7. [ ] **[P0] One-way zoo-circuit-aware routing** — respect the Western Plains Zoo circuit direction instead of drawing impossible shortcuts.
8. [ ] **[P0] Search animals directly from the map** — typing an animal should locate its exhibit and offer directions.
9. [ ] **[P0] Search facilities directly from the map** — toilets, food, first aid, water, playgrounds, hire points and other services.
10. [ ] **[P0] “Nearest toilet” action** — one tap to find and route to the closest toilet, similar to Chester Zoo.
11. [ ] **[P0] “Nearest accessible toilet” action** — keep accessible amenities distinct from general toilets.
12. [ ] **[P0] “Nearest first aid / AED” action** — surface emergency facilities with routing.
13. [ ] **[P1] Facility-layer filters** — toggles for food, picnic areas, water refill, playgrounds, shop, information, shelters, hire centre, EV charging, first aid and toilets.
14. [ ] **[P1] Accessible-route mode** — favour routes suitable for wheelchairs/mobility devices and flag barriers or steep/unsuitable paths where verified.
15. [ ] **[P1] Sensory map overlay** — identify higher/lower sensory areas, inspired by Zoos Victoria.
16. [ ] **[P1] Downloadable/offline map view** — retain the map if mobile reception is poor.
17. [ ] **[P0] Live “What’s On Today” schedule** — current keeper talks, feeds, tours and encounters in chronological order.
18. [ ] **[P0] Current keeper-talk times** — use dated official Taronga information and show when it was last checked.
19. [ ] **[P0] Current animal-feed times** — separate feeds from talks and encounters.
20. [ ] **[P0] Current encounters/tours schedule** — show bookable and free activities without pretending Dubbozoo is the booking provider.
21. [ ] **[P0] “My Day” planner** — let visitors add talks, animals and experiences to a personal day plan.
22. [ ] **[P0] Talk/experience reminders** — notify shortly before a saved activity starts.
23. [ ] **[P1] Favourite / must-see animals** — save a shortlist of animals for the visit.
24. [ ] **[P1] Route My Day automatically** — order saved animals/talks into a realistic circuit sequence.
25. [ ] **[P1] Two-hour itinerary** — a genuinely short visit plan.
26. [ ] **[P1] Half-day itinerary** — Taronga-style self-guided highlights.
27. [ ] **[P1] Full-day itinerary** — schedule animals, breaks and talks.
28. [ ] **[P1] Two-day itinerary** — useful for visitors staying in Dubbo or at zoo accommodation.
29. [ ] **[P1] Interest-based itineraries** — e.g. big cats, Australian wildlife, primates, threatened species, young children or photography.
30. [ ] **[P1] Family-with-young-kids itinerary** — shorter walking legs, playgrounds, toilets and food stops.
31. [ ] **[P1] Accessibility-friendly itinerary** — combine accessible routes, toilets and rest points.
32. [ ] **[P1] Weather-aware itinerary** — adjust recommendations for heat, rain or other conditions rather than presenting the same plan every day.
33. [ ] **[P0] Current opening hours / last-entry card** — show today’s visitor-plaza and zoo-circuit times.
34. [ ] **[P0] Temporary closures and works** — surface current construction, unavailable areas or changed visitor access.
35. [ ] **[P0] Daily update banner** — visible site-wide notice for important same-day changes.
36. [ ] **[P1] Critical visitor alert banner** — prominent closure, safety or operational notices when genuinely sourced.
37. [ ] **[P1] Last-updated timestamp for all current visitor information** — make staleness obvious.
38. [ ] **[P1] Getting-to-the-zoo planner** — car, train, flight, bus and taxi/rideshare guidance in one place.
39. [ ] **[P1] Public transport options** — link or integrate current Dubbo transport information.
40. [ ] **[P2] Public bus ETA display** — Mandai-style real-time arrival information if a suitable public data source exists.
41. [ ] **[P1] Directions from bus stop / parking area to zoo entrance** — bridge the “last few hundred metres”.
42. [ ] **[P1] Parking guide** — standard, accessible, caravan/trailer and other relevant parking.
43. [ ] **[P2] EV charging information** — location, availability notes and directions where official data supports it.
44. [ ] **[P1] Bike-hire information** — current options, duration, requirements and official booking link.
45. [ ] **[P1] Cart-hire information** — current options, accessibility notes and official booking link.
46. [ ] **[P1] Pedal-boat information** — location, duration, availability and official booking link.
47. [ ] **[P1] Dining directory** — cafes/outlets, location, opening times, payment notes and dietary information where published.
48. [ ] **[P2] Mobile food-ordering integration/deep link** — only if Taronga provides an official ordering path; Dubbozoo should not process payments itself.
49. [ ] **[P1] Accommodation guide** — Zoofari Lodge, Savannah Cabins and other official zoo-stay options with clear external booking links.
50. [ ] **[P1] Official ticket-purchase deep link** — keep booking clearly on Taronga’s official service.
51. [ ] **[P2] Import/store an existing ticket locally** — optional visitor wallet, without uploading ticket/barcode data to Dubbozoo.
52. [ ] **[P2] Digital membership-card wallet** — optional local storage if technically/legal appropriate; otherwise provide direct official membership access.
53. [ ] **[P2] Membership information / benefits section** — visitor-friendly summary with official source links.
54. [ ] **[P2] Ticket-to-membership upgrade guidance** — only where Taronga officially offers it.
55. [ ] **[P2] Member-only content area** — only for content the user owns or has permission to publish; do not imitate Taronga authentication.
56. [ ] **[P2] Donation / conservation-support links** — direct visitors to official conservation fundraising rather than collecting money independently.
57. [ ] **[P2] Official shop link and conservation merchandise context** — surface relevant wildlife-support products without operating a parallel shop.
58. [ ] **[P0] “Current vs historical” animal toggle** — separate evidence of animals currently at Dubbo from historic/archive records.
59. [ ] **[P0] Dated current-resident roster** — only promote an animal as currently present when a recent official source supports it.
60. [ ] **[P1] Named individual animal profiles** — e.g. verified current named animals, with date/source and no photo-based identity guessing.
61. [ ] **[P1] “Where can I see this animal?” current exhibit location** — distinct from historical location evidence.
62. [ ] **[P1] “Best time to see them” tips** — only from official keeper/visitor guidance, not invented behavioural predictions.
63. [ ] **[P1] Current exhibit/off-display status** — clearly date-scoped; never infer transfer/death from absence.
64. [ ] **[P2] Animal-sighting alerts** — Mandai-style “recently active here” only if a trustworthy source/feed exists.
65. [ ] **[P1] Live animal webcams** — embed any genuine Dubbo live cams if Taronga provides them; never label prerecorded footage as live.
66. [ ] **[P1] Births, arrivals and major animal news feed** — dated official Taronga updates linked to relevant animal profiles.
67. [ ] **[P2] Enrichment / daily-routine information** — current keeper-sourced content explaining what animals may be doing through the day.
68. [ ] **[P1] Advanced animal-directory filters** — animal type, region, exhibit, conservation status, evidence status and current/off-display state.
69. [ ] **[P1] Expand official Dubbo media beyond the six current videos** — index all suitable Taronga Western Plains Zoo keeper talks, animal footage and conservation video.
70. [ ] **[P1] Location-aware real keeper audio tour** — play genuine recorded keeper/animal audio by exhibit rather than synthetic narration.
71. [ ] **[P2] Self-guided audio-tour mode** — hands-free next/previous stops for headphones, inspired by Mandai’s Night Safari audio tour.
72. [ ] **[P1] QR-code exhibit scanner** — scan a Dubbozoo/Taronga-safe QR code and open the matching internal animal/field page.
73. [ ] **[P2] Proximity-triggered animal content** — optional geofence/Bluetooth/iBeacon-style nearby facts, inspired by Taronga Sydney.
74. [ ] **[P2] Augmented-reality animal overlays** — optional AR learning experiences, inspired by Mandai and Chester.
75. [ ] **[P3] AR photo/video capture** — allow visitors to make and share clearly-labelled virtual wildlife moments.
76. [ ] **[P1] Kids conservation missions** — short interactive challenges modelled on Taronga Wild Squad.
77. [ ] **[P1] Scavenger-hunt trail** — discover species/locations in a sequence around the zoo.
78. [ ] **[P2] Digital badges / rewards** — reward completion of educational trails without encouraging unsafe rushing.
79. [ ] **[P2] Wildlife passport / visit checklist** — mark animals actually seen, separate from the zoo’s total collection.
80. [ ] **[P2] Animal-cam bingo** — Smithsonian-style observation prompts for live/recorded animal media.
81. [ ] **[P2] Behaviour ethogram activities** — structured “what did the animal actually do?” observation worksheets.
82. [ ] **[P2] Child-led gallery mode** — large visual animal choices so younger children can choose the next stop, inspired by Melbourne Zoo.
83. [ ] **[P2] 360° pre-visit virtual tour** — entrances, circuit, major precincts and facilities, inspired by Mandai.
84. [ ] **[P1] Multilingual website interface** — start with high-value languages rather than machine-translating research silently.
85. [ ] **[P1] Multilingual map labels** — independent from full research translation.
86. [ ] **[P1] Social story / social script** — photo-based “what to expect” pre-visit guide for autistic/neurodivergent visitors and families.
87. [ ] **[P1] Quiet-time guidance** — identify typically calmer periods and lower-sensory locations only where supportable.
88. [ ] **[P1] Full accessibility “Access Key”** — entrances, surfaces, toilets, seating, queues, mobility, sensory factors and assistance.
89. [ ] **[P2] Visual communication board** — common visitor needs/actions represented visually.
90. [ ] **[P1] Auslan / signed accessibility content** — link or embed verified signed content where available.
91. [ ] **[P1] Captions and transcripts for all embedded real zoo media** — expose available captions/transcripts and flag when absent.
92. [ ] **[P1] Curriculum-linked learning resources** — Dubbo-specific science/conservation activities by school stage.
93. [ ] **[P1] Teacher excursion planner** — arrival, talk times, lunch, facilities, learning stops and departure.
94. [ ] **[P1] School risk-assessment / venue-safety links** — current official resources clearly separated from Dubbozoo commentary.
95. [ ] **[P2] Downloadable student worksheets / field-observation templates** — evidence-first activities based on the field-journal method.
96. [ ] **[P2] “School mode” website view** — simplified navigation to animals, map, talks and learning tasks.
97. [ ] **[P1] Conservation action challenges** — small practical actions tied to Taronga’s verified conservation campaigns.
98. [ ] **[P2] Installable Progressive Web App (PWA)** — add Dubbozoo to the phone home screen like an app.
99. [ ] **[P2] Offline caching of core pages/data** — animal pages, field notes and map remain usable with poor reception.
100. [ ] **[P2] Opt-in web push notifications** — talks/reminders/critical visitor updates with granular controls.
101. [ ] **[P2] Persistent favourites across visits** — local-first storage with export/delete controls.
102. [ ] **[P2] Persistent personal itinerary** — save the day plan locally between browser sessions.
103. [ ] **[P2] Shareable itinerary link/file** — share a plan with family without exposing private location history.
104. [ ] **[P2] Share animal/profile action** — Web Share API where supported.
105. [ ] **[P2] Local photo-capture field journal** — attach personal animal photos locally without uploading them publicly by default.
106. [ ] **[P2] Export a complete personal visit journal** — dates, seen-animal checklist, field notes and private photo references.
107. [ ] **[P1] Location/notification privacy dashboard** — one place to see and revoke permissions and clear local data.
108. [ ] **[P1] Explicit “live/current/historical” data-state badges** — every time-sensitive claim should visibly communicate its freshness.
109. [ ] **[P1] Current-data health indicator** — show whether schedules/maps/current-roster data were refreshed successfully or are stale.
110. [ ] **[P1] Visitor feedback form** — site-specific feedback without requiring a GitHub account.
111. [ ] **[P1] “Report outdated zoo information” action** — route corrections into a review queue rather than silently accepting edits.
112. [ ] **[P1] “Report broken media/link” action** — make third-party source failures easy to flag.
113. [ ] **[P2] Public changelog / “What changed?” page** — visitor-readable record of new features, corrected claims and refreshed current data.
114. [ ] **[P2] In-site search across animals, field notes, timeline, videos, questions and visitor information** — one global search rather than separate section-specific search.
115. [ ] **[P2] Quick-access visitor panel** — one-tap Map, Today, Toilets, My Day, Food, Field Journal and Real Media, inspired by Mandai.
116. [ ] **[P2] Context-aware “near me” panel** — nearest animals, facilities and next talks, only after explicit location permission.
117. [ ] **[P2] Smart home screen for “planning”, “at the zoo” and “after the visit”** — change emphasis based on visitor-selected mode rather than silently tracking location.
118. [ ] **[P2] Photo/video sharing workflow** — local share/zip/export similar to the official Taronga app’s capture/share feature, without automatic public upload.
119. [ ] **[P2] Recommended next stop** — calculate a nearby useful stop based on saved interests, schedule and route direction.
120. [ ] **[P3] Optional AR nature trail / virtual scavenger zones** — a more ambitious Chester/Mandai-style layer once the core map, schedule and accessibility work is solid.

## Important implementation boundary

Dubbozoo is independent, not Taronga. Features that require authoritative operational data — current animal locations, live schedules, closures, ticketing, sightings, bookings, payments or live cams — must use an official/publicly permitted source or remain clearly marked unavailable. Do not fabricate “live” data, scrape around access controls, impersonate Taronga, or process official payments/bookings unless explicitly authorised.

## Highest-value first wave

The strongest next build is items **1–12, 17–24, 33–37, 58–63 and 98–100**: map/wayfinding, today’s schedule + My Day/reminders, current visitor alerts, a current-vs-historical animal layer, and an installable/offline-capable PWA.
