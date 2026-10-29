/* ตั้งค่าล็อกอิน LINE + ซิงก์ความคืบหน้า — แก้ที่ไฟล์นี้ไฟล์เดียว (ดู sync/SETUP.md)
   ถ้า LIFF_ID หรือ endpoint ยังเป็นค่าว่าง/ตัวยึด ระบบซิงก์จะปิดทั้งหมด: ไม่โหลด LIFF SDK ไม่ส่งข้อมูลไปไหน ไม่แสดงปุ่ม — เว็บทำงานแบบผู้เยี่ยมชมเหมือนเดิม
   ค่าในไฟล์นี้เป็นค่าสาธารณะ (อยู่ในเว็บ) ห้ามใส่ service_role key / channel secret ที่นี่เด็ดขาด */
window.LAMA_SYNC_CONFIG={
  LIFF_ID:'2012275318-kQuUJGv4',                 // จาก LINE Developers → LINE Login channel → LIFF (เช่น '2001234567-AbCdEfGh') — ATLAS
  BACKEND:'supabase',         // 'supabase' (มีอแดปเตอร์แล้ว) · 'firebase' (ยังไม่ได้ทำ ดู SETUP.md)
  SUPABASE_URL:'https://xkwbggclhxcskikqlqkv.supabase.co', // โปรเจกต์ Supabase (ค่าสาธารณะ)
  SUPABASE_ANON_KEY:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrd2JnZ2NsaHhjc2tpa3FscWt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyNDIyOTksImV4cCI6MjEwODgxODI5OX0.8PtDd7c4bOxdASKUy0FFj3In3-l7Ai3gSXcT-9oOlIQ', // anon key (สาธารณะ ใส่ในเว็บได้ · ตาราง lama_progress ปิดไม่ให้ anon อ่าน/เขียนด้วย RLS)
  SUPABASE_FN:'line-sync',    // ชื่อ Edge Function (ตรงกับโฟลเดอร์ sync/supabase/functions/line-sync)
  PUSH_DEBOUNCE_MS:4000,      // รวมการบันทึกถี่ ๆ เป็นการส่งครั้งเดียว
  PROMPT_AFTER_UNITS:1        // ชวนล็อกอินอย่างนุ่มนวลหลังเรียนจบกี่รอบ (0 = ไม่ชวน)
};
