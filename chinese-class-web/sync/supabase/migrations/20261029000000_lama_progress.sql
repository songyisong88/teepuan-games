-- ความคืบหน้าผู้เรียน 1 แถวต่อผู้ใช้ LINE · เข้าถึงได้ผ่าน Edge Function `line-sync` (service_role) เท่านั้น
create table if not exists public.lama_progress (
  line_uid    text primary key check (line_uid ~ '^U[0-9a-f]{32}$'),   -- LINE userId จาก ID token ที่ตรวจแล้ว (sub)
  state       jsonb not null check (jsonb_typeof(state) = 'object' and pg_column_size(state) < 1000000),
  rev         bigint not null default 1,                               -- เพิ่มทุกครั้งที่เขียน (กันเขียนทับกันข้ามเครื่อง)
  client_t    bigint,                                                  -- เวลาแก้ล่าสุดฝั่งเครื่อง (ms) ใช้ตัดสิน "ฝั่งไหนใหม่กว่า" ตอนรวม
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- RLS เปิด และ "ไม่มี policy" ให้ anon/authenticated เลย = anon key อ่าน/เขียนตารางนี้ไม่ได้ (deny by default)
alter table public.lama_progress enable row level security;
alter table public.lama_progress force row level security;
revoke all on table public.lama_progress from anon, authenticated, public;
grant select, insert, update, delete on table public.lama_progress to service_role;

-- เขียนแบบมีเงื่อนไข rev (optimistic concurrency) ในคำสั่งเดียว
-- base_rev = rev ที่เครื่องเห็นล่าสุด (0 = ยังไม่เคยมีแถว) · ถ้าไม่ตรง คืน ok=false พร้อมข้อมูลล่าสุดให้เครื่องรวมแล้วส่งใหม่
create or replace function public.lama_push(p_uid text, p_state jsonb, p_base_rev bigint, p_client_t bigint)
returns jsonb language plpgsql security invoker set search_path = public as $$
declare r public.lama_progress;
begin
  if p_base_rev = 0 then
    insert into public.lama_progress(line_uid, state, rev, client_t) values (p_uid, p_state, 1, p_client_t)
    on conflict (line_uid) do nothing returning * into r;
  else
    update public.lama_progress set state = p_state, rev = rev + 1, client_t = p_client_t, updated_at = now()
    where line_uid = p_uid and rev = p_base_rev returning * into r;
  end if;
  if r.line_uid is not null then
    return jsonb_build_object('ok', true, 'rev', r.rev);
  end if;
  select * into r from public.lama_progress where line_uid = p_uid;
  return jsonb_build_object('ok', false, 'rev', coalesce(r.rev, 0), 'state', r.state, 't', r.client_t);
end $$;
revoke all on function public.lama_push(text, jsonb, bigint, bigint) from public, anon, authenticated;
grant execute on function public.lama_push(text, jsonb, bigint, bigint) to service_role;
