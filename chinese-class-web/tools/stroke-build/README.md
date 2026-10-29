# สร้างไฟล์ลำดับขีด (`data/stroke/*.json`)

`build_strokes.py` สร้างไฟล์ต่อตัวอักษร (9,485 ตัว — ตัวย่อมาตรฐาน 6,866 + ตัวเต็ม/ตัวข้าง/ส่วนประกอบที่ใช้จริง 2,619 ตามรายการ extra_chars.txt) + `data/stroke/index.js` จาก
- hanzi-writer-data 2.0.1 (Arphic Public License) — `strokes`, `medians`, `radStrokes`
- Make Me a Hanzi `dictionary.txt` (Arphic PL + LGPL-3) — ส่วนประกอบ (`cp`) ราก (`rad`) ที่มา (`ty`) ความหมาย (`d`)
- cnchar-order (MIT) — ชื่อชนิดขีดจีน (`n`) · ตัวที่ไม่มีชื่อใช้ “ขีดที่ N”

ข้อมูลนำเข้าอยู่ใน `/workspace/stroke-order/work/` (ดาวน์โหลดจาก npm/GitHub ตามเวอร์ชันข้างบน) ปรับ path ที่หัวไฟล์ก่อนรัน

ขั้นตอนที่ “เราเดา” (ต้องให้ครูตรวจ):
- 2,444 ขีดที่ cnchar-order ให้ชื่อกำกวม เราตัดสินจากรูปทรงของเส้นกลาง — บันทึกไว้ใน `ambiguous.json`
- 185 ตัวไม่มีชื่อขีด · 313 ตัวไม่มีการแยกสี (แสดงโดยไม่แยกสี)
- ชื่อขีดภาษาไทยและคำอธิบายทิศทางเป็น **ร่าง รอครูตรวจ**
