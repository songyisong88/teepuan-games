# ช่องภาพประกอบ (Art slots)
- ภาพบทเรียน: `assets/art/lesson/<เลขบท>.webp` (สี่เหลี่ยมจัตุรัส ≥ 256×256 พื้นโปร่งใสหรือสีอ่อน) — แทนอีโมจิบนการ์ดบท
- ภาพคำศัพท์: `assets/art/word/<คำจีน>.webp` (เช่น `你好.webp`) — โชว์บนการ์ดคำใหม่เหนือตัวอักษร
- เพิ่มชื่อ (`"lesson/1":1`, `"word/你好":1`) ลงใน `assets/art/index.js` ในออบเจ็กต์ `ART_IDX`
- ถ้าไม่ลงทะเบียนหรือโหลดไม่ได้: บทเรียนใช้อีโมจิเดิม คำศัพท์ไม่แสดงช่องภาพ (ไม่มี 404 ไม่มีกรอบว่าง)
- ห้ามใช้ภาพที่ไม่มีสิทธิ์ · ใส่ที่มา/ผู้วาดใน `assets/art/CREDITS.md`

## assets/pinroom/ (ห้องพินอิน)
23 PIXEL images (webp, transparent, 512px, ~33 KB each) from /workspace/cn-images/pinyin/: pose-* (mouth/tongue, 7), tone1..5, scene-* (welcome gate, stage clear, trophy, confetti, try again), extra-* (mouth a/o/e, thinking, headphones, paper test).
Loaded through `prImg()` in pinroom.js (falls back to the mascot if a file is missing). The mouth/tongue cross-sections are code-drawn simple illustrations, not real anatomy; the UI captions say so.

## assets/art/word/ (เรียนด้วยรูป · ดูรูปแล้วเลือกคำ)
100 PIXEL word images (HSK1 40 + HSK2–3 60), opaque webp 512px (~18 KB each), named `<คำจีน>.webp`. Registered in `assets/art/index.js` (`word/<zh>` + `PIC_TYPE`).
Re-run for new batches: `python3 tools/pic-build/build_pics.py <dir1> <dir2> …` (each dir has index.json). Used only inside lessons (piclearn.js → unitSteps): new-word card, ดูรูปเลือกคำจีน, ฟังเลือกรูป 2×2, จับคู่รูป↔คำ. Kinship images (哥哥 姐姐 弟弟 妹妹 爷爷 奶奶 儿子 女儿) always carry a Thai caption. Concrete words without an image show an emoji with the badge "อีโมจิชั่วคราว" (PIC_EMO in piclearn.js).
Lot 3 (94 images, folder hsk4-5-more) maps to lessons of level 2–3 (all 94 words match exactly one lesson word, Thai matches). Labelled (PIC_KIN): family, people and occupations. Look-alike groups (PIC_SIM) are never used as distractors for each other. Rebuild: `python3 tools/pic-build/build_pics.py /…/hsk1 /…/hsk2-3 /…/hsk4-5-more`.

## รูปประกอบตัวข้าง (เฟส 5)
`data/rad/pic.js` (RAD_PIC) ชี้ตัวข้าง → รูปคำศัพท์ที่มีอยู่แล้วใน `assets/art/word/` (58/60) ไม่มีไฟล์รูปใหม่
คำขอรูปเพิ่มจาก PIXEL (สไตล์เดียวกับชุดคำศัพท์ 512px webp):
- `田` — ผืนนาข้าวแบ่งเป็นแปลงสี่เหลี่ยม มองจากมุมสูง (ชื่อไฟล์แนะนำ `田地.webp`)
- `王` (หยก) — หยกเขียวร้อยเชือกแดง/จี้หยก (ชื่อไฟล์แนะนำ `玉.webp`)
- (ถ้ามีเวลา) `酉` — ไหหมักดินเผาปากแคบ แทนรูปเบียร์ (ชื่อไฟล์แนะนำ `酒坛.webp`)
เมื่อได้รูป: วางไฟล์, ลงทะเบียนใน `assets/art/index.js`, แก้ `data/rad/pic.js` แล้ว `node build.js`
