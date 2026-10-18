import fs from "node:fs";import assert from "node:assert/strict";
const p=new URL("../data/question-verification-ledger-2026-10-18.json",import.meta.url);
const j=JSON.parse(fs.readFileSync(p,"utf8"));
assert.equal(j.questions.length,622);
assert.equal(new Set(j.questions.map(q=>q.id)).size,622);
for(let i=0;i<622;i++)assert.equal(j.questions[i].id,"DZ-Q"+String(i+1).padStart(4,"0"));
for(const q of j.questions){
 assert.equal(q.human_verified,false);
 assert.ok(["ai_primary_text_cross_checked","not_freshly_verified"].includes(q.source_review_status));
 if(q.source_review_status==="ai_primary_text_cross_checked"){assert.ok(q.verdict);assert.ok(q.source_ids.length);}
 for(const id of q.source_ids)assert.ok(j.source_definitions[id]?.url?.startsWith("https://"));
}
const n=j.questions.filter(q=>q.source_review_status==="ai_primary_text_cross_checked").length;
console.log("Validated 622 indexed source questions; "+n+" AI text-cross-checked; "+(622-n)+" unverified; zero falsely human-verified.");