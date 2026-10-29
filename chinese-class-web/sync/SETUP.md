# LINE Login + ซิงก์ความคืบหน้า (branch `line-sync`)

ล็อกอินเป็น **ทางเลือก**: ผู้เยี่ยมชมยังใช้ localStorage เหมือนเดิม และระบบจะชวนเข้าสู่ระบบแบบเบา ๆ (แบนเนอร์ขึ้นไม่เกิน 3 ครั้ง ห่างกันอย่างน้อย 3 วัน) และมีปุ่มในแท็บ ฉัน → "บัญชี LINE"

## โครงสร้าง
| ไฟล์ | หน้าที่ |
|---|---|
| `sync-config.js` | ค่าสาธารณะ: LIFF_ID, SUPABASE_URL, anon key (ห้ามใส่ service_role / channel secret) ถ้า LIFF_ID ว่างระบบจะปิดทั้งหมด |
| `sync-merge.js` | `mergeState(local, cloud, tLocal, tCloud)` รวมแบบไม่ทำข้อมูลหาย: ตัวเลขใช้ค่า max, array ใช้ union, object รวมทีละคีย์, ค่าตั้งค่า (ชื่อ เป้าหมาย ฯลฯ) ใช้ของฝั่งที่แก้ล่าสุด |
| `sync-supabase.js` | อแดปเตอร์ backend (`window.LAMA_SYNC_ADAPTERS.supabase`): `{configured, login, pull, push, remove}` |
| `sync.js` | แกนฝั่งเครื่อง: LIFF, session, pull/รวม/push (debounce 4 วินาที, flush ตอนปิดหน้า), ชนกันแล้วรวมใหม่ ≤3 ครั้ง, UI |
| `sync/supabase/migrations/*.sql` | ตาราง `lama_progress` + RLS (ไม่มี policy = anon เข้าไม่ได้) + `lama_push()` |
| `sync/supabase/functions/line-sync/index.ts` | Edge Function: ตรวจ ID token กับ `api.line.me/oauth2/v2.1/verify`, ออก session HMAC 30 วัน, ops pull/push/delete |
| `sync/test/e2e.cjs` | Playwright + LIFF/Supabase จำลอง (37 ข้อ) |
| `sync/test/real-liff.cjs` | Playwright + LIFF SDK จริง จนถึงหน้าล็อกอิน LINE |

ความปลอดภัย: เซิร์ฟเวอร์ไม่เชื่อ userId จากเครื่องผู้ใช้เลย uid มาจาก `sub` ที่ LINE ยืนยันแล้ว หรือจาก session ที่ฟังก์ชันเซ็นเอง ตารางเปิดให้เฉพาะ service_role เท่านั้น และรับเฉพาะ Origin `https://songyisong88.github.io` (ตั้งได้ที่ `ALLOWED_ORIGINS`)

## สถานะ (29 ต.ค. 2026)
- [x] Supabase `xkwbggclhxcskikqlqkv`: ใส่ schema/RLS แล้ว ตรวจแล้วว่า anon อ่านตารางหรือเรียก rpc ไม่ได้ (permission denied)
- [x] Edge Function `line-sync` deploy แล้ว (verify_jwt=false) มี secrets `LINE_CHANNEL_ID=2012275318`, `SYNC_SESSION_SECRET` (สุ่ม), `ALLOWED_ORIGINS`
- [x] ทดสอบฟังก์ชันจริงแล้ว: preflight CORS, origin แปลกปลอมได้ 403, token ปลอมได้ 401, session ปลอมได้ 401, pull/push/conflict/delete ใช้งานได้ (ลบข้อมูลทดสอบและเปลี่ยน secret ใหม่แล้ว)
- [x] `sync-config.js`: LIFF_ID `2012275318-kQuUJGv4`
- [x] merge เข้า main + `node build.js` แล้ว — **ซ่อนหลัง beta flag** (ดูด้านล่าง) คนทั่วไปไม่เห็นและไม่มี request ไป LINE/Supabase
- [x] นโยบายความเป็นส่วนตัว (build.js → privacy.html#line), ข้อความใน backup.js / ฉัน, consent dialog ลิงก์ไปนโยบาย
- [x] สมุดเหรียญต่อเครื่อง (`S.coinLog`) กันเหรียญที่ใช้แล้วเด้งกลับตอน merge
- [ ] ทดสอบล็อกอินจริงบนมือถือ (บัญชีแอดมิน) → ถ้าผ่านค่อยเอา beta flag ออก + Publish channel

## Beta flag
- เปิด: ต่อท้าย URL ด้วย `?beta=line` (จำไว้ใน localStorage `lama-beta-line=1`) · ปิด: `?beta=off`
- ลิงก์ทดสอบใน LINE: `https://liff.line.me/2012275318-kQuUJGv4?beta=line` (LIFF ส่งต่อเป็น `?liff.state=%3Fbeta%3Dline` → sync.js อ่านได้ และ redirect หลังล็อกอินยังคงมี flag)
- ไม่มี flag: sync.js ออกทันที ไม่โหลด LIFF SDK ไม่มีแบนเนอร์/แถวในฉัน (ไฟล์ sync-*.js ยังโหลดจากเว็บเดียวกัน แต่ไม่ทำอะไร)
- เอา flag ออกตอนพร้อม: ลบเงื่อนไข `!betaOn()` ใน `start()` ของ sync.js

## เปิดใช้งาน / ทดสอบจริง (ต้องใช้มือถือที่มีบัญชีแอดมินของ channel เพราะสถานะยังเป็น Developing)
1. LINE Developers → LINE Login channel `2012275318` → LIFF `2012275318-kQuUJGv4`
   - Endpoint URL: `https://songyisong88.github.io/teepuan-games/chinese-class-web/`
   - Scopes: `openid` (+`profile` ไว้แสดงชื่อในเครื่อง) · Add friend option: **On (aggressive)** และใน channel → Basic settings → *Linked OA* = @282vnvnd
   - ตรวจว่า channel นี้อยู่ **provider เดียวกับ** Messaging API channel ของ @282vnvnd (userId จะได้ตรงกันถ้าในอนาคตต้องการส่งข้อความหาผู้ใช้)
2. Merge `line-sync` → main (หลังได้รับอนุมัติ) แล้วรัน `node build.js` ใน `chinese-class-web/` (สคริปต์จะเติม `?v=` และใส่ไฟล์ sync ลง SW shell) แล้ว commit/push
3. บนมือถือ (บัญชีแอดมิน): เปิด `https://liff.line.me/2012275318-kQuUJGv4?beta=line` ใน LINE → เรียน 1 ด่าน → ฉัน → เข้าสู่ระบบด้วย LINE → ยอมรับ → ต้องเห็น "เชื่อมกับ LINE แล้ว"
4. เปิด `https://songyisong88.github.io/teepuan-games/chinese-class-web/?beta=line` ใน Safari/Chrome (นอก LINE) → ฉัน → เข้าสู่ระบบ → ล็อกอิน LINE → XP/ด่านต้องเท่ากับในข้อ 3 → เรียนเพิ่ม → กลับไปใน LINE แล้วดึงลง/เปิดใหม่ → ความคืบหน้าต้องตรงกัน
5. ตรวจข้อมูลได้ที่ Supabase → Table editor → `lama_progress` (มี 1 แถวต่อ userId) · ดู log ได้ที่ Functions → line-sync → Logs
6. ถ้าพร้อมเปิดให้ทุกคนใช้: LINE Login channel → **Publish** (ตอนนี้ล็อกอินได้เฉพาะแอดมิน/tester)

## ก่อนเปิดให้ทุกคนใช้
- ข้อความนโยบาย/consent อัปเดตแล้ว (Supabase ap-southeast-1 สิงคโปร์) · ถ้าย้ายโปรเจกต์/region ต้องแก้ใน build.js, backup.js, sync.js (askConsent)
- ให้ผู้รับผิดชอบตรวจข้อความนโยบายตาม PDPA อีกครั้ง (ช่องทางติดต่อ/ผู้ควบคุมข้อมูล)

## คำสั่ง (ทำซ้ำ/โปรเจกต์ใหม่)
```bash
# CLI: https://github.com/supabase/cli/releases (ต้องมี SUPABASE_ACCESS_TOKEN ใน env)
cd chinese-class-web/sync
# schema (ไม่ต้องใช้รหัส DB ยิงผ่าน Management API):
jq -Rs '{query:.}' supabase/migrations/20261029000000_lama_progress.sql | curl -s -X POST \
  https://api.supabase.com/v1/projects/xkwbggclhxcskikqlqkv/database/query \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" -H 'Content-Type: application/json' --data @-
# หรือ: psql "$DB_URL" -f supabase/migrations/20261029000000_lama_progress.sql
supabase secrets set --project-ref xkwbggclhxcskikqlqkv LINE_CHANNEL_ID=2012275318 \
  SYNC_SESSION_SECRET=$(openssl rand -hex 32) ALLOWED_ORIGINS=https://songyisong88.github.io
supabase functions deploy line-sync --project-ref xkwbggclhxcskikqlqkv --no-verify-jwt --use-api
```
หมุน `SYNC_SESSION_SECRET` ใหม่ = ทุกเครื่องหลุดล็อกอิน (แต่ข้อมูลไม่หาย) ผู้ใช้กดเข้าสู่ระบบใหม่ได้

## ทดสอบ
```bash
cd chinese-class-web && python3 -m http.server 18791 --bind 127.0.0.1 &
NODE_PATH=/workspace/qa-chinese-class/node_modules node sync/test/e2e.cjs http://127.0.0.1:18791/ /tmp/lsync-shots/   # WIDTHS=390,375,320 (ค่าเริ่มต้น)
NODE_PATH=/workspace/qa-chinese-class/node_modules node sync/test/real-liff.cjs /tmp/lsync-shots/
```

## ความเสี่ยงที่รู้อยู่
- **เหรียญ**: ใช้สมุดต่อเครื่อง `coinLog={base,d:{<เครื่อง>:{e,s}}}` → coins = base + Σ(ได้−ใช้) ใช้แล้วไม่เด้งกลับ · ข้อจำกัด: ตอนเชื่อมเครื่องใหม่ครั้งแรก base = ค่ามากสุดของทั้งสองฝั่ง (ครั้งเดียว ไม่ใช่ช่องโหว่ซ้ำได้) · ข้อมูลอยู่ฝั่ง client ทั้งหมด ผู้ใช้แก้ localStorage เองได้เสมอ · `plan` ไม่ใช่สิทธิ์ที่เชื่อถือได้ ห้ามใช้ปลดล็อกของที่ต้องจ่ายเงิน
- Session token อยู่ใน localStorage (`lamasync-meta`, ไม่รวมในไฟล์สำรอง) ถ้าเว็บโดน XSS จะอ่านได้ ขอบเขตความเสียหายคือความคืบหน้าของคนนั้นเท่านั้น อายุ 30 วัน
- Merge เป็นแบบ "ไม่ลบ": การรีเซ็ตในเครื่องจะยกเลิกการเชื่อมต่อ (คลาวด์ไม่ถูกเขียนทับ) ถ้าต้องการลบบนคลาวด์ด้วยต้องกด "ลบข้อมูลบนคลาวด์"
- userId จาก LINE Login จะตรงกับที่ OA เห็นก็ต่อเมื่ออยู่ provider เดียวกัน
- Free tier ของ Supabase: โปรเจกต์ที่ไม่มีการใช้งาน 7 วันจะถูก pause (ฟังก์ชันจะตอบ error เว็บยังใช้แบบในเครื่องได้ ซิงก์จะลองใหม่เอง)
