# rad-build

สร้าง `data/rad/rad.js` ของเส้นทาง "เรียนตัวอักษร"

    python3 tools/rad-build/build_rad.py   # ต้องมี MMAH dictionary.txt/graphics.txt ตาม WORK/SO ในสคริปต์

* `table_core.md`, `table_bonus.md` — ตารางตัวข้างที่ร่างไว้ (48 + 12) ข้อความไทยเป็น "ร่าง รอครูตรวจ"
* `fixes.json` — ชั้นแก้ไขของเราทับ MMAH (แก้การแยก ระบุส่วนเสียงที่ไม่ใช้)
* ผลลัพธ์: `RAD_Z` (5 เขต) `RAD` (60 ตัว) `RAD_MEM` (ตัวในบทเรียนของแต่ละตัวข้าง) `RAD_CH` (การแยกของตัวอักษรในบทเรียน) `RAD_PY`
* แก้ตารางหรือ fixes.json แล้วรันซ้ำ → `node build.js` → `python3 tools/validate.py`
