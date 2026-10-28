# ช่องภาพประกอบ (Art slots)
- ภาพบทเรียน: `assets/art/lesson/<เลขบท>.webp` (สี่เหลี่ยมจัตุรัส ≥ 256×256 พื้นโปร่งใสหรือสีอ่อน) — แทนอีโมจิบนการ์ดบท
- ภาพคำศัพท์: `assets/art/word/<คำจีน>.webp` (เช่น `你好.webp`) — โชว์บนการ์ดคำใหม่เหนือตัวอักษร
- เพิ่มชื่อ (`"lesson/1":1`, `"word/你好":1`) ลงใน `assets/art/index.js` ในออบเจ็กต์ `ART_IDX`
- ถ้าไม่ลงทะเบียนหรือโหลดไม่ได้: บทเรียนใช้อีโมจิเดิม คำศัพท์ไม่แสดงช่องภาพ (ไม่มี 404 ไม่มีกรอบว่าง)
- ห้ามใช้ภาพที่ไม่มีสิทธิ์ · ใส่ที่มา/ผู้วาดใน `assets/art/CREDITS.md`

## assets/pinroom/ (ห้องพินอิน)
23 PIXEL images (webp, transparent, 512px, ~33 KB each) from /workspace/cn-images/pinyin/: pose-* (mouth/tongue, 7), tone1..5, scene-* (welcome gate, stage clear, trophy, confetti, try again), extra-* (mouth a/o/e, thinking, headphones, paper test).
Loaded through `prImg()` in pinroom.js (falls back to the mascot if a file is missing). The mouth/tongue cross-sections are code-drawn simple illustrations, not real anatomy; the UI captions say so.
