/* ตลาดน้ำอวกาศ / Star River Market — Kairon Arcade. Stage 3: Glow Ice Planet lanes, home-port market, pets, orders, weekend meteor shower. Original code. */
(function(){
'use strict';
// zoom guard: shared ../no-zoom.js (Kairon Arcade). Only long-press menu blocked here.
document.addEventListener('contextmenu',function(e){e.preventDefault();});

// ---------- i18n ----------
var T={
 th:{title:'ตลาดน้ำอวกาศ',subtitle:'พายเรือขายของให้มนุษย์ต่างดาว',tapStart:'แตะเพื่อเริ่ม',boat:'อัปเกรดเรือ',staff:'ลูกจ้าง',goods:'สินค้า',map:'แผนที่ดาว',
  fruit:'ผลไม้เรืองแสง',candy:'ลูกอมดาว',jelly:'เยลลี่เนบิวลา',crystal:'คริสตัลจักรวาล',
  lv:'เลเวล',unlock:'ปลดล็อก',max:'สูงสุด',hire:'จ้าง',
  upCap:'ท้องเรือใหญ่ขึ้น',upCapD:'บรรทุกของได้ {n} ชิ้น',upSpd:'ไม้พายดวงดาว',upSpdD:'ความเร็วเรือ x{n}',upPat:'โคมไฟอบอุ่น',upPatD:'ลูกค้ารอนานขึ้น {n} วินาที',
  staff1:'น้องพาย',staff2:'น้องแจว',staffDesc:'พายเรือตามหลัง ขายเองทุก {t} วินาที',staffHireDesc:'พายเรือตามขบวน ช่วยขายเอง แม้ตอนปิดเกม',
  goodsDesc:'ขายได้ {p} เหรียญ',goodsLockDesc:'ปลดล็อกแล้วนำขึ้นเรือไปขายได้',likes:'ชอบมาก:',
  planet1:'ดาวบ้านเกิด',planet1d:'ดาวแรกของการค้าขาย',here:'อยู่ที่นี่',planet2:'ดาวลูกกวาด',planet2d:'ชาวดาวนี้ชอบของหวานมาก',soon:'เร็วๆ นี้',
  mapNote:'ดาวใหม่จะมาในอัปเดตถัดไป ความคืบหน้าของพี่จะเก็บไว้ครบ',route:'เส้นทาง {a}/{b} เที่ยว',
  watch:'ดูโฆษณา',noThanks:'ไม่เป็นไร',
  adLabel:'โฆษณาตัวอย่าง (ทดสอบ)',adWait:'รอสักครู่ แล้วรับรางวัล',adDone:'รับรางวัลได้แล้ว',claim:'รับรางวัล',adEarly:'ปิดก่อนจบ จึงยังไม่ได้รับรางวัล',
  wbT:'ยินดีต้อนรับกลับมา!',wbD:'ระหว่างที่พี่ไม่อยู่ ลูกจ้างขายของได้',wbClaim:'รับเลย',wbX2:'ดูโฆษณา รับ x2',wbAdD:'ดูโฆษณาสั้นๆ แล้วรับเงินก้อนนี้เป็นสองเท่า',
  noCoins:'เหรียญยังไม่พอ',levelUp:'เลเวลอัป! ได้ดาว +{g}',gemSoon:'ดาวใช้ได้ในอัปเดตถัดไป',
  adLimit:'ตอนนี้ยังไม่มีโฆษณา ลองใหม่ทีหลังนะ',minutes:'{m} นาที',
  setoff:'ออกเรือ!',tripN:'เที่ยวที่ {n}',loadT:'เลือกของใส่เรือ',loadD:'ของบนเรือ {a}/{b} ชิ้น',fill:'ใส่เต็มเรือ',clear:'ล้าง',
  hold:'กดค้างที่จอ = พายเร็วขึ้น',docking:'ถึงท่าแล้วจ้า!',rush:'แตะลูกค้ารัวๆ!',combo:'คอมโบ {n}',
  noStock:'ไม่มี{g}บนเรือ',empty:'ของหมดเรือแล้ว',
  sumT:'ถึงปลายทางแล้ว!',sumSold:'ขายได้',sumTips:'ทิป',sumCombo:'คอมโบสูงสุด',sumCoins:'เหรียญรอบนี้',pcs:'{n} ชิ้น',
  sumAd:'ดูโฆษณาสั้นๆ รับเหรียญรอบนี้เพิ่มอีก {n}',sumX2:'ดูโฆษณา รับ x2',sumOk:'เก็บเหรียญ',
  vipBtn:'VIP',vipT:'เรียกลูกค้า VIP',vipD:'ดูโฆษณาสั้นๆ แล้วลูกค้า VIP จะมาซื้อ จ่าย {n} เหรียญ ไม่ใช้ของบนเรือ',
  rsBtn:'เติมของ',rsT:'เติมของเต็มเรือฟรี',rsD:'ดูโฆษณาสั้นๆ แล้วได้ของเต็มเรือ {n} ชิ้นทันที ขายต่อได้เลย',
  edgeT:'ถึงขอบดาวบ้านเกิดแล้ว!',edgeD:'น้องฟางพาขบวนเรือมาถึงขอบดาวดวงแรก ดาวลูกกวาดกำลังจะมาในอัปเดตหน้า ระหว่างนี้ค้าขายต่อได้เรื่อยๆ นะ',edgeOk:'ค้าขายต่อ',
  next:'ต่อไป',skip:'ข้าม',settings:'ตั้งค่า',sound:'เสียง',on:'เปิด',off:'ปิด',language:'ภาษา',howto:'วิธีเล่น',replayTut:'เล่นบทสอนอีกครั้ง',tutLater:'บทสอนจะเริ่มเมื่อกลับถึงท่า',
  tIntro:'สวัสดีจ้า หนูชื่อน้องฟาง! เราจะพายเรือตลาดน้ำไปขายของให้ชาวต่างดาวกัน',tLoad:'เลือกของใส่เรือก่อนนะ แตะปุ่ม ออกเรือ',tGo:'หนูใส่ผลไม้เต็มเรือให้แล้ว แตะ ออกเรือ! ได้เลย',
  tHold:'กดค้างไว้ที่จอ เรือจะพายเร็วขึ้น',tTap:'มีลูกค้ามาแล้ว! แตะต่างดาวเพื่อขายของ',tNice:'เก่งมาก! ขายเร็วได้ทิปด้วยนะ',tDock:'ถึงท่าแล้ว! แตะลูกค้ารัวๆ จะได้คอมโบ',
  tUp:'เอาเงินไปอัปเกรดเรือกันเถอะ',tUp2:'แตะปุ่มเหรียญเพื่ออัปเกรด',tDone:'พร้อมแล้ว ไปค้าขายกันเลย!',
  h1:'เลือกของใส่เรือ แล้วแตะ ออกเรือ',h2:'กดค้างที่จอเพื่อพายเร็วขึ้น',h3:'แตะต่างดาวที่บินมา เพื่อขายของตามที่เขาอยากได้ ขายเร็วได้ทิป',h4:'ถึงท่าแล้วแตะลูกค้ารัวๆ ได้คอมโบ เงินคูณเพิ่ม',h5:'เอาเหรียญไปอัปเกรดเรือ ปลดล็อกสินค้า จ้างลูกจ้าง',
  vip:'VIP',like:'ชอบ!',tip:'ทิป',gift:'ของขวัญ',
  nBoat:'เรือ',nStaff:'ลูกจ้าง',nGoods:'สินค้า',nShop:'ร้านดาว',nQuest:'ภารกิจ',nMap:'แผนที่',
  cotton:'สายไหมเมฆ',lolli:'อมยิ้มดาวรุ้ง',syrup:'ไซรัปดาวหวาน',donut:'โดนัทวงแหวน',
  planet3:'ดาวน้ำแข็งเรืองแสง',planet3d:'ปัดหลบก้อนน้ำแข็ง เก็บกล่องของลอยน้ำ',planet4:'ดาวป่ามรกต',planet4d:'แม่น้ำมีทางแยกให้เลือก กลางคืนมีหิ่งห้อย',travel:'ไปดาวนี้',routeDone:'ครบเส้นทางแล้ว',incomeX:'รายได้ x{n}',
  mapNote2:'ดาวดวงที่ 5 จะมาในอัปเดตถัดไป ความคืบหน้าของพี่จะเก็บไว้ครบ',
  ulT:'เส้นทางดาวบ้านเกิดครบแล้ว!',ulD:'น้องฟางพาขบวนเรือมาถึงขอบดาวดวงแรก ดาวลูกกวาดเปิดแล้ว! ของหวานราคาดี ลูกค้าหน้าใหม่รออยู่',ulGo:'ไปดาวลูกกวาด',ulStay:'อยู่ที่นี่ก่อน',
  arT:'ถึงดาวลูกกวาดแล้ว!',arD:'ชาวดาวลูกกวาดชอบของหวานมาก ขายสายไหมเมฆได้เลย แล้วปลดล็อกของหวานชิ้นใหม่ในหน้าสินค้า',arOk:'เริ่มค้าขาย!',arGift:'ของขวัญต้อนรับ',
  edge3T:'ครบเส้นทางดาวน้ำแข็งแล้ว!',edge3D:'เก่งมาก! ดาวมรกตกำลังจะมาในอัปเดตหน้า ระหว่างนี้ค้าขายต่อได้เรื่อยๆ นะ',
  warpTo:'กำลังเดินทางไป',
  shop:'ร้านแลกดาวม่วง',shopD:'ใช้ดาวม่วงแลกของถาวร ได้ดาวจากเลเวลอัป ดาวของขวัญ ภารกิจ และการไปถึงดาวใหม่',
  sBoost:'พลังถาวร',sFang:'ชุดน้องฟาง',sBoat:'สีเรือ',
  bInc:'ดาวนำโชค',bIncD:'รายได้ทั้งหมด +{n}%',bCap:'ท้องเรือดาว',bCapD:'บรรทุกเพิ่ม +{n} ชิ้น',bPat:'ชาหอมดาว',bPatD:'ลูกค้ารอนานขึ้น +{n}%',bRush:'ระฆังท่าเรือ',bRushD:'ช่วงขายที่ท่านานขึ้น +{n} วินาที',
  hat_none:'หมวกสานเดิม',hat_crown:'มงกุฎเจ้าหญิง',hat_bow:'โบว์ชมพูจุด',hat_star:'ที่คาดผมดาว',hat_wizard:'หมวกพ่อมดน้อย',
  boat_classic:'เรือไม้เดิม',boat_pink:'เรือชมพูลูกกวาด',boat_mint:'เรือมิ้นต์',boat_night:'เรือราตรี',
  wear:'ใส่',wearing:'ใส่อยู่',use:'ใช้',using:'ใช้อยู่',owned:'มีแล้ว',noGems:'ดาวม่วงยังไม่พอ',bought:'ได้ของใหม่แล้ว!',
  quests:'ภารกิจ',qDaily:'ภารกิจประจำวัน',qReset:'รีเซ็ตใน {t}',qAch:'ความสำเร็จ',qClaim:'รับ',qDone:'รับแล้ว',
  q_sell:'ขายของ {n} ชิ้น',q_combo:'ทำคอมโบให้ถึง {n}',q_trips:'พายเรือครบ {n} เที่ยว',q_gifts:'เก็บดาวของขวัญ {n} ดวง',q_tips:'ได้ทิป {n} ครั้ง',q_likes:'ขายของที่ลูกค้าชอบ {n} ชิ้น',q_dock:'ขายที่ท่าเรือ {n} ชิ้น',
  qDoneT:'ภารกิจสำเร็จ!',qRerollT:'เปลี่ยนภารกิจ',qRerollD:'ดูโฆษณาสั้นๆ แล้วเปลี่ยนภารกิจนี้เป็นภารกิจใหม่ (วันละ 1 ครั้ง)',q2xT:'รับรางวัลภารกิจ x2',q2xD:'ดูโฆษณาสั้นๆ แล้วรับรางวัลภารกิจนี้เป็นสองเท่า: {r}',
  reroll:'เปลี่ยน',x2:'x2',
  a_sold100:'ขายของครบ 100 ชิ้น',a_sold1000:'ขายของครบ 1,000 ชิ้น',a_sold10000:'ขายของครบ 10,000 ชิ้น',a_trips10:'พายเรือครบ 10 เที่ยว',a_trips50:'พายเรือครบ 50 เที่ยว',
  a_combo20:'ทำคอมโบ 20',a_planet2:'ไปถึงดาวลูกกวาด',a_staff2:'จ้างลูกจ้างครบ 2 คน',a_lvl10:'ถึงเลเวล 10',a_cos:'ซื้อชุดหรือสีเรือชิ้นแรก',a_earn:'หาเหรียญรวม 100K',a_quests:'ทำภารกิจครบ 10 อย่าง',
  snowcone:'น้ำแข็งไสเรืองแสง',cocoa:'โกโก้เกล็ดหิมะ',aurora:'ไอศกรีมแสงเหนือ',pearl:'ไข่มุกหิมะ',
  ul3T:'ครบเส้นทางดาวลูกกวาดแล้ว!',ul3D:'ดาวน้ำแข็งเรืองแสงเปิดแล้ว! แม่น้ำที่นั่นมีก้อนน้ำแข็งลอยมา ปัดซ้ายขวาหลบ แล้วเก็บกล่องของลอยน้ำด้วยนะ',ul3Go:'ไปดาวน้ำแข็ง',
  ar3T:'ถึงดาวน้ำแข็งเรืองแสงแล้ว!',ar3D:'ปัดซ้าย/ขวา หรือกดลูกศร เพื่อเปลี่ยนเลน หลบก้อนน้ำแข็งกับอุกกาบาต แล้วเก็บกล่องของลอยน้ำ ชนนิดหน่อยไม่เป็นไร แค่ช้าลงนิดเดียว',
  steerH:'ปัดซ้าย/ขวา หลบก้อนน้ำแข็ง',bumpT:'อุ๊ย!',grabT:'+{n} {g}',
  market:'ตลาดท่าเรือบ้าน',nMarket:'ตลาด',mkD:'สร้างร้านทีละร้าน ร้านจะหาเงินให้เรื่อยๆ แม้ตอนปิดเกม (สะสมได้สูงสุด 3 ชั่วโมง)',
  mkRate:'{n} เหรียญ / นาที',mkBank:'รายได้ตลาดรอเก็บ',mkCollect:'เก็บเงิน',mkBuild:'สร้าง',mkNeed:'สร้างร้านก่อนหน้าก่อนนะ',mkNone:'ยังไม่มีร้าน สร้างร้านแรกกันเลย',
  mkAdT:'รายได้ตลาด x2',mkAdD:'ดูโฆษณาสั้นๆ แล้วรับรายได้ตลาดก้อนนี้เป็นสองเท่า: {n} เหรียญ',mkReady:'ตลาดบ้านมีรายได้รอเก็บ',
  st_coffee:'ร้านกาแฟดาว',st_souv:'ร้านของที่ระลึก',st_repair:'อู่ซ่อมเรือ',st_smooth:'ร้านน้ำปั่นจักรวาล',st_lantern:'ร้านโคมและดอกไม้',
  pets:'เพื่อนตัวน้อย',nPet:'สัตว์เลี้ยง',petD:'แลกด้วยดาวม่วง แล้วเลือกพาขึ้นเรือได้ 1 ตัว แต่ละตัวมีพลังพิเศษ',
  pet_cat:'แมวต่างดาว',pet_octo:'หมึกจิ๋ว',pet_bird:'นกดาวตก',pd_cat:'คาบดาวของขวัญมาให้อัตโนมัติ',pd_octo:'ทิปเพิ่ม 50% และได้ทิปง่ายขึ้น',pd_bird:'ดาวของขวัญมาบ่อยขึ้น และได้ดาวม่วงบ่อยขึ้น',
  equip:'พาขึ้นเรือ',onboard:'อยู่บนเรือ',petNew:'ได้เพื่อนใหม่!',
  order:'ออเดอร์',orderDone:'ครบออเดอร์! +{n}',
  evT:'ฝนดาวตกสุดสัปดาห์!',evD:'ทุกวันเสาร์และอาทิตย์ ได้ดาวม่วงเป็นสองเท่า จากเลเวลอัป ดาวของขวัญ ภารกิจ ความสำเร็จ และการไปถึงดาวใหม่',evBanner:'ฝนดาวตก · ดาวม่วง x2',evOk:'เยี่ยมเลย!',
  h6:'ดาวน้ำแข็ง: ปัดซ้ายขวาหรือกดลูกศร หลบน้ำแข็ง เก็บกล่องของ',h7:'สร้างร้านในตลาดบ้าน ร้านหาเงินให้แม้ปิดเกม',h8:'สัตว์เลี้ยงนั่งไปบนเรือ ช่วยได้คนละแบบ',h9:'ต่างดาวบางตัวสั่งของ 2-3 อย่าง ส่งครบได้เงินเยอะ',
  a_planet3:'ไปถึงดาวน้ำแข็ง',a_orders:'ส่งออเดอร์ครบ 10 ใบ',
  planet5:'ดาวดวงต่อไป',edge4T:'ครบเส้นทางดาวป่ามรกตแล้ว!',edge4D:'เก่งมาก! ดาวดวงต่อไปกำลังสร้างอยู่ ระหว่างนี้ค้าขาย สะสมสติกเกอร์ และจับหิ่งห้อยต่อได้เลยนะ',
  ul4T:'ดาวป่ามรกตเปิดแล้ว!',ul4D:'แม่น้ำในป่ามีทางแยก! ทางหนึ่งปลอดภัยแต่ได้น้อย อีกทางลูกค้ารวยแต่มีขอนไม้ กลางคืนมีหิ่งห้อยให้จับไปแลกของพิเศษ',ul4Go:'ไปดาวป่ามรกต',
  ar4T:'ยินดีต้อนรับสู่ดาวป่ามรกต!',ar4D:'เจอทางแยกให้แตะปุ่มซ้าย/ขวา ปัด หรือกดลูกศร เพื่อเลือกทาง ทางลูกค้ารวยมีขอนไม้กับหนาม แตะเพื่อเก็บออก ตอนกลางคืนแตะหิ่งห้อยเพื่อสะสม',
  berry:'เบอร์รี่ป่า',honey:'น้ำผึ้งดอกไม้',glowshroom:'เห็ดเรืองแสง',emerald:'มรกตใบไม้',
  fkRich:'ทางลูกค้ารวย',fkSafe:'ทางปลอดภัย',fkPick:'ทางแยก! เลือกทาง',fkRichC:'ทางลูกค้ารวย · เงิน x1.8 · แตะขอนไม้',fkSafeC:'ทางปลอดภัย · เงิน x0.85',
  night:'กลางคืน · แตะหิ่งห้อย',ffGot:'หิ่งห้อย +{n}',ff:'หิ่งห้อย',
  sFire:'แลกด้วยหิ่งห้อย',sFireD:'จับหิ่งห้อยตอนกลางคืนบนดาวป่ามรกต แล้วนำมาแลกของพิเศษ',it_jar:'โหลแสงหิ่งห้อย',itd_jar:'รายได้ +25% ในเที่ยวถัดไป',it_lure:'เหยื่อทองคำ',itd_lure:'ต่างดาวสีทองมาบ่อยขึ้น 3 เท่าในเที่ยวถัดไป',
  have:'มี {n}',hat_leaf:'หมวกใบไม้',boat_forest:'เรือลายป่า',swapOk:'แลกของพิเศษแล้ว!',noFF:'หิ่งห้อยยังไม่พอ',jarOn:'โหลแสงทำงาน: รายได้ +25%',lureOn:'เหยื่อทองคำทำงาน: ต่างดาวสีทองมาบ่อยขึ้น',
  sTier:'ระดับเรือ',sUp:'อัปเกรด',tier1:'เรือพาย',tier2:'เรือหางยาว',tier3:'แพตลาดน้ำ',tierD:'บรรทุกได้ x{n}',tierNeed:'ต้องมีเรือหางยาวก่อน',current:'ใช้อยู่',
  book:'สมุดสะสมต่างดาว',nBook:'สมุด',bookD:'ขายของให้ต่างดาวแต่ละแบบเพื่อรับสติกเกอร์ ต่างดาวสีทองหายากมาก! สะสมครบหน้ารับรางวัล',pageClaim:'รับรางวัล',pageDone:'รับแล้ว',
  newSticker:'สติกเกอร์ใหม่!',goldSticker:'สติกเกอร์ทอง!',goldPage:'สติกเกอร์ทองครบหน้า',bookGold:'ทอง',
  login:'ของขวัญ 7 วัน',nGift:'ของขวัญ',loginD:'เข้ามาเล่นทุกวัน ของขวัญจะดีขึ้นเรื่อยๆ วันที่ 7 ได้กระต่ายป่าเป็นเพื่อนบนเรือ',
  loginRule:'กติกา: ถ้าขาดไป 1 วันขึ้นไป จะถอยกลับ 2 วัน (ไม่ต่ำกว่าวันที่ 1) ไม่ต้องเริ่มใหม่ทั้งหมด นับวันตามเวลาในเครื่องของพี่',
  day:'วันที่ {n}',claimGift:'รับของขวัญ',loginX2:'ดูโฆษณา รับ x2',loginAdD:'ของขวัญวันนี้: {r} · ดูโฆษณาสั้นๆ รับเป็นสองเท่า',loginToday:'ของขวัญวันนี้: {r}',
  comeBack:'พรุ่งนี้มารับของขวัญวันที่ {n} นะ',loginBack:'ห่างหายไปหลายวัน ถอยกลับ 2 วันนะ ไม่เป็นไร!',
  pet_bunny:'กระต่ายป่า',pd_bunny:'จับหิ่งห้อยได้ทีละ 2 ตัว',petLogin:'รางวัลวันที่ 7',
  h10:'ดาวป่ามรกต: เจอทางแยกให้เลือกทาง ทางรวยได้เงิน x1.8 แต่มีขอนไม้ แตะเพื่อเก็บออก',h11:'กลางคืนบนดาวป่า แตะหิ่งห้อยเพื่อสะสม แล้วแลกของพิเศษในร้านดาวม่วง',
  h12:'ขายของให้ต่างดาวแต่ละแบบเพื่อเก็บสติกเกอร์ ต่างดาวสีทองหายากมาก',h13:'อัปเกรดเรือเป็นเรือหางยาวและแพตลาดน้ำ บรรทุกได้มากขึ้น',h14:'เข้าเล่นทุกวันรับของขวัญ 7 วัน ขาดวันถอยกลับแค่ 2 วัน',
  a_planet4:'ไปถึงดาวป่ามรกต',a_book10:'สะสมสติกเกอร์ 10 แบบ',
  achT:'ปลดล็อกความสำเร็จ!',resume:'ไปต่อจากเที่ยวเดิม'},
 en:{title:'Star River Market',subtitle:'Paddle and sell goods to cute aliens',tapStart:'Tap to start',boat:'Boat',staff:'Staff',goods:'Goods',map:'Map',
  fruit:'Glow Fruit',candy:'Star Candy',jelly:'Nebula Jelly',crystal:'Cosmic Crystal',
  lv:'Lv',unlock:'Unlock',max:'MAX',hire:'Hire',
  upCap:'Bigger Hold',upCapD:'Carries {n} items',upSpd:'Star Paddle',upSpdD:'Boat speed x{n}',upPat:'Cozy Lantern',upPatD:'Customers wait {n}s',
  staff1:'Paddle Pal',staff2:'Oar Buddy',staffDesc:'Paddles behind you, sells every {t}s',staffHireDesc:'Joins your convoy and sells, even while the game is closed',
  goodsDesc:'Sells for {p} coins',goodsLockDesc:'Unlock it to load it on your boat',likes:'Loved by:',
  planet1:'Home Star',planet1d:'Your very first market',here:'You are here',planet2:'Candy Planet',planet2d:'Folks here love sweets',soon:'Coming soon',
  mapNote:'New planets arrive in the next update. Your progress is kept.',route:'Route {a}/{b} trips',
  watch:'Watch',noThanks:'No thanks',
  adLabel:'Sample ad (test)',adWait:'Please wait for your reward',adDone:'Reward ready',claim:'Claim',adEarly:'Closed early, so no reward this time',
  wbT:'Welcome back!',wbD:'While you were away your staff sold',wbClaim:'Collect',wbX2:'Watch ad for x2',wbAdD:'Watch a short ad to double this amount',
  noCoins:'Not enough coins',levelUp:'Level up! +{g} stars',gemSoon:'Stars can be spent in the next update',
  adLimit:'No ad right now, try again later',minutes:'{m} min',
  setoff:'Set off!',tripN:'Trip {n}',loadT:'Load your boat',loadD:'On board {a}/{b}',fill:'Fill up',clear:'Clear',
  hold:'Hold the screen = paddle faster',docking:'Docked!',rush:'Tap customers fast!',combo:'Combo {n}',
  noStock:'No {g} on board',empty:'Boat is empty',
  sumT:'Arrived!',sumSold:'Sold',sumTips:'Tips',sumCombo:'Best combo',sumCoins:'Coins this trip',pcs:'{n}',
  sumAd:'Watch a short ad to get {n} more coins for this trip',sumX2:'Watch ad for x2',sumOk:'Collect',
  vipBtn:'VIP',vipT:'Call a VIP customer',vipD:'Watch a short ad and a VIP comes to buy, paying {n} coins without using your stock',
  rsBtn:'Restock',rsT:'Free full restock',rsD:'Watch a short ad to refill your boat with {n} items right now',
  edgeT:'You reached the edge of Home Star!',edgeD:'Fang led the convoy to the edge of the first planet. Candy Planet is coming in the next update. Keep trading in the meantime!',edgeOk:'Keep trading',
  next:'Next',skip:'Skip',settings:'Settings',sound:'Sound',on:'On',off:'Off',language:'Language',howto:'How to play',replayTut:'Replay tutorial',tutLater:'Tutorial starts when you are back at port',
  tIntro:'Hi! I am Fang. Let us paddle our floating market and sell goods to aliens!',tLoad:'First load your boat. Tap Set off',tGo:'I filled the boat with fruit. Tap Set off!',
  tHold:'Hold the screen to paddle faster',tTap:'A customer! Tap the alien to sell',tNice:'Great! Quick sales earn tips',tDock:'Docked! Tap customers fast for combos',
  tUp:'Let us spend coins on boat upgrades',tUp2:'Tap a coin button to upgrade',tDone:'All set, let us go trading!',
  h1:'Pick goods to load, then tap Set off',h2:'Hold the screen to paddle faster',h3:'Tap flying aliens to sell what they want. Quick sales earn tips',h4:'At docks tap customers fast for a combo multiplier',h5:'Spend coins on upgrades, new goods and staff',
  vip:'VIP',like:'Love it!',tip:'Tip',gift:'Gift',
  nBoat:'Boat',nStaff:'Staff',nGoods:'Goods',nShop:'Shop',nQuest:'Quests',nMap:'Map',
  cotton:'Cloud Floss',lolli:'Rainbow Lolly',syrup:'Star Syrup',donut:'Ring Donut',
  planet3:'Glow Ice Planet',planet3d:'Dodge ice blocks, grab floating crates',planet4:'Emerald Forest',planet4d:'Pick a river branch, catch fireflies at night',travel:'Travel',routeDone:'Route complete',incomeX:'Income x{n}',
  mapNote2:'Planet 5 arrives in the next update. Your progress is kept.',
  ulT:'Home Star route complete!',ulD:'Fang led the convoy to the edge of the first planet. Candy Planet is open! Sweets sell for more and new customers are waiting',ulGo:'Go to Candy Planet',ulStay:'Stay here for now',
  arT:'Welcome to Candy Planet!',arD:'Folks here love sweets. Start with Cloud Floss, then unlock new treats in Goods',arOk:'Start trading!',arGift:'Welcome gift',
  edge3T:'Glow Ice route complete!',edge3D:'Amazing! Emerald Planet is coming in the next update. Keep trading in the meantime!',
  warpTo:'Travelling to',
  shop:'Star-Gem Shop',shopD:'Spend purple stars on permanent perks. Earn them from level-ups, gift stars, quests and new planets',
  sBoost:'Permanent boosts',sFang:'Fang outfits',sBoat:'Boat colours',
  bInc:'Lucky Star',bIncD:'All income +{n}%',bCap:'Star Hold',bCapD:'Carry +{n} more items',bPat:'Star Tea',bPatD:'Customers wait +{n}% longer',bRush:'Dock Bell',bRushD:'Dock rush lasts +{n}s',
  hat_none:'Straw hat',hat_crown:'Princess Crown',hat_bow:'Polka Bow',hat_star:'Star Headband',hat_wizard:'Little Wizard Hat',
  boat_classic:'Classic wood',boat_pink:'Candy Pink',boat_mint:'Mint',boat_night:'Night Sky',
  wear:'Wear',wearing:'Wearing',use:'Use',using:'In use',owned:'Owned',noGems:'Not enough stars',bought:'New item!',
  quests:'Quests',qDaily:'Daily quests',qReset:'Resets in {t}',qAch:'Achievements',qClaim:'Claim',qDone:'Claimed',
  q_sell:'Sell {n} items',q_combo:'Reach a {n} combo',q_trips:'Finish {n} trips',q_gifts:'Catch {n} gift stars',q_tips:'Earn {n} tips',q_likes:'Sell {n} loved items',q_dock:'Sell {n} items at docks',
  qDoneT:'Quest complete!',qRerollT:'Swap quest',qRerollD:'Watch a short ad to swap this quest for a new one (once a day)',q2xT:'Double quest reward',q2xD:'Watch a short ad to get this quest reward twice: {r}',
  reroll:'Swap',x2:'x2',
  a_sold100:'Sell 100 items',a_sold1000:'Sell 1,000 items',a_sold10000:'Sell 10,000 items',a_trips10:'Finish 10 trips',a_trips50:'Finish 50 trips',
  a_combo20:'Reach a 20 combo',a_planet2:'Reach Candy Planet',a_staff2:'Hire both staff',a_lvl10:'Reach level 10',a_cos:'Buy your first outfit or boat colour',a_earn:'Earn 100K coins in total',a_quests:'Complete 10 quests',
  snowcone:'Glow Snow Cone',cocoa:'Snowflake Cocoa',aurora:'Aurora Sundae',pearl:'Snow Pearl',
  ul3T:'Candy Planet route complete!',ul3D:'Glow Ice Planet is open! Ice blocks drift down its river. Swipe left and right to dodge them and grab the floating crates',ul3Go:'Go to Ice Planet',
  ar3T:'Welcome to Glow Ice Planet!',ar3D:'Swipe left/right or press the arrow keys to change lanes. Dodge ice and meteors and grab floating crates. A bump only slows you a little',
  steerH:'Swipe left/right to dodge the ice',bumpT:'Oops!',grabT:'+{n} {g}',
  market:'Home Port Market',nMarket:'Market',mkD:'Build stalls one by one. They earn coins even while the game is closed (stores up to 3 hours)',
  mkRate:'{n} coins / min',mkBank:'Market earnings',mkCollect:'Collect',mkBuild:'Build',mkNeed:'Build the previous stall first',mkNone:'No stalls yet. Build your first one!',
  mkAdT:'Market earnings x2',mkAdD:'Watch a short ad to get these market earnings twice: {n} coins',mkReady:'Your home market has coins to collect',
  st_coffee:'Star Coffee',st_souv:'Souvenir Stall',st_repair:'Boat Repair',st_smooth:'Cosmic Smoothies',st_lantern:'Lanterns & Flowers',
  pets:'Little Pets',nPet:'Pets',petD:'Trade purple stars for a pet, then take one along on your boat. Each has a special power',
  pet_cat:'Alien Cat',pet_octo:'Tiny Octopus',pet_bird:'Shooting-Star Bird',pd_cat:'Catches gift stars for you',pd_octo:'+50% tips, and tips are easier to earn',pd_bird:'More gift stars and more purple-star drops',
  equip:'Take along',onboard:'On board',petNew:'New friend!',
  order:'Order',orderDone:'Order complete! +{n}',
  evT:'Weekend Meteor Shower!',evD:'Every Saturday and Sunday, purple stars are doubled from level-ups, gift stars, quests, achievements and new planets',evBanner:'Meteor shower · Stars x2',evOk:'Awesome!',
  h6:'Ice Planet: swipe or use arrow keys to dodge ice and grab crates',h7:'Build stalls in your home market. They earn even while you are away',h8:'Pets ride on your boat and help in their own way',h9:'Some aliens order 2-3 items. Deliver them all for a big payout',
  a_planet3:'Reach Glow Ice Planet',a_orders:'Complete 10 orders',
  planet5:'The Next Planet',edge4T:'Emerald Forest route complete!',edge4D:'Amazing! The next planet is still being built. Keep trading, collecting stickers and catching fireflies!',
  ul4T:'Emerald Forest is open!',ul4D:'The forest river splits in two! One branch is safe but pays less, the other has rich customers and floating logs. At night, catch fireflies and trade them for special items',ul4Go:'Go to Emerald Forest',
  ar4T:'Welcome to Emerald Forest!',ar4D:'At a fork, tap the left/right buttons, swipe, or press the arrow keys to pick a branch. The rich branch has logs and thorns: tap them away. At night, tap fireflies to collect them',
  berry:'Wild Berries',honey:'Flower Honey',glowshroom:'Glow Mushroom',emerald:'Leaf Emerald',
  fkRich:'Rich customers',fkSafe:'Safe branch',fkPick:'A fork! Pick a branch',fkRichC:'Rich branch · Pay x1.8 · Tap logs',fkSafeC:'Safe branch · Pay x0.85',
  night:'Night · Tap the fireflies',ffGot:'Firefly +{n}',ff:'Fireflies',
  sFire:'Firefly trades',sFireD:'Catch fireflies at night on Emerald Forest and trade them for special items',it_jar:'Firefly Jar',itd_jar:'+25% income on your next trip',it_lure:'Golden Lure',itd_lure:'Golden aliens 3x more often on your next trip',
  have:'Have {n}',hat_leaf:'Leaf Hat',boat_forest:'Forest Boat',swapOk:'Special item traded!',noFF:'Not enough fireflies',jarOn:'Firefly Jar on: +25% income',lureOn:'Golden Lure on: more golden aliens',
  sTier:'Boat class',sUp:'Upgrades',tier1:'Paddle Boat',tier2:'Long-tail Boat',tier3:'Floating Market Raft',tierD:'Cargo x{n}',tierNeed:'Get the Long-tail Boat first',current:'In use',
  book:'Alien Sticker Book',nBook:'Book',bookD:'Sell to each kind of alien to get its sticker. Golden aliens are very rare! Complete a page for a reward',pageClaim:'Claim',pageDone:'Claimed',
  newSticker:'New sticker!',goldSticker:'Golden sticker!',goldPage:'Golden page complete',bookGold:'Gold',
  login:'7-Day Gifts',nGift:'Gifts',loginD:'Play every day and the gifts get better. Day 7 brings a Forest Bunny to ride on your boat',
  loginRule:'Rule: if you miss a day or more, you step back 2 days (never below Day 1), not all the way to the start. Days follow your device clock',
  day:'Day {n}',claimGift:'Claim gift',loginX2:'Watch ad, get x2',loginAdD:'Today\'s gift: {r} · Watch a short ad to get it twice',loginToday:'Today\'s gift: {r}',
  comeBack:'Come back tomorrow for Day {n}',loginBack:'You were away a while, so you stepped back 2 days. No worries!',
  pet_bunny:'Forest Bunny',pd_bunny:'Catches 2 fireflies at a time',petLogin:'Day 7 gift',
  h10:'Emerald Forest: pick a branch at each fork. The rich branch pays x1.8 but has logs. Tap them away',h11:'At night in the forest, tap fireflies to collect them, then trade them in the star shop',
  h12:'Sell to each kind of alien to fill your sticker book. Golden aliens are very rare',h13:'Upgrade to the Long-tail Boat and the Floating Market Raft to carry more',h14:'Play daily for 7-day gifts. Missing a day only steps you back 2 days',
  a_planet4:'Reach Emerald Forest',a_book10:'Collect 10 stickers',
  achT:'Achievement unlocked!',resume:'Resume your trip'}
};
function t(k,v){var s=(T[S.lang]||T.th)[k];if(s==null)s=T.th[k]||k;if(v)for(var x in v)s=s.split('{'+x+'}').join(v[x]);return s;}
// living characters: friendship levels + personalities
Object.assign(T.th,{fr0:'คนแปลกหน้า',fr1:'คนรู้จัก',fr2:'ขาประจำ',fr3:'เพื่อนซี้',frUp:'สนิทกันขึ้นแล้ว: {l}!',frGift:'ของขวัญ! +{n}',gemW:'เพชร',frD:'ขายให้บ่อยๆ แล้วจะสนิทกันขึ้น ขาประจำจะทักทาย ให้ทิปเพิ่ม และบางทีก็มีของขวัญ',
  p_curious:'ขี้สงสัย',p_lonely:'ขี้เหงา',p_impatient:'ใจร้อน',p_sweet:'ติดหวาน',p_shy:'ขี้อาย',p_showoff:'ขี้อวด',p_dreamy:'ช่างฝัน',p_jolly:'ใจดี',p_wise:'สุขุม',p_fiery:'ใจร้อนแต่น่ารัก'});
Object.assign(T.en,{fr0:'Stranger',fr1:'Acquaintance',fr2:'Regular',fr3:'Best friend',frUp:'Friendship up: {l}!',frGift:'Gift! +{n}',gemW:'gems',frD:'Serve them often to become friends. Regulars greet you, tip extra and sometimes bring gifts.',
  p_curious:'Curious',p_lonely:'Lonely',p_impatient:'Impatient',p_sweet:'Sweet tooth',p_shy:'Shy',p_showoff:'Show-off',p_dreamy:'Dreamy',p_jolly:'Jolly',p_wise:'Wise',p_fiery:'Fiery'});
Object.assign(T.th,{planet5:'ดาวภูเขาไฟลาวา',planet5d:'ของร้อนขายไวได้ราคาเต็ม แตะฟองลาวาก่อนเรือชน',
  lavasoup:'ซุปลาวา',potato:'มันเผาดวงดาว',lavacake:'เค้กลาวา',meteorbun:'ซาลาเปาอุกกาบาต',
  mapNote2:'อยากเริ่มใหม่ให้รวยกว่าเดิม? ใช้ “เริ่มตำนานใหม่” ด้านล่าง',
  ul5T:'ดาวภูเขาไฟลาวาเปิดแล้ว!',ul5D:'ของที่นั่นร้อนๆ อร่อยๆ ยิ่งขายไว ยิ่งได้ราคาเต็ม ระวังฟองลาวาในแม่น้ำ แตะให้แตกก่อนเรือชนนะ',ul5Go:'ไปดาวลาวา',
  ar5T:'ยินดีต้อนรับสู่ดาวภูเขาไฟลาวา!',ar5D:'ของร้อนมีแถบความร้อน ค่อยๆ เย็นลงระหว่างทาง ขายตอนยังร้อนได้ราคาเต็ม ถึงท่าแล้วเตาลาวาอุ่นให้ใหม่ แตะฟองลาวาให้แตกได้เหรียญ',
  edge5T:'ครบเส้นทางดาวลาวาแล้ว!',edge5D:'สุดยอด! ค้าขายครบทั้ง 5 ดาวแล้ว อยากเริ่มตำนานใหม่ไหม? ได้ดาวตำนานเพิ่มรายได้ถาวร ส่วนชุด สัตว์เลี้ยง สติกเกอร์ และมงกุฎเก็บไว้ครบ',edgeLegend:'ดูเริ่มตำนานใหม่',
  stoveT:'เตาลาวาอุ่นของให้แล้ว!',popT:'ป๊อป!',hotT:'ร้อนจัง!',heat:'ความร้อน',
  h15:'ดาวลาวา: ของร้อนเย็นลงระหว่างทาง ขายไวได้ราคาเต็ม แตะฟองลาวาให้แตก',h16:'พระราชามาเที่ยวสุดท้ายของเส้นทาง ส่งของครบทันเวลาได้มงกุฎ',h17:'เริ่มตำนานใหม่: เริ่มเส้นทางใหม่ ได้ดาวตำนานเพิ่มรายได้ถาวร',
  king1:'ราชาดาวบ้านเกิด',king2:'ราชาลูกกวาด',king3:'ราชาหิมะ',king4:'ราชาเห็ดป่า',king5:'ราชามังกรลาวา',
  kingSoon:'เที่ยวนี้พระราชาจะมา! เก็บของไว้ในตะกร้าหลวงแล้ว',kingT:'ออเดอร์หลวง',kingTap:'แตะพระราชา หรือปุ่มของที่พระราชาชี้',
  kingWin:'ได้มงกุฎแล้ว!',kingWinD:'{k}พอใจมาก! มอบมงกุฎและรางวัลใหญ่ให้',kingWin2D:'{k}พอใจมาก! ได้รางวัลใหญ่อีกแล้ว',kingFail:'หมดเวลาแล้ว ไม่เป็นไรนะ',kingFailD:'{k}จะกลับมาอีกในเที่ยวหน้า ของที่ส่งไปแล้วได้เงินครบ',
  kingOk:'เยี่ยมเลย!',kingRetry:'ไว้ลองใหม่',kingAdT:'ขอเวลาเพิ่ม 10 วินาที',kingAdD:'ดูโฆษณาสั้นๆ แล้วได้เวลาส่งของให้พระราชาเพิ่ม 10 วินาที',kingAdBtn:'+10 วิ',
  crowns:'มงกุฎพระราชา',crownN:'มงกุฎ {n}/5',kingDue:'มาเที่ยวนี้',kingNext:'มาอีก {n} เที่ยว',kingRoute:'มาเที่ยวสุดท้าย',kingWrong:'ไม่ใช่อันนี้',
  legend:'เริ่มตำนานใหม่',legendD:'เริ่มเส้นทางใหม่ตั้งแต่ดาวบ้านเกิด แลกเป็นดาวตำนาน เพิ่มรายได้ถาวรทุกดาว',legendNeed:'เปิดเมื่อไปถึงดาวลาวา หรือเลเวล 40',
  legendStars:'ดาวตำนาน',legendGet:'จะได้ดาวตำนาน +{n}',legendHave:'ดาวตำนาน {n} ดวง · รายได้ +{p}%',legendResets:'เริ่มใหม่',legendKeeps:'เก็บไว้ครบ',
  lr1:'เหรียญ และเลเวล',lr2:'อัปเกรดเรือ สินค้า และลูกจ้าง',lr3:'ร้านในตลาดบ้าน',lr4:'เส้นทางและดาว (เริ่มที่ดาวบ้านเกิด)',lr5:'เรือหางยาว (ซื้อด้วยเหรียญ)',
  lk1:'ดาวม่วง และพลังถาวรจากร้านดาว',lk2:'ชุดน้องฟาง สีเรือ และสัตว์เลี้ยง',lk3:'สมุดสติกเกอร์ ความสนิท และมงกุฎ',lk4:'ความสำเร็จ ของขวัญ 7 วัน หิ่งห้อย',lk5:'แพตลาดน้ำ (ซื้อด้วยดาวม่วง)',
  legendGo:'เริ่มตำนานใหม่!',legendNo:'ยังก่อน',legendDone:'ตำนานบทที่ {n} เริ่มแล้ว!',legendPerk:'พลังพิเศษของดาวตำนาน',
  pk3:'3 ดาว: เริ่มพร้อมน้องพาย 1 คน',pk10:'10 ดาว: เรือเร็วขึ้น (ความเร็ว เลเวล 3)',pk20:'20 ดาว: เริ่มด้วย 25K เหรียญ',legendLv:'ตำนานบทที่ {n}',
  vMusic:'เพลง',vSfx:'เสียงเอฟเฟกต์',vVoice:'เสียงพากย์',credits:'เครดิต',creditsD:'เกมนี้สร้างโดย Kairon Arcade ภาพ เพลง และเสียงเอฟเฟกต์เป็นของเราเอง เสียงพากย์ภาษาไทยจาก VachanaTTS (MIT) ฟอนต์ Kanit (OFL)',creditsFile:'อ่านเครดิตฉบับเต็ม',
  loading:'กำลังโหลด… {n}%',a_planet5:'ไปถึงดาวภูเขาไฟลาวา',a_crown1:'ได้มงกุฎพระราชา 1 อัน',a_crown5:'ได้มงกุฎครบ 5 ดาว',a_legend1:'เริ่มตำนานใหม่ครั้งแรก'});
Object.assign(T.en,{planet5:'Lava Volcano Planet',planet5d:'Sell hot goods fast for full price; pop lava bubbles',
  lavasoup:'Lava Soup',potato:'Star Roast Potato',lavacake:'Lava Cake',meteorbun:'Meteor Bun',
  mapNote2:'Want to start over even richer? Use “New Legend” below.',
  ul5T:'Lava Volcano Planet is open!',ul5D:'Everything there is piping hot. Sell fast for full price, and tap the lava bubbles in the river before the boat bumps them.',ul5Go:'Go to Lava Planet',
  ar5T:'Welcome to Lava Volcano Planet!',ar5D:'Hot goods have a heat bar that cools during the trip. Sell while hot for full price; the lava stove at each dock warms them up again. Pop lava bubbles for coins.',
  edge5T:'Lava route complete!',edge5D:'Amazing! You have traded on all 5 planets. Start a New Legend? Legend Stars raise your income for good, and you keep outfits, pets, stickers and crowns.',edgeLegend:'See New Legend',
  stoveT:'The lava stove warmed your goods!',popT:'Pop!',hotT:'Hot hot!',heat:'Heat',
  h15:'Lava Planet: hot goods cool on the way. Sell fast for full price and pop the lava bubbles.',h16:'A king visits on the last trip of each route. Deliver the whole order in time for a crown.',h17:'New Legend: start the routes again and earn Legend Stars for permanent income.',
  king1:'Home Star King',king2:'Candy King',king3:'Snow King',king4:'Mushroom King',king5:'Lava Dragon King',
  kingSoon:'A king visits this trip! The royal basket is packed.',kingT:'Royal order',kingTap:'Tap the king, or the good the king points at',
  kingWin:'Crown won!',kingWinD:'The {k} is delighted and gives you a crown and a big reward!',kingWin2D:'The {k} is delighted! Another big reward.',kingFail:'Time is up, no worries',kingFailD:'The {k} will come back next trip. You were paid for everything delivered.',
  kingOk:'Great!',kingRetry:'Try again later',kingAdT:'10 more seconds',kingAdD:'Watch a short ad to get 10 more seconds for the royal order.',kingAdBtn:'+10 s',
  crowns:'Royal crowns',crownN:'Crowns {n}/5',kingDue:'visits this trip',kingNext:'visits in {n} trips',kingRoute:'visits on the last trip',kingWrong:'Not that one',
  legend:'New Legend',legendD:'Start the routes again from Home Star and earn Legend Stars: permanent income on every planet.',legendNeed:'Opens at Lava Planet or level 40',
  legendStars:'Legend Stars',legendGet:'You will earn +{n} Legend Stars',legendHave:'{n} Legend Stars · income +{p}%',legendResets:'Starts over',legendKeeps:'You keep',
  lr1:'Coins and level',lr2:'Boat, goods and staff upgrades',lr3:'Home market stalls',lr4:'Routes and planets (back to Home Star)',lr5:'Long-tail boat (bought with coins)',
  lk1:'Star gems and permanent gem-shop boosts',lk2:'Fang outfits, boat colours and pets',lk3:'Sticker book, friendships and crowns',lk4:'Achievements, 7-day gifts, fireflies',lk5:'Floating-market raft (bought with gems)',
  legendGo:'Start New Legend!',legendNo:'Not yet',legendDone:'Legend chapter {n} begins!',legendPerk:'Legend perks',
  pk3:'3 stars: start with one paddler hired',pk10:'10 stars: faster boat (speed level 3)',pk20:'20 stars: start with 25K coins',legendLv:'Legend chapter {n}',
  vMusic:'Music',vSfx:'Sound effects',vVoice:'Voice',credits:'Credits',creditsD:'Made by Kairon Arcade. Art, music and sound effects are our own. Thai voice by VachanaTTS (MIT). Font: Kanit (OFL).',creditsFile:'Read the full credits',
  loading:'Loading… {n}%',a_planet5:'Reach Lava Volcano Planet',a_crown1:'Win a royal crown',a_crown5:'Win all 5 crowns',a_legend1:'Start your first New Legend'});

// ---------- config ----------
var GOODS=[
 {id:'fruit',  base:4,   unlock:0,     img:'g_fruit'},
 {id:'candy',  base:15,  unlock:350,   img:'g_candy'},
 {id:'jelly',  base:60,  unlock:3000,  img:'g_jelly'},
 {id:'crystal',base:250, unlock:25000, img:'g_crystal'}
];
GOODS.push({id:'cotton',base:40,unlock:0,img:'g_cotton',pl:2},{id:'lolli',base:150,unlock:9000,img:'g_lolli',pl:2},
  {id:'syrup',base:600,unlock:70000,img:'g_syrup',pl:2},{id:'donut',base:2500,unlock:450000,img:'g_donut',pl:2});
GOODS.push({id:'snowcone',base:320,unlock:0,img:'g_snowcone',pl:3},{id:'cocoa',base:1200,unlock:150000,img:'g_cocoa',pl:3},
  {id:'aurora',base:4800,unlock:1200000,img:'g_aurora',pl:3},{id:'pearl',base:19000,unlock:8000000,img:'g_pearl',pl:3});
GOODS.push({id:'berry',base:1500,unlock:0,img:'g_berry',pl:4},{id:'honey',base:6000,unlock:600000,img:'g_honey',pl:4},
  {id:'glowshroom',base:24000,unlock:5000000,img:'g_glowshroom',pl:4},{id:'emerald',base:95000,unlock:30000000,img:'g_emerald',pl:4});
GOODS.push({id:'lavasoup',base:8000,unlock:0,img:'g_lavasoup',pl:5,hot:1},{id:'potato',base:32000,unlock:3000000,img:'g_potato',pl:5,hot:1},
  {id:'lavacake',base:130000,unlock:25000000,img:'g_lavacake',pl:5,hot:1},{id:'meteorbun',base:520000,unlock:180000000,img:'g_meteorbun',pl:5,hot:1});
GOODS.forEach(function(g){if(!g.pl)g.pl=1;});
var ALIENS1=[{img:'alien_blue',likes:['fruit','crystal']},{img:'alien_green',likes:['jelly']},{img:'alien_pink',likes:['candy']}];
var ALIENS2=[{img:'alien_gummy',likes:['cotton','donut']},{img:'alien_marsh',likes:['lolli']},{img:'alien_choco',likes:['syrup']}];
var ALIENS3=[{img:'alien_snow',likes:['snowcone','pearl']},{img:'alien_icejel',likes:['aurora']},{img:'alien_peng',likes:['cocoa']}];
var ALIENS4=[{img:'alien_shroom',likes:['berry','honey']},{img:'alien_leaf',likes:['glowshroom']},{img:'alien_frog',likes:['emerald']}];
var ALIENS5=[{img:'alien_magma',likes:['lavasoup','meteorbun']},{img:'alien_ember',likes:['potato']},{img:'alien_pebble',likes:['lavacake']}];
// planets: own look, customers, goods, route length and income multiplier
var PLANETS={
 1:{n:1,name:'planet1',desc:'planet1d',icon:'i_map',aliens:ALIENS1,vip:'alien_pink',trips:8,len:360,mul:1,music:'music',
    bg:'bg_space',isl:'islet',stall:'stall',river:['rgba(190,170,255,0.75)','rgba(110,90,220,0.82)','rgba(60,40,160,0.9)'],shine:'#8f7dff',bank:'#d9ccff',flow:['#c9b6ff','#8fd0ff','#ffffff'],glow:'lav',rip:'#e4dcff'},
 2:{n:2,name:'planet2',desc:'planet2d',icon:'i_planet2',aliens:ALIENS2,vip:'alien_marsh',trips:12,len:420,mul:1.25,music:'music_candy',
    bg:'bg_candy',isl:'cislet',stall:'stall_candy',river:['rgba(255,226,244,0.82)','rgba(255,160,214,0.86)','rgba(190,96,190,0.92)'],shine:'#ffe0f6',bank:'#fff4fb',flow:['#ffffff','#c6ffe9','#ffd1f0'],glow:'warm',rip:'#fff6fb'},
 3:{n:3,name:'planet3',desc:'planet3d',icon:'i_ice',aliens:ALIENS3,vip:'alien_yeti',trips:14,len:460,mul:1.6,music:'music_ice',lanes:true,
    bg:'bg_ice',isl:'iislet',stall:'stall_ice',river:['rgba(225,250,255,0.82)','rgba(130,215,245,0.86)','rgba(60,130,205,0.92)'],shine:'#e8fbff',bank:'#ffffff',flow:['#ffffff','#bff4ff','#d9ccff'],glow:'cyan',rip:'#f2fdff'},
 4:{n:4,name:'planet4',desc:'planet4d',icon:'i_forest',aliens:ALIENS4,vip:'alien_owl',trips:16,len:480,mul:2,music:'music_forest',fork:true,
    bg:'bg_forest',isl:'fislet',stall:'stall_forest',river:['rgba(210,255,225,0.8)','rgba(90,200,150,0.86)','rgba(30,110,100,0.92)'],shine:'#e6ffe9',bank:'#f4fff0',flow:['#ffffff','#c9ffb8','#fff3a6'],glow:'green',rip:'#effff2'},
 5:{n:5,name:'planet5',desc:'planet5d',icon:'i_lava',aliens:ALIENS5,vip:'alien_sala',trips:18,len:500,mul:2.6,music:'music_lava',lava:true,
    bg:'bg_lava',isl:'lislet',stall:'stall_lava',river:['rgba(255,236,200,0.84)','rgba(255,160,96,0.88)','rgba(178,70,96,0.92)'],shine:'#fff0d6',bank:'#fff6ea',flow:['#ffffff','#ffe2a0','#ffc4d6'],glow:'warm',rip:'#fff4e6'}
};
// stage 5: one king per planet (big royal order at the end of the route, then every few trips)
var KINGS={1:{img:'king1',pers:'jolly'},2:{img:'king2',pers:'sweet'},3:{img:'king3',pers:'dreamy'},4:{img:'king4',pers:'wise'},5:{img:'king5',pers:'fiery'}};
var KING_EVERY=6,KING_GEMS=15;
// stage 4: boat classes (each has its own empty-deck art; cargo is drawn from what is really on board)
// hx/hy/s/ar: hat anchor transform from the original boat art; pets: per-pet anchors; slots: cargo spots; lan: lantern glow
var TIERS=[
 {id:1,img:'boat_t1',ar:437/593,sz:1.0,capM:1,hx:.58,hy:.025,s:1.0,lan:[.14,.7],cw:.15,slots:[[.3,.62],[.42,.6],[.2,.58]],pets:{bird:[.08,.6]},ps:1},
 {id:2,img:'boat_t2',ar:386/594,sz:1.1,capM:1.35,cost:250000,cur:'coin',hx:.28,hy:.09,s:.85,lan:[.47,.5],cw:.12,slots:[[.48,.7],[.6,.7],[.72,.66],[.83,.6]],
   pets:{cat:[.84,.52],octo:[.62,.66],bird:[.93,.12],bunny:[.84,.52]},ps:.85},
 {id:3,img:'boat_t3',ar:504/568,sz:1.05,capM:1.8,cost:120,cur:'gem',hx:.655,hy:.255,s:.80,lan:[.08,.42],cw:.13,slots:[[.18,.78],[.3,.8],[.42,.82],[.55,.84],[.3,.66]],
   pets:{cat:[.42,.68],octo:[.2,.72],bird:[.33,.1],bunny:[.44,.7]},ps:.82}];
function tierOf(n){return TIERS[Math.max(1,Math.min(3,n||((typeof S!=='undefined'&&S&&S.tier)||1)))-1];}
function boatImg(skin,tn){var T=tierOf(tn);return T.img+(skin&&skin!=='classic'?'_'+skin:'');}
function hatPos(ht,T){return {x:T.hx+(ht.x-.585)*T.s,y:T.hy+(ht.y-.02)*.7375*T.s/T.ar,w:ht.w*T.s};}
function petPos(pet,T){var a=T.pets&&T.pets[pet.id];return a?{x:a[0],y:a[1],w:pet.w*T.ps}:{x:pet.x,y:pet.y,w:pet.w};}
// sticker book: every kind of alien on every planet (golden twins are rare)
var BOOK=[{pl:1,al:['alien_blue','alien_green','alien_pink']},{pl:2,al:['alien_gummy','alien_marsh','alien_choco']},
  {pl:3,al:['alien_snow','alien_icejel','alien_peng','alien_yeti']},{pl:4,al:['alien_shroom','alien_leaf','alien_frog','alien_owl']},
  {pl:5,al:['alien_magma','alien_ember','alien_pebble','alien_sala']}];
// 7-day gifts (device local date); day 7 = Forest Bunny pet
var LOGIN=[{k:'coin',n:30},{k:'gem',n:3},{k:'coin',n:80},{k:'ff',n:5},{k:'gem',n:6},{k:'coin',n:200},{k:'pet',n:'bunny'}];
var FF_ITEMS=[{id:'jar',cost:6,ic:'i_jar'},{id:'lure',cost:8,ic:'i_lure'}];
function PL(){return PLANETS[S.planet]||PLANETS[1];}
var ALIENS=ALIENS1;
// star-gem shop: permanent boosts + cosmetics (all visible in play)
var BOOSTS=[{id:'inc',ic:'gem',cost:[10,20,35,50,75]},{id:'cap',ic:'i_boat',cost:[8,15,25,40,60]},{id:'pat',ic:'i_goods',cost:[6,12,20,32,50]},{id:'rush',ic:'stall',cost:[8,15,25,40,60]}];
var HATS=[{id:'none',cost:0},{id:'bow',cost:15,x:.71,y:.15,w:.17,r:.3},{id:'star',cost:20,x:.59,y:.085,w:.27,r:0},{id:'wizard',cost:25,x:.585,y:.17,w:.27,r:0},{id:'crown',cost:30,x:.59,y:.10,w:.21,r:0},{id:'leaf',ff:12,cost:0,x:.585,y:.11,w:.25,r:0}];
var SKINS=[{id:'classic',cost:0,img:'boat'},{id:'pink',cost:20,img:'boat_pink'},{id:'mint',cost:20,img:'boat_mint'},{id:'night',cost:35,img:'boat_night'},{id:'forest',ff:20,cost:0,img:'boat_forest'}];
function incMul(){return (1+0.1*(S.shop.inc||0))*PL().mul*(trip&&trip.jar?1.25:1)*legendMul();}
function legendMul(){return 1+0.1*((S.legend&&S.legend.stars)|0);}
// daily quests + achievements
var QUESTS=[{k:'sell',ns:[30,50,80]},{k:'combo',ns:[10,15]},{k:'trips',ns:[3,4]},{k:'gifts',ns:[3,5]},{k:'tips',ns:[5,10]},{k:'likes',ns:[10,20]},{k:'dock',ns:[20,40]}];
var ACH=[{id:'sold100',f:function(){return S.stats.sold;},n:100,g:5},{id:'trips10',f:function(){return S.stats.trips;},n:10,g:5},
 {id:'combo20',f:function(){return S.stats.bestCombo;},n:20,g:10},{id:'planet2',f:function(){return S.unlocked.indexOf(2)>=0?1:0;},n:1,g:15},
 {id:'staff2',f:function(){return S.staff.filter(function(x){return x>0;}).length;},n:2,g:10},{id:'lvl10',f:function(){return S.lvl;},n:10,g:10},
 {id:'cos',f:function(){return S.cos.hats.length+S.cos.boats.length-1;},n:1,g:5},{id:'quests',f:function(){return S.stats.quests;},n:10,g:10},
 {id:'sold1000',f:function(){return S.stats.sold;},n:1000,g:10},{id:'trips50',f:function(){return S.stats.trips;},n:50,g:15},
 {id:'earn',f:function(){return S.stats.earned;},n:100000,g:10},{id:'sold10000',f:function(){return S.stats.sold;},n:10000,g:20},
 {id:'planet3',f:function(){return S.unlocked.indexOf(3)>=0?1:0;},n:1,g:20},{id:'orders',f:function(){return S.stats.orders|0;},n:10,g:10},
 {id:'planet4',f:function(){return S.unlocked.indexOf(4)>=0?1:0;},n:1,g:25},{id:'book10',f:function(){return Object.keys(S.book.s).length;},n:10,g:15},
 {id:'planet5',f:function(){return S.unlocked.indexOf(5)>=0?1:0;},n:1,g:30},{id:'crown1',f:function(){return crownCount();},n:1,g:15},
 {id:'crown5',f:function(){return crownCount();},n:5,g:40},{id:'legend1',f:function(){return (S.legend&&S.legend.n)|0;},n:1,g:30}];
var ARRIVE_GEMS=25;
// home-port market stalls (build in order; each earns coins per second, also while away)
var STALLS=[{id:'coffee',img:'mk_coffee',cost:1500,rate:0.4,x:.21,y:.45,w:.24},{id:'souv',img:'mk_souv',cost:9000,rate:2,x:.79,y:.45,w:.24},
  {id:'repair',img:'mk_repair',cost:50000,rate:8,x:.30,y:.27,w:.2},{id:'smooth',img:'mk_smooth',cost:250000,rate:30,x:.69,y:.26,w:.2},
  {id:'lantern',img:'mk_lantern',cost:1200000,rate:110,x:.5,y:.17,w:.17}];
var STALL_MAX=15;
// pets ride on the boat; x/y = where they sit on the boat sprite (fractions), w = width
var PETS=[{id:'cat',cost:25,x:.86,y:.44,w:.2},{id:'octo',cost:35,x:.2,y:.5,w:.17},{id:'bird',cost:50,x:.1,y:.24,w:.19,fly:1},{id:'bunny',cost:0,login:1,x:.86,y:.44,w:.17}];
var LANE=1.15; // Glow Ice lanes: u = -LANE, 0, +LANE
var GOOD_MAX=50, UP_MAX=20, STAFF_MAX=15;
var STAFF=[{id:'s1',hire:600,name:'staff1'},{id:'s2',hire:6000,name:'staff2'}];
var UPS=[{id:'cap',ic:'i_boat',cost:80,g:1.5},{id:'spd',ic:'i_map',cost:120,g:1.6},{id:'pat',ic:'i_goods',cost:100,g:1.55}];
var AD={cap:10,cooldown:90,watch:5};
var OFFLINE_CAP=3*3600, DOCK_TIME=10;
var SAVE_KEY='kairon.starriver.save', SAVE_VERSION=7;

function goodPrice(g,lv){var m=1;if(lv>=10)m*=2;if(lv>=25)m*=2;if(lv>=50)m*=2;return Math.round(g.base*(1+0.25*(lv-1))*m);}
function goodUpCost(g,lv){return Math.round(g.base*12*Math.pow(1.25,lv-1));}
function capOf(lv){return Math.round((30+6*(lv-1)+5*((S&&S.shop&&S.shop.cap)||0))*tierOf().capM);}
function speedMul(lv){return 1+0.08*(lv-1);}
function patOf(lv){return 7*(1+0.1*(lv-1))*(1+0.1*((S&&S.shop&&S.shop.pat)||0));}
function dockTime(){return DOCK_TIME+((S.shop&&S.shop.rush)||0);}
function upCost(u,lv){return Math.round(u.cost*Math.pow(u.g,lv-1));}
function staffEvery(lv){return 3.5/(1+0.15*(lv-1));}
function staffUpCost(s,lv){return Math.round(s.hire*0.6*Math.pow(1.45,lv));}
function xpNeed(n){return Math.round(120*Math.pow(1.8,n-1));}

// ---------- state + save/migrate ----------
function fresh(){return {v:SAVE_VERSION,coins:0,gems:0,lvl:1,xp:0,planet:1,unlocked:[1],arrived:[1],up:{cap:1,spd:1,pat:1},
  goods:{fruit:1,candy:0,jelly:0,crystal:0,cotton:0,lolli:0,syrup:0,donut:0,snowcone:0,cocoa:0,aurora:0,pearl:0,berry:0,honey:0,glowshroom:0,emerald:0,lavasoup:0,potato:0,lavacake:0,meteorbun:0},staff:[0,0],
  load:{fruit:30,candy:0,jelly:0,crystal:0,cotton:0,lolli:0,syrup:0,donut:0,snowcone:0,cocoa:0,aurora:0,pearl:0,berry:0,honey:0,glowshroom:0,emerald:0,lavasoup:0,potato:0,lavacake:0,meteorbun:0},
  routes:{'1':{trips:0,done:false},'2':{trips:0,done:false},'3':{trips:0,done:false},'4':{trips:0,done:false},'5':{trips:0,done:false}},dist:0,cur:null,ulSeen:false,ul3Seen:false,ul4Seen:false,ul5Seen:false,tut:{done:false},
  tier:1,ff:0,items:{jar:0,lure:0},book:{s:{},g:{},pc:{},gc:{}},login:{last:'',streak:0,total:0,pop:''},
  market:{st:{coffee:0,souv:0,repair:0,smooth:0,lantern:0},bank:0,last:Date.now()},pets:{own:[],on:''},ev:{seen:''},friend:{p:{},g:0},
  shop:{inc:0,cap:0,pat:0,rush:0},cos:{hats:[],boats:['classic'],hat:'none',boat:'classic'},
  quests:{day:'',list:[],prog:{},rerolled:false},ach:{},
  ad:{day:'',count:0,last:0},stats:{sold:0,earned:0,trips:0,bestCombo:0,quests:0,orders:0},
  vol:{m:1,s:1,v:1},king:{},legend:{stars:0,n:0,base:0},
  lang:'th',mute:false,lastSeen:Date.now(),created:Date.now()};}
// Every stage adds a step here. Old saves are upgraded, never wiped.
function migrate(d){
  if(!d||typeof d!=='object')return fresh();
  if(!d.v)d.v=1;
  if(d.v===1){ // stage 1 (idle shop) -> stage 1c (travel). Keep coins, gems, level, goods, staff, stats.
    var b=Math.max(1,d.boat|0||1);
    d.up={cap:Math.min(UP_MAX,b),spd:Math.min(UP_MAX,1+Math.floor((b-1)/2)),pat:Math.min(UP_MAX,1+Math.floor((b-1)/2))};
    delete d.boat;if(d.ad)delete d.ad.boostUntil;
    d.tut={done:false}; // the game changed a lot: show the new tutorial once
    d.v=2;
  }
  if(d.v===2){ // stage 1c -> stage 2: per-planet routes, Candy Planet unlock, shop/quests/achievements
    var r=d.route||{};
    d.routes={'1':{trips:r.trips|0,done:!!r.edge||(r.trips|0)>=8},'2':{trips:0,done:false}};d.ulSeen=false;
    d.dist=r.dist||0;delete d.route;
    d.unlocked=(r.trips|0)>=8?[1,2]:[1];d.arrived=[1];d.planet=1;
    if(d.unlocked.length>1&&d.goods)d.goods.cotton=Math.max(1,d.goods.cotton|0);
    d.v=3;
  }
  if(d.v===3){ // stage 2 -> stage 3: Glow Ice Planet opens for anyone who already finished the Candy route; market + pets start empty
    var r2=d.routes&&d.routes['2'];
    if(r2&&(r2.done||(r2.trips|0)>=12)){r2.done=true;if(!Array.isArray(d.unlocked))d.unlocked=[1];if(d.unlocked.indexOf(3)<0)d.unlocked.push(3);if(d.goods)d.goods.snowcone=Math.max(1,d.goods.snowcone|0);d.ul3Seen=false;}
    d.v=4;
  }
  if(d.v===4){ // stage 3 -> stage 4: Emerald Forest opens for anyone who already finished the Glow Ice route; book/gifts/boat class start fresh
    var r3=d.routes&&d.routes['3'];
    if(r3&&(r3.done||(r3.trips|0)>=14)){r3.done=true;if(!Array.isArray(d.unlocked))d.unlocked=[1];if(d.unlocked.indexOf(4)<0)d.unlocked.push(4);d.ul4Seen=false;}
    d.v=5;
  }
  if(d.v===5){ // stage 4 -> living characters: friendship with each alien type starts fresh
    d.friend={p:{},g:0};d.v=6;
  }
  if(d.v===6){ // living characters -> stage 5: Lava Volcano Planet opens for anyone who already finished the Emerald route; kings/legend/volume start fresh
    var r4=d.routes&&d.routes['4'];
    if(r4&&(r4.done||(r4.trips|0)>=16)){r4.done=true;if(!Array.isArray(d.unlocked))d.unlocked=[1];if(d.unlocked.indexOf(5)<0)d.unlocked.push(5);d.ul5Seen=false;}
    d.king={};d.legend={stars:0,n:0,base:0};d.vol={m:1,s:1,v:1};d.v=7;
  }
  var f=fresh();
  for(var k in f){if(d[k]===undefined||(d[k]===null&&k!=='cur'))d[k]=f[k];}
  ['up','goods','load','routes','tut','shop','cos','quests','ach','ad','stats','market','pets','ev','items','book','login','friend','vol','king','legend'].forEach(function(o){if(typeof d[o]!=='object')d[o]=f[o];for(var j in f[o])if(d[o][j]===undefined)d[o][j]=f[o][j];});
  while(d.staff.length<STAFF.length)d.staff.push(0);
  if(!(d.goods.fruit>0))d.goods.fruit=1;
  if(!Array.isArray(d.unlocked)||!d.unlocked.length)d.unlocked=[1];
  if(!Array.isArray(d.arrived))d.arrived=[1];
  if(d.unlocked.indexOf(d.planet)<0)d.planet=1;
  if(d.unlocked.indexOf(2)>=0&&!(d.goods.cotton>0))d.goods.cotton=1;
  ['1','2','3','4','5'].forEach(function(n){if(typeof d.routes[n]!=='object'||!d.routes[n])d.routes[n]={trips:0,done:false};});
  [3,4,5].forEach(function(n){if(d.unlocked.indexOf(n)>=0)starterGoods(d,n);});
  ['m','s','v'].forEach(function(k){var x=+d.vol[k];d.vol[k]=isFinite(x)?Math.max(0,Math.min(1,x)):1;});
  for(var kk in d.king){var K=d.king[kk];if(typeof K!=='object'||!K)delete d.king[kk];else{K.c=Math.max(0,K.c|0);K.at=Math.max(0,K.at|0);}}
  d.legend.stars=Math.max(0,d.legend.stars|0);d.legend.n=Math.max(0,d.legend.n|0);d.legend.base=Math.max(0,+d.legend.base||0); // every newer planet starts with two goods, so mixed orders work on arrival
  ['s','g','pc','gc'].forEach(function(k){if(typeof d.book[k]!=='object'||!d.book[k])d.book[k]={};});
  d.tier=Math.max(1,Math.min(3,d.tier|0||1));d.ff=Math.max(0,d.ff|0);d.items.jar=Math.max(0,d.items.jar|0);d.items.lure=Math.max(0,d.items.lure|0);
  d.login.streak=Math.max(0,Math.min(7,d.login.streak|0));if(typeof d.login.last!=='string')d.login.last='';
  if(typeof d.market.st!=='object'||!d.market.st)d.market.st={};STALLS.forEach(function(x){d.market.st[x.id]=Math.max(0,d.market.st[x.id]|0);});
  d.market.bank=Math.max(0,+d.market.bank||0);if(!(d.market.last>0))d.market.last=Date.now();
  if(!Array.isArray(d.pets.own))d.pets.own=[];if(d.pets.own.indexOf(d.pets.on)<0)d.pets.on='';
  if(!Array.isArray(d.cos.hats))d.cos.hats=[];if(!Array.isArray(d.cos.boats)||d.cos.boats.indexOf('classic')<0)d.cos.boats=['classic'].concat(Array.isArray(d.cos.boats)?d.cos.boats:[]);
  if(!Array.isArray(d.quests.list))d.quests.list=[];
  if(typeof d.friend.p!=='object'||!d.friend.p)d.friend.p={};for(var fk in d.friend.p)d.friend.p[fk]=Math.max(0,d.friend.p[fk]|0);d.friend.g=Math.max(0,d.friend.g|0);
  d.v=SAVE_VERSION;return d;
}
function starterGoods(d,n){GOODS.filter(function(g){return g.pl===n;}).slice(0,2).forEach(function(g){d.goods[g.id]=Math.max(1,d.goods[g.id]|0);});}
function load(){try{var r=localStorage.getItem(SAVE_KEY);return migrate(r?JSON.parse(r):null);}catch(e){return fresh();}}
function save(){S.lastSeen=Date.now();S.dist=dist;
  // mid-trip save: a reload resumes the trip with the goods still on board
  S.cur=(trip&&(phase==='travel'||phase==='dock'||phase==='king'))?{pl:S.planet,z0:trip.z0,docks:trip.docks,end:trip.end,di:trip.di,sold:trip.sold,tips:trip.tips,best:trip.best,earned:trip.earned,stock:stock,dist:dist,jar:trip.jar|0,lure:trip.lure|0,heat:trip.heat||null,king:trip.king||null}:null;
  try{localStorage.setItem(SAVE_KEY,JSON.stringify(S));}catch(e){}}
var S=load(),bootSeen=S.lastSeen; // remember last visit before any boot-time save
var urlNoAds=/[?&]noads=1/.test(location.search);
var dist=S.dist||0;
function RT(){return S.routes[S.planet]||S.routes['1'];}

// ---------- audio ----------
var A={ctx:null,master:null,music:null,sfx:null,voice:null,buf:{},musicSrc:null,paddle:null,paddleG:null,lastVoice:0};
var SOUNDS=['tap','coin','sell','upgrade','ufo','unlock','nope','popup','music','paddle','dock','combo','gift','setoff','fanfare',
 'v_hello','v_sold','v_thanks','v_upgrade','v_hire','v_welcome','v_unlock','v_x2','v_a_wow','v_a_yum','v_a_want','v_a_yay','v_a_cute',
 'v_dock','v_setoff','v_combo','v_great','v_tip','v_empty','v_arrive','v_edge','v_gift','v_vip','v_restock',
 'v_t_intro','v_t_load','v_t_hold','v_t_tap','v_t_dock','v_t_upgrade','v_t_done',
 'music_candy','quest','buy','v_planet','v_quest','v_shop','v_achieve','v_home',
 'music_ice','steer','bump','grab','build','pet','meteor','order','v_iceopen','v_ice','v_steer','v_bump','v_grab','v_build','v_market','v_pet','v_order','v_meteor',
 'music_forest','fork','firefly','sticker','page','login','boatup','golden','night',
 'r_hop','r_wave','r_pout','r_startle','r_heart','r_bubble','r_bye','r_sing','v_yawn','v_tired','v_sing','v_excited','v_friend','v_regular','v_present','v_oops','v_sorry','v_yay2',
 'v_forestopen','v_forest','v_fork','v_risky','v_safe','v_night','v_firefly','v_boatup','v_sticker','v_golden','v_page','v_login','v_day7','v_swap',
 'music_lava','lpop','sizzle','stove','kingfan','crown','legend','v_lava','v_lavaopen','v_hot','v_cool','v_pop','v_splash','v_king','v_kingwin','v_kingfail','v_kingsoon','v_legend'];
function audioInit(){
  if(A.ctx)return;
  var C=window.AudioContext||window.webkitAudioContext;if(!C)return;
  A.ctx=new C();A.master=A.ctx.createGain();A.master.connect(A.ctx.destination);
  A.music=A.ctx.createGain();A.music.gain.value=0.28*S.vol.m;A.music.connect(A.master);
  A.sfx=A.ctx.createGain();A.sfx.gain.value=0.8*S.vol.s;A.sfx.connect(A.master);
  A.voice=A.ctx.createGain();A.voice.gain.value=1.0*S.vol.v;A.voice.connect(A.master);
  A.master.gain.value=S.mute?0:1;
  SOUNDS.forEach(function(n){if(/^music/.test(n)&&n!==PL().music)return;if(S.tut.done&&/^v_t_/.test(n))return;loadSnd(n);});
}
var SNDP={};
function loadSnd(n){if(SNDP[n])return SNDP[n];if(!A.ctx||SOUNDS.indexOf(n)<0)return Promise.resolve(null);
  return SNDP[n]=fetch('audio/'+n+'.mp3').then(function(r){return r.arrayBuffer();}).then(function(ab){
      return new Promise(function(res,rej){A.ctx.decodeAudioData(ab,res,rej);});
    }).then(function(b){A.buf[n]=b;if(n===PL().music)startMusic();if(n==='paddle')startPaddle();return b;}).catch(function(){SNDP[n]=null;return null;});}
function audioUnlock(){
  audioInit();if(!A.ctx)return;
  if(A.ctx.state!=='running'){A.ctx.resume();}
  try{var b=A.ctx.createBuffer(1,1,22050),s=A.ctx.createBufferSource();s.buffer=b;s.connect(A.ctx.destination);s.start(0);}catch(e){}
  startMusic();startPaddle();
}
function startMusic(){ // each planet has its own loop (Candy Planet: brighter music-box variation)
  var m=PL().music;if(A.ctx&&!A.buf[m]){loadSnd(m);return;}
  if(!A.ctx||!A.buf[m]||A.ctx.state!=='running')return;
  if(A.musicSrc){if(A.musicName===m)return;var old=A.musicSrc,og=A.musicG;og.gain.setTargetAtTime(0,A.ctx.currentTime,0.25);setTimeout(function(){try{old.stop();}catch(e){}},1500);}
  var g=A.ctx.createGain();g.gain.value=0;g.connect(A.music);g.gain.setTargetAtTime(1,A.ctx.currentTime,0.3);
  var s=A.ctx.createBufferSource();s.buffer=A.buf[m];s.loop=true;s.connect(g);s.start(0);A.musicSrc=s;A.musicG=g;A.musicName=m;
}
function startPaddle(){ // soft water loop; volume follows boat speed
  if(!A.ctx||A.paddle||!A.buf.paddle||A.ctx.state!=='running')return;
  var s=A.ctx.createBufferSource(),b=A.buf.paddle;s.buffer=b;s.loop=true;s.loopStart=0.06;s.loopEnd=Math.max(0.2,b.duration-0.06);
  A.paddleG=A.ctx.createGain();A.paddleG.gain.value=0;s.connect(A.paddleG);A.paddleG.connect(A.sfx);s.start(0,0.06);A.paddle=s;
}
function paddleMix(v,fast){
  if(!A.paddle||!A.ctx)return;
  A.paddleG.gain.setTargetAtTime(Math.min(0.55,v*0.07),A.ctx.currentTime,0.15);
  A.paddle.playbackRate.setTargetAtTime(fast?1.3:1,A.ctx.currentTime,0.2);
}
function play(n,o){
  o=o||{};if(A.ctx&&!A.buf[n]&&/^v_t_/.test(n)){var t0=performance.now();loadSnd(n).then(function(b){if(b&&performance.now()-t0<2500)play(n,o);});return;}
  if(!A.ctx||!A.buf[n]||A.ctx.state!=='running')return;
  var s=A.ctx.createBufferSource();s.buffer=A.buf[n];
  if(o.rate)s.playbackRate.value=o.rate;
  var g=A.ctx.createGain();g.gain.value=o.vol==null?1:o.vol;s.connect(g);g.connect(n.charAt(0)==='v'&&n.charAt(1)==='_'?A.voice:A.sfx);s.start(0);
}
function say(n,minGap){var now=performance.now();if(now-A.lastVoice<(minGap==null?1600:minGap))return;A.lastVoice=now;play('v_'+n);
  var vb=A.buf['v_'+n];if(vb&&A.ctx&&A.ctx.state==='running'&&n.slice(0,2)!=='a_'&&typeof fang!=='undefined')fang.talk=vb.duration;} // Fang's mouth moves while her voice plays
function setMute(m){S.mute=m;if(A.master)A.master.gain.setTargetAtTime(m?0:1,A.ctx.currentTime,0.03);drawMuteIcon();save();}
function drawMuteIcon(){document.getElementById('mute-ico').setAttribute('d',S.mute?
 'M3 9v6h4l5 5V4L7 9H3zm13.6 3l2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z':
 'M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z');}
document.addEventListener('visibilitychange',function(){
  if(!A.ctx)return;
  if(document.hidden){A.ctx.suspend();save();}else if(!splashOn){A.ctx.resume();}
});

// ---------- images ----------
var _IMG={},ASSETS={};["alien_blue","alien_blue_nf","alien_choco","alien_choco_nf","alien_ember","alien_ember_nf","alien_frog","alien_frog_nf","alien_green","alien_green_nf","alien_gummy","alien_gummy_nf","alien_icejel","alien_icejel_nf","alien_leaf","alien_leaf_nf","alien_magma","alien_magma_nf","alien_marsh","alien_marsh_nf","alien_owl","alien_owl_nf","alien_pebble","alien_pebble_nf","alien_peng","alien_peng_nf","alien_pink","alien_pink_nf","alien_sala","alien_sala_nf","alien_shroom","alien_shroom_nf","alien_snow","alien_snow_nf","alien_yeti","alien_yeti_nf","bg_candy","bg_forest","bg_ice","bg_lava","bg_space","boat","boat_mint","boat_night","boat_pink","boat_t1","boat_t1_forest","boat_t1_forest_r","boat_t1_mint","boat_t1_mint_r","boat_t1_night","boat_t1_night_r","boat_t1_pink","boat_t1_pink_r","boat_t1_r","boat_t2","boat_t2_forest","boat_t2_forest_r","boat_t2_mint","boat_t2_mint_r","boat_t2_night","boat_t2_night_r","boat_t2_pink","boat_t2_pink_r","boat_t2_r","boat_t3","boat_t3_forest","boat_t3_forest_r","boat_t3_mint","boat_t3_mint_r","boat_t3_night","boat_t3_night_r","boat_t3_pink","boat_t3_pink_r","boat_t3_r","cislet0","cislet1","cislet2","cislet3","coin","fang","firefly","fislet0","fislet1","fislet2","fislet3","g_aurora","g_berry","g_candy","g_cocoa","g_cotton","g_crystal","g_donut","g_emerald","g_fruit","g_glowshroom","g_honey","g_jelly","g_lavacake","g_lavasoup","g_lolli","g_meteorbun","g_pearl","g_potato","g_snowcone","g_syrup","gem","hand","hat_bow","hat_crown","hat_leaf","hat_star","hat_wizard","i_boat","i_boatup","i_book","i_crown","i_forest","i_gift","i_goods","i_ice","i_jar","i_lava","i_legend","i_lure","i_map","i_market","i_meteor","i_pet","i_planet2","i_planet3","i_quest","i_shop","i_staff","iislet0","iislet1","iislet2","iislet3","islet0","islet1","islet2","islet3","king1","king1_nf","king2","king2_nf","king3","king3_nf","king4","king4_nf","king5","king5_nf","lislet0","lislet1","lislet2","lislet3","lock","market_base","mk_coffee","mk_lantern","mk_repair","mk_sign","mk_smooth","mk_souv","ob_crate","ob_ice","ob_log","ob_meteor","ob_thorn","pet_bird","pet_bird_nf","pet_bunny","pet_bunny_nf","pet_cat","pet_cat_nf","pet_octo","pet_octo_nf","sign_fork","staff","stall","stall_candy","stall_forest","stall_ice","stall_lava","tv"].forEach(function(n){ASSETS[n]=1;});
var IMG=new Proxy(_IMG,{get:function(o,k){if(typeof k==='string'&&!(k in o)&&ASSETS[k]){var i=new Image();i.decoding='async';i.src='assets/'+k+'.webp';o[k]=i;}return o[k];}});
var IMGS=['bg_space','staff','alien_blue','alien_green','alien_pink','stall','g_fruit','g_candy','g_jelly','g_crystal','coin','gem','islet0','islet1','islet2','islet3','i_map',
 'bg_candy','stall_candy','cislet0','cislet1','cislet2','cislet3','alien_gummy','alien_marsh','alien_choco','g_cotton','g_lolli','g_syrup','g_donut',
 'hat_bow','hat_star','hat_wizard','hat_crown','i_planet2',
 'bg_ice','stall_ice','iislet0','iislet1','iislet2','iislet3','alien_snow','alien_icejel','alien_peng','alien_yeti','g_snowcone','g_cocoa','g_aurora','g_pearl',
 'ob_ice','ob_meteor','ob_crate','pet_cat','pet_octo','pet_bird','market_base','mk_coffee','mk_souv','mk_repair','mk_smooth','mk_lantern',
 'bg_forest','stall_forest','fislet0','fislet1','fislet2','fislet3','alien_shroom','alien_leaf','alien_frog','alien_owl','g_berry','g_honey','g_glowshroom','g_emerald',
 'ob_log','ob_thorn','firefly','sign_fork','pet_bunny','hat_leaf'];
[1,2,3].forEach(function(n){['','_pink','_mint','_night','_forest'].forEach(function(k){IMGS.push('boat_t'+n+k);});});
function planetSet(n){var P=PLANETS[n],l=[P.bg,P.stall,P.icon,P.vip,P.vip+'_nf'];for(var i=0;i<4;i++)l.push(P.isl+i);
  P.aliens.forEach(function(a){l.push(a.img,a.img+'_nf');});GOODS.forEach(function(g){if(g.pl===n)l.push(g.img);});
  if(n===3)l.push('ob_ice','ob_meteor','ob_crate');if(n===4)l.push('ob_log','ob_thorn','firefly','sign_fork');return l;}
function coreSet(){var b=boatImg(S.cos.boat),l=['staff','coin','gem','i_map','market_base',b,b+'_r',tierOf().img,tierOf().img+'_r'];
  if(S.pets.on)l.push('pet_'+S.pets.on,'pet_'+S.pets.on+'_nf');if(S.cos.hat&&S.cos.hat!=='none')l.push('hat_'+S.cos.hat);return l;}
function preload(list,cb){var n=0,tot=0,seen={};list.forEach(function(k){if(!ASSETS[k]||seen[k])return;seen[k]=1;tot++;var im=IMG[k];
  if(ok(im)){n++;return;}var f=function(){n++;cb(n,tot);};im.addEventListener('load',f,{once:true});im.addEventListener('error',f,{once:true});});cb(n,tot);}
function ok(im){return !!im&&(im.tagName==='CANVAS'?im.width>0:(im.complete&&im.naturalWidth>0));}
function iw(im){return im.naturalWidth||im.width;}function ih(im){return im.naturalHeight||im.height;}
// pre-rendered glow sprites (cheap on mobile)
function makeGlow(r,g,b){var c=document.createElement('canvas');c.width=c.height=64;var x=c.getContext('2d'),gr=x.createRadialGradient(32,32,0,32,32,32);
  gr.addColorStop(0,'rgba('+r+','+g+','+b+',1)');gr.addColorStop(0.35,'rgba('+r+','+g+','+b+',.45)');gr.addColorStop(1,'rgba('+r+','+g+','+b+',0)');x.fillStyle=gr;x.fillRect(0,0,64,64);return c;}
var GLOW={warm:makeGlow(255,190,100),cyan:makeGlow(120,230,255),lav:makeGlow(190,160,255),gold:makeGlow(255,215,90),white:makeGlow(255,255,255),green:makeGlow(150,255,170)};
// ---------- living characters: faces, rigs, simulated brain (all on-device: no network, no API, works offline) ----------
var FACES={"alien_blue":{"e":[[0.441,0.328,0.045,0.064],[0.673,0.299,0.04,0.062]],"m":[0.57,0.384,0.09],"sk":"#9ad1ed","ar":0.78},"alien_green":{"e":[[0.349,0.353,0.033,0.039],[0.481,0.345,0.037,0.041],[0.62,0.39,0.037,0.041]],"m":[0.459,0.448,0.107],"sk":"#e4ded2","ar":0.9367},"alien_pink":{"e":[[0.345,0.292,0.028,0.037],[0.555,0.32,0.032,0.037]],"m":[0.435,0.354,0.073],"sk":"#dfa2e6","ar":1.03},"alien_gummy":{"e":[[0.431,0.373,0.047,0.058],[0.665,0.347,0.042,0.056]],"m":[0.56,0.419,0.09],"sk":"#fa7e1f","ar":0.89},"alien_marsh":{"e":[[0.439,0.465,0.045,0.052],[0.672,0.444,0.038,0.046]],"m":[0.569,0.512,0.087],"sk":"#dabae1","ar":0.9867},"alien_choco":{"e":[[0.441,0.449,0.047,0.057],[0.67,0.427,0.042,0.053]],"m":[0.567,0.492,0.093],"sk":"#955c43","ar":0.94},"alien_snow":{"e":[[0.417,0.408,0.043,0.05],[0.661,0.39,0.04,0.05]],"m":[0.547,0.452,0.087],"sk":"#f3edf0","ar":0.9633},"alien_icejel":{"e":[[0.416,0.412,0.043,0.05],[0.649,0.395,0.038,0.048]],"m":[0.541,0.454,0.09],"sk":"#c6ecf7","ar":1.0},"alien_peng":{"e":[[0.416,0.331,0.04,0.051],[0.641,0.316,0.037,0.051]],"m":[0.537,0.383,0.077],"sk":"#f5eae5","ar":0.9164},"alien_yeti":{"e":[[0.438,0.376,0.04,0.047],[0.649,0.363,0.037,0.046]],"m":[0.551,0.419,0.077],"sk":"#e5cae6","ar":0.99},"alien_shroom":{"e":[[0.407,0.44,0.04,0.046],[0.639,0.422,0.038,0.046]],"m":[0.532,0.478,0.083],"sk":"#f8e5d2","ar":1.0167},"alien_leaf":{"e":[[0.435,0.421,0.049,0.051],[0.677,0.404,0.042,0.049]],"m":[0.567,0.468,0.097],"sk":"#c6cd74","ar":1.057},"alien_frog":{"e":[[0.338,0.171,0.054,0.064],[0.684,0.145,0.05,0.062]],"m":[0.531,0.297,0.194],"sk":"#a7c8a6","ar":0.8829},"alien_owl":{"e":[[0.412,0.366,0.047,0.053],[0.646,0.353,0.042,0.05]],"m":[0.536,0.422,0.067],"sk":"#f8e7da","ar":1.0134},"pet_cat":{"e":[[0.381,0.581,0.085,0.066],[0.806,0.564,0.075,0.066]],"m":[0.605,0.638,0.155],"sk":"#d9b8e9","ar":1.435},"pet_octo":{"e":[[0.368,0.418,0.062,0.069],[0.689,0.403,0.058,0.069]],"m":[0.538,0.48,0.115],"sk":"#fb9ea8","ar":1.015},"pet_bird":{"e":[[0.645,0.462,0.04,0.069],[0.844,0.439,0.038,0.069]],"m":[0.751,0.503,0.065],"sk":"#fabe4f","ar":0.6935},"pet_bunny":{"e":[[0.447,0.569,0.065,0.054],[0.793,0.555,0.058,0.052]],"m":[0.62,0.649,0.06],"sk":"#fbece5","ar":1.3618},"alien_pebble":{"e":[[0.385,0.394,0.062,0.056],[0.61,0.395,0.066,0.062]],"m":[0.495,0.484,0.101],"sk":"#7e6348","ar":0.9363},"alien_sala":{"e":[[0.252,0.212,0.058,0.066],[0.462,0.222,0.06,0.068]],"m":[0.3,0.335,0.12],"sk":"#e3988c","ar":0.9599},"king1":{"e":[[0.371,0.321,0.032,0.033],[0.555,0.331,0.037,0.035]],"m":[0.454,0.379,0.088],"sk":"#7ab3cf","ar":1.059},"king2":{"e":[[0.367,0.326,0.032,0.033],[0.544,0.335,0.036,0.034]],"m":[0.446,0.386,0.081],"sk":"#d18a9c","ar":1.0634},"king3":{"e":[[0.371,0.287,0.029,0.031],[0.536,0.294,0.035,0.032]],"m":[0.45,0.388,0.1],"sk":"#bac5c9","ar":1.0447},"king4":{"e":[[0.357,0.345,0.03,0.034],[0.537,0.349,0.046,0.044]],"m":[0.437,0.397,0.079],"sk":"#a0b668","ar":1.0648},"king5":{"e":[[0.343,0.314,0.027,0.029],[0.542,0.326,0.036,0.032]],"m":[0.44,0.417,0.134],"sk":"#d3703f","ar":1.1336},"alien_magma":{"e":[[0.391,0.403,0.059,0.06],[0.641,0.401,0.055,0.064]],"m":[0.516,0.483,0.107],"sk":"#e9570d","ar":0.9732},"alien_ember":{"e":[[0.331,0.447,0.05,0.05],[0.563,0.464,0.062,0.056]],"m":[0.433,0.53,0.097],"sk":"#edb22a","ar":1.1174}};
var FANG={"1":{"e":[[0.6203,0.2903,0.0126,0.0206],[0.6963,0.2588,0.0093,0.0183]],"m":[0.6683,0.3012,0.027],"sk":"#e4b084","piv":[0.742,0.4005],"foot":[0.6071,0.6087],"body":[[0.4418,0.0915],[0.5059,0.0114],[0.7083,0.0],[0.7723,0.0915],[0.7673,0.2517],[0.7926,0.4577],[0.7589,0.5995],[0.5059,0.6133],[0.4351,0.5034]],"pad":[[0.7083,0.3616],[0.8516,0.7368]],"padw":0.0169,"blade":[[0.8381,0.7277],[0.8735,0.6865],[0.9241,0.7437],[0.9747,0.8513],[0.9983,0.9565],[0.9781,0.9931],[0.9376,0.9794],[0.8938,0.9108],[0.86,0.8284],[0.8398,0.778]],"hand":[0.7454,0.3936,0.0337,0.0595]},"2":{"e":[[0.3138,0.3649,0.0101,0.0181],[0.3746,0.3371,0.0067,0.0168]],"m":[0.3523,0.3753,0.0219],"sk":"#e4b185","piv":[0.4125,0.4534],"foot":[0.2946,0.7202],"body":[[0.1599,0.2202],[0.2189,0.1036],[0.404,0.1036],[0.4411,0.2073],[0.4411,0.5181],[0.4209,0.7124],[0.2357,0.7254],[0.1431,0.5181]],"pad":[[0.4209,0.4275],[0.0875,0.9534]],"padw":0.0118,"blade":null,"hand":[0.4158,0.4456,0.0337,0.0622]},"3":{"e":[[0.6859,0.4204,0.0114,0.0139],[0.7499,0.4012,0.0079,0.0129]],"m":[0.7265,0.4291,0.0229],"sk":"#e2b288","piv":[0.7746,0.496],"foot":[0.669,0.6845],"body":[[0.5018,0.2976],[0.581,0.2183],[0.7394,0.2143],[0.8187,0.2976],[0.8134,0.496],[0.7923,0.6746],[0.5458,0.6845],[0.5194,0.496]],"pad":[[0.7482,0.4722],[0.8803,0.7579]],"padw":0.0176,"blade":[[0.8627,0.7381],[0.8944,0.7242],[0.9296,0.7698],[0.9718,0.8532],[0.9859,0.9087],[0.9595,0.9286],[0.919,0.9028],[0.8891,0.8433],[0.8662,0.7837]],"hand":[0.7835,0.496,0.0387,0.0476]}};
// viewer-right arm cut [x0,y0,x1,y1,pivotX,pivotY] (normalized). Pink has no arms: it waves with its whole body.
var ARMS={alien_blue:[.79,.03,1,.42,.8,.4],alien_green:[.8,.24,1,.52,.81,.5],alien_gummy:[.84,.2,1,.55,.85,.52],alien_marsh:[.82,.27,1,.52,.83,.5],
  alien_choco:[.79,.18,.97,.47,.8,.45],alien_snow:[.83,.28,1,.56,.84,.54],alien_icejel:[.8,.2,.97,.5,.8,.48],alien_peng:[.8,.2,.98,.48,.8,.46],
  alien_yeti:[.84,.18,1,.48,.84,.46],alien_shroom:[.83,.35,.99,.57,.84,.55],alien_leaf:[.78,.28,.97,.52,.79,.5],alien_frog:[.8,.1,1,.45,.8,.43],alien_owl:[.84,.2,1,.56,.85,.54]};
var PETR={cat:{tail:[0,.62,.23,.94,.22,.8]},bunny:{ears:[[.06,0,.5,.33,.33,.31],[.5,0,.97,.33,.68,.31]]}};
['alien_blue','alien_green','alien_pink','alien_gummy','alien_marsh','alien_choco','alien_snow','alien_icejel','alien_peng','alien_yeti','alien_shroom','alien_leaf','alien_frog','alien_owl','pet_cat','pet_octo','pet_bird','pet_bunny']
  .forEach(function(n){}); // (rig images now load on demand through the lazy IMG proxy)
// personalities per alien type: patience, tips, envy, chattiness; favourite goods come from each alien's likes
var PERS={curious:{pat:1,tip:1,envy:.25,chat:.6},lonely:{pat:1.15,tip:1.05,envy:.15,chat:.65,fr:1},impatient:{pat:.8,tip:1.3,envy:.7,chat:.5,th:[.3,.6]},
  sweet:{pat:1,tip:1.1,envy:.35,chat:.55,fav:1.5},shy:{pat:1.2,tip:1.1,envy:.1,chat:.3,jumpy:1},showoff:{pat:.95,tip:1.4,envy:.5,chat:.6},dreamy:{pat:1.3,tip:1,envy:.1,chat:.45,th:[.6,.85]},
  jolly:{pat:1.1,tip:1.2,envy:.1,chat:.7},wise:{pat:1.2,tip:1,envy:.1,chat:.5},fiery:{pat:.9,tip:1.3,envy:.4,chat:.7,th:[.35,.65]}};
var PTYPE={alien_blue:'curious',alien_green:'lonely',alien_pink:'shy',alien_gummy:'sweet',alien_marsh:'dreamy',alien_choco:'showoff',alien_snow:'dreamy',alien_icejel:'curious',
  alien_peng:'impatient',alien_yeti:'showoff',alien_shroom:'shy',alien_leaf:'lonely',alien_frog:'impatient',alien_owl:'dreamy',
  alien_magma:'sweet',alien_ember:'impatient',alien_pebble:'shy',alien_sala:'showoff',king1:'jolly',king2:'sweet',king3:'dreamy',king4:'wise',king5:'fiery'};
function persOf(img){return PERS[PTYPE[img]||'curious'];}
// thought bubble pool [TH, EN]; {good} {planet} {pet} {boat} {time} are filled at draw time so the TH/EN toggle redraws them
var POOL={
 greet:[['สวัสดีจ้า!','Hello there!'],['มีขนมไหมน้า?','Got any treats?'],['ขอ{good}หน่อยนะ','One {good}, please!'],['{planet}สวยดีเนอะ','{planet} is lovely!'],['แวะมาซื้อของจ้า','Just popping by!'],['เรือมาแล้ว!','The boat is here!'],['หิวพอดีเลย','Perfect timing, I am hungry'],['{good}สดๆ ไหม?','Fresh {good}?']],
 reg:[['สวัสดีน้องฟาง!','Hi, Fang!'],['น้องฟาง! คิดถึงจัง','Fang! Missed you!'],['น้องฟาง มาอีกแล้วน้า~','Fang! Back again~'],['วันนี้มี{good}ไหม น้องฟาง?','Any {good} today, Fang?'],['น้องฟาง ร้านโปรดของฉันเลย','Fang, my favourite shop!']],
 best:[['น้องฟาง เพื่อนซี้ของฉัน!','Fang, my best friend!'],['น้องฟาง! กอดหน่อย!','Fang! Hug time!'],['รอน้องฟางทั้งวันเลย','Waited all day for you, Fang'],['น้องฟาง ขอ{good}เหมือนเดิมนะ','Fang, the usual {good}, please']],
 fav:[['{good}!! ของโปรดเลย','{good}!! My favourite!'],['อยากกิน{good}มากๆ','I really want {good}!'],['{good} คือที่สุด','{good} is the best']],
 wait:[['เร็วๆ หน่อยน้า','Hurry, please~'],['หิวแล้วนะ...','Getting hungry...'],['รอนานจัง','Such a long wait'],['ฮึ่ม...','Hmph...'],['{good}ยังไม่มาเลย','Still no {good}...'],['ตาฉันหรือยัง?','Is it my turn?']],
 sad:[['ไม่เป็นไร... ไปก่อนนะ','It is okay... bye'],['งือ...','Sniff...'],['ไว้คราวหน้านะ','Maybe next time']],
 happy:[['อร่อยจัง!','Yummy!'],['ขอบคุณนะ!','Thank you!'],['{good}ดีที่สุด!','Best {good} ever!'],['ว้าว! ฟินมาก','Wow! So good'],['จะมาอีกนะ!','I will come back!'],['บาย บาย~','Bye bye~']],
 love:[['ของโปรดฉันเลย!','My very favourite!'],['รักน้องฟางที่สุด!','Love you, Fang!'],['หัวใจพองโต~','My heart is full~']],
 envy:[['เฮ้! ฉันมาก่อนนะ','Hey! I was first!'],['ไม่ยุติธรรมเลย...','Not fair...'],['ฮึ! ตาฉันบ้างสิ','Hmph! My turn next!']],
 startle:[['อุ๊ย!','Eek!'],['ตกใจหมดเลย!','What a fright!'],['ระวังหน่อยนะ!','Careful!']],
 phew:[['เฉียดไปนิดเดียว!','That was close!'],['เก่งมาก น้องฟาง!','Nice dodge, Fang!']],
 meteor:[['ฝนดาวตก! สวยจัง','Meteor shower! Pretty!'],['ขอพรได้ไหมนะ?','Can I make a wish?'],['ดาวตกเต็มฟ้าเลย','Stars falling everywhere']],
 night:[['ง่วงแล้ว...','So sleepy...'],['หิ่งห้อยสวยจัง','Fireflies are pretty'],['มืดแล้ว กลัวจัง','It is dark... scary'],['ขอ{good}ก่อนนอน','{good} before bed!']],
 pet:[['{pet}น่ารักจัง!','Your {pet} is so cute!'],['ขอจับ{pet}หน่อย','Can I pet the {pet}?'],['หวัดดี {pet}!','Hi, {pet}!']],
 boat:[['{boat} สวยมาก!','Love the {boat}!'],['เรือเท่จัง','Cool boat!']],
 time:[['ตอน{time}แบบนี้ต้อง{good}','{good} for the {time}!'],['{time}นี้อากาศดีจัง','Lovely {time}, right?']],
 curious:[['น้องฟางพายเก่งจัง','Fang paddles so well'],['ในเรือมีอะไรบ้างน้า?','What is on the boat?'],['ไปไหนต่อเหรอ?','Where to next?']],
 showoff:[['ฉันรวยนะ ทิปเยอะเลย','I am rich! Big tip!'],['ดูยานฉันสิ เงาวับ','Look at my shiny saucer!']],
 shy:[['อะ...เอ่อ... ขอ{good}...','Um... a {good}...?'],['...','...']],
 lonely:[['คุยกับฉันหน่อยน้า','Chat with me?'],['ดีใจที่เจอน้องฟาง','So glad to see you, Fang']],
 sweet:[['หวานๆ อีก!','More sweets!'],['น้ำตาลคือชีวิต','Sugar is life']],
 dreamy:[['ฝันถึง{good}เมื่อคืน','Dreamt of {good} last night'],['ดาวสวยจัง~','Pretty stars~']],
 impatient:[['เร็วๆ! เร็วๆ!','Quick! Quick!'],['ไม่ชอบรอนะ','I hate waiting']],
 gift:[['ของขวัญจ้า!','A little gift!'],['เอาไปเลย เพื่อนรัก','For you, friend!']],
 fsing:[['ลัลลา~ ขายดีจัง','La la la~ selling well'],['ฮัมเพลงสักหน่อย~','Hum hum hum~']],
 ftired:[['เหนื่อยนิดนึง...','A bit tired...'],['พักแป๊บนะ','Quick rest...']],
 fexcited:[['ดาวใหม่! ว้าว!','New planet! Wow!'],['ตื่นเต้นจังเลย!','So exciting!']],
 fyawn:[['ฮ้าว~ ง่วงจัง','Yawn~ sleepy'],['ไปพายเรือกันไหม?','Shall we paddle?']],
 fsorry:[['ขอโทษนะ รอนานเลย','Sorry for the wait']],
 hot:[['ร้อนๆ ถึงจะอร่อย!','Hot is tasty!'],['ขอ{good}ร้อนๆ นะ','A piping hot {good}!'],['ว้าว ควันฉุยเลย','Wow, it is steaming!']],
 k1:[['ฮ่าๆ วันนี้ข้าเลี้ยงทั้งเมือง!','Ho ho! A feast for the whole town!'],['เร็วเข้า เจ้าคนพายเรือ!','Quick now, little paddler!']],
 k2:[['หวานๆ เยอะๆ นะจ๊ะ!','Lots of sweets, darling!'],['คทาข้าทำจากลูกอมนะ','My sceptre is candy!']],
 k3:[['ข้าชอบของเย็นๆ แต่ใจอุ่นนะ','Cool treats, warm heart'],['ฮ้าว... เร็วหน่อยนะ','Yawn... be quick now']],
 k4:[['ป่าทั้งป่ารอของจากเจ้า','The whole forest awaits'],['ใจเย็นๆ แต่อย่าช้านะ','Calm, but do not dawdle']],
 k5:[['ข้าคือมังกรน้อยผู้ยิ่งใหญ่!','I am the great little dragon!'],['ร้อนๆ เท่านั้นนะ!','Only piping hot ones!']],
 kwin:[['ยอดเยี่ยม! รับมงกุฎไปเลย','Splendid! Take this crown'],['ข้าพอใจมาก!','We are most pleased!']],
 kfail:[['ไม่เป็นไร ไว้มาใหม่นะ','No matter, come again'],['คราวหน้าเอาใหม่นะ','Next time, then']]};
var TIMEW={th:['เช้า','บ่าย','เย็น','ดึก'],en:['morning','afternoon','evening','night']};
var BUBS=[],bubGap=0,bubLast={},sfxT={},WRAP={};
var fang={blink:0,nb:2,pad:0,cheer:0,talk:0,yawn:0,idle:0,emo:'',emoT:0,sing:0,sales:[],tripT:0,tired:0,saidTired:false,yawnGap:20,singGap:0,head:null};
function sfx(n,o,gap){var now=time;if(sfxT[n]!=null&&now-sfxT[n]<(gap||0.25))return;sfxT[n]=now;play(n,o);}
function frPts(img){return (S.friend&&S.friend.p[img])|0;}
function frLv(img){var n=frPts(img);return n>=40?3:n>=15?2:n>=5?1:0;}
function persInit(c){var P=persOf(c.img);c.pers=P;c.pat*=P.pat*(frLv(c.img)>=2?1.1:1);c.blink=0;c.nb=1+Math.random()*3;c.emo='';c.emoT=0;c.wv=0;c.hop=0;c.st=0;c.pout=0;c.mz=0;c.bt=0;return c;}
function emote(a,k,d){a.emo=k;a.emoT=d||1.2;}
function goodOf(a){return a&&a.good?a.good.id:(unlockedGoods()[0]||{}).id;}
function bubVars(a){var tv=new Date().getHours(),pet=S.pets.on,v={good:goodOf(a),planet:1,time:tv<11?0:tv<16?1:tv<20?2:3};if(pet)v.pet=pet;if(S.cos.boat&&S.cos.boat!=='classic')v.boat=S.cos.boat;return v;}
// non-blocking thought bubble with a cap: max 2 alien bubbles + 1 for Fang at once
function bubble(a,cat,force){var list=POOL[cat];if(!list)return false;var fg=!a;
  if(fg){if(BUBS.some(function(b){return !b.a;}))return false;}
  else{if(a.dock||BUBS.filter(function(b){return b.a;}).length>=2||(!force&&bubGap>0)||BUBS.some(function(b){return b.a===a;}))return false;}
  var v=bubVars(a);if(/\{pet\}/.test(list[0][0])&&!v.pet)return false;if(/\{boat\}/.test(list[0][0])&&!v.boat)return false;
  var i=Math.floor(Math.random()*list.length);if(list.length>1&&bubLast[cat]===i)i=(i+1)%list.length;bubLast[cat]=i;
  BUBS.push({a:a||null,c:cat,i:i,v:v,t:0,life:fg?2.6:2.4});if(!fg)bubGap=0.7;sfx('r_bubble',{vol:0.35},0.4);return true;}
function bubText(b){var L=S.lang==='en'?1:0,s=POOL[b.c][b.i][L],v=b.v;
  return s.replace(/\{(\w+)\}/g,function(m,k){var x=v[k];if(k==='good')return t(x);if(k==='planet')return t(PL().name);if(k==='pet')return t('pet_'+x);if(k==='boat')return t('boat_'+x);if(k==='time')return TIMEW[L?'en':'th'][x];return '';});}
var SEG=typeof Intl!=='undefined'&&Intl.Segmenter?new Intl.Segmenter('th',{granularity:'word'}):null;
function wrapTxt(s,mw){var key=s+'|'+mw;if(WRAP[key])return WRAP[key];var parts=SEG?Array.from(SEG.segment(s),function(x){return x.segment;}):s.split(/(?= )/),lines=[],cur='';
  parts.forEach(function(p){var tryS=cur+p;if(cur&&cx.measureText(tryS).width>mw){lines.push(cur.trim());cur=p.trimStart?p.trimStart():p;}else cur=tryS;});if(cur)lines.push(cur.trim());
  if(Object.keys(WRAP).length>300)WRAP={};WRAP[key]=lines;return lines;}
function drawBubbles(dt){bubGap=Math.max(0,bubGap-dt);
  for(var i=BUBS.length-1;i>=0;i--){var b=BUBS[i];b.t+=dt;if(b.t>b.life)BUBS.splice(i,1);}
  BUBS.forEach(function(b){var ax,ay,dir,al=Math.min(1,b.t/0.15,(b.life-b.t)/0.3),sc=0.7+0.3*ease(Math.min(1,b.t/0.18));
    if(b.a){var a=b.a,live=aliens.indexOf(a)>=0||dockC.indexOf(a)>=0||a===kingC;if(live){var p=custPos(a);b.px=p.x;b.py=p.y-p.w*0.55;b.pw=p.w;al*=Math.min(1,p.al*1.5);}if(b.px==null)return;ax=b.px;ay=b.py;dir=ax<W/2?1:-1;}
    else{if(!fang.head)return;ax=fang.head.x;ay=fang.head.y;dir=ax<W*0.6?1:-1;}
    var fs=Math.round(Math.max(12,Math.min(15,W*0.034)));cx.font='600 '+fs+'px Kanit,sans-serif';
    var lines=wrapTxt(bubText(b),Math.min(170,W*0.4)),tw=0;lines.forEach(function(l){tw=Math.max(tw,cx.measureText(l).width);});
    var bw=tw+20,bh=lines.length*fs*1.25+12,off=b.a?b.pw*0.42:18,bx=ax+dir*(off+bw/2),by=ay-(b.a?bh*0.3:bh*0.5+26);
    bx=Math.max(bw/2+4,Math.min(W-bw/2-4,bx));by=Math.max(bh/2+HUDY(),by);
    cx.save();cx.globalAlpha=Math.max(0,al)*0.96;cx.translate(bx,by);cx.scale(sc,sc);
    cx.fillStyle='#fffaf0';cx.strokeStyle='#121c4a';cx.lineWidth=2;rrect(-bw/2,-bh/2,bw,bh,Math.min(14,bh/2));cx.fill();cx.stroke();
    var tx=(ax-bx)/sc,ty=(ay-by)/sc;[0.45,0.7].forEach(function(k,j){var r=j?2.6:4;cx.beginPath();cx.arc(tx*k+(j?0:0),bh/2*(1-k)+ty*k*0.5+ (j?4:2),r,0,6.283);cx.fill();cx.stroke();});
    cx.fillStyle='#121c4a';cx.textAlign='center';cx.textBaseline='middle';lines.forEach(function(l,k){cx.fillText(l,0,-bh/2+6+fs*1.25*(k+0.5));});
    cx.restore();});cx.globalAlpha=1;}
function HUDY(){return Math.max(60,H*0.1);}
// ---------- procedural faces ----------
var INK='#2b1b33';
function eyeOpen(x,y,rx,ry,s){cx.fillStyle=INK;cx.beginPath();cx.ellipse(x,y,rx*s,ry*s,0,0,6.283);cx.fill();
  cx.fillStyle='#fff';cx.beginPath();cx.arc(x-rx*s*0.3,y-ry*s*0.35,Math.max(0.7,Math.min(rx,ry)*s*0.4),0,6.283);cx.fill();}
function drawFace(F,x0,y0,w,h,ex,o){if(!F)return;var lw=Math.max(1,o.lw||1),e=F.e,m=F.m,mid=0;cx.lineCap='round';cx.lineJoin='round';cx.lineWidth=lw;cx.strokeStyle=INK;
  e.forEach(function(q){mid+=q[0];});mid/=e.length;
  e.forEach(function(q){var x=x0+q[0]*w,y=y0+q[1]*h,rx=Math.max(1.3,q[2]*w),ry=Math.max(1.7,q[3]*h),side=q[0]<mid?-1:1;
    if(ex==='love'){cx.fillStyle='#ff7eb6';heart(x,y+ry*0.1,Math.max(rx,ry)*1.05*(1+0.12*Math.sin(time*9)));return;}
    if(o.blink||ex==='happy'||ex==='yawn'){cx.strokeStyle=INK;cx.beginPath();cx.moveTo(x-rx*1.1,y);cx.quadraticCurveTo(x,y+(ex==='happy'?-ry*1.4:ry*0.9),x+rx*1.1,y);cx.stroke();return;}
    var s=ex==='surprised'?1.3:1;eyeOpen(x,y,rx,ry,s);
    if(ex==='impatient'||ex==='sad'||ex==='sleepy'){var k=ex==='impatient'?-side*0.45:ex==='sad'?side*0.45:0,ly=y-ry*(ex==='sleepy'?0.05:0.3);
      cx.save();cx.beginPath();cx.ellipse(x,y,rx*1.35,ry*1.35,0,0,6.283);cx.clip();cx.fillStyle=F.sk;cx.beginPath();cx.moveTo(x-rx*1.6,ly-k*1.6*ry);cx.lineTo(x+rx*1.6,ly+k*1.6*ry);cx.lineTo(x+rx*1.6,y-ry*2);cx.lineTo(x-rx*1.6,y-ry*2);cx.closePath();cx.fill();
      cx.beginPath();cx.moveTo(x-rx*1.2,ly-k*1.2*ry);cx.lineTo(x+rx*1.2,ly+k*1.2*ry);cx.stroke();cx.restore();}});
  var mx=x0+m[0]*w,my=y0+m[1]*h,mw=Math.max(2.5,m[2]*w*0.5);cx.strokeStyle=INK;cx.fillStyle=INK;
  if(o.talk>0&&ex!=='yawn'){var k2=o.talk;cx.beginPath();cx.ellipse(mx,my+mw*0.15,mw*0.7,Math.max(0.8,mw*(0.15+0.55*k2)),0,0,6.283);cx.fill();}
  else if(ex==='happy'||ex==='love'){cx.beginPath();cx.moveTo(mx-mw,my-mw*0.1);cx.quadraticCurveTo(mx,my+mw*1.5,mx+mw,my-mw*0.1);cx.closePath();cx.fill();
    cx.fillStyle='#ff8fa6';cx.beginPath();cx.ellipse(mx,my+mw*0.45,mw*0.4,mw*0.22,0,0,6.283);cx.fill();}
  else if(ex==='surprised'){cx.beginPath();cx.ellipse(mx,my+mw*0.2,mw*0.42,mw*0.55,0,0,6.283);cx.fill();}
  else if(ex==='yawn'){cx.beginPath();cx.ellipse(mx,my+mw*0.3,mw*0.6,mw*0.85,0,0,6.283);cx.fill();}
  else if(ex==='sad'){cx.beginPath();cx.moveTo(mx-mw*0.7,my+mw*0.4);cx.quadraticCurveTo(mx,my-mw*0.35,mx+mw*0.7,my+mw*0.4);cx.stroke();}
  else if(ex==='impatient'){cx.beginPath();cx.moveTo(mx-mw*0.7,my+mw*0.1);cx.quadraticCurveTo(mx-mw*0.35,my-mw*0.2,mx,my+mw*0.1);cx.quadraticCurveTo(mx+mw*0.35,my+mw*0.4,mx+mw*0.7,my+mw*0.1);cx.stroke();}
  else if(ex==='sleepy'){cx.beginPath();cx.moveTo(mx-mw*0.5,my+mw*0.1);cx.lineTo(mx+mw*0.5,my+mw*0.1);cx.stroke();}
  else{cx.beginPath();cx.moveTo(mx-mw*0.75,my);cx.quadraticCurveTo(mx,my+mw*0.7,mx+mw*0.75,my);cx.stroke();}
  if(o.extra){var ex0=0,ey0=1;e.forEach(function(q){ex0=Math.max(ex0,q[0]);ey0=Math.min(ey0,q[1]);});
    if(ex==='impatient'){var dx=x0+Math.min(.95,ex0+.1)*w,dy=y0+(ey0-.06)*h,ds=w*0.045;cx.fillStyle='#bfe8ff';cx.strokeStyle='#5b8fc9';cx.lineWidth=Math.max(1,lw*0.7);
      cx.beginPath();cx.moveTo(dx,dy-ds*1.4);cx.quadraticCurveTo(dx+ds,dy,dx,dy+ds*0.6);cx.quadraticCurveTo(dx-ds,dy,dx,dy-ds*1.4);cx.fill();cx.stroke();}
    if(ex==='sad'){var q0=e[0],tx=x0+q0[0]*w,ty=y0+q0[1]*h+q0[3]*h*1.5+((time*30)%(h*0.12)),ts=w*0.028;cx.fillStyle='#bfe8ff';cx.beginPath();cx.arc(tx,ty,ts,0,6.283);cx.fill();}}
}
// ---------- rigs (cut once into cached canvases, cheap on mobile) ----------
var RIG={};
function mkCanvas(w,h){var c=document.createElement('canvas');c.width=Math.max(1,w);c.height=Math.max(1,h);return c;}
function cutRect(src,w,h,R){var x0=Math.round(R[0]*w),y0=Math.round(R[1]*h),x1=Math.round(R[2]*w),y1=Math.round(R[3]*h),c=mkCanvas(x1-x0,y1-y0);c.getContext('2d').drawImage(src,-x0,-y0);
  return {c:c,x:x0/w,y:y0/h,w:(x1-x0)/w,h:(y1-y0)/h,px:R[4],py:R[5],r:[x0,y0,x1-x0,y1-y0]};}
function alienRig(n,gold){var key=n+(gold?'*':'');if(RIG[key])return RIG[key];var src=gold?goldOf(n+'_nf'):IMG[n+'_nf'];if(!ok(src)||!FACES[n])return null;
  var w=iw(src),h=ih(src),r={im:src},A=ARMS[n];
  if(A){var b=mkCanvas(w,h),bx=b.getContext('2d');bx.drawImage(src,0,0);r.arm=cutRect(src,w,h,A);bx.clearRect.apply(bx,r.arm.r);r.im=b;}
  RIG[key]=r;return r;}
function petRig(id){var key='pet_'+id;if(RIG[key])return RIG[key];var src=IMG[key+'_nf'];if(!ok(src))return null;var w=iw(src),h=ih(src),r={im:src,parts:[]},P=PETR[id];
  if(P){var b=mkCanvas(w,h),bx=b.getContext('2d');bx.drawImage(src,0,0);(P.tail?[P.tail]:P.ears).forEach(function(R){var c=cutRect(src,w,h,R);bx.clearRect.apply(bx,c.r);r.parts.push(c);});r.im=b;}
  RIG[key]=r;return r;}
function drawPart(pt,x0,y0,w,h,ang){cx.save();cx.translate(x0+pt.px*w,y0+pt.py*h);cx.rotate(ang);cx.drawImage(pt.c,(pt.x-pt.px)*w,(pt.y-pt.py)*h,pt.w*w,pt.h*h);cx.restore();}
function drawPet(id,pw,ph){var r=petRig(id),x0=-pw/2,y0=-ph;if(!r){var pi=IMG['pet_'+id];if(ok(pi))cx.drawImage(pi,x0,y0,pw,ph);return;}
  var im=r.im,W0=iw(im),H0=ih(im);
  if(id==='octo'){var cut=0.56,cy=Math.round(H0*cut),N=14,sh=(H0-cy)/N;cx.drawImage(im,0,0,W0,cy,x0,y0,pw,ph*cut+0.5);
    for(var j=0;j<N;j++){var k=(j+0.5)/N,dx=Math.sin(time*5-j*0.55)*pw*0.035*k;cx.drawImage(im,0,cy+j*sh,W0,sh+0.6,x0+dx-pw*0.01*k,y0+ph*cut+j*sh*ph/H0,pw*(1+0.02*k),sh*ph/H0+0.6);}}
  else if(id==='bird'){var NC=12,cw=W0*0.5/NC;for(var c=0;c<NC;c++){var kk=1-c/NC,dy=Math.sin(time*7-c*0.6)*ph*0.04*kk;cx.drawImage(im,c*cw,0,cw+0.6,H0,x0+c*cw*pw/W0,y0+dy,cw*pw/W0+0.6,ph);}
    var fl=Math.sin(time*9),hw=W0*0.5;cx.save();cx.translate(x0+pw*0.75,y0+ph*0.5);cx.scale(1-0.05*fl,1+0.09*fl);cx.drawImage(im,hw,0,W0-hw,H0,-pw*0.25,-ph*0.5,pw*0.5,ph);cx.restore();}
  else{cx.drawImage(im,x0,y0,pw,ph);
    if(id==='cat'&&r.parts[0])drawPart(r.parts[0],x0,y0,pw,ph,Math.sin(time*(fang.cheer>0?14:6))*0.32);
    if(id==='bunny'){var tw=function(o){var c=(time+o)%3.2;return c<0.35?Math.sin(c/0.35*Math.PI*2)*0.22:Math.sin(time*1.3+o)*0.03;};
      r.parts.forEach(function(pt,i){drawPart(pt,x0,y0,pw,ph,(i?1:-1)*tw(i*1.3));});}}
  var ex=fang.cheer>0||fang.sing>0?'happy':'neutral';
  drawFace(FACES['pet_'+id],x0+(id==='bird'?0:0),y0,pw,ph,ex,{blink:fang.blink>0,lw:pw*0.022});
}
function fangRig(name,tn){if(RIG[name])return RIG[name];var F=FANG[tn],im=IMG[name],ir=IMG[name+'_r'];if(!F||!ok(im)||!ok(ir))return null;
  var w=iw(im),h=ih(im),a=F.pad[0],b=F.pad[1],r=F.padw*w,xs=[],ys=[];
  function add(x,y,m){xs.push(x-m,x+m);ys.push(y-m,y+m);}
  // the paddle and the body are cut to their own small boxes so each frame only redraws a few small pieces (cheap on phones)
  add(a[0]*w,a[1]*h,r+2);add(b[0]*w,b[1]*h,r+2);if(F.blade)F.blade.forEach(function(pt){add(pt[0]*w,pt[1]*h,2);});add(F.hand[0]*w,F.hand[1]*h,Math.max(F.hand[2]*w,F.hand[3]*h)+2);
  function box(){var x=Math.max(0,Math.floor(Math.min.apply(0,xs))),y=Math.max(0,Math.floor(Math.min.apply(0,ys)));return [x,y,Math.min(w,Math.ceil(Math.max.apply(0,xs)))-x,Math.min(h,Math.ceil(Math.max.apply(0,ys)))-y];}
  var pb=box(),pad=mkCanvas(pb[2],pb[3]),p=pad.getContext('2d');p.translate(-pb[0],-pb[1]);
  function piece(fn){p.save();p.beginPath();fn();p.clip();p.drawImage(im,0,0);p.restore();}
  piece(function(){var ax=a[0]*w,ay=a[1]*h,bx=b[0]*w,by=b[1]*h,an=Math.atan2(by-ay,bx-ax),nx=-Math.sin(an)*r,ny=Math.cos(an)*r;
    p.moveTo(ax+nx,ay+ny);p.lineTo(bx+nx,by+ny);p.arc(bx,by,r,an+Math.PI/2,an-Math.PI/2,true);p.lineTo(ax-nx,ay-ny);p.arc(ax,ay,r,an-Math.PI/2,an+Math.PI/2,true);p.closePath();});
  if(F.blade)piece(function(){F.blade.forEach(function(pt,i){p[i?'lineTo':'moveTo'](pt[0]*w,pt[1]*h);});p.closePath();});
  piece(function(){var hd=F.hand;p.ellipse(hd[0]*w,hd[1]*h,hd[2]*w,hd[3]*h,0,0,6.283);});
  xs=[];ys=[];F.body.forEach(function(pt){add(pt[0]*w,pt[1]*h,1);});var bb=box(),body=mkCanvas(bb[2],bb[3]),q=body.getContext('2d');q.translate(-bb[0],-bb[1]);
  q.beginPath();F.body.forEach(function(pt,i){q[i?'lineTo':'moveTo'](pt[0]*w,pt[1]*h);});q.closePath();q.clip();q.drawImage(ir,0,0);
  RIG[name]={base:ir,pad:pad,pb:[pb[0]/w,pb[1]/h,pb[2]/w,pb[3]/h],body:body,bb:[bb[0]/w,bb[1]/h,bb[2]/w,bb[3]/h],F:F};return RIG[name];}
function fangExpr(){if(fang.yawn>0)return 'yawn';if(fang.emoT>0)return fang.emo;if(fang.cheer>0||fang.sing>0)return 'happy';
  if(fang.tired>0&&(time%9)<4)return 'sleepy';if(phase==='port'&&fang.idle>9)return 'sleepy';return 'neutral';}
// ---------- the brain: mood state machine per customer + Fang ----------
function baseMood(a){var P=a.pers||PERS.curious,th=P.th||[.45,.75],f=a.t/Math.max(0.1,a.pat);
  if(a.vip)return f>th[1]?'impatient':'happy';
  if(f>th[1])return 'sad';if(f>th[0])return 'impatient';
  if(nightS>0.5&&P===PERS.dreamy)return 'sleepy';
  if(frLv(a.img)>=2||(a.likes&&stock[a.good.id]>0))return 'happy';return 'neutral';}
function exprOf(a){if(a.st>0)return 'surprised';if(a.emoT>0)return a.emo;if(a.state==='out')return a.love?'love':'happy';if(a.state==='pass')return 'sad';
  if(a.state==='in')return frLv(a.img)>=2?'happy':'neutral';return baseMood(a);}
function brainCust(a,dt){if(a.blink>0)a.blink-=dt;else{a.nb-=dt;if(a.nb<=0){a.blink=0.12;a.nb=1.8+Math.random()*3.5;}}
  if(a.emoT>0)a.emoT-=dt;if(a.wv>0)a.wv-=dt;if(a.hop>0)a.hop=Math.max(0,a.hop-dt*2.2);if(a.st>0)a.st=Math.max(0,a.st-dt);if(a.pout>0)a.pout=Math.max(0,a.pout-dt);
  if(a.state==='out'&&!a.byeDone&&a.t>0.15){a.byeDone=1;a.wv=1;}
  if(a.state!=='wait'||a.dock)return;
  var P=a.pers||PERS.curious,th=P.th||[.45,.75],f=a.t/Math.max(0.1,a.pat),mz=f>th[1]?2:f>th[0]?1:0;
  if(mz>a.mz){a.mz=mz;if(mz===1){a.pout=0.8;sfx('r_pout',{vol:0.45},1.2);a.wv=0.9;if(Math.random()<0.5)bubble(a,Math.random()<0.3&&P===PERS.impatient?'impatient':'wait');}
    else{sfx('r_pout',{vol:0.35,rate:0.85},1.2);if(Math.random()<0.4)bubble(a,'wait');}}
}
function onArrive(a){if(a.dock){a.wv=0.6;return;}a.wv=1.3;sfx('r_wave',{vol:0.45},0.6);var lv=frLv(a.img),P=a.pers||PERS.curious;
  if(lv>=2&&Math.random()<0.75){bubble(a,lv>=3?'best':'reg');if(!trip||!trip.regSaid){if(trip)trip.regSaid=1;if(Math.random()<0.5)say('regular',8000);}return;}
  if(Math.random()>P.chat*0.75)return;
  var c=[];if(a.likes&&stock[a.good.id]>0)c.push('fav','fav');if(S.pets.on){c.push('pet');if(P===PERS.curious)c.push('pet');}if(S.cos.boat&&S.cos.boat!=='classic')c.push('boat');
  if(nightS>0.5)c.push('night','night');if(isWk())c.push('meteor');c.push('greet','greet','time',PTYPE[a.img]||'curious');
  var k=c[Math.floor(Math.random()*c.length)];if(bubble(a,k)&&(k==='pet'||k==='boat'||k==='fav'))emote(a,'love',1.3);}
function onLeaveSad(a){if(a.dock)return;emote(a,'sad',1);if(Math.random()<0.35)bubble(a,'sad');fang.emo='sad';fang.emoT=1.1;if(Math.random()<0.25)say('sorry',9000);}
// returns extra coins from friendship (added as a tip)
function onServed(a,byStaff,amt){var fav=a.likes&&!a.order,P=a.pers||PERS.curious,lv0=frLv(a.img),extra=0;
  a.hop=1;a.love=fav||lv0>=3;emote(a,a.love?'love':'happy',0.9);sfx('r_hop',{vol:0.55,rate:0.95+Math.random()*0.2},0.15);
  if(!a.dock){if(fav&&P.fav)extra+=Math.round(amt*0.25);if(lv0>=2)extra+=Math.round(amt*(lv0>=3?0.3:0.15));if(P.tip>1&&a.t<a.pat*0.4)extra+=Math.round(amt*(P.tip-1)*0.5);
    if(Math.random()<(a.love?0.5:0.3))bubble(a,a.love?'love':'happy');
    allCust().forEach(function(b){if(b!==a&&!b.dock&&b.state==='wait'&&b.born<a.born&&!b.envied&&Math.random()<(b.pers||PERS.curious).envy){b.envied=1;b.pout=1.2;emote(b,'impatient',1.6);sfx('r_pout',{vol:0.5},0.8);bubble(b,'envy',true);}});}
  // friendship
  if(!S.friend)S.friend={p:{},g:0};var inc=(fav?2:1)+(P.fr&&Math.random()<0.5?1:0);if(a.dock)inc=Math.random()<0.5?1:0;
  S.friend.p[a.img]=frPts(a.img)+inc;var lv=frLv(a.img),p=custPos(a);
  if(lv>lv0){sparkle(p.x,p.y-p.w*0.4,22);sfx('r_heart',{vol:0.8},0.3);floats.push({x:p.x,y:p.y-p.w*0.9,txt:t('fr'+lv),t:-0.3,big:true});toast(t('frUp',{l:t('fr'+lv)}));
    if(lv===3)say('friend',0);else if(lv===2)say('yay2',2500);hudDirty=true;}
  else if(!a.dock&&lv>=2&&Math.random()<(lv>=3?0.2:0.1)){ // regulars sometimes bring a small gift
    var gem=lv>=3&&Math.random()<0.5,n=gem?addGems(1):Math.max(1,Math.round(bestPrice()*3*incMul()));if(!gem)addCoins(n);S.friend.g=(S.friend.g|0)+1;if(trip&&!gem)trip.earned+=n;
    floats.push({x:p.x,y:p.y-p.w*0.95,txt:t('frGift',{n:gem?n+' '+t('gemW'):fmt(n)}),t:-0.45,big:false});sfx('r_heart',{vol:0.7},0.3);sparkle(p.x,p.y-p.w*0.5,14);say('present',4000);bubble(a,'gift',true);}
  if(!byStaff){fang.cheer=0.7;var now=time;fang.sales.push(now);fang.sales=fang.sales.filter(function(x){return now-x<8;});
    if(fang.sales.length>=4&&fang.singGap<=0){fang.sing=4;fang.singGap=25;sfx('r_sing',{vol:0.6},2);if(Math.random()<0.5)say('sing',3000);else bubble(null,'fsing');}}
  return extra;}
function brainBump(o){fang.emo='surprised';fang.emoT=0.9;if(Math.random()<0.4)say('oops',5000);var any=false;
  allCust().forEach(function(a){if(a.state==='wait'||a.state==='in'){a.st=0.7;any=true;}});if(any){sfx('r_startle',{vol:0.6},0.5);var w=aliens.filter(function(a){return a&&a.state==='wait';});if(w.length)bubble(w[Math.floor(Math.random()*w.length)],'startle',true);}}
function brainNight(){var w=aliens.filter(function(a){return a&&a.state==='wait';});if(w.length)bubble(w[0],'night');}
function fangExcited(isNew){fang.emo=isNew?'surprised':'happy';fang.emoT=isNew?2.4:1.2;fang.cheer=0.8;if(isNew){bubble(null,'fexcited');setTimeout(function(){say('excited',0);},2300);}}
var meteorBT=8;
window.addEventListener('pointerdown',function(){fang.idle=0;},true);
function brainTick(dt){
  if(fang.blink>0)fang.blink-=dt;else{fang.nb-=dt;if(fang.nb<=0){fang.blink=0.13;fang.nb=2+Math.random()*3.5;}}
  var moving=phase==='travel'&&spd>0.15;fang.pad+=dt*(moving?2.4+spd*0.5:0.9);
  ['cheer','talk','yawn','emoT','sing','singGap','tired'].forEach(function(k){if(fang[k]>0)fang[k]=Math.max(0,fang[k]-dt);});fang.yawnGap-=dt;
  if(phase==='port'){fang.idle+=dt;fang.tripT=0;fang.saidTired=false;if(fang.idle>14&&fang.yawnGap<=0&&!openPanel&&!splashOn){fang.yawn=1.8;fang.yawnGap=45;say('yawn',3000);sfx('r_bubble',{vol:0.3},1);bubble(null,'fyawn');}}
  else if(phase==='travel'){fang.idle=0;fang.tripT+=dt;if(fang.tripT>70&&!fang.saidTired){fang.saidTired=true;fang.tired=30;say('tired',4000);bubble(null,'ftired');}}
  // meteors (weekend shower) and near-miss obstacles
  if(isWk()&&phase==='travel'){meteorBT-=dt;if(meteorBT<=0){meteorBT=14+Math.random()*10;var w=aliens.filter(function(a){return a&&a.state==='wait';});if(w.length){var a=w[Math.floor(Math.random()*w.length)];emote(a,'surprised',0.9);bubble(a,'meteor');}}}
  obs.forEach(function(o){if(o.seen||o.k==='crate')return;var d=o.z-dist;if(d<0.2){o.seen=1;if(!o.done&&Math.abs(o.u-boatU)>=0.72){var w=aliens.filter(function(a){return a&&a.state==='wait';});
    if(w.length&&Math.random()<0.6){var a=w[Math.floor(Math.random()*w.length)];a.st=0.45;sfx('r_startle',{vol:0.35,rate:1.15},1);bubble(a,'phew');}}}});
}

// ---------- canvas + projection ----------
var cv=document.getElementById('scene'),cx=cv.getContext('2d'),W=0,H=0,DPR=1;
var game=document.getElementById('game');
var HY=0,BY=0,KX=0,Z0=6,DF=64,RW=2.3;
function resize(){
  var r=game.getBoundingClientRect();W=r.width;H=r.height;DPR=Math.min(2,window.devicePixelRatio||1);
  cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);cx.setTransform(DPR,0,0,DPR,0,0);
  layout();
}
window.addEventListener('resize',resize);
var L={};
function layout(){
  HY=H*0.25;BY=H*0.66;KX=W*0.2;
  var T=tierOf(),bw=Math.min(W*0.52,H*0.29)*T.sz;L.boat={x:W*0.5,y:BY,w:bw,h:bw*T.ar};
  L.slots=[[.2,.40],[.8,.38],[.83,.54],[.17,.555]].map(function(s){return {x:W*s[0],y:H*s[1],w:Math.min(W*0.24,H*0.135)};});
  L.dslots=[[.2,.33],[.5,.36],[.8,.33],[.24,.50],[.76,.50]].map(function(s){return {x:W*s[0],y:H*s[1],w:Math.min(W*0.22,H*0.125)};});
  var cb=document.getElementById('pill-coin').getBoundingClientRect(),gr=game.getBoundingClientRect();
  L.coinTarget={x:cb.left-gr.left+20,y:cb.top-gr.top+20};
}
function rc(z){return 8*Math.sin(z*0.02)+3*Math.sin(z*0.057+1)+1.2*Math.sin(z*0.13+2);}
function rcd(z){return 0.16*Math.cos(z*0.02)+0.171*Math.cos(z*0.057+1)+0.156*Math.cos(z*0.13+2);}
var camX=0;
function pOf(d){return Z0/(d+Z0);}
function proj(z,u){var d=z-dist,p=pOf(d);return {x:W/2+(rc(z)+u-camX)*KX*p,y:HY+(BY-HY)*p,p:p,d:d};}
function hash(n){var x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);}

// ---------- world + trip state ----------
var phase='port',spd=0,holding=false,holdAcc=0,time=0,paused=false;
var trip=null,stock={};GOODS.forEach(function(g){stock[g.id]=0;});
var piers=[{z:dist+1.4,side:-1,kind:'home'}],gifts=[],ripples=[],fx=[],floats=[];
var aliens=[null,null,null,null],dockC=[null,null,null,null,null],spawnT=1.5,giftT=5,staffT=[0,0],staffHop=[0,0];
var dockT=0,combo=0,comboT=0,comboPop=0,banner=null,boatSquash=0,vipWin=0,vipNext=25,emptyNoted=false,rippleT=0;
var warp=[],flow=[];
var lane=0,boatU=0,obs=[],obNext=0,bumpT=0,meteors=[],meteorT=0,wkForce=null,sw=null;
var fork=null,forkNext=0,nightForce=null,nightS=0,wasNight=false,ffs=[],ffT=2,bookNew=false,GOLD={};
for(var i=0;i<80;i++)warp.push(newWarp(Math.random()));
for(i=0;i<170;i++)flow.push(newFlow(dist-3+Math.random()*(DF+3)));
function newWarp(z){return {x:Math.random()*2-1,y:-Math.random()*0.9-0.05,z:z||1,r:Math.random()*1.4+0.5};}
function newFlow(z){return {z:z,u:(Math.random()*2-1)*RW*0.92,r:Math.random()*1.6+0.7,h:Math.random()};}

function iceOn(){return !!PL().lanes;}
function forkOn(){return !!PL().fork;}
// ---------- stage 5: Lava Volcano Planet (hot goods + lava bubbles), kings, New Legend ----------
function lavaOn(){return !!PL().lava;}
var lbs=[],lbNext=0,kingC=null,kingAdUsed=false;
function gById(id){for(var i=0;i<GOODS.length;i++)if(GOODS[i].id===id)return GOODS[i];return null;}
function heatOf(id){return (trip&&trip.heat&&trip.heat[id]!=null)?trip.heat[id]:1;}
function heatMul(id){var g=gById(id);if(!g||!g.hot)return 1;return 0.6+0.4*Math.min(1,heatOf(id)/0.5);} // hot = full price; cold still sells (gentle)
function crownCount(){var n=0;for(var k in S.king)if(S.king[k]&&S.king[k].c>0)n++;return n;}
function kingOf(n){return S.king[n]||{c:0,at:0};}
function kingLeft(n){var K=kingOf(n),rt=S.routes[n]||{trips:0};return K.c?Math.max(0,KING_EVERY-(rt.trips+1-K.at)):Math.max(0,PLANETS[n].trips-(rt.trips+1));}
function kingDue(n){return kingLeft(n)<=0;}
function reserveKing(){ // pack the royal basket from the loaded cargo (kept apart from normal sales)
  var ids=PG().filter(function(g){return stock[g.id]>0;}).sort(function(a,b){return stock[b.id]-stock[a.id];}).slice(0,3).map(function(g){return g.id;});if(!ids.length)return;
  var tot=stockTotal(),N=Math.max(3,Math.min(6+2*S.planet,Math.floor(tot*0.4))),q={},i=0,guard=0;
  while(N>0&&guard++<400){var id=ids[i%ids.length];i++;if(stock[id]>0){stock[id]--;q[id]=(q[id]||0)+1;N--;}else if(ids.every(function(x){return stock[x]<=0;}))break;}
  trip.king={q:ids.filter(function(id){return q[id];}).map(function(id){return {id:id,n:q[id],got:0};})};
  void IMG['king'+S.planet];void IMG['king'+S.planet+'_nf'];
  setTimeout(function(){toast(t('kingSoon'));say('kingsoon',0);},1800);
}
function kingTotal(k){var n=0;k.q.forEach(function(x){n+=x.n;});return n;}
function kingPick(){var r=kingC.q.filter(function(x){return x.got<x.n;});if(!r.length)return;var cur=kingC.good&&kingC.good.id,c=r.filter(function(x){return x.id!==cur;});
  var p=(c.length&&Math.random()<0.7?c:r)[Math.floor(Math.random()*(c.length&&Math.random()<0.7?c:r).length)]||r[0];kingC.good=gById(p.id);}
function startKing(){
  var n=S.planet,N=kingTotal(trip.king);kingAdUsed=false;
  kingC={img:KINGS[n].img,king:1,n:n,state:'in',t:0,pat:6+1.6*N,q:trip.king.q,ph:0,born:time,pers:PERS[KINGS[n].pers],mz:0,blink:0,nb:2,emo:'',emoT:0,hop:0,st:0,pout:0,wv:0};
  kingPick();phase='king';spd=0;holding=false;
  play('kingfan');setTimeout(function(){say('king',0);},500);setTimeout(function(){if(kingC)bubble(kingC,'k'+n,true);},1300);sparkle(W/2,H*0.4,40);hudDirty=true;
}
function kingPos(a){var w=Math.min(W*0.5,260),x=W/2,y=H*0.42+Math.sin(time*1.6)*4,al=1,sc=1;
  if(a.state==='in'){var k=ease(Math.min(1,a.t/0.8));sc=0.3+0.7*k;al=k;y+=(1-k)*-H*0.1;}
  if(a.state==='out'){var k2=ease(Math.min(1,a.t/1.2));y-=k2*H*0.25;al=1-k2;}
  if(a.state==='pass'){var k3=Math.min(1,a.t/1);y+=k3*H*0.15;al=1-k3;}
  return {x:x,y:y,w:w*sc,al:al};}
function kingGive(id){
  if(!kingC||kingC.state!=='wait')return;var it=null;kingC.q.forEach(function(x){if(x.id===id&&x.got<x.n)it=x;});
  var p=kingPos(kingC);
  if(!it||!kingC.good||id!==kingC.good.id){play('nope');kingC.t=Math.min(kingC.pat-0.5,kingC.t+1);kingC.pout=0.8;emote(kingC,'impatient',0.8);floats.push({x:p.x,y:p.y-p.w*0.5,txt:t('kingWrong'),t:0});return;}
  it.got++;play('sell',{rate:1+0.04*it.got});kingC.hop=1;emote(kingC,'happy',0.6);sparkle(p.x,p.y-p.w*0.3,10);coinBurst(p.x,p.y-p.w*0.2,2);
  if(kingC.q.every(function(x){return x.got>=x.n;})){kingWin();return;}
  kingPick();hudDirty=true;
}
function kingWin(){
  var n=kingC.n,N=kingTotal(kingC),K=S.king[n]||(S.king[n]={c:0,at:0}),first=!K.c;K.c++;K.at=RT().trips+1;
  var amt=Math.round(Math.max(1,bestPrice())*(25+4*N)*incMul());addCoins(amt);trip.earned+=amt;var g=addGems(first?KING_GEMS:5);
  trip.king.done=1;kingC.state='out';kingC.t=0;kingC.love=true;play('crown');play('fanfare',{vol:0.6});say('kingwin',0);bubble(kingC,'kwin',true);
  sparkle(W/2,H*0.35,70);coinBurst(W/2,H*0.4,16);fangExcited(false);save();
  setTimeout(function(){open('_king',{win:1,n:n,c:amt,g:g,first:first});},1100);hudDirty=true;
}
function kingFail(){
  var n=kingC.n,paid=0;kingC.q.forEach(function(x){paid+=goodPrice(gById(x.id),S.goods[x.id])*x.got*heatMul(x.id);});paid=Math.round(paid*incMul());
  if(paid>0){addCoins(paid);trip.earned+=paid;}trip.king.done=1;kingC.state='pass';kingC.t=0;emote(kingC,'sad',1.2);
  play('nope',{vol:0.6});say('kingfail',0);bubble(kingC,'kfail',true);save();
  setTimeout(function(){open('_king',{win:0,n:n,c:paid});},1000);hudDirty=true;
}
function drawKing(){
  var a=kingC,p=kingPos(a);if(p.al<=0)return;
  cx.globalCompositeOperation='lighter';glow('gold',p.x,p.y,p.w*0.9,0.55*p.al);cx.globalCompositeOperation='source-over';cx.globalAlpha=1;
  drawAlien(a,p,a.shake?Math.sin(a.shake*30)*6*a.shake:0);
  if(a.state!=='wait')return;
  var n=a.q.length,ir=Math.max(17,Math.min(26,W*0.055)),gap=ir*2.5,bw=n*gap+ir*0.6,bh=ir*3.1,bx=W/2,by=Math.max(HUDY()+bh/2+14,p.y-p.w*0.62-bh/2);
  cx.save();cx.translate(bx,by);
  cx.globalCompositeOperation='lighter';glow('gold',0,0,bw*0.8,0.4);cx.globalCompositeOperation='source-over';cx.globalAlpha=1;
  cx.fillStyle='#fffaf0';rrect(-bw/2,-bh/2,bw,bh,bh*0.3);cx.fill();cx.beginPath();cx.moveTo(-9,bh/2-1);cx.lineTo(0,bh/2+12);cx.lineTo(9,bh/2-1);cx.fill();
  cx.lineWidth=3.5;cx.strokeStyle='#ffd24a';rrect(-bw/2,-bh/2,bw,bh,bh*0.3);cx.stroke();
  var left=Math.max(0,1-a.t/a.pat);cx.fillStyle='#121c4a';rrect(-bw/2+10,bh/2-10,bw-20,6,3);cx.fill();cx.fillStyle='#ffd24a';rrect(-bw/2+10,bh/2-10,Math.max(6,(bw-20)*left),6,3);cx.fill();
  cx.textAlign='center';cx.textBaseline='middle';cx.lineJoin='round';
  a.q.forEach(function(x,i){var g=gById(x.id),X=-bw/2+ir*0.3+gap*(i+0.5),done=x.got>=x.n,want=a.good&&a.good.id===x.id&&!done,Y=-ir*0.35+(want?Math.sin(time*6)*2.5:0);
    if(want){cx.fillStyle='rgba(255,210,74,.35)';cx.beginPath();cx.arc(X,Y,ir*1.15,0,6.283);cx.fill();cx.strokeStyle='#ffd24a';cx.lineWidth=3;cx.beginPath();cx.arc(X,Y,ir*1.15,0,6.283);cx.stroke();}
    drawImg(g.img,X,Y,ir*1.9,.5,.5,0,done?0.35:1);
    outlined(x.got+'/'+x.n,X,ir*0.95,Math.round(ir*0.62));
    if(done){cx.fillStyle='#ffd24a';cx.beginPath();cx.arc(X+ir*0.55,Y+ir*0.3,ir*0.42,0,6.283);cx.fill();cx.strokeStyle='#121c4a';cx.lineWidth=3;cx.lineCap='round';
      cx.beginPath();cx.moveTo(X+ir*0.37,Y+ir*0.31);cx.lineTo(X+ir*0.51,Y+ir*0.45);cx.lineTo(X+ir*0.75,Y+ir*0.13);cx.stroke();}});
  outlined(t('kingT')+' · '+Math.ceil(a.pat-a.t),0,-bh/2-11,16);
  cx.restore();
}
function popLB(b,q,r){b.done=1;b.t=0;b.pop=1;play('lpop',{rate:0.95+Math.random()*0.15});sparkle(q.x,q.y-r*0.6,16);
  var amt=Math.round(Math.max(1,bestPrice())*incMul()*0.4);addCoins(amt);if(trip)trip.earned+=amt;floats.push({x:q.x,y:q.y-r*1.4,txt:'+'+fmt(amt),t:0});say('pop',6000);}
function lavaHit(b){b.done=1;b.t=0;spd*=0.55;bumpT=1;boatSquash=1;var bx=L.boat.x+boatU*KX,big=null;
  for(var k in stock){var g=gById(k);if(g&&g.hot&&stock[k]>0&&(!big||stock[k]>stock[big]))big=k;}
  if(big){stock[big]--;if(stockTotal()<=0)onEmpty();}
  floats.push({x:bx,y:L.boat.y-L.boat.h*0.55,txt:t('hotT')+(big?' -1':''),t:0,big:true});
  play('sizzle');brainBump(b);if(Math.random()<0.7)say('splash',5000);sparkle(bx,L.boat.y-L.boat.h*0.2,14);hudDirty=true;}
function spawnLB(){var z=dist+DF*0.6;if(z>stopZ()-8||z<trip.z0+14)return;var n=Math.random()<0.3?2:1;
  for(var i=0;i<n;i++)lbs.push({z:z+i*3,u:(Math.random()*2-1)*RW*0.7,ph:Math.random()*6,t:0,done:0});}
function legendAvail(){return S.unlocked.indexOf(5)>=0||S.lvl>=40;}
function routesDone(){var n=0;for(var k in S.routes)if(S.routes[k]&&S.routes[k].done)n++;return n;}
function legendGain(){return Math.max(1,Math.floor(Math.cbrt(Math.max(0,S.stats.earned-S.legend.base)/1e6))+2*routesDone());}
function doLegend(){
  if(phase!=='port'||!legendAvail())return;var g=legendGain(),L5=S.legend;L5.stars+=g;L5.n++;L5.base=S.stats.earned;
  S.coins=L5.stars>=20?25000:0;S.lvl=1;S.xp=0;S.up={cap:1,spd:L5.stars>=10?3:1,pat:1};
  GOODS.forEach(function(x){S.goods[x.id]=0;S.load[x.id]=0;});S.goods.fruit=1;
  S.staff=STAFF.map(function(){return 0;});if(L5.stars>=3)S.staff[0]=1;
  STALLS.forEach(function(x){S.market.st[x.id]=0;});S.market.bank=0;S.market.last=Date.now();
  for(var k in S.routes)S.routes[k]={trips:0,done:false};S.unlocked=[1];S.planet=1;S.cur=null;S.ulSeen=S.ul3Seen=S.ul4Seen=S.ul5Seen=false;
  if(S.tier===2)S.tier=1; // coin boat starts over; the gem raft stays
  for(var kk in S.king)S.king[kk].at=0;
  trip=null;phase='port';aliens=[null,null,null,null];dockC=[null,null,null,null,null];gifts=[];obs=[];lbs=[];fork=null;ffs=[];lane=0;boatU=0;for(var s2 in stock)stock[s2]=0;
  piers=[{z:dist+1.4,side:-1,kind:'home'}];fixLoad();autoFill();
  close();applyPlanet();save();updatePhaseUi();hudDirty=true;updateHud();
  play('legend');play('fanfare',{vol:0.5});setTimeout(function(){say('legend',0);},400);sparkle(W/2,H*0.4,90);fangExcited(false);
  setTimeout(function(){toast(t('legendDone',{n:L5.n}));},300);
}
function setVol(){if(!A.ctx)return;A.music.gain.value=0.28*S.vol.m;A.sfx.gain.value=0.8*S.vol.s;A.voice.gain.value=1.0*S.vol.v;}
function forkChoosing(){return !!(fork&&phase==='travel'&&dist<fork.z0-1.5);}
function laneOn(){return phase==='travel'&&(iceOn()||forkChoosing());}
function forkMul(){if(!fork||!fork.ch||dist<fork.z0-1.5||dist>fork.z1+1)return 1;return fork.ch===fork.rich?1.8:0.85;}
function onRich(){return forkMul()>1;}
function isWk(){if(wkForce!=null)return wkForce;var d=new Date().getDay();return d===0||d===6;} // weekend = Sat/Sun, player's local time
function gemMul(){return isWk()?2:1;}
function addGems(n){n=n*gemMul();S.gems+=n;qBadge();return n;}
function petOn(id){return S.pets&&S.pets.on===id;}
function PG(){return GOODS.filter(function(g){return g.pl===S.planet;});} // goods of the current planet
function unlockedGoods(){return PG().filter(function(g){return S.goods[g.id]>0;});}
function goodById(id){for(var i=0;i<GOODS.length;i++)if(GOODS[i].id===id)return GOODS[i];}
function stockTotal(){var n=0;for(var k in stock)n+=stock[k];return n;}
function loadTotal(){var n=0;for(var k in S.load)n+=S.load[k]||0;return n;}
function cap(){return capOf(S.up.cap);}
function fixLoad(){ // keep the saved load valid (unlocked goods, within capacity)
  GOODS.forEach(function(g){if(!S.goods[g.id]||g.pl!==S.planet)S.load[g.id]=0;S.load[g.id]=Math.max(0,S.load[g.id]|0);});
  while(loadTotal()>cap()){var big=null;GOODS.forEach(function(g){if(S.load[g.id]>0&&(!big||S.load[g.id]>S.load[big]))big=g.id;});S.load[big]--;}
}
function autoFill(){ // spread free space across unlocked goods, a little more on the pricier ones
  fixLoad();var u=unlockedGoods(),free=cap()-loadTotal(),i=u.length-1;
  while(free>0&&u.length){S.load[u[i].id]++;free--;i--;if(i<0)i=u.length-1;}
}
function setOff(){
  fixLoad();if(loadTotal()<=0)autoFill();
  for(var k in stock)stock[k]=S.load[k]||0;
  var z0=dist,len=PL().len,n=(S.routes['1'].trips>=3||S.planet>1)?3:2,docks=[];
  for(var i=1;i<=n;i++)docks.push(z0+len*(i/(n+1))+(hash(z0+i)*16-8));
  trip={z0:z0,docks:docks,end:z0+len,di:0,sold:0,tips:0,best:0,earned:0,tut:!S.tut.done,heat:{}};
  PG().forEach(function(g){if(g.hot&&stock[g.id]>0)trip.heat[g.id]=1;});if(Object.keys(trip.heat).length)setTimeout(function(){say('hot',0);},2600);lbs=[];lbNext=dist+14;kingC=null;
  if(!trip.tut&&stockTotal()>=5&&kingDue(S.planet))reserveKing();
  piers=piers.filter(function(p){return p.z>dist-4;});
  docks.forEach(function(z,j){piers.push({z:z,side:j%2?1:-1,kind:'dock'});});
  piers.push({z:trip.end,side:1,kind:'end'});
  phase='travel';spawnT=2.2;giftT=4;vipWin=0;vipNext=20+Math.random()*10;emptyNoted=false;
  lane=0;boatU=0;obs=[];obNext=dist+16;fork=null;forkNext=dist+28;ffs=[];wasNight=false;
  if(S.items.jar>0){S.items.jar--;trip.jar=1;setTimeout(function(){toast(t('jarOn'));},1200);}
  if(S.items.lure>0){S.items.lure--;trip.lure=1;setTimeout(function(){toast(t('lureOn'));},2600);}
  play('setoff');say('setoff',0);banner={txt:'setoff',t:0};
  if(iceOn()&&RT().trips<3)setTimeout(function(){if(phase==='travel')say('steer',0);},1900);
  close();updatePhaseUi();save();
  if(trip.tut&&(tut.step==='load'||tut.step==='go'))tutShow('hold');
}
function stopZ(){if(!trip)return dist;return (trip.di<trip.docks.length?trip.docks[trip.di]:trip.end)-1.4;}
function baseSpeed(){return 6*speedMul(S.up.spd);}

// ---------- customers ----------
function pickGood(dock){
  var u=unlockedGoods(),have=u.filter(function(g){return stock[g.id]>0;});
  if(dock||(have.length&&Math.random()<0.75))u=have.length?have:u; // mostly ask for what is on board
  var tot=0,ws=u.map(function(g){var w=1+(g.base>15?0.6:0);tot+=w;return w;}),r=Math.random()*tot;
  for(var i=0;i<u.length;i++){r-=ws[i];if(r<=0)return u[i];}return u[0];
}
function makeCust(slot,dock,force){
  var al=PL().aliens,a=al[Math.floor(Math.random()*al.length)],g=force?goodById(force):pickGood(dock);
  return persInit({slot:slot,img:a.img,likes:a.likes.indexOf(g.id)>=0,good:g,t:0,state:'in',pat:dock?3.4*(1+0.05*(S.up.pat-1))*(1+0.1*S.shop.pat):patOf(S.up.pat),
    ph:Math.random()*6,born:time,dock:!!dock,side:slot%2?1:-1});
}
// multi-item orders: an alien asks for 2-3 different goods at once and pays big when all arrive
function orderGoods(){var have=unlockedGoods().filter(function(g){return stock[g.id]>0;});if(have.length<2)return null;
  var n=have.length>=3&&Math.random()<0.45?3:2,pick=[];while(pick.length<n)pick.push(have.splice(Math.floor(Math.random()*have.length),1)[0]);return pick;}
function applyOrder(c,og){c.order=og;c.got=og.map(function(){return 0;});c.good=og[0];c.likes=false;c.pat=c.pat*2.6;}
function spawnAlien(force,vip){
  var free=[];for(var i=0;i<4;i++)if(!aliens[i])free.push(i);
  if(!free.length)return null;
  var s=free[Math.floor(Math.random()*free.length)],c=makeCust(s,false,force);
  if(vip){c.vip=true;c.pay=vipPay();c.pat=14;c.img=PL().vip;}
  else if(!force&&trip&&!trip.tut&&Math.random()<0.17&&!aliens.some(function(x){return x&&x.order;})){var og=orderGoods();if(og){applyOrder(c,og);play('popup',{vol:0.5,rate:1.2});}}
  if(!vip&&!c.order&&!force&&trip&&!trip.tut&&Math.random()<goldP()){c.gold=true;c.pat*=1.4;}
  aliens[s]=c;play('ufo',{vol:0.55,rate:0.9+Math.random()*0.25});return c;
}
function spawnDockCust(){
  if(stockTotal()<=0)return;
  var free=[];for(var i=0;i<5;i++)if(!dockC[i])free.push(i);
  if(!free.length)return;
  var s=free[Math.floor(Math.random()*free.length)];dockC[s]=makeCust(s,true);
}
function goldP(){return 0.03*(trip&&trip.lure?3:1)*(onRich()?2:1);}
function bestPrice(){var best=0;unlockedGoods().forEach(function(g){best=Math.max(best,goodPrice(g,S.goods[g.id]));});return best;}
function vipPay(){return Math.round(bestPrice()*12*incMul());}
function custPos(a){if(a.king)return kingPos(a);
  var s=a.dock?L.dslots[a.slot]:L.slots[a.slot],bob=Math.sin(time*2+a.ph)*5,x=s.x,y=s.y+bob,w=s.w*(a.vip?1.2:1),sc=1,al=1;
  if(a.dock){
    if(a.state==='in'){var k0=ease(Math.min(1,a.t/0.25));sc=0.3+0.7*k0;al=k0;}
    if(a.state==='pass'){var k1=Math.min(1,a.t/0.3);al=1-k1;y+=k1*20;}
    if(a.state==='out'){var k2=ease(Math.min(1,a.t/0.6));y-=k2*H*0.2;al=1-k2;}
  }else{
    if(a.state==='in'){var k=ease(Math.min(1,a.t/0.9)),sx=W/2+a.side*W*0.06,sy=HY+H*0.02;x=sx+(s.x-sx)*k;y=sy+(s.y+bob-sy)*k;sc=0.2+0.8*k;al=Math.min(1,a.t*4);}
    if(a.state==='pass'){var q=Math.min(1,a.t/0.8),e=q*q;x+=(s.x<W/2?-1:1)*W*0.5*e;y+=H*0.3*e;sc=1+0.7*e;al=1-q;}
    if(a.state==='out'){var k3=ease(Math.min(1,a.t/0.9));y-=k3*H*0.35;x+=k3*(s.x<W/2?-W*0.15:W*0.15);al=1-k3;}
  }
  return {x:x,y:y,w:w*sc,al:al};
}
function ease(k){return 1-Math.pow(1-k,3);}
function allCust(){return aliens.concat(dockC).filter(function(a){return a;});}
function orderNext(a){for(var i=0;i<a.order.length;i++)if(!a.got[i]&&stock[a.order[i].id]>0)return i;return -1;}
function oldestCust(byStaff){var b=null;allCust().forEach(function(a){if(a.state==='wait'&&(a.vip?!byStaff:a.order?(!byStaff&&orderNext(a)>=0):stock[a.good.id]>0)&&(!b||a.born<b.born))b=a;});return b;}
function orderVal(a,onlyGot){var s=0;a.order.forEach(function(g,i){if(!onlyGot||a.got[i])s+=goodPrice(g,S.goods[g.id])*heatMul(g.id);});return s*incMul();}
function deliverOrder(a){
  var p=custPos(a),idx=orderNext(a);
  if(idx<0){play('nope');var miss=a.order.filter(function(g,i){return !a.got[i];})[0];toast(t('noStock',{g:t(miss.id)}));a.shake=1;return false;}
  stock[a.order[idx].id]--;a.got[idx]=1;
  var n=a.got.filter(Boolean).length;play('grab',{vol:0.75,rate:1+n*0.1});sparkle(p.x,p.y-p.w*0.9,12);
  if(n<a.order.length){floats.push({x:p.x,y:p.y-p.w*0.5,txt:n+'/'+a.order.length,t:0,big:false});a.good=a.order[a.got.indexOf(0)];}
  else{var amt=Math.round(orderVal(a)*1.8*forkMul()*(a.gold?3:1));a.state='out';bookAdd(a);a.t=0;a.happy=true;amt+=onServed(a,false,amt);addCoins(amt);S.stats.sold+=n;S.stats.orders=(S.stats.orders|0)+1;qAdd('sell',n);
    if(trip){trip.sold+=n;trip.earned+=amt;}
    coinBurst(p.x,p.y-10,9);sparkle(p.x,p.y,36);floats.push({x:p.x,y:p.y-p.w*0.5,txt:t('orderDone',{n:fmt(amt)}),t:0,big:true});
    play('order');play('sell',{vol:0.6});say('order',0);}
  if(stockTotal()<=0)onEmpty();hudDirty=true;return true;
}
function orderPartial(a){ // the alien leaves early: still pays for what it got
  var amt=Math.round(orderVal(a,true));if(amt<=0)return;var p=custPos(a);addCoins(amt);S.stats.sold+=a.got.filter(Boolean).length;if(trip){trip.earned+=amt;trip.sold+=a.got.filter(Boolean).length;}
  floats.push({x:p.x,y:p.y-p.w*0.5,txt:'+'+fmt(amt),t:0});play('coin',{vol:0.6});}
function sellTo(a,byStaff){
  if(!a||a.state!=='wait')return false;
  if(a.order&&!a.vip){if(byStaff)return false;return deliverOrder(a);}
  var p=custPos(a),amt,tip=0;
  if(a.vip){amt=a.pay;}
  else{
    if(stock[a.good.id]<=0){if(!byStaff){play('nope');toast(t('noStock',{g:t(a.good.id)}));a.shake=1;}return false;}
    stock[a.good.id]--;
    amt=Math.round(goodPrice(a.good,S.goods[a.good.id])*incMul()*forkMul()*(a.gold?3:1)*heatMul(a.good.id));if(a.likes)amt=Math.round(amt*1.25);
    if(!a.dock&&!byStaff&&a.t<a.pat*(petOn('octo')?0.55:0.4)){tip=Math.max(1,Math.round(amt*0.5*(petOn('octo')?1.5:1)));}
    if(a.dock&&!byStaff){combo++;comboT=1.6;comboPop=1;var mult=1+0.1*Math.min(combo,20);amt=Math.round(amt*mult);
      if(trip)trip.best=Math.max(trip.best,combo);qMax('combo',combo);
      play('combo',{rate:Math.min(1.9,1+combo*0.04),vol:0.7});
      if(combo===5||combo===15)say('combo',0);else if(combo===10||combo===20)say('great',0);}
  }
  a.state='out';a.t=0;a.happy=true;bookAdd(a);
  tip+=onServed(a,byStaff,amt);
  var tot=amt+tip;addCoins(tot);S.stats.sold++;
  if(!a.vip){qAdd('sell');if(a.likes)qAdd('likes');if(a.dock)qAdd('dock');}if(tip)qAdd('tips');
  if(trip){trip.sold++;trip.tips+=tip;trip.earned+=tot;}
  coinBurst(p.x,p.y-10,Math.min(7,3+Math.floor(Math.log10(tot+1)*1.5)));
  floats.push({x:p.x,y:p.y-p.w*0.5,txt:'+'+fmt(amt),t:0,big:!byStaff});
  if(tip)floats.push({x:p.x,y:p.y-p.w*0.5-28,txt:t('tip')+' +'+fmt(tip),t:-0.15,big:false});
  else if(a.likes&&!byStaff)floats.push({x:p.x,y:p.y-p.w*0.5-28,txt:t('like'),t:-0.15,big:false});
  play(byStaff?'coin':'sell',{vol:byStaff?0.5:0.85});
  if(a.vip){play('fanfare',{vol:0.6});sparkle(p.x,p.y,30);}
  if(!byStaff&&!a.dock){var r=Math.random();if(tip&&r<0.35)say('tip',2500);else if(S.stats.sold<=1||r<0.2)say('sold',2500);else if(r<0.35)say('thanks',2500);else if(r<0.5)say(['a_yum','a_yay','a_cute'][Math.floor(Math.random()*3)],2500);}
  if(tut.step==='tap'&&!byStaff)tutNext('nice');
  if(stockTotal()<=0)onEmpty();
  hudDirty=true;return true;
}
function onEmpty(){
  if(emptyNoted||phase==='port')return;emptyNoted=true;
  say('empty',800);toast(t('empty'));hudDirty=true;
}
function addCoins(n){
  S.coins+=n;S.stats.earned+=n;S.xp+=n;
  while(S.xp>=xpNeed(S.lvl)){S.xp-=xpNeed(S.lvl);S.lvl++;var g=addGems(3+Math.floor(S.lvl/3));toast(t('levelUp',{g:g}));play('unlock');sparkle(W/2,H*0.4,40);qBadge();}
  hudDirty=true;
}

// ---------- effects ----------
function coinBurst(x,y,n){for(var i=0;i<n;i++){var a=Math.random()*Math.PI*2,sp=120+Math.random()*160;
  fx.push({k:'coin',x:x,y:y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-180,t:0,d:0.35+Math.random()*0.15,fly:false,sx:0,sy:0});}}
function sparkle(x,y,n){for(var i=0;i<n;i++){var a=Math.random()*Math.PI*2,sp=40+Math.random()*220;
  fx.push({k:'spk',x:x,y:y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,t:0,d:0.6+Math.random()*0.6,c:Math.random()});}}
var coinPulse=0;

// ---------- input ----------
var splashOn=true;
function hitCust(a,x,y){if(!a||a.state!=='wait')return false;var p=custPos(a);
  return Math.abs(x-p.x)<p.w*0.6&&y>p.y-p.w*1.3&&y<p.y+p.w*0.45;}
cv.addEventListener('pointerdown',function(e){
  if(splashOn)return;
  audioUnlock();
  var r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  sw={x:x,y:y};
  for(var fi=0;fi<ffs.length;fi++){var ff=ffs[fi],fp=ffPos(ff);if(!ff.got&&Math.hypot(x-fp.x,y-fp.y)<38){catchFF(ff,fp);return;}}
  if(phase==='king'&&kingC&&kingC.state==='wait'){var kp=kingPos(kingC);if(Math.abs(x-kp.x)<kp.w*0.45&&y>kp.y-kp.w*0.6&&y<kp.y+kp.w*0.45){kingGive(kingC.good&&kingC.good.id);return;}}
  if(phase==='travel'){for(var li=0;li<lbs.length;li++){var lb=lbs[li];if(lb.done)continue;var lq=proj(lb.z,lb.u),lr=KX*lq.p*0.42;
    if(lq.d>0.4&&lq.d<40&&Math.hypot(x-lq.x,y-(lq.y-lr*0.55))<Math.max(30,lr*1.4)){popLB(lb,lq,lr);return;}}}
  if(phase==='travel'){for(var oi=0;oi<obs.length;oi++){var ob=obs[oi];if(ob.done||!ob.fork)continue;var oq=proj(ob.z,ob.u),orr=Math.max(28,KX*oq.p*0.8);
    if(oq.d>0.4&&oq.d<40&&Math.abs(x-oq.x)<orr&&Math.abs(y-(oq.y-KX*oq.p*0.3))<orr){clearOb(ob,oq);return;}}}
  var list=allCust().sort(function(a,b){return (b.vip?1:0)-(a.vip?1:0);});
  for(var i=0;i<list.length;i++){if(hitCust(list[i],x,y)){sellTo(list[i]);return;}}
  for(i=0;i<gifts.length;i++){var g=gifts[i];if(g.taken)continue;var q=proj(g.z,g.u);if(q.d<0.3||q.d>30)continue;
    var rr=Math.max(30,KX*q.p*0.9);if(Math.abs(x-q.x)<rr&&Math.abs(y-(q.y-KX*q.p*0.5))<rr){takeGift(g,q);return;}}
  var b=L.boat;
  if(Math.abs(x-b.x-boatU*KX)<b.w*0.45&&Math.abs(y-b.y)<b.h*0.45&&phase!=='port'){
    boatSquash=1;play('tap',{vol:0.6});var o=oldestCust();if(o){sellTo(o);return;}
  }
  if(phase==='travel'){holding=true;}
  else if(phase==='dock'){play('tap',{vol:0.3});sparkle(x,y,5);}
});
function endHold(){holding=false;sw=null;}
// Glow Ice lanes: swipe on mobile, arrow keys (or A/D) on desktop, plus the on-screen arrows
function steer(d){if(forkChoosing()){pickFork(d);return;}if(!(iceOn()&&phase==='travel'))return;var n=Math.max(-1,Math.min(1,lane+d));if(n===lane){boatSquash=0.5;return;}lane=n;play('steer',{vol:0.7,rate:d>0?1.08:0.94});}
window.addEventListener('pointermove',function(e){if(!sw||!laneOn())return;var r=cv.getBoundingClientRect(),dx=e.clientX-r.left-sw.x,dy=e.clientY-r.top-sw.y;
  if(!sw.done&&Math.abs(dx)>34&&Math.abs(dx)>Math.abs(dy)*1.2){steer(dx>0?1:-1);sw.done=1;}}); // one lane per swipe
window.addEventListener('keydown',function(e){if(splashOn||openPanel||adOpen)return;var k=e.key;
  if(k==='ArrowLeft'||k==='a'||k==='A'){if(laneOn()){steer(-1);e.preventDefault();}}
  else if(k==='ArrowRight'||k==='d'||k==='D'){if(laneOn()){steer(1);e.preventDefault();}}});
function bump(o){
  spd*=0.35;bumpT=1;boatSquash=1;var bx=L.boat.x+boatU*KX,big=null;
  for(var k in stock)if(stock[k]>0&&(!big||stock[k]>stock[big]))big=k; // lose one piece of the most plentiful cargo
  if(big){stock[big]--;if(stockTotal()<=0)onEmpty();}
  floats.push({x:bx,y:L.boat.y-L.boat.h*0.55,txt:t('bumpT')+(big?' -1':''),t:0,big:true});
  play('bump');brainBump(o);if(Math.random()<0.6)say('bump',5000);sparkle(bx,L.boat.y-L.boat.h*0.2,14);hudDirty=true;
}
function grabCrate(o){
  var u=unlockedGoods(),g=u[Math.floor(Math.random()*u.length)],n=2+(Math.random()<0.3?1:0),bx=L.boat.x+boatU*KX;
  stock[g.id]+=n;emptyNoted=false;var amt=Math.round(Math.max(1,bestPrice())*incMul());addCoins(amt);if(trip)trip.earned+=amt;
  floats.push({x:bx,y:L.boat.y-L.boat.h*0.6,txt:t('grabT',{n:n,g:t(g.id)}),t:0,big:true});coinBurst(bx,L.boat.y-L.boat.h*0.3,5);sparkle(bx,L.boat.y-L.boat.h*0.3,26);
  play('grab');if(Math.random()<0.45)say('grab',5000);boatSquash=1;hudDirty=true;
}
function spawnObs(){
  var z=dist+DF*0.6;if(z>stopZ()-10||z<trip.z0+18)return;
  var ln=[-1,0,1].sort(function(){return Math.random()-0.5;}),nOb=Math.random()<0.3?2:1;
  for(var i=0;i<nOb;i++)obs.push({z:z+i*2.5,u:ln[i]*LANE,k:Math.random()<0.35?'meteor':'ice',ph:Math.random()*6,done:false,t:0});
  if(Math.random()<0.55)obs.push({z:z+(nOb>1?6:3),u:ln[2]*LANE,k:'crate',ph:Math.random()*6,done:false,t:0}); // always in a free lane
}
window.addEventListener('pointerup',endHold);window.addEventListener('pointercancel',endHold);cv.addEventListener('pointerleave',endHold);
// ---------- stage 4: river forks, night + fireflies, sticker book, 7-day gifts ----------
function newFork(){var z0=dist+30;if(z0+44>stopZ()-6||z0<trip.z0+20){forkNext=dist+8;return;}
  fork={z0:z0,z1:z0+40,rich:Math.random()<0.5?-1:1,ch:0};
  for(var q=0;q<3;q++)obs.push({z:z0+7+q*11+Math.random()*3,u:fork.rich*LANE,k:Math.random()<0.5?'log':'thorn',ph:Math.random()*6,done:false,t:0,fork:1});
  play('fork');say('fork',0);hudDirty=true;}
function pickFork(d,auto){if(!fork||(!auto&&!forkChoosing()))return;if(d===fork.ch)return;var first=!fork.ch;fork.ch=d;lane=d;
  play('steer',{vol:0.7,rate:d>0?1.08:0.94});if(first||!auto)say(d===fork.rich?'risky':'safe',0);hudDirty=true;}
function clearOb(o,q){o.done=true;o.t=0;o.push=o.u>=0?1:-1;o.tapped=1;play('grab',{vol:0.6,rate:1.2});sparkle(q.x,q.y-KX*q.p*0.3,16);
  var amt=Math.round(Math.max(1,bestPrice())*incMul()*0.5);addCoins(amt);if(trip)trip.earned+=amt;floats.push({x:q.x,y:q.y-KX*q.p*0.6,txt:'+'+fmt(amt),t:0});}
function nightK(){if(nightForce!=null)return nightForce;if(!forkOn())return 0;var v=Math.sin(dist/45);return Math.max(0,Math.min(1,(-v-0.2)/0.35));}
function ffPos(f){return {x:f.x+Math.sin(f.t*1.3+f.ph)*18,y:f.y+Math.cos(f.t*1.7+f.ph)*12};}
function catchFF(f,p){f.got=true;var n=petOn('bunny')?2:1;S.ff+=n;sparkle(p.x,p.y,14);floats.push({x:p.x,y:p.y-24,txt:t('ffGot',{n:n}),t:0,big:false});
  play('firefly',{rate:0.95+Math.random()*0.15});say('firefly',6000);hudDirty=true;}
function goldOf(n){if(GOLD[n])return GOLD[n];var im=IMG[n];if(!ok(im))return null;var c=document.createElement('canvas');c.width=iw(im);c.height=ih(im);var x=c.getContext('2d');
  x.drawImage(im,0,0);x.globalCompositeOperation='source-atop';x.fillStyle='rgba(255,205,60,0.55)';x.fillRect(0,0,c.width,c.height);
  x.globalCompositeOperation='lighter';x.fillStyle='rgba(255,240,170,0.18)';x.fillRect(0,0,c.width,c.height);x.globalCompositeOperation='destination-in';x.drawImage(im,0,0);GOLD[n]=c;return c;}
function bookTotal(){var n=0;BOOK.forEach(function(p){n+=p.al.length;});return n;}
function pageFull(i){return BOOK[i].al.every(function(a){return S.book.s[a];});}
function pageGold(i){return BOOK[i].al.every(function(a){return S.book.g[a];});}
function bookCan(){return BOOK.some(function(p,i){return (pageFull(i)&&!S.book.pc[i])||(pageGold(i)&&!S.book.gc[i]);});}
function bookAdd(a){if(!a||!a.img)return;var B=S.book,nw=!B.s[a.img],ng=!!a.gold&&!B.g[a.img];if(!nw&&!ng)return;
  var pg=-1;BOOK.forEach(function(p,i){if(p.al.indexOf(a.img)>=0)pg=i;});var wasFull=pg>=0&&pageFull(pg),wasGold=pg>=0&&pageGold(pg);
  if(nw)B.s[a.img]=1;if(ng)B.g[a.img]=1;bookNew=true;
  play('sticker');toast(t(ng?'goldSticker':'newSticker'));
  if(pg>=0&&((!wasFull&&pageFull(pg))||(!wasGold&&pageGold(pg)))){setTimeout(function(){play('page');say('page',0);},500);}else say(ng?'golden':'sticker',2500);
  hudDirty=true;}
function dayNum(d){var p=d.split('-');return Math.round(new Date(+p[0],+p[1]-1,+p[2],12).getTime()/864e5);}
function loginNext(){var L=S.login,d=today();if(L.last===d)return null;if(!L.last||!L.streak)return {day:1,back:false};
  var gap=dayNum(d)-dayNum(L.last);if(gap<=1)return {day:L.streak>=7?1:L.streak+1,back:false};
  return {day:L.streak>=7?1:Math.max(1,L.streak-1),back:true};} // missed a day: step back 2 (never below Day 1)
function loginRew(day){var L=LOGIN[day-1];if(L.k==='coin')return {k:'coin',n:L.n*Math.max(20,Math.round(bestPrice()*PL().mul))};
  if(L.k==='pet')return S.pets.own.indexOf('bunny')>=0?{k:'gem',n:25}:{k:'pet',n:1};return {k:L.k,n:L.n};}
function ffTxt(n){return '<img src="assets/firefly.webp" alt="" class="ci">'+n;}
function rewTxt(r,m){m=m||1;return r.k==='coin'?coinsTxt(r.n*m):r.k==='gem'?gemsTxt(r.n*m):r.k==='ff'?ffTxt(r.n*m):'<img src="assets/pet_bunny.webp" alt="" class="ci">'+t('pet_bunny');}
function claimLogin(m){var nx=loginNext();if(!nx)return;var r=loginRew(nx.day);
  if(r.k==='coin')addCoins(r.n*m);else if(r.k==='gem')addGems(r.n*m);else if(r.k==='ff')S.ff+=r.n*m;
  else if(r.k==='pet'){if(S.pets.own.indexOf('bunny')<0)S.pets.own.push('bunny');S.pets.on='bunny';play('pet');}
  S.login.last=today();S.login.streak=nx.day;S.login.total=(S.login.total|0)+1;
  play('login');play('sell',{vol:0.5});say(nx.day===7?'day7':'login',0);coinBurst(W/2,H*0.45,10);sparkle(W/2,H*0.4,40);if(r.k==='pet'){boatSquash=1;toast(t('petNew'));}
  save();hudDirty=true;}
function takeGift(g,q){
  g.taken=true;qAdd('gifts');
  var amt=Math.round(bestPrice()*3*incMul()),y=q.y-KX*q.p*0.5;addCoins(amt);if(trip)trip.earned+=amt;
  coinBurst(q.x,y,6);sparkle(q.x,y,18);floats.push({x:q.x,y:y-20,txt:'+'+fmt(amt),t:0,big:true});
  play('gift',{vol:0.8});say('gift',3000);
  if(Math.random()<(petOn('bird')?0.4:0.2)){var gg=addGems(1);floats.push({x:q.x,y:y-48,txt:'+'+gg+' '+(S.lang==='th'?'ดาว':(gg>1?'stars':'star')),t:-0.15});}
}

// ---------- main loop ----------
var lastT=performance.now(),hudDirty=true,saveT=0,TS=1;
function frame(now){
  var dt=Math.min(0.05,(now-lastT)/1000)*TS;lastT=now;
  paused=splashOn||!!adOpen||(!!openPanel&&phase!=='port');
  if(!paused){time+=dt;update(dt);}
  draw(paused?0:dt);
  requestAnimationFrame(frame);
}
function update(dt){
  // speed
  var target=0,bs=baseSpeed();
  if(phase==='travel'){target=bs*(holding?1.75:1);
    if(trip.tut&&(tut.step==='tap'||tut.step==='hold'||tut.step==='nice')&&trip.di===0&&stopZ()-dist<40)target=bs*0.25; // tutorial: wait before first dock
  }
  spd+=(target-spd)*Math.min(1,dt*(target>spd?2.2:3));
  if(phase==='travel'){
    var rem=stopZ()-dist;spd=Math.min(spd,Math.sqrt(2*7*Math.max(0,rem))+0.25);
    dist+=spd*dt;
    if(holding){holdAcc+=dt;if(tut.step==='hold'&&holdAcc>1.2)tutNext('tap');}
    if(stopZ()-dist<0.02){dist=stopZ();spd=0;arriveStop();}
  }
  camX+=(rc(dist)-camX)*Math.min(1,dt*6);
  paddleMix(spd,holding&&phase==='travel');
  // world particles recycle
  flow.forEach(function(f){if(f.z-dist<-3){var n=newFlow(f.z+DF+3);f.z=n.z;f.u=n.u;f.r=n.r;}});
  warp.forEach(function(s){s.z-=dt*(0.04+spd*0.03);if(s.z<0.08)Object.assign(s,newWarp(1));});
  rippleT-=dt*(0.4+spd*0.25);if(rippleT<=0&&spd>0.3){rippleT=1;ripples.push({z:dist-0.3,t:0,u:boatU});}
  for(var i=ripples.length-1;i>=0;i--){ripples[i].t+=dt;if(ripples[i].t>2.2)ripples.splice(i,1);}
  piers=piers.filter(function(p){return p.z-dist>-5;});
  gifts=gifts.filter(function(g){return g.z-dist>-3&&!(g.taken&&g.z-dist<0);});
  // travel: customers, gifts, VIP window
  if(phase==='travel'){
    spawnT-=dt;
    var tutBlock=trip.tut&&(tut.step==='intro'||tut.step==='hold');
    if(spawnT<=0&&!tutBlock&&!(trip.tut&&tut.step==='tap')){spawnAlien();spawnT=2.4*(0.7+Math.random()*0.6)*(onRich()?0.65:1);}
    giftT-=dt;if(giftT<=0&&stopZ()-dist>30){giftT=(6+Math.random()*4)*(petOn('bird')?0.65:1);gifts.push({z:dist+DF*0.75,u:(Math.random()*2-1)*RW*0.6,taken:false,ph:Math.random()*6});}
    if(!trip.tut){vipNext-=dt;if(vipNext<=0&&vipWin<=0&&adAvailable()){vipWin=12;vipNext=40+Math.random()*20;}}
    if(vipWin>0){vipWin-=dt;if(vipWin<=0)hudDirty=true;}
    if(petOn('cat'))gifts.forEach(function(g){if(!g.taken&&g.z-dist<1.6&&g.z-dist>-0.5){var q=proj(g.z,g.u);sparkle(L.boat.x+boatU*KX+L.boat.w*0.36,L.boat.y-L.boat.h*0.2,10);takeGift(g,q);}});
    if(iceOn()&&!trip.tut&&dist>=obNext){spawnObs();obNext=dist+10+Math.random()*7;}
    if(forkOn()&&!trip.tut&&!fork&&dist>=forkNext)newFork();
    if(lavaOn()&&!trip.tut&&dist>=lbNext){spawnLB();lbNext=dist+8+Math.random()*7;}
    if(trip.heat){var cold=false;for(var hk in trip.heat){trip.heat[hk]=Math.max(0,trip.heat[hk]-dt/22);if(trip.heat[hk]<0.5&&stock[hk]>0)cold=true;}
      if(cold&&!trip.coolSaid){trip.coolSaid=1;say('cool',0);}}
    if(fork){if(!fork.ch&&dist>fork.z0-1.5)pickFork(-fork.rich,true); // no choice made: take the safe branch
      if(dist>fork.z1+1.5){fork=null;lane=0;forkNext=dist+55+Math.random()*25;hudDirty=true;}}
  }
  // Emerald Forest: day/night cycle with fireflies to tap
  var nk=nightK();nightS+=(nk-nightS)*Math.min(1,dt*1.5);
  if(nk>0.5&&!wasNight&&phase==='travel'){wasNight=true;play('night');say('night',0);brainNight();}else if(nk<0.2)wasNight=false;
  if((phase==='travel'||phase==='dock')&&nightS>0.5){ffT-=dt;if(ffT<=0&&ffs.filter(function(f){return !f.got;}).length<4){
    ffs.push({x:W*(0.12+Math.random()*0.76),y:H*(0.3+Math.random()*0.3),ph:Math.random()*6,t:0,life:7+Math.random()*3,got:false,gt:0});ffT=1.3+Math.random()*1.5;}}
  ffs.forEach(function(f){f.t+=dt;if(f.got)f.gt+=dt;});ffs=ffs.filter(function(f){return f.got?f.gt<0.5:(f.t<f.life&&!(nightS<0.25));});
  // Glow Ice: lane easing, drifting ice/meteors/crates, gentle bumps
  boatU+=(lane*LANE-boatU)*Math.min(1,dt*9);if(bumpT>0)bumpT=Math.max(0,bumpT-dt*2.5);
  obs.forEach(function(o){if(phase==='travel')o.z-=dt*0.5;if(o.done){o.t+=dt;if(o.push)o.u+=o.push*dt*5;return;}
    var d=o.z-dist;if(phase==='travel'&&d<0.35&&d>-0.6&&Math.abs(o.u-boatU)<0.72){o.done=true;o.t=0;if(o.k==='crate')grabCrate(o);else{o.push=o.u>=boatU?1:-1;bump(o);}}});
  obs=obs.filter(function(o){return o.z-dist>-4&&!(o.done&&o.k==='crate'&&o.t>0.4);});
  lbs.forEach(function(b){b.t+=dt;if(b.done)return;var d=b.z-dist;if(phase==='travel'&&d<0.35&&d>-0.6&&Math.abs(b.u-boatU)<0.8)lavaHit(b);});
  lbs=lbs.filter(function(b){return b.z-dist>-4&&!(b.done&&b.t>0.6);});
  if(phase==='king'&&kingC){kingC.t+=(kingC.state==='wait'&&(adOpen||openPanel))?0:dt;brainCust(kingC,dt);
    if(kingC.state==='in'&&kingC.t>0.8){kingC.state='wait';kingC.t=0;}
    else if(kingC.state==='wait'&&kingC.t>=kingC.pat)kingFail();}
  // dock rush
  if(phase==='dock'){
    dockT-=dt;spawnT-=dt;
    if(spawnT<=0&&dockT>0.8){spawnDockCust();spawnT=0.28;}
    if(comboT>0){comboT-=dt;if(comboT<=0)combo=0;}
    if(dockT<=0)leaveDock();
  }
  comboPop=Math.max(0,comboPop-dt*3);
  // customers lifecycle
  brainTick(dt);
  [aliens,dockC].forEach(function(arr){arr.forEach(function(a,i){if(!a)return;a.t+=dt;if(a.shake)a.shake=Math.max(0,a.shake-dt*3);brainCust(a,dt);
    var tin=a.dock?0.25:0.9;
    if(a.state==='in'&&a.t>tin){a.state='wait';a.t=0;onArrive(a);if(a.gold){play('golden');say('golden',0);}else if(!a.dock&&Math.random()<0.25)say(Math.random()<0.5?'a_want':'a_wow',3000);if(a.vip)say('vip',0);}
    else if(a.state==='wait'&&a.t>a.pat&&!a.tutHold){if(a.vip){sellTo(a,true);}else{if(a.order)orderPartial(a);a.state='pass';a.t=0;onLeaveSad(a);}}
    else if((a.state==='out'&&a.t>0.9)||(a.state==='pass'&&a.t>(a.dock?0.3:0.8))){arr[i]=null;}
  });});
  // staff canoes sell on their own
  if(phase==='travel'||phase==='dock'){
    for(var s=0;s<STAFF.length;s++){if(!S.staff[s])continue;staffT[s]+=dt;
      if(staffT[s]>=staffEvery(S.staff[s])){var o=oldestCust(true);if(o){staffT[s]=0;sellTo(o,true);staffHop[s]=1;}}}
  }
  if(boatSquash>0)boatSquash=Math.max(0,boatSquash-dt*4);
  for(s=0;s<2;s++)if(staffHop[s]>0)staffHop[s]=Math.max(0,staffHop[s]-dt*2.5);
  if(banner){banner.t+=dt;if(banner.t>1.6)banner=null;}
  saveT+=dt;if(saveT>5){saveT=0;save();}
  if(hudDirty){updateHud();hudDirty=false;}
  tickTripUi();
}
function arriveStop(){
  aliens.forEach(function(a){if(a&&a.state!=='out'){if(a.vip)sellTo(a,true);else{if(a.order&&a.state==='wait')orderPartial(a);a.state='pass';a.t=0;}}});
  if(trip.di<trip.docks.length){ // dock rush
    trip.di++;phase='dock';dockT=dockTime();spawnT=0.5;combo=0;comboT=0;
    if(trip.heat&&Object.keys(trip.heat).length){for(var hk in trip.heat)trip.heat[hk]=1;trip.coolSaid=0;setTimeout(function(){play('stove',{vol:0.8});toast(t('stoveT'));},700);}
    play('dock');say('dock',0);banner={txt:'docking',t:0};
    if(trip.tut&&!tut.dockShown){tut.dockShown=true;tutShow('dock');}
  }else if(trip.king&&!trip.king.done){startKing(); // the king waits at the end of the route
  }else arriveDest(true);
  updatePhaseUi();
}
function arriveDest(dock){ // destination
    kingC=null;phase='arrive';RT().trips++;S.stats.trips++;qAdd('trips');S.stats.bestCombo=Math.max(S.stats.bestCombo,trip.best);
    if(dock){play('dock');play('fanfare',{vol:0.7});say('arrive',0);sparkle(W/2,H*0.45,40);}save();
    var sc={sold:trip.sold,tips:trip.tips,best:trip.best,earned:trip.earned};setTimeout(function(){open('_summary',sc);},dock?900:200);
  updatePhaseUi();
}
function leaveDock(){
  dockC.forEach(function(a,i){if(a&&a.state!=='out'){a.state='pass';a.t=0;}});
  combo=0;comboT=0;phase='travel';spawnT=1.5;play('setoff');say('setoff',0);banner={txt:'setoff',t:0};
  if(tut.step==='dock')tutHide();
  updatePhaseUi();
}
function finishTrip(x2){
  phase='port';trip=null;for(var k in stock)stock[k]=0;lane=0;obs=[];fork=null;ffs=[];lbs=[];kingC=null;
  aliens=[null,null,null,null];dockC=[null,null,null,null,null];
  piers.forEach(function(p){if(p.kind==='end')p.kind='home';});
  updatePhaseUi();save();
  var rt=RT();
  if(rt.trips>=PL().trips&&!rt.done){rt.done=true;
    if(S.planet===1){ // Candy Planet opens: celebration replaces the old coming-soon moment
      if(S.unlocked.indexOf(2)<0)S.unlocked.push(2);S.goods.cotton=Math.max(1,S.goods.cotton|0);save();
      S.ulSeen=true;save();setTimeout(function(){open('_unlock');play('fanfare');say('edge',0);sparkle(W/2,H*0.4,60);},300);return;}
    if(S.planet===2){ // Glow Ice Planet opens after the Candy route
      if(S.unlocked.indexOf(3)<0)S.unlocked.push(3);starterGoods(S,3);S.ul3Seen=true;save();
      setTimeout(function(){open('_unlock',{n:3});play('fanfare');say('iceopen',0);sparkle(W/2,H*0.4,60);},300);return;}
    if(S.planet===3){ // Emerald Forest opens after the Glow Ice route
      if(S.unlocked.indexOf(4)<0)S.unlocked.push(4);starterGoods(S,4);S.ul4Seen=true;save();
      setTimeout(function(){open('_unlock',{n:4});play('fanfare');say('forestopen',0);sparkle(W/2,H*0.4,60);},300);return;}
    if(S.planet===4){ // Lava Volcano Planet opens after the Emerald route
      if(S.unlocked.indexOf(5)<0)S.unlocked.push(5);starterGoods(S,5);S.ul5Seen=true;save();
      setTimeout(function(){open('_unlock',{n:5});play('fanfare');say('lavaopen',0);sparkle(W/2,H*0.4,60);},300);return;}
    save();setTimeout(function(){open('_edge');play('fanfare');say('arrive',0);sparkle(W/2,H*0.4,60);},300);return;}
  if(!S.tut.done&&tut.step==='wait_port')setTimeout(function(){tutShow('up');},400);
  else if(!S.tut.done&&!tut.step)setTimeout(function(){if(!openPanel&&phase==='port')tutShow('intro');},400);
}

// ---------- drawing ----------
function drawImg(n,x,y,w,ax,ay,rot,alpha,flip){
  var im=typeof n==='string'?IMG[n]:n;if(!ok(im))return;
  var h=w*ih(im)/iw(im);cx.save();cx.translate(x,y);if(rot)cx.rotate(rot);if(flip)cx.scale(-1,1);
  if(alpha!=null)cx.globalAlpha=Math.max(0,alpha);cx.drawImage(im,-w*(ax==null?.5:ax),-h*(ay==null?.5:ay),w,h);cx.restore();
}
function glow(g,x,y,r,a){if(a<=0)return;cx.globalAlpha=Math.min(1,a);cx.drawImage(GLOW[g],x-r,y-r,r*2,r*2);}
function draw(dt){
  cx.globalAlpha=1;cx.globalCompositeOperation='source-over';
  // sky: big nebula background with gentle parallax that follows the river's turns
  var th=PL(),bg=IMG[th.bg];
  if(ok(bg)){var s=Math.max(W/720,H/1280)*1.18,bw=720*s,bh=1280*s,sh=-rcd(dist)*W*0.35;
    cx.drawImage(bg,(W-bw)/2+sh,(H-bh)/2-H*0.04,bw,bh);}else{cx.fillStyle=S.planet===2?'#d9a8e0':S.planet===3?'#8fc8ee':S.planet===4?'#2f6b4a':'#120f45';cx.fillRect(0,0,W,H);}
  // warp stars stream out of the horizon (stronger when paddling fast)
  cx.globalCompositeOperation='lighter';cx.fillStyle='#fff';
  var fast=spd/Math.max(1,baseSpeed());
  warp.forEach(function(st){var x=W/2+st.x/st.z*W*0.5,y=HY+st.y/st.z*H*0.25;if(y>HY+4||x<-10||x>W+10||y<-10)return;
    var a=Math.min(1,(1-st.z)*1.6)*0.8,r=st.r*(1.2-st.z);cx.globalAlpha=a;
    if(fast>1.15){var x2=W/2+st.x/(st.z+0.06)*W*0.5,y2=HY+st.y/(st.z+0.06)*H*0.25;cx.strokeStyle='#fff';cx.lineWidth=r;cx.beginPath();cx.moveTo(x,y);cx.lineTo(x2,y2);cx.stroke();}
    else{cx.fillRect(x-r/2,y-r/2,r,r);}});
  cx.globalCompositeOperation='source-over';cx.globalAlpha=1;
  if(isWk())drawMeteors(dt);
  drawRiver();
  // world sprites far -> near
  var objs=[],mkZ=[];
  if(S.planet===1&&mkBuilt()>0)piers.forEach(function(p){if(p.kind==='home'){mkZ.push(p.z+9);objs.push({z:p.z+9,kind:'market',u:p.side*(RW+2.5)});}});
  var k0=Math.floor((dist-4)/7),k1=Math.floor((dist+DF)/7);
  for(var k=k0;k<=k1;k++){var z=k*7+hash(k)*4;
    if(piers.some(function(p){return Math.abs(p.z-z)<5;})||mkZ.some(function(m){return Math.abs(m-z)<6;}))continue;
    var sd=hash(k+0.5)<0.5?-1:1,u=sd*(RW+1.8+hash(k+0.7)*4.5);objs.push({z:z,kind:'islet',u:u,n:Math.floor(hash(k+0.9)*4),ph:k});
    if(hash(k+0.3)<0.35)objs.push({z:z+3.5,kind:'islet',u:-sd*(RW+2.6+hash(k+0.2)*3),n:Math.floor(hash(k+0.1)*4),ph:k+9,small:1});
  }
  piers.forEach(function(p){objs.push({z:p.z,kind:'pier',u:p.side*(RW+1.0),p:p});});
  gifts.forEach(function(g){if(!g.taken)objs.push({z:g.z,kind:'gift',u:g.u,g:g});});
  obs.forEach(function(o){if(!(o.done&&o.k==='crate'))objs.push({z:o.z,kind:'ob',u:o.u,o:o});});
  lbs.forEach(function(b){objs.push({z:b.z,kind:'lb',u:b.u,b:b});});
  if(fork){objs.push({z:fork.z0-3,kind:'fsign',u:0});
    for(var fz=fork.z0+2;fz<fork.z1;fz+=5.5)objs.push({z:fz,kind:'fdiv',u:0,n:Math.floor(hash(fz)*4)});
    for(var cz=fork.z0-10;cz<fork.z1;cz+=4)objs.push({z:cz,kind:'fcoin',u:fork.rich*LANE});}
  objs.sort(function(a,b){return b.z-a.z;});
  var boatDrawn=false;
  for(var j=0;j<objs.length;j++){var o=objs[j];if(!boatDrawn&&o.z-dist<0.2){drawConvoy();boatDrawn=true;}drawObj(o);}
  if(!boatDrawn)drawConvoy();
  // speed lines when paddling fast
  if(fast>1.2&&phase==='travel'){cx.strokeStyle='#ffffff';cx.lineWidth=2;
    for(var i=0;i<14;i++){var an=hash(i*3.1+Math.floor(time*8))*Math.PI*2,r0=W*(0.32+hash(i+Math.floor(time*8))*0.25),len=W*0.18;
      var sx=Math.cos(an),sy=Math.sin(an)*0.75;if(HY+sy*r0<HY*0.4)continue;cx.globalAlpha=0.18*(fast-1.1);
      cx.beginPath();cx.moveTo(W/2+sx*r0,HY+H*0.12+sy*r0);cx.lineTo(W/2+sx*(r0+len),HY+H*0.12+sy*(r0+len));cx.stroke();}
    cx.globalAlpha=1;}
  if(nightS>0.01)drawNight();
  // customers (screen space)
  if(lavaOn()&&trip&&trip.heat&&(phase==='travel'||phase==='dock'))drawSteam();
  dockC.forEach(drawCust);aliens.forEach(drawCust);
  if(kingC)drawKing();
  drawFF();
  drawBubbles(dt);
  drawFx(dt);
  drawOverlayText();
}
function drawSteam(){var h=0,n=0;for(var k in trip.heat){if(stock[k]>0){h+=trip.heat[k];n++;}}if(!n)return;h/=n;if(h<0.08)return;
  var bx=L.boat.x+boatU*KX,by=L.boat.y-L.boat.h*0.3;cx.fillStyle='#ffffff';
  for(var i=0;i<4;i++){var k=(time*0.55+i*0.25)%1,x=bx+(i-1.5)*L.boat.w*0.09+Math.sin(time*2+i)*6,y=by-k*L.boat.h*0.7;cx.globalAlpha=0.32*h*(1-k);cx.beginPath();cx.arc(x,y,6+k*12,0,6.283);cx.fill();}
  cx.globalAlpha=1;}
function drawRiver(){
  var N=44,L1=[],R1=[],d,p,z;
  for(var i=0;i<=N;i++){var tt=i/N;d=DF-(DF+3.2)*Math.pow(tt,0.55);z=dist+d;p=pOf(d);var cxp=W/2+(rc(z)-camX)*KX*p,y=HY+(BY-HY)*p,hw=RW*KX*p;
    L1.push([cxp-hw,y]);R1.push([cxp+hw,y]);}
  var th=PL(),g=cx.createLinearGradient(0,HY,0,H);g.addColorStop(0,th.river[0]);g.addColorStop(0.25,th.river[1]);g.addColorStop(1,th.river[2]);
  cx.fillStyle=g;cx.beginPath();cx.moveTo(L1[0][0],L1[0][1]);for(i=1;i<=N;i++)cx.lineTo(L1[i][0],L1[i][1]);for(i=N;i>=0;i--)cx.lineTo(R1[i][0],R1[i][1]);cx.closePath();cx.fill();
  // inner shine band
  cx.globalCompositeOperation='lighter';cx.globalAlpha=0.22;cx.fillStyle=th.shine;cx.beginPath();
  for(i=0;i<=N;i++){var m=(L1[i][0]+R1[i][0])/2,hw2=(R1[i][0]-L1[i][0])*0.22;if(i===0)cx.moveTo(m-hw2,L1[i][1]);else cx.lineTo(m-hw2,L1[i][1]);}
  for(i=N;i>=0;i--){var m2=(L1[i][0]+R1[i][0])/2,hw3=(R1[i][0]-L1[i][0])*0.22;cx.lineTo(m2+hw3,L1[i][1]);}cx.fill();
  // glowing banks
  cx.globalAlpha=0.7;cx.strokeStyle=th.bank;cx.lineWidth=2.5;
  [L1,R1].forEach(function(e){cx.beginPath();cx.moveTo(e[0][0],e[0][1]);for(var q=1;q<=N;q++)cx.lineTo(e[q][0],e[q][1]);cx.stroke();});
  cx.globalAlpha=0.18;cx.lineWidth=10;[L1,R1].forEach(function(e){cx.beginPath();cx.moveTo(e[0][0],e[0][1]);for(var q=1;q<=N;q++)cx.lineTo(e[q][0],e[q][1]);cx.stroke();});
  // sparkling flow particles fixed in the world (they rush toward you as the boat moves)
  flow.forEach(function(f){var q=proj(f.z,f.u);if(q.d<-3||q.d>DF)return;var fog=Math.min(1,(DF-q.d)/14),tw=0.55+0.45*Math.sin(time*3+f.h*20);
    var r=f.r*q.p*2.2;cx.globalAlpha=fog*tw*0.9;cx.fillStyle=f.h<0.33?th.flow[0]:(f.h<0.66?th.flow[1]:th.flow[2]);
    if(spd>3&&q.d<12){var q2=proj(f.z+spd*0.05,f.u);cx.strokeStyle=cx.fillStyle;cx.lineWidth=Math.max(1,r);cx.beginPath();cx.moveTo(q.x,q.y);cx.lineTo(q2.x,q2.y);cx.stroke();}
    else{cx.beginPath();cx.arc(q.x,q.y,Math.max(0.6,r),0,6.283);cx.fill();}
    if(r>1.5)glow(th.glow,q.x,q.y,r*4,fog*tw*0.25);});
  // wake ripples
  ripples.forEach(function(rp){var q=proj(rp.z,0),k=rp.t/2.2;if(q.d<-2.5||q.p<=0)return;cx.globalAlpha=(1-k)*0.55;cx.strokeStyle=th.rip;cx.lineWidth=2;
    cx.beginPath();cx.ellipse(W/2+(q.x-W/2)*0.3+(rp.u||0)*KX*q.p,q.y+L.boat.h*0.12,L.boat.w*(0.25+k*0.5)*q.p,L.boat.h*(0.05+k*0.05)*q.p,0,0,6.283);cx.stroke();});
  cx.globalAlpha=1;cx.globalCompositeOperation='source-over';
}
function drawObj(o){
  var q=proj(o.z,o.u);if(q.d<-3.2||q.d>DF)return;var fog=Math.min(1,(DF-q.d)/12)*Math.min(1,(q.d+3.2)/1.2);
  if(q.x<-W*0.6||q.x>W*1.6)return;
  if(o.kind==='islet'){var w=KX*q.p*(o.small?1.7:2.6),y=q.y-KX*q.p*(0.9+0.25*Math.sin(time*0.8+o.ph));
    drawImg(PL().isl+o.n,q.x,y,w,.5,.5,0,fog);if(o.n===0){cx.globalCompositeOperation='lighter';glow('warm',q.x+w*0.12,y-w*0.18,w*0.35,fog*0.4);cx.globalCompositeOperation='source-over';}}
  else if(o.kind==='pier'){var w2=KX*q.p*3.0,y2=q.y-KX*q.p*0.55+Math.sin(time*0.8)*2*q.p;
    cx.globalCompositeOperation='lighter';glow('warm',q.x,y2-w2*0.12,w2*0.7,fog*(0.45+0.15*Math.sin(time*3)));cx.globalCompositeOperation='source-over';
    drawImg(PL().stall,q.x,y2,w2,.5,.62,0,fog);
    if(o.p.kind==='end'&&q.d>2){cx.globalAlpha=fog;cx.font='800 '+Math.max(11,Math.round(16*Math.min(1.4,q.p*3)))+'px Kanit,sans-serif';cx.textAlign='center';
      cx.lineWidth=4;cx.strokeStyle='#121c4a';var lbl=S.lang==='th'?'ปลายทาง':'Finish';cx.strokeText(lbl,q.x,y2-w2*0.75);cx.fillStyle='#ffd24a';cx.fillText(lbl,q.x,y2-w2*0.75);cx.globalAlpha=1;}}
  else if(o.kind==='ob'){var ob=o.o,cr=ob.k==='crate',w4=KX*q.p*(cr?1.0:1.2),y4=q.y-KX*q.p*(0.22+0.07*Math.sin(time*2.2+ob.ph)),fa=fog*(ob.done?Math.max(0,1-ob.t/0.7):1);
    cx.globalCompositeOperation='lighter';glow(cr?'gold':ob.k==='meteor'?'warm':ob.fork?'green':'cyan',q.x,y4-w4*0.25,w4*(cr?1.1:0.9),fa*(cr?0.75:0.5));cx.globalCompositeOperation='source-over';
    drawImg('ob_'+ob.k,q.x,y4,w4,.5,.72,Math.sin(time*1.4+ob.ph)*(cr?0.12:0.06)+(ob.done&&ob.push?ob.push*ob.t*2:0),fa);}
  else if(o.kind==='lb'){var lb=o.b,r6=KX*q.p*0.42*(1+0.07*Math.sin(time*5+lb.ph)),y6=q.y-r6*0.55,a6=fog*(lb.done?Math.max(0,1-lb.t/0.5):1),g6=lb.done?1+lb.t*2.2:1;
    if(r6<1.5)return;cx.globalCompositeOperation='lighter';glow('warm',q.x,y6,r6*2.4,a6*0.7);cx.globalCompositeOperation='source-over';cx.globalAlpha=a6;
    if(lb.done&&lb.pop){cx.strokeStyle='#ffe2a0';cx.lineWidth=Math.max(1.5,r6*0.18);cx.beginPath();cx.arc(q.x,y6,r6*g6,0,6.283);cx.stroke();}
    else{cx.fillStyle='#ff9a52';cx.beginPath();cx.ellipse(q.x,y6,r6*g6,r6*0.92*g6,0,0,6.283);cx.fill();cx.fillStyle='#ffc77a';cx.beginPath();cx.ellipse(q.x,y6+r6*0.15,r6*0.72,r6*0.55,0,0,6.283);cx.fill();
      cx.fillStyle='#fff6e0';cx.beginPath();cx.ellipse(q.x-r6*0.38,y6-r6*0.36,r6*0.22,r6*0.15,-0.6,0,6.283);cx.fill();cx.beginPath();cx.arc(q.x+r6*0.3,y6-r6*0.5,r6*0.08,0,6.283);cx.fill();
      var mb=(time*0.8+lb.ph)%1;cx.globalAlpha=a6*(1-mb);cx.fillStyle='#ffd9a0';cx.beginPath();cx.arc(q.x+r6*0.6,y6-r6*(0.9+mb*1.2),r6*0.16,0,6.283);cx.fill();}
    cx.globalAlpha=1;}
  else if(o.kind==='market'){var w5=KX*q.p*4.6,h5=w5*609/720,y5=q.y-KX*q.p*0.1,top=y5-h5*0.8;
    cx.globalCompositeOperation='lighter';glow('warm',q.x,top+h5*0.45,w5*0.7,fog*0.45);cx.globalCompositeOperation='source-over';
    drawImg('market_base',q.x,y5,w5,.5,.8,0,fog);
    STALLS.slice().sort(function(a,b){return a.y-b.y;}).forEach(function(st){if(S.market.st[st.id]>0)drawImg(st.img,q.x-w5/2+w5*st.x,top+h5*st.y+Math.sin(time*1.2+st.x*9)*1.2*q.p,w5*st.w,.5,1,0,fog);});}
  else if(o.kind==='fsign'){var w6=KX*q.p*1.5;drawImg('sign_fork',q.x,q.y-KX*q.p*0.1,w6,.5,.95,Math.sin(time*1.3)*0.03,fog);}
  else if(o.kind==='fdiv'){var w7=KX*q.p*1.25,fd=fog*Math.min(1,Math.max(0,(q.d-0.5)/3));drawImg(PL().isl+o.n,q.x,q.y-KX*q.p*0.45,w7,.5,.6,0,fd);}
  else if(o.kind==='fcoin'){var r8=Math.max(5,KX*q.p*0.22),y8=q.y-KX*q.p*(0.35+0.08*Math.sin(time*3+o.z));
    cx.globalCompositeOperation='lighter';glow('gold',q.x,y8,r8*2.4,fog*0.6);cx.globalCompositeOperation='source-over';drawImg('coin',q.x,y8,r8*2,.5,.5,0,fog*0.9);}
  else if(o.kind==='gift'){var r=Math.max(8,KX*q.p*0.45),y3=q.y-KX*q.p*(0.5+0.12*Math.sin(time*3+o.g.ph));
    cx.globalCompositeOperation='lighter';glow('gold',q.x,y3,r*2.6,fog*0.8);cx.globalCompositeOperation='source-over';
    cx.globalAlpha=fog;cx.fillStyle='#ffd24a';cx.save();cx.translate(q.x,y3);cx.rotate(Math.sin(time*2)*0.2);star5(0,0,r);cx.fillStyle='#fff6c8';star5(-r*0.12,-r*0.12,r*0.4);cx.restore();cx.globalAlpha=1;}
}
function drawConvoy(){
  // staff canoes paddle behind the boat
  for(var s=0;s<STAFF.length;s++){if(!S.staff[s])continue;var sd=s?1:-1,q=proj(dist-1.0-s*0.5,sd*1.75+boatU*0.6),hop=Math.sin(staffHop[s]*Math.PI)*10;
    var w=W*0.27*q.p;drawImg('staff',q.x+Math.sin(time*0.7+s)*4,q.y+L.boat.h*0.05+Math.sin(time*1.8+s)*3-hop,w,.5,.55,Math.sin(time*1.5+s)*0.04,1,s===1);}
  drawBoat();
}
function drawBoat(){
  var b0=L.boat,b={x:b0.x+boatU*KX,y:b0.y,w:b0.w,h:b0.h},bob=Math.sin(time*1.6)*4,tilt=-(rc(dist+3)-rc(dist))*0.12,rot=Math.sin(time*1.1)*0.025+Math.max(-0.08,Math.min(0.08,tilt))+(lane*LANE-boatU)*0.12+Math.sin(bumpT*14)*bumpT*0.06,sq=Math.sin(boatSquash*Math.PI)*0.06;
  cx.globalCompositeOperation='lighter';glow('lav',b.x,b.y+b.h*0.3,b.w*0.7,0.45);cx.globalCompositeOperation='source-over';
  // V wake behind the boat
  if(spd>0.3){cx.globalAlpha=Math.min(0.5,spd*0.06);cx.strokeStyle='#efe9ff';cx.lineWidth=2.5;
    cx.beginPath();cx.moveTo(b.x-b.w*0.3,b.y+b.h*0.32);cx.lineTo(b.x-b.w*0.75,H*0.98);cx.moveTo(b.x+b.w*0.3,b.y+b.h*0.32);cx.lineTo(b.x+b.w*0.75,H*0.98);cx.stroke();cx.globalAlpha=1;}
  var T=tierOf(),im=IMG[boatImg(S.cos.boat)];if(!ok(im))im=IMG[T.img];if(!ok(im))return;
  var tn=Math.max(1,Math.min(3,S.tier|0||1)),nm=ok(IMG[boatImg(S.cos.boat)])?boatImg(S.cos.boat):T.img,R=fangRig(nm,String(tn));
  cx.globalAlpha=1;cx.save();cx.translate(b.x,b.y+bob);cx.rotate(rot);cx.scale(1+sq,1-sq);var x0=-b.w/2,y0=-b.h/2;cx.drawImage(R?R.base:im,x0,y0,b.w,b.h);
  cargoIcons().forEach(function(c,i){var sl=T.slots[i],cw=b.w*T.cw,gi=IMG[c];if(!sl||!ok(gi))return;var ch=cw*ih(gi)/iw(gi);
    cx.drawImage(gi,-b.w/2+b.w*sl[0]-cw/2,-b.h/2+b.h*sl[1]-ch*0.85+Math.sin(time*2+i)*0.8,cw,ch);});
  var ch2=fang.cheer>0?Math.sin(fang.cheer/0.7*Math.PI):0;
  if(R){var F=R.F,br=Math.sin(time*2.2)*0.5+0.5,fx=x0+F.foot[0]*b.w,fy=y0+F.foot[1]*b.h,sy=1+0.014*br+0.03*ch2+(fang.yawn>0?0.025*Math.sin(Math.min(1,(1.8-fang.yawn)/0.7)*Math.PI):0);
    cx.save();cx.translate(fx,fy);cx.scale(1+0.004*br,sy);cx.translate(-fx,-fy);cx.drawImage(R.body,x0+R.bb[0]*b.w,y0+R.bb[1]*b.h,R.bb[2]*b.w,R.bb[3]*b.h);
    var talk=fang.talk>0?Math.abs(Math.sin(time*13))*Math.min(1,fang.talk*4):0;
    drawFace(F,x0,y0,b.w,b.h,fangExpr(),{blink:fang.blink>0,talk:talk,lw:b.w*0.0065});}
  var ht=hatOf(S.cos.hat),hi=ht&&ht.id!=='none'?IMG['hat_'+ht.id]:null;
  if(ok(hi)){var hp=hatPos(ht,T),hw=b.w*hp.w,hh=hw*hi.naturalHeight/hi.naturalWidth,hx=-b.w/2+b.w*hp.x,hy=-b.h/2+b.h*hp.y;
    cx.save();cx.translate(hx,hy);cx.rotate(ht.r+Math.sin(time*2.4)*0.03);cx.drawImage(hi,-hw/2,-hh,hw,hh);cx.restore();}
  if(R){cx.restore();
    // paddle stroke synced to speed (slide + small swing around the hand), lifted on a cheer
    var amp=phase==='travel'?Math.min(0.17,0.05+spd*0.013)*(holding?1.25:1):0.025,ang=Math.sin(fang.pad*Math.PI)*amp-0.16*ch2,pv=[x0+F.piv[0]*b.w,y0+F.piv[1]*b.h],
      ax=(F.pad[1][0]-F.pad[0][0])*b.w,ay=(F.pad[1][1]-F.pad[0][1])*b.h,al=Math.hypot(ax,ay)||1,sl=Math.cos(fang.pad*Math.PI)*amp*b.w*0.12;
    cx.save();cx.translate(pv[0]+ax/al*sl,pv[1]+ay/al*sl);cx.rotate(ang);cx.translate(-pv[0],-pv[1]);cx.drawImage(R.pad,x0+R.pb[0]*b.w,y0+R.pb[1]*b.h,R.pb[2]*b.w,R.pb[3]*b.h);cx.restore();
    var ex=F.e[0];fang.head={x:b.x+(ex[0]-0.5)*b.w,y:b.y+bob+(ex[1]-0.5)*b.h-b.h*0.12};
    if(fang.sing>0){cx.textAlign='center';cx.textBaseline='middle';cx.lineJoin='round';for(var nn=0;nn<2;nn++){var tt=(time*0.8+nn*0.5)%1;cx.globalAlpha=Math.min(1,fang.sing)*Math.sin(tt*Math.PI);
      outlined(nn?'♫':'♪',(ex[0]-0.5)*b.w+b.w*(0.06+nn*0.07)+Math.sin(time*4+nn)*4,(ex[1]-0.5)*b.h-b.h*0.15-tt*b.h*0.2,Math.max(14,b.w*0.08));}cx.globalAlpha=1;}}
  else fang.head={x:b.x,y:b.y-b.h*0.4};
  var pet=petOf(S.pets.on),pi=pet?IMG['pet_'+pet.id]:null;
  if(ok(pi)){var pp=petPos(pet,T),pw=b.w*pp.w,ph=pw*pi.naturalHeight/pi.naturalWidth,px=-b.w/2+b.w*pp.x,py=-b.h/2+b.h*pp.y+(pet.fly?Math.sin(time*3.2)*6-6:Math.abs(Math.sin(time*2.6))*-3)-(fang.cheer>0?ch2*6:0);
    cx.save();cx.translate(px,py);cx.rotate(pet.fly?Math.sin(time*3.2)*0.08:Math.sin(time*1.7)*0.04);drawPet(pet.id,pw,ph);cx.restore();}
  cx.restore();
  L.lan={x:b.x-b.w/2+b.w*T.lan[0],y:b.y+bob-b.h/2+b.h*T.lan[1],r:b.w*0.17};
  cx.globalCompositeOperation='lighter';glow('warm',L.lan.x,L.lan.y,L.lan.r,0.55+0.2*Math.sin(time*5));cx.globalCompositeOperation='source-over';cx.globalAlpha=1;
}
// the goods drawn on deck always match what is really on board (port: packed load, trip: remaining stock)
function cargoIcons(){var src=phase==='port'?S.load:stock,T=tierOf(),items=[],tot=0;
  GOODS.forEach(function(g){var n=src[g.id]|0;if(n>0){items.push({g:g,n:n,k:0});tot+=n;}});if(!tot)return [];
  items.sort(function(a,b){return b.n-a.n;});
  var want=Math.max(items.length>T.slots.length?T.slots.length:items.length,Math.min(T.slots.length,Math.ceil(T.slots.length*tot/Math.max(1,cap()))));
  var out=[];items.slice(0,want).forEach(function(it){it.k=1;});var used=Math.min(want,items.length);
  while(used<want){var best=null;items.forEach(function(it){if(it.k&&(!best||it.n/(it.k+1)>best.n/(best.k+1)))best=it;});best.k++;used++;}
  items.forEach(function(it){for(var i=0;i<it.k;i++)out.push(it.g.img);});return out;}
function drawNight(){var k=nightS;cx.globalAlpha=0.56*k;cx.fillStyle='#0b1238';cx.fillRect(0,0,W,H);
  cx.fillStyle='#fff6c8';for(var i=0;i<26;i++){var x=hash(i*1.7)*W,y=hash(i*2.3)*HY*1.1;cx.globalAlpha=k*(0.4+0.4*Math.sin(time*2+i));cx.fillRect(x,y,3,3);}
  if(L.lan){cx.globalCompositeOperation='lighter';glow('warm',L.lan.x,L.lan.y,L.lan.r*2.2,k*(0.5+0.15*Math.sin(time*5)));cx.globalCompositeOperation='source-over';}
  cx.globalAlpha=1;}
function drawFF(){ffs.forEach(function(f){var p=ffPos(f),a=f.got?Math.max(0,1-f.gt/0.5):Math.min(1,f.t/0.6,(f.life-f.t)/0.8),pul=0.7+0.3*Math.sin(time*6+f.ph);
  var y=f.got?p.y-f.gt*60:p.y;cx.globalCompositeOperation='lighter';glow('green',p.x,y,30*pul,a*0.9);glow('gold',p.x,y,12,a);cx.globalCompositeOperation='source-over';
  drawImg('firefly',p.x,y,30,.5,.5,Math.sin(time*5+f.ph)*0.2,a);});cx.globalAlpha=1;}
function drawAlien(a,p,sh){var r=alienRig(a.img,a.gold);
  if(!r){drawImg(a.gold?(goldOf(a.img)||a.img):a.img,p.x+sh,p.y,p.w,.5,.6,Math.sin(time*2.2+a.ph)*0.05,p.al);return;}
  var im=r.im,w=p.w,h=w*ih(im)/iw(im),hk=a.hop>0?Math.sin(a.hop*Math.PI):0,jy=hk*w*0.25+(a.st>0?Math.sin(a.st/0.7*Math.PI)*w*0.1:0),sq=-0.06*hk,
    wv=a.wv>0?Math.min(1,a.wv*2):0,rot=Math.sin(time*2.2+a.ph)*0.05+(r.arm?0:Math.sin(time*12)*0.14*wv)+(a.pout>0?Math.sin(a.pout*40)*0.035:0);
  cx.save();cx.globalAlpha=Math.max(0,p.al);cx.translate(p.x+sh,p.y-jy);cx.rotate(rot);cx.scale(1-sq,1+sq);
  var x0=-w*0.5,y0=-h*0.6;cx.drawImage(im,x0,y0,w,h);
  if(r.arm)drawPart(r.arm,x0,y0,w,h,wv?(-0.12+Math.sin(time*13+a.ph)*0.42)*wv:Math.sin(time*2+a.ph)*0.06);
  drawFace(FACES[a.img],x0,y0,w,h,exprOf(a),{blink:a.blink>0,lw:w*0.02,extra:!a.dock});
  if(a.st>0){cx.textAlign='center';cx.textBaseline='middle';cx.lineJoin='round';outlined('!',x0+w*0.9,y0+h*0.05-Math.sin(a.st/0.7*Math.PI)*6,Math.max(16,w*0.3));}
  if(a.pout>0){cx.fillStyle='#ffffff';cx.globalAlpha=Math.max(0,p.al)*Math.min(1,a.pout*1.5)*0.85;var pk=(1-a.pout%0.6/0.6);
    [-1,1].forEach(function(s){cx.beginPath();cx.arc(s*w*(0.42+pk*0.12),y0+h*0.12-pk*h*0.12,w*(0.035+pk*0.03),0,6.283);cx.fill();});}
  cx.restore();
  var lv=frLv(a.img);
  if(lv>=2&&a.state!=='pass'&&a.state!=='out'){var hx=p.x+sh-w*0.44,hy=p.y-jy+h*0.14+Math.sin(time*3+a.ph)*2,pu=1+0.12*Math.sin(time*6);cx.globalAlpha=Math.max(0,p.al);
    for(var i=0;i<(lv>=3?2:1);i++){var xx=hx-i*w*0.15,yy=hy-i*w*0.12,s=Math.max(8,w*0.1)*pu*(i?0.75:1);cx.fillStyle='#121c4a';heart(xx,yy,s*1.3);cx.fillStyle='#ffd24a';heart(xx,yy,s);}cx.globalAlpha=1;}
  cx.globalAlpha=1;
}
function drawCust(a){
  if(!a)return;var p=custPos(a);if(p.al<=0)return;
  var sh=a.shake?Math.sin(a.shake*30)*6*a.shake:0;
  cx.globalCompositeOperation='lighter';glow(a.vip||a.gold?'gold':'cyan',p.x,p.y+p.w*0.3,p.w*(a.vip||a.gold?0.8:0.5),(a.gold?0.7:0.4)*p.al);cx.globalCompositeOperation='source-over';cx.globalAlpha=1;
  drawAlien(a,p,sh);
  if(a.vip&&a.state!=='out'){cx.globalAlpha=p.al;cx.font='800 18px Kanit,sans-serif';cx.textAlign='center';cx.lineWidth=4;cx.strokeStyle='#121c4a';cx.strokeText('VIP',p.x,p.y+p.w*0.42);cx.fillStyle='#ffd24a';cx.fillText('VIP',p.x,p.y+p.w*0.42);cx.globalAlpha=1;}
  if(a.state==='wait'&&a.order){drawOrderBubble(a,p,sh);}
  else if(a.state==='wait'){
    var bx=p.x+sh,by=p.y-p.w*0.95,r=p.w*0.31,pop=Math.min(1,a.t/0.2);r*=0.6+0.4*ease(pop);
    if(bx-r<6)bx=r+6;if(bx+r>W-6)bx=W-6-r;
    var have=a.vip||stock[a.good.id]>0;
    cx.fillStyle=have?'#fffaf0':'#c9c6dc';cx.beginPath();cx.arc(bx,by,r,0,6.283);cx.fill();
    cx.beginPath();cx.moveTo(bx-r*0.25,by+r*0.85);cx.lineTo(p.x,by+r*1.35);cx.lineTo(bx+r*0.25,by+r*0.85);cx.fill();
    var left=Math.max(0,1-a.t/a.pat);cx.strokeStyle='#ffd24a';cx.lineWidth=4;cx.lineCap='round';cx.beginPath();cx.arc(bx,by,r+3,-Math.PI/2,-Math.PI/2+left*6.283);cx.stroke();
    if(a.vip){drawImg('coin',bx,by,r*1.3,.5,.5);}
    else{drawImg(a.good.img,bx,by+Math.sin(time*4)*1.5,r*1.35,.5,.5,0,have?1:0.45);
      if(!have){cx.strokeStyle='#121c4a';cx.lineWidth=4;cx.beginPath();cx.moveTo(bx-r*0.45,by-r*0.45);cx.lineTo(bx+r*0.45,by+r*0.45);cx.moveTo(bx+r*0.45,by-r*0.45);cx.lineTo(bx-r*0.45,by+r*0.45);cx.stroke();}
      if(a.likes&&have){cx.fillStyle='#ffd24a';heart(bx+r*0.75,by-r*0.7,7);}}
  }else if(a.state==='out'&&a.happy){
    cx.globalAlpha=p.al;cx.fillStyle='#ffd24a';var hy=p.y-p.w*0.8-a.t*30;heart(p.x+p.w*0.25,hy,9);heart(p.x-p.w*0.2,hy+12,6);cx.globalAlpha=1;
  }
}
function rrect(x,y,w,h,r){cx.beginPath();cx.moveTo(x+r,y);cx.arcTo(x+w,y,x+w,y+h,r);cx.arcTo(x+w,y+h,x,y+h,r);cx.arcTo(x,y+h,x,y,r);cx.arcTo(x,y,x+w,y,r);cx.closePath();}
function drawOrderBubble(a,p,sh){
  var n=a.order.length,ir=p.w*0.21,gap=ir*2.15,bw=n*gap+ir*0.5,bh=ir*2.7,pop=Math.min(1,a.t/0.2),sc=0.6+0.4*ease(pop);
  var bx=Math.max(bw/2+6,Math.min(W-bw/2-6,p.x+sh)),by=p.y-p.w*0.98;
  cx.save();cx.translate(bx,by);cx.scale(sc,sc);
  cx.globalCompositeOperation='lighter';glow('gold',0,0,bw*0.75,0.35);cx.globalCompositeOperation='source-over';cx.globalAlpha=1;
  cx.fillStyle='#fffaf0';rrect(-bw/2,-bh/2,bw,bh,bh*0.32);cx.fill();
  var tx=Math.max(-bw/2+12,Math.min(bw/2-12,p.x-bx));cx.beginPath();cx.moveTo(tx-8,bh/2-1);cx.lineTo(tx,bh/2+11);cx.lineTo(tx+8,bh/2-1);cx.fill();
  cx.lineWidth=3;cx.strokeStyle='#ffd24a';rrect(-bw/2,-bh/2,bw,bh,bh*0.32);cx.stroke();
  var left=Math.max(0,1-a.t/a.pat);cx.fillStyle='#121c4a';rrect(-bw/2+8,bh/2-9,bw-16,5,2.5);cx.fill();cx.fillStyle='#ffd24a';rrect(-bw/2+8,bh/2-9,Math.max(5,(bw-16)*left),5,2.5);cx.fill();
  a.order.forEach(function(g,i){var x=-bw/2+ir*0.25+gap*(i+0.5),got=a.got[i],have=got||stock[g.id]>0;
    drawImg(g.img,x,-3+(got?0:Math.sin(time*4+i)*1.5),ir*1.75,.5,.5,0,got?0.35:(have?1:0.45));
    if(got){cx.fillStyle='#ffd24a';cx.beginPath();cx.arc(x+ir*0.45,-3+ir*0.35,ir*0.42,0,6.283);cx.fill();cx.strokeStyle='#121c4a';cx.lineWidth=3;cx.lineCap='round';
      cx.beginPath();cx.moveTo(x+ir*0.27,-3+ir*0.36);cx.lineTo(x+ir*0.41,-3+ir*0.5);cx.lineTo(x+ir*0.65,-3+ir*0.18);cx.stroke();}});
  cx.textAlign='center';cx.textBaseline='middle';cx.lineJoin='round';outlined(t('order'),0,-bh/2-9,14);
  cx.restore();
}
function drawMeteors(dt){ // weekend meteor shower: golden streaks across the sky
  meteorT-=dt;if(meteorT<=0){meteorT=0.35+Math.random()*0.5;meteors.push({x:W*(0.2+Math.random()*1.1),y:-20+Math.random()*HY*0.6,v:380+Math.random()*260,t:0,l:0.9+Math.random()*0.6,r:1.5+Math.random()*1.8});}
  cx.globalCompositeOperation='lighter';
  for(var i=meteors.length-1;i>=0;i--){var m=meteors[i];m.t+=dt;if(m.t>m.l){meteors.splice(i,1);continue;}
    var hx=m.x-m.v*m.t*0.82,hy=m.y+m.v*m.t*0.57,al=Math.min(1,m.t*5)*Math.min(1,(m.l-m.t)*3),len=70+m.v*0.12;
    var g=cx.createLinearGradient(hx,hy,hx+len*0.82,hy-len*0.57);g.addColorStop(0,'rgba(255,230,140,'+(0.9*al)+')');g.addColorStop(1,'rgba(255,210,74,0)');
    cx.strokeStyle=g;cx.lineWidth=m.r*1.6;cx.lineCap='round';cx.beginPath();cx.moveTo(hx,hy);cx.lineTo(hx+len*0.82,hy-len*0.57);cx.stroke();
    glow('gold',hx,hy,m.r*9,al*0.7);}
  cx.globalCompositeOperation='source-over';cx.globalAlpha=1;
}
function drawFx(dt){
  var tgt=L.coinTarget;
  for(var k=fx.length-1;k>=0;k--){var f=fx[k];f.t+=dt;
    if(f.k==='coin'){
      if(!f.fly){f.vy+=600*dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vx*=0.96;if(f.t>f.d){f.fly=true;f.t=0;f.sx=f.x;f.sy=f.y;}
        drawImg('coin',f.x,f.y,22,.5,.5,f.t*8);}
      else{var q=Math.min(1,f.t/0.55),e=q*q*(3-2*q),mx=(f.sx+tgt.x)/2+(f.sx<W/2?-60:60),my=Math.min(f.sy,tgt.y)-80;
        var x=(1-e)*(1-e)*f.sx+2*(1-e)*e*mx+e*e*tgt.x,y=(1-e)*(1-e)*f.sy+2*(1-e)*e*my+e*e*tgt.y;
        drawImg('coin',x,y,22-8*e,.5,.5,f.t*10);
        if(q>=1){fx.splice(k,1);coinPulse=1;if(Math.random()<0.5)play('coin',{vol:0.25,rate:1+Math.random()*0.3});}}
    }else{f.x+=f.vx*dt;f.y+=f.vy*dt;f.vx*=0.95;f.vy*=0.95;var al=1-f.t/f.d;if(al<=0){fx.splice(k,1);continue;}
      cx.globalCompositeOperation='lighter';cx.globalAlpha=al;cx.fillStyle=f.c<0.5?'#ffe38a':'#d8c4ff';star5(f.x,f.y,3+4*al);cx.globalCompositeOperation='source-over';cx.globalAlpha=1;}
  }
  if(coinPulse>0){coinPulse=Math.max(0,coinPulse-dt*4);document.getElementById('pill-coin').style.transform='scale('+(1+coinPulse*0.08)+')';}
  cx.textAlign='center';cx.textBaseline='middle';cx.lineJoin='round';
  for(k=floats.length-1;k>=0;k--){var fl=floats[k];fl.t+=dt;if(fl.t>1.1){floats.splice(k,1);continue;}if(fl.t<0)continue;
    var sc=fl.t<0.15?0.6+fl.t/0.15*0.5:1.1-Math.min(0.1,(fl.t-0.15));cx.globalAlpha=fl.t>0.8?(1.1-fl.t)/0.3:1;
    cx.font='800 '+Math.round((fl.big?26:19)*sc)+'px Kanit,sans-serif';cx.lineWidth=5;cx.strokeStyle='#121c4a';
    var hw=cx.measureText(fl.txt).width/2+6,fx2=Math.max(hw,Math.min(W-hw,fl.x));
    cx.strokeText(fl.txt,fx2,fl.y-fl.t*50);cx.fillStyle='#ffd24a';cx.fillText(fl.txt,fx2,fl.y-fl.t*50);cx.globalAlpha=1;}
}
function outlined(txt,x,y,size){cx.font='800 '+Math.round(size)+'px Kanit,sans-serif';cx.lineWidth=Math.max(4,size*0.16);cx.strokeStyle='#121c4a';cx.strokeText(txt,x,y);cx.fillStyle='#ffd24a';cx.fillText(txt,x,y);}
function drawOverlayText(){
  cx.globalAlpha=1;cx.globalCompositeOperation='source-over';cx.textAlign='center';cx.textBaseline='middle';cx.lineJoin='round';
  if(phase==='dock'){
    // countdown ring
    var cxp=W/2,cy=H*0.215,r=24,left=Math.max(0,dockT/dockTime());
    cx.fillStyle='rgba(18,28,74,.85)';cx.beginPath();cx.arc(cxp,cy,r,0,6.283);cx.fill();
    cx.strokeStyle='#ffd24a';cx.lineWidth=5;cx.lineCap='round';cx.beginPath();cx.arc(cxp,cy,r,-Math.PI/2,-Math.PI/2+left*6.283);cx.stroke();
    outlined(''+Math.ceil(dockT),cxp,cy+1,22);
    if(combo>=2){var sc=1+comboPop*0.35;outlined(t('combo',{n:combo}),W/2,H*0.275,28*sc);
      outlined('x'+(1+0.1*Math.min(combo,20)).toFixed(1),W/2,H*0.275+30*sc,20*sc);
      cx.globalCompositeOperation='lighter';glow('gold',W/2,H*0.28,90*sc,0.25+comboPop*0.3);cx.globalCompositeOperation='source-over';cx.globalAlpha=1;}
    else if(dockT>dockTime()-2.2){outlined(t('rush'),W/2,H*0.275,22);}
  }
  if(banner){var k=banner.t,a=k<0.2?k/0.2:(k>1.3?(1.6-k)/0.3:1),s=k<0.2?0.6+k*2:1;cx.globalAlpha=Math.max(0,a);
    outlined(banner.txt==='docking'?t('docking'):t('setoff'),W/2,H*0.43,38*s);cx.globalAlpha=1;}
}
function star5(x,y,r){cx.beginPath();for(var i=0;i<10;i++){var a=i*Math.PI/5-Math.PI/2,rr=i%2?r*0.45:r;cx.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}cx.closePath();cx.fill();}
function heart(x,y,s){cx.beginPath();cx.moveTo(x,y+s*0.8);cx.bezierCurveTo(x-s*1.4,y-s*0.2,x-s*0.6,y-s*1.3,x,y-s*0.4);cx.bezierCurveTo(x+s*0.6,y-s*1.3,x+s*1.4,y-s*0.2,x,y+s*0.8);cx.fill();}

// ---------- HUD ----------
function fmt(n){n=Math.floor(n);if(n<1000)return ''+n;var u=['K','M','B','T','Qa','Qi'],i=-1;while(n>=1000&&i<u.length-1){n/=1000;i++;}return (n>=100?n.toFixed(0):n>=10?n.toFixed(1):n.toFixed(2)).replace(/\.0+$/,'')+u[i];}
var $=function(id){return document.getElementById(id);};
function canBuy(){return {
  boat:UPS.some(function(u){var lv=S.up[u.id];return lv<UP_MAX&&S.coins>=upCost(u,lv);})||tierCan(),
  book:bookCan(),cal:!!loginNext(),
  staff:STAFF.some(function(s,i){var lv=S.staff[i];return lv===0?S.coins>=s.hire:(lv<STAFF_MAX&&S.coins>=staffUpCost(s,lv));}),
  goods:PG().some(function(g){var lv=S.goods[g.id];return lv===0?(g.unlock>0&&S.coins>=g.unlock):(lv<GOOD_MAX&&S.coins>=goodUpCost(g,lv));}),
  shop:shopCan(),quests:questCan(),map:[2,3,4].some(function(n){return S.unlocked.indexOf(n)>=0&&S.arrived.indexOf(n)<0;}),
  market:mkCan(),pets:PETS.some(function(x){return !x.login&&S.pets.own.indexOf(x.id)<0&&S.gems>=x.cost;})};}
function tierCan(){var T=TIERS[S.tier];return !!T&&(T.cur==='gem'?S.gems>=T.cost:S.coins>=T.cost);}
// ---------- home-port market ----------
function stallOf(id){return STALLS.filter(function(x){return x.id===id;})[0];}
function stallRate(st,lv){return lv>0?st.rate*(1+0.6*(lv-1)):0;}
function stallUpCost(st,lv){return Math.round(st.cost*0.6*Math.pow(1.4,lv));}
function mkRate(){var r=0;STALLS.forEach(function(st){r+=stallRate(st,S.market.st[st.id]);});return r;} // coins per second
function mkBuilt(){return STALLS.filter(function(st){return S.market.st[st.id]>0;}).length;}
function mkNext(){return STALLS.filter(function(st){return !(S.market.st[st.id]>0);})[0]||null;}
function mkCap(){return mkRate()*OFFLINE_CAP;}
function mkTick(){var now=Date.now(),el=Math.max(0,Math.min(OFFLINE_CAP,(now-S.market.last)/1000));S.market.last=now;var r=mkRate();
  if(r>0&&el>0){var b0=Math.floor(S.market.bank);S.market.bank=Math.min(mkCap(),S.market.bank+r*el);if(Math.floor(S.market.bank)!==b0)hudDirty=true;}}
function mkCan(){var nx=mkNext();if(nx&&S.coins>=nx.cost)return true;var r=mkRate();return r>0&&S.market.bank>=Math.max(20,r*120);}
function petOf(id){return PETS.filter(function(x){return x.id===id;})[0]||null;}
function tripProg(){return trip?Math.max(0,Math.min(1,(dist-trip.z0)/(trip.end-trip.z0))):0;}
function updateHud(){
  $('coins').textContent=fmt(S.coins);$('gems').textContent=fmt(S.gems);$('lvl').textContent='Lv. '+S.lvl;
  $('xpfill').style.width=Math.min(100,S.xp/xpNeed(S.lvl)*100)+'%';
  var can=canBuy();document.querySelectorAll('.nb').forEach(function(b){b.classList.toggle('can',!!can[b.dataset.p]);});
  $('jtxt').textContent=t(PL().name)+' · '+t('route',{a:Math.min(RT().trips,PL().trips),b:PL().trips});
  var j1=$('j1'),j2=$('j2'),i1='assets/'+PL().icon+'.webp',i2=S.planet===1?'assets/i_planet2.webp':S.planet===2?'assets/i_ice.webp':S.planet===3?'assets/i_forest.webp':S.planet===4?'assets/i_lava.webp':'assets/i_legend.webp';
  if(j1.getAttribute('src')!==i1)j1.setAttribute('src',i1);if(j2.getAttribute('src')!==i2)j2.setAttribute('src',i2);
  j2.classList.toggle('lockd',S.planet<5?S.unlocked.indexOf(S.planet+1)<0:!legendAvail());
  $('mkbtn').classList.toggle('can',!!can.market);$('petbtn').classList.toggle('can',!!can.pets);$('bookbtn').classList.toggle('can',!!can.book||bookNew);$('calbtn').classList.toggle('can',!!can.cal);
  $('evb').classList.toggle('hidden',!isWk());
  renderChips();
  if(openPanel&&openPanel!=='map'&&openPanel!=='settings'&&openPanel!=='credits'&&openPanel.charAt(0)!=='_')renderPanel(openPanel,true);
}
function renderChips(){
  var h='';PG().forEach(function(g){if(!S.goods[g.id])return;var n=phase==='port'?(S.load[g.id]||0):stock[g.id];if(phase!=='port'&&!(S.load[g.id]>0)&&!n)return;
    h+='<div class="chip'+(n?'':' zero')+'"><img src="assets/'+g.img+'.webp" alt=""><b>'+n+'</b>'+(g.hot&&phase!=='port'?'<i class="heat"><u data-g="'+g.id+'"></u></i>':'')+'</div>';});
  $('chips').innerHTML=h;
}
var lastJ=-1,lastTp=-1;
function tickTripUi(){
  var rt=RT(),rn=PL().trips,j=Math.min(1,(Math.min(rt.trips,rn)+(rt.trips<rn?tripProg():0))/rn),tp=tripProg();
  if(Math.abs(j-lastJ)>0.002){lastJ=j;$('jfill').style.width=(j*100).toFixed(1)+'%';}
  if(Math.abs(tp-lastTp)>0.002){lastTp=tp;$('tripfill').style.width=(tp*100).toFixed(1)+'%';$('tripboat').style.left=(tp*100).toFixed(1)+'%';}
  var kind=null;
  if((phase==='travel'||phase==='dock')&&!(trip&&trip.tut)&&adAvailable()){if(stockTotal()<=0)kind='restock';else if(vipWin>0&&phase==='travel')kind='vip';}
  var ab=$('adbtn');if(ab.dataset.k!==(kind||'')){ab.dataset.k=kind||'';ab.classList.toggle('hidden',!kind);if(kind)$('adbtn-t').textContent=t(kind==='vip'?'vipBtn':'rsBtn');}
  var ice=iceOn()&&phase==='travel'&&!(trip&&trip.tut),hk=ice?'steerH':'hold',he=$('hint');
  if(he.dataset.t!==hk){he.dataset.t=hk;he.textContent=t(hk);}
  he.classList.toggle('hidden',!(ice?RT().trips<2:(phase==='travel'&&!holding&&S.stats.trips<3&&!(tut.step==='hold'))));
  var fc=forkChoosing();$('lanes').classList.toggle('hidden',!ice||fc);
  var fu=$('forkui');fu.classList.toggle('hidden',!fc);
  if(fc){var fkk=fork.rich+':'+fork.ch+':'+S.lang;if(fu.dataset.k!==fkk){fu.dataset.k=fkk;
    [[-1,'fk-l'],[1,'fk-r']].forEach(function(r){var b=$(r[1]),rich=r[0]===fork.rich;b.innerHTML='<img src="assets/'+(rich?'coin':'i_boat')+'.webp" alt=""><span>'+t(rich?'fkRich':'fkSafe')+'</span><small>'+(rich?'x1.8':'x0.85')+'</small>';
      b.classList.toggle('rich',rich);b.classList.toggle('on',fork.ch===r[0]);});$('fk-t').textContent=t('fkPick');}}
  var chk=(fork&&fork.ch&&!fc&&phase==='travel'&&dist<fork.z1+1)?(fork.ch===fork.rich?'fkRichC':'fkSafeC'):'';var ch=$('forkchip');
  if(ch.dataset.k!==chk+S.lang){ch.dataset.k=chk+S.lang;ch.classList.toggle('hidden',!chk);if(chk)ch.textContent=t(chk);}
  var ffv=forkOn()&&phase!=='port',fe=$('ffchip');fe.classList.toggle('hidden',!ffv);if(ffv){var fv=String(S.ff)+(nightS>0.5?' · '+t('night'):'');if(fe.dataset.v!==fv+S.lang){fe.dataset.v=fv+S.lang;fe.innerHTML='<img src="assets/firefly.webp" alt=""><b>'+S.ff+'</b>'+(nightS>0.5?'<span>'+t('night')+'</span>':'');}}
  if(trip&&trip.heat){document.querySelectorAll('#chips .heat u').forEach(function(u){var v=heatOf(u.dataset.g),w=(v*100).toFixed(0)+'%';if(u.style.width!==w){u.style.width=w;u.classList.toggle('cold',v<0.5);}});}
  var ku=$('kingui'),kv=phase==='king'&&kingC&&kingC.state==='wait';ku.classList.toggle('hidden',!kv);
  if(kv){var kk=kingC.q.map(function(x){return x.id+x.got;}).join()+(kingC.good&&kingC.good.id)+S.lang+(!kingAdUsed&&adAvailable()?1:0);if(ku.dataset.k!==kk){ku.dataset.k=kk;
    $('kg-t').textContent=t('king'+kingC.n)+' · '+t('kingTap');
    $('kg-b').innerHTML=kingC.q.map(function(x){var g=gById(x.id),dn=x.got>=x.n;return '<button data-kg="'+x.id+'" class="'+(dn?'dn':'')+(kingC.good&&kingC.good.id===x.id&&!dn?' want':'')+'"'+(dn?' disabled':'')+'><img src="assets/'+g.img+'.webp" alt=""><b>'+x.got+'/'+x.n+'</b></button>';}).join('')+
      (!kingAdUsed&&adAvailable()?'<button data-kg="ad" class="kad"><img src="assets/tv.webp" alt=""><b>'+t('kingAdBtn')+'</b></button>':'');}}
  if(tut.step)placeHand();
}
function updatePhaseUi(){
  var port=phase==='port';
  $('bar').classList.toggle('hidden',!port);$('cta').classList.toggle('hidden',!port);$('stock').classList.toggle('hidden',port||phase==='king');
  $('mkbtn').classList.toggle('hidden',!port);$('petbtn').classList.toggle('hidden',!port);$('bookbtn').classList.toggle('hidden',!port);$('calbtn').classList.toggle('hidden',!port);
  $('cta-sub').textContent=t('tripN',{n:RT().trips+1});
  if(trip){var h='';trip.docks.forEach(function(z){h+='<i class="mk" style="left:'+((z-trip.z0)/(trip.end-trip.z0)*100).toFixed(1)+'%"></i>';});$('tripmk').innerHTML=h;}
  lastTp=-1;hudDirty=true;
}
function applyLang(){
  document.documentElement.lang=S.lang;
  document.querySelectorAll('[data-t]').forEach(function(e){e.textContent=t(e.dataset.t);});
  $('btn-lang').textContent=S.lang==='th'?'EN':'ไทย';
  document.title=t('title')+' · Kairon Arcade';
  $('cta-sub').textContent=t('tripN',{n:RT().trips+1});
  var ab=$('adbtn');if(ab.dataset.k)$('adbtn-t').textContent=t(ab.dataset.k==='vip'?'vipBtn':'rsBtn');
  if(openPanel)renderPanel(openPanel);   // popups redraw on language change
  if(adOpen)renderAd();
  if(tut.step)tutRender();
  hudDirty=true;
}
var toastT=0;
function toast(s){var e=$('toast');e.textContent=s;e.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){e.classList.remove('on');},1700);}

// ---------- panels ----------
var openPanel=null,panelCtx=null;
function open(p,ctx){openPanel=p;panelCtx=ctx||null;var m=$('modal');m.classList.remove('hidden');m.classList.toggle('center',p.charAt(0)==='_');if(p==='quests')qEnsure();renderPanel(p);play('popup',{vol:0.6});
  if(p==='load'&&tut.step==='load'){tutShow('go');var gb=$('go');if(gb&&gb.scrollIntoView)gb.scrollIntoView({block:'nearest'});}if(p==='boat'&&tut.step==='up')tutShow('up2');}
function close(){var was=openPanel;openPanel=null;panelCtx=null;$('modal').classList.add('hidden');
  if(was==='boat'&&tut.step==='up2')tutShow('done');if(was==='load'&&tut.step==='go')tutShow('load');}
var STICKY={_welcome:1,_summary:1,_edge:1,_unlock:1,_arrive:1,_meteor:1,_king:1,_legend:1};
$('modal').addEventListener('pointerdown',function(e){if(e.target.id==='modal'&&openPanel&&!STICKY[openPanel])close();});
function head(title){return '<div class="sh-h"><h2>'+title+'</h2><button class="x" data-a="close">×</button></div>';}
function buyBtn(cost,label,act,arg,maxed){
  if(maxed)return '<button class="buy max">'+t('max')+'</button>';
  return '<button class="buy'+(S.coins<cost?' off':'')+'" data-a="'+act+'" data-i="'+arg+'">'+(label?label+' ':'')+'<img src="assets/coin.webp" alt="">'+fmt(cost)+'</button>';
}
function gemBtn(cost,act,arg){return '<button class="buy gemb'+(S.gems<cost?' off':'')+'" data-a="'+act+'" data-i="'+arg+'"><img src="assets/gem.webp" alt="">'+cost+'</button>';}
function gemsTxt(n){return '<img src="assets/gem.webp" alt="" class="ci">'+n;}
function hatOf(id){return HATS.filter(function(h){return h.id===id;})[0]||HATS[0];}
function skinOf(id){return SKINS.filter(function(h){return h.id===id;})[0]||SKINS[0];}
function boostCost(b){var lv=S.shop[b.id]||0;return lv>=b.cost.length?0:b.cost[lv];}
function shopCan(){return BOOSTS.some(function(b){var c=boostCost(b);return c&&S.gems>=c;});}
function boatPrev(hid,bid,pid,tn){var T=tierOf(tn),ht=hatOf(hid),hp=hatPos(ht,T),pt=petOf(pid),
  hh=ht.id!=='none'?'<img class="ph" src="assets/hat_'+ht.id+'.webp" alt="" style="left:'+((hp.x-hp.w/2)*100).toFixed(1)+'%;width:'+(hp.w*100).toFixed(1)+'%;top:'+(hp.y*100).toFixed(1)+'%;transform:translateY(-100%) rotate('+ht.r+'rad)">':'',
  cg=(tn&&tn!==S.tier)?'':cargoIcons().map(function(c,i){var sl=T.slots[i];return sl?'<img class="ph cg" src="assets/'+c+'.webp" alt="" style="left:'+((sl[0]-T.cw/2)*100).toFixed(1)+'%;width:'+(T.cw*100).toFixed(1)+'%;top:'+(sl[1]*100).toFixed(1)+'%;transform:translateY(-85%)">':'';}).join('');
  if(pt){var pp=petPos(pt,T);hh+='<img class="ph pet" src="assets/pet_'+pt.id+'.webp" alt="" style="left:'+((pp.x-pp.w/2)*100).toFixed(1)+'%;width:'+(pp.w*100).toFixed(1)+'%;top:'+(pp.y*100).toFixed(1)+'%;transform:translateY(-100%)">';}
  return '<div class="prev"><div class="pb t'+T.id+'"><img src="assets/'+boatImg(bid,T.id)+'.webp" alt="">'+cg+hh+'</div></div>';}
function ffBtn(cost,act,arg){return '<button class="buy ffb'+(S.ff<cost?' off':'')+'" data-a="'+act+'" data-i="'+arg+'"><img src="assets/firefly.webp" alt="">'+cost+'</button>';}
function spendFF(c){if(S.ff<c){play('nope');toast(t('noFF'));return false;}S.ff-=c;return true;}
function pageRew(i){return {g:10+5*i,c:Math.round(Math.max(40,bestPrice()*incMul())*40)};}
function coinsTxt(n){return '<img src="assets/coin.webp" alt="" class="ci">'+fmt(n);}
function loadStep(){return Math.max(1,Math.round(cap()/10));}
function renderPanel(p,soft){
  var h='',sh=$('sheet');
  if(p==='boat'){
    h=head(t('boat'))+boatPrev(S.cos.hat,S.cos.boat,S.pets.on)+'<div class="sec">'+t('sTier')+'</div>';
    TIERS.forEach(function(T){var cur=S.tier===T.id,own=S.tier>T.id,nxt=T.id===S.tier+1;
      h+='<div class="row'+(cur?' on':'')+(own||cur||nxt?'':' locked')+'"><img class="ic wide" src="assets/'+boatImg(S.cos.boat,T.id)+'.webp" alt=""><div class="mid"><div class="nm">'+t('tier'+T.id)+'</div><div class="ds">'+t('tierD',{n:T.capM})+(T.id>S.tier+1?' · '+t('tierNeed'):'')+'</div></div>'+
        (cur?'<button class="buy max">'+t('current')+'</button>':own?'<button class="buy max">'+t('owned')+'</button>':nxt?(T.cur==='gem'?gemBtn(T.cost,'tier',T.id):buyBtn(T.cost,'','tier',T.id)):'<img src="assets/lock.webp" alt="" style="width:30px">')+'</div>';});
    h+='<div class="sec">'+t('sUp')+'</div>';
    UPS.forEach(function(u){var lv=S.up[u.id],ds=u.id==='cap'?t('upCapD',{n:capOf(lv)}):u.id==='spd'?t('upSpdD',{n:speedMul(lv).toFixed(2).replace(/0$/,'')}):t('upPatD',{n:patOf(lv).toFixed(1).replace(/\.0$/,'')});
      h+='<div class="row"><img class="ic" src="assets/'+u.ic+'.webp" alt=""><div class="mid"><div class="nm">'+t('up'+u.id.charAt(0).toUpperCase()+u.id.slice(1))+' · '+t('lv')+' '+lv+'</div><div class="ds">'+ds+'</div></div>'+buyBtn(upCost(u,lv),'','up',u.id,lv>=UP_MAX)+'</div>';});
  }else if(p==='staff'){
    h=head(t('staff'));
    STAFF.forEach(function(s,i){var lv=S.staff[i];
      h+='<div class="row'+(lv?'':' locked')+'"><img class="ic" src="assets/staff.webp" alt=""><div class="mid"><div class="nm">'+t(s.name)+(lv?' · '+t('lv')+' '+lv:'')+'</div><div class="ds">'+
      (lv?t('staffDesc',{t:staffEvery(lv).toFixed(1)}):t('staffHireDesc'))+'</div></div>'+
      (lv?buyBtn(staffUpCost(s,lv),'','staff',i,lv>=STAFF_MAX):buyBtn(s.hire,t('hire'),'staff',i))+'</div>';});
  }else if(p==='goods'){
    h=head(t('goods'));
    PG().forEach(function(g){var lv=S.goods[g.id],fans=PL().aliens.filter(function(a){return a.likes.indexOf(g.id)>=0;}).map(function(a){return '<img class="fan" src="assets/'+a.img+'.webp" alt="">';}).join('');
      h+='<div class="row'+(lv?'':' locked')+'"><img class="ic" src="assets/'+g.img+'.webp" alt=""><div class="mid"><div class="nm">'+t(g.id)+(lv?' · '+t('lv')+' '+lv:'')+'</div><div class="ds">'+
      (lv?t('goodsDesc',{p:fmt(goodPrice(g,lv))}):t('goodsLockDesc'))+'</div><div class="ds likes">'+t('likes')+' '+fans+'</div></div>'+
      (lv?buyBtn(goodUpCost(g,lv),'','good',g.id,lv>=GOOD_MAX):buyBtn(g.unlock,t('unlock'),'good',g.id))+'</div>';});
  }else if(p==='map'){
    h=head(t('map'));
    h+='<div class="crownbar"><img src="assets/i_crown.webp" alt=""><b>'+t('crownN',{n:crownCount()})+'</b>'+(S.legend.n?'<span>'+t('legendLv',{n:S.legend.n+1})+'</span>':'')+'</div>';
    [1,2,3,4,5].forEach(function(n){var P=PLANETS[n],un=S.unlocked.indexOf(n)>=0,rt=S.routes[n],K=kingOf(n),kl=kingLeft(n);
      h+='<div class="planet'+(un?'':' lock')+(S.planet===n?' here':'')+'"><div class="pl"><img class="p" src="assets/'+P.icon+'.webp" alt="">'+(un?'':'<img class="lk" src="assets/lock.webp" alt="">')+'</div><div class="pm"><div class="nm" style="font-weight:800;font-size:18px">'+t(P.name)+'</div><div class="ds" style="font-size:14px;opacity:.8">'+t(P.desc)+'</div>'+
        '<div class="ds" style="font-size:14px">'+(un?t('route',{a:Math.min(rt.trips,P.trips),b:P.trips})+(P.mul>1?' · '+t('incomeX',{n:P.mul}):''):t('route',{a:Math.min(S.routes[n-1].trips,PLANETS[n-1].trips),b:PLANETS[n-1].trips}))+'</div>'+
        (un?'<div class="ds kgl"><img src="assets/'+KINGS[n].img+'.webp" alt="">'+t('king'+n)+(K.c?' <img class="cr" src="assets/i_crown.webp" alt="">':'')+' · '+(kl<=0?t('kingDue'):t('kingNext',{n:kl}))+'</div>':'')+
        (S.planet===n?'<span class="tag">'+t('here')+'</span>':un?'<button class="buy trv" data-a="travel" data-i="'+n+'">'+t('travel')+'</button>':'<span class="tag">'+t('soon')+'</span>')+'</div></div>';});
    var la=legendAvail();h+='<div class="planet legend'+(la?'':' lock')+'"><div class="pl"><img class="p" src="assets/i_legend.webp" alt=""></div><div class="pm"><div class="nm" style="font-weight:800;font-size:18px">'+t('legend')+'</div><div class="ds" style="font-size:14px;opacity:.85">'+t('legendHave',{n:S.legend.stars,p:S.legend.stars*10})+'</div>'+
      (la?'<button class="buy trv" data-a="legendask">'+t('legend')+'</button>':'<span class="tag">'+t('legendNeed')+'</span>')+'</div></div>'+
      '<div class="ds" style="font-size:13px;opacity:.75;text-align:center;margin-top:4px">'+t('mapNote2')+'</div><div class="ds" style="font-size:12px;opacity:.6;text-align:center;margin-top:10px">Kairon Arcade</div>';
  }else if(p==='load'){
    fixLoad();var c=cap(),n=loadTotal();
    h=head(t('loadT')+' · '+t('tripN',{n:RT().trips+1}))+'<div class="capbar"><i style="width:'+(n/c*100).toFixed(1)+'%"></i><span>'+t('loadD',{a:n,b:c})+'</span></div>';
    PG().forEach(function(g){var lv=S.goods[g.id];
      if(!lv){h+='<div class="row locked"><img class="ic" src="assets/'+g.img+'.webp" alt="" style="filter:grayscale(.8) brightness(.6)"><div class="mid"><div class="nm">'+t(g.id)+'</div><div class="ds">'+t('goodsLockDesc')+'</div></div><img src="assets/lock.webp" alt="" style="width:30px"></div>';return;}
      h+='<div class="row"><img class="ic" src="assets/'+g.img+'.webp" alt=""><div class="mid"><div class="nm">'+t(g.id)+'</div><div class="ds">'+coinsTxt(goodPrice(g,lv))+'</div></div>'+
        '<div class="qty"><button class="qb" data-a="ld" data-i="'+g.id+':-1">−</button><b>'+(S.load[g.id]||0)+'</b><button class="qb" data-a="ld" data-i="'+g.id+':1">+</button></div></div>';});
    h+='<div class="btns" style="margin-top:6px"><button class="b-no" data-a="fill">'+t('fill')+'</button><button class="b-no" data-a="clear">'+t('clear')+'</button></div>'+
      '<button class="go" id="go" data-a="go"'+(n?'':' disabled')+'>'+t('setoff')+'</button>';
  }else if(p==='settings'){
    h=head(t('settings'))+
      '<button class="srow" data-a="mute"><span>'+t('sound')+'</span><b>'+(S.mute?t('off'):t('on'))+'</b></button>'+
      [['m','vMusic'],['s','vSfx'],['v','vVoice']].map(function(r){return '<label class="vrow"><span>'+t(r[1])+'</span><input type="range" min="0" max="100" step="5" data-v="'+r[0]+'" value="'+Math.round(S.vol[r[0]]*100)+'"><b>'+Math.round(S.vol[r[0]]*100)+'</b></label>';}).join('')+
      '<button class="srow" data-a="lang"><span>'+t('language')+'</span><b>'+(S.lang==='th'?'ไทย':'English')+'</b></button>'+
      '<button class="srow" data-a="howto"><span>'+t('howto')+'</span><b>›</b></button>'+
      '<button class="srow" data-a="credits"><span>'+t('credits')+'</span><b>›</b></button>'+
      '<div class="ds" style="font-size:12px;opacity:.6;text-align:center;margin-top:10px">Kairon Arcade · ห้องเกม ไครอน</div>';
  }else if(p==='credits'){
    h=head(t('credits'))+'<img class="pop-ic" src="assets/fang.webp" alt="" style="width:110px;height:84px"><div class="pop-d" style="font-size:15px">'+t('creditsD')+'</div>'+
      '<div class="btns"><a class="b-yes lnk" href="CREDITS.txt" target="_blank" rel="noopener">'+t('creditsFile')+'</a></div>';
  }else if(p==='_king'){
    var kc=panelCtx,kn=t('king'+kc.n);
    h='<img class="pop-ic big" src="assets/'+KINGS[kc.n].img+'.webp" alt=""><div class="pop-t">'+t(kc.win?'kingWin':'kingFail')+'</div><div class="pop-d">'+t(kc.win?(kc.first?'kingWinD':'kingWin2D'):'kingFailD',{k:kn})+'</div>'+
      (kc.win?'<div class="pop-big">'+(kc.first?'<img src="assets/i_crown.webp" alt="" style="width:44px;vertical-align:middle"> ':'')+coinsTxt(kc.c)+' &nbsp;'+gemsTxt(kc.g)+'</div>':(kc.c>0?'<div class="pop-big">'+coinsTxt(kc.c)+'</div>':''))+
      '<div class="btns"><button class="b-yes" data-a="kingok">'+t(kc.win?'kingOk':'kingRetry')+'</button></div>';
  }else if(p==='_legend'){
    var lg=legendGain();
    h='<img class="pop-ic big" src="assets/i_legend.webp" alt=""><div class="pop-t">'+t('legend')+'</div><div class="pop-d">'+t('legendD')+'</div>'+
      '<div class="pop-big">'+t('legendGet',{n:lg})+'</div><div class="pop-d" style="font-size:14px">'+t('legendHave',{n:S.legend.stars+lg,p:(S.legend.stars+lg)*10})+'</div>'+
      '<div class="lgcols"><div class="lgc"><div class="sec">'+t('legendResets')+'</div><ul>'+[1,2,3,4,5].map(function(i){return '<li>'+t('lr'+i)+'</li>';}).join('')+'</ul></div>'+
      '<div class="lgc keep"><div class="sec">'+t('legendKeeps')+'</div><ul>'+[1,2,3,4,5].map(function(i){return '<li>'+t('lk'+i)+'</li>';}).join('')+'</ul></div></div>'+
      '<div class="pop-d" style="font-size:13px">'+t('legendPerk')+': '+t('pk3')+' · '+t('pk10')+' · '+t('pk20')+'</div>'+
      '<div class="btns eq"><button class="b-yes" data-a="legendgo">'+t('legendGo')+'</button><button class="b-yes alt" data-a="legendno">'+t('legendNo')+'</button></div>';
  }else if(p==='howto'){
    h=head(t('howto'));
    [['i_goods','h1'],['hand','h2'],['alien_blue','h3'],['stall','h4'],['i_boat','h5'],['ob_ice','h6'],['i_market','h7'],['pet_cat','h8'],['alien_snow','h9'],['sign_fork','h10'],['firefly','h11'],['i_book','h12'],['i_boatup','h13'],['i_gift','h14'],['i_lava','h15'],['i_crown','h16'],['i_legend','h17']].forEach(function(r,i){
      h+='<div class="row"><img class="ic" src="assets/'+r[0]+'.webp" alt=""><div class="mid"><div class="nm">'+(i+1)+'</div><div class="ds" style="font-size:15px;opacity:.9">'+t(r[1])+'</div></div></div>';});
    h+='<div class="btns"><button class="b-yes" data-a="replay">'+t('replayTut')+'</button></div>';
  }else if(p==='_adoffer'){
    var k=panelCtx.kind,ti=k==='mk2x'?t('mkAdT'):k==='vip'?t('vipT'):k==='q2x'?t('q2xT'):k==='qreroll'?t('qRerollT'):t('rsT'),
      de=k==='mk2x'?t('mkAdD',{n:fmt(Math.floor(S.market.bank)*2)}):k==='vip'?t('vipD',{n:fmt(vipPay())}):k==='q2x'?t('q2xD',{r:qRewardTxt(S.quests.list[panelCtx.qi],2)}):k==='qreroll'?t('qRerollD'):t('rsD',{n:Math.max(loadTotal(),cap())});
    h='<img class="pop-ic" src="assets/'+(k==='mk2x'?'i_market':k==='vip'?PL().vip:k.charAt(0)==='q'?'i_quest':'tv')+'.webp" alt=""><div class="pop-t">'+ti+'</div><div class="pop-d">'+de+'</div>'+
      '<div class="btns"><button class="b-yes" data-a="adwatch" data-i="'+k+'">'+t('watch')+'</button><button class="b-no" data-a="close">'+t('noThanks')+'</button></div>';
  }else if(p==='_summary'){
    var c2=panelCtx,can=adAvailable();
    h='<img class="pop-ic" src="assets/fang.webp" alt="" style="width:120px;height:92px"><div class="pop-t">'+t('sumT')+'</div>'+
      '<div class="sum"><div><span>'+t('sumSold')+'</span><b>'+t('pcs',{n:c2.sold})+'</b></div><div><span>'+t('sumTips')+'</span><b>'+coinsTxt(c2.tips)+'</b></div>'+
      '<div><span>'+t('sumCombo')+'</span><b>x'+c2.best+'</b></div><div class="tot"><span>'+t('sumCoins')+'</span><b>'+coinsTxt(c2.earned)+'</b></div></div>'+
      '<div class="pop-d" style="font-size:14px;margin:6px 0 10px">'+t(PL().name)+' · '+t('route',{a:Math.min(RT().trips,PL().trips),b:PL().trips})+'</div>'+
      (can&&c2.earned>0?'<div class="pop-d" style="font-size:14px;margin-bottom:10px">'+t('sumAd',{n:fmt(c2.earned)})+'</div><div class="btns"><button class="b-yes" data-a="adwatch" data-i="trip2x">'+t('sumX2')+'</button><button class="b-no" data-a="sumok">'+t('sumOk')+'</button></div>'
        :'<div class="btns"><button class="b-yes" data-a="sumok">'+t('sumOk')+'</button></div>');
  }else if(p==='_edge'){ // end of the newest route: the next planet is coming soon
    if(S.planet===5){h='<img class="pop-ic big" src="assets/i_legend.webp" alt=""><div class="pop-t">'+t('edge5T')+'</div><div class="pop-d">'+t('edge5D')+'</div>'+
      '<div class="btns eq"><button class="b-yes" data-a="legendask">'+t('edgeLegend')+'</button><button class="b-yes alt" data-a="edgeok">'+t('edgeOk')+'</button></div>';sh.innerHTML=h;return;}
    var e4=S.planet===4;
    h='<img class="pop-ic" src="assets/'+(e4?'i_forest':'i_ice')+'.webp" alt="" style="width:120px;height:110px"><div class="pop-t">'+t(e4?'edge4T':'edge3T')+'</div><div class="pop-d">'+t(e4?'edge4D':'edge3D')+'</div>'+
      '<div class="planet lock" style="margin-bottom:14px"><div class="pl"><img class="p" src="assets/i_planet3.webp" alt=""><img class="lk" src="assets/lock.webp" alt=""></div><div><div class="nm" style="font-weight:800;font-size:18px">'+t(e4?'planet5':'planet4')+'</div><span class="tag">'+t('soon')+'</span></div></div>'+
      '<div class="btns"><button class="b-yes" data-a="edgeok">'+t('edgeOk')+'</button></div>';
  }else if(p==='_unlock'){
    var un=(panelCtx&&panelCtx.n)||2,un3=un===3,un4=un===4,un5=un===5,UA=un5?ALIENS5.concat([{img:'alien_sala'}]):un4?ALIENS4.concat([{img:'alien_owl'}]):un3?ALIENS3.concat([{img:'alien_yeti'}]):ALIENS2;
    h='<img class="pop-ic big" src="assets/'+(un5?'i_lava':un4?'i_forest':un3?'i_ice':'i_planet2')+'.webp" alt=""><div class="pop-t">'+t(un5?'ul5T':un4?'ul4T':un3?'ul3T':'ulT')+'</div><div class="pop-d">'+t(un5?'ul5D':un4?'ul4D':un3?'ul3D':'ulD')+'</div>'+
      '<div class="newrow">'+UA.map(function(a){return '<img src="assets/'+a.img+'.webp" alt="">';}).join('')+'</div>'+
      '<div class="btns"><button class="b-yes" data-a="ulgo">'+t(un5?'ul5Go':un4?'ul4Go':un3?'ul3Go':'ulGo')+'</button><button class="b-no" data-a="ulstay">'+t('ulStay')+'</button></div>';
  }else if(p==='_arrive'){
    var an=(panelCtx&&panelCtx.n)||2;
    h='<img class="pop-ic big" src="assets/'+PLANETS[an].icon+'.webp" alt=""><div class="pop-t">'+t(an===5?'ar5T':an===4?'ar4T':an===3?'ar3T':'arT')+'</div><div class="pop-d">'+t(an===5?'ar5D':an===4?'ar4D':an===3?'ar3D':'arD')+'</div>'+
      '<div class="newrow">'+PLANETS[an].aliens.map(function(a){return '<img src="assets/'+a.img+'.webp" alt="">';}).join('')+'</div>'+
      '<div class="newrow sm">'+PG().map(function(g){return '<img src="assets/'+g.img+'.webp" alt="">';}).join('')+'</div>'+
      '<div class="pop-d" style="font-size:15px">'+t('arGift')+'</div><div class="pop-big">'+gemsTxt((panelCtx&&panelCtx.g)||ARRIVE_GEMS)+'</div>'+
      '<div class="btns"><button class="b-yes" data-a="arok">'+t('arOk')+'</button></div>';
  }else if(p==='shop'){
    h=head(t('shop'))+'<div class="ds shopd">'+t('shopD')+'</div><div class="gembal">'+gemsTxt(S.gems)+'</div>'+boatPrev(S.cos.hat,S.cos.boat,S.pets.on)+'<div class="sec">'+t('sBoost')+'</div>';
    BOOSTS.forEach(function(b){var lv=S.shop[b.id]||0,c=boostCost(b),N=b.id.charAt(0).toUpperCase()+b.id.slice(1),v=b.id==='inc'?10*lv:b.id==='cap'?5*lv:b.id==='pat'?10*lv:lv;
      h+='<div class="row"><img class="ic" src="assets/'+b.ic+'.webp" alt=""><div class="mid"><div class="nm">'+t('b'+N)+' · '+t('lv')+' '+lv+'/5</div><div class="ds">'+t('b'+N+'D',{n:b.id==='inc'?10*(lv+(c?1:0)):b.id==='cap'?5*(lv+(c?1:0)):b.id==='pat'?10*(lv+(c?1:0)):lv+(c?1:0)})+'</div></div>'+(c?gemBtn(c,'boost',b.id):'<button class="buy max">'+t('max')+'</button>')+'</div>';});
    h+='<div class="sec">'+t('sFire')+'</div><div class="ds shopd">'+t('sFireD')+'</div><div class="gembal ffbal">'+ffTxt(S.ff)+'</div>';
    FF_ITEMS.forEach(function(x){h+='<div class="row"><img class="ic" src="assets/'+x.ic+'.webp" alt=""><div class="mid"><div class="nm">'+t('it_'+x.id)+'</div><div class="ds">'+t('itd_'+x.id)+' · '+t('have',{n:S.items[x.id]|0})+'</div></div>'+ffBtn(x.cost,'ffbuy',x.id)+'</div>';});
    h+='<div class="sec">'+t('sFang')+'</div>';
    HATS.forEach(function(x){var own=x.id==='none'||S.cos.hats.indexOf(x.id)>=0,on=S.cos.hat===x.id;
      h+='<div class="row'+(on?' on':'')+'"><img class="ic" src="assets/'+(x.id==='none'?'fang':'hat_'+x.id)+'.webp" alt=""><div class="mid"><div class="nm">'+t('hat_'+x.id)+'</div><div class="ds">'+(own?t('owned'):'')+'</div></div>'+
        (on?'<button class="buy max">'+t('wearing')+'</button>':own?'<button class="buy" data-a="wear" data-i="'+x.id+'">'+t('wear')+'</button>':(x.ff?ffBtn(x.ff,'buyhat',x.id):gemBtn(x.cost,'buyhat',x.id)))+'</div>';});
    h+='<div class="sec">'+t('sBoat')+'</div>';
    SKINS.forEach(function(x){var own=S.cos.boats.indexOf(x.id)>=0,on=S.cos.boat===x.id;
      h+='<div class="row'+(on?' on':'')+'"><img class="ic wide" src="assets/'+boatImg(x.id)+'.webp" alt=""><div class="mid"><div class="nm">'+t('boat_'+x.id)+'</div><div class="ds">'+(own?t('owned'):'')+'</div></div>'+
        (on?'<button class="buy max">'+t('using')+'</button>':own?'<button class="buy" data-a="useboat" data-i="'+x.id+'">'+t('use')+'</button>':(x.ff?ffBtn(x.ff,'buyboat',x.id):gemBtn(x.cost,'buyboat',x.id)))+'</div>';});
  }else if(p==='quests'){
    var can3=adAvailable();
    h=head(t('quests'))+'<div class="sec">'+t('qDaily')+'<span class="qreset">'+t('qReset',{t:untilMidnight()})+'</span></div>';
    S.quests.list.forEach(function(q,i){var pc=Math.min(1,q.p/q.n),full=q.p>=q.n;
      h+='<div class="row q'+(q.cl?' done':'')+'"><img class="ic" src="assets/i_quest.webp" alt=""><div class="mid"><div class="nm">'+t('q_'+q.k,{n:q.n})+'</div>'+
        '<div class="qbar"><i style="width:'+(pc*100).toFixed(0)+'%"></i><span>'+Math.min(q.p,q.n)+' / '+q.n+'</span></div><div class="ds">'+qRewardTxt(q,1)+'</div></div><div class="qbtns">'+
        (q.cl?'<button class="buy max">'+t('qDone')+'</button>':full?'<button class="buy" data-a="qclaim" data-i="'+i+'">'+t('qClaim')+'</button>'+(can3?'<button class="buy sm" data-a="qad" data-i="q2x:'+i+'"><img src="assets/tv.webp" alt="">'+t('x2')+'</button>':'')
          :(!S.quests.rerolled&&can3?'<button class="buy sm alt" data-a="qad" data-i="qreroll:'+i+'"><img src="assets/tv.webp" alt="">'+t('reroll')+'</button>':''))+'</div></div>';});
    h+='<div class="sec">'+t('qAch')+'</div>';
    ACH.map(function(a){return a;}).sort(function(a,b){return achRank(a)-achRank(b);}).forEach(function(a){var v=a.f(),got=S.ach[a.id],full=v>=a.n;
      h+='<div class="row q'+(got?' done':'')+'"><img class="ic ach" src="assets/gem.webp" alt=""><div class="mid"><div class="nm">'+t('a_'+a.id)+'</div>'+
        '<div class="qbar"><i style="width:'+(Math.min(1,v/a.n)*100).toFixed(0)+'%"></i><span>'+fmt(Math.min(v,a.n))+' / '+fmt(a.n)+'</span></div></div><div class="qbtns">'+
        (got?'<button class="buy max">'+t('qDone')+'</button>':full?'<button class="buy" data-a="aclaim" data-i="'+a.id+'"><img src="assets/gem.webp" alt="">'+a.g+'</button>':'<span class="arew">'+gemsTxt(a.g)+'</span>')+'</div></div>';});
  }else if(p==='market'){
    var bank=Math.floor(S.market.bank),rate=mkRate(),nx=mkNext(),canM=adAvailable();
    h=head(t('market'))+'<div class="mkscene"><div class="mkin"><img class="mkb" src="assets/market_base.webp" alt="">';
    STALLS.slice().sort(function(a,b){return a.y-b.y;}).forEach(function(st){var lv=S.market.st[st.id];
      if(lv>0)h+='<img class="mks" src="assets/'+st.img+'.webp" alt="" style="left:'+(st.x*100).toFixed(1)+'%;top:'+(st.y*100).toFixed(1)+'%;width:'+(st.w*100).toFixed(1)+'%">';
      else if(nx&&nx.id===st.id)h+='<img class="mks ghost" src="assets/mk_sign.webp" alt="" style="left:'+(st.x*100).toFixed(1)+'%;top:'+(st.y*100).toFixed(1)+'%;width:'+(st.w*70).toFixed(1)+'%">';});
    h+='</div></div><div class="mkbank"><div class="mkb-l"><small>'+t('mkBank')+'</small><b id="mkbank">'+coinsTxt(bank)+'</b><small>'+(rate>0?t('mkRate',{n:fmt(Math.round(rate*60))}):t('mkNone'))+'</small></div>'+
      '<div class="qbtns"><button class="buy'+(bank>0?'':' off')+'" data-a="mkcollect">'+t('mkCollect')+'</button>'+(canM&&bank>=10?'<button class="buy sm" data-a="mkad"><img src="assets/tv.webp" alt="">'+t('x2')+'</button>':'')+'</div></div>'+
      '<div class="ds shopd">'+t('mkD')+'</div>';
    STALLS.forEach(function(st){var lv=S.market.st[st.id],isNext=nx&&nx.id===st.id;
      h+='<div class="row'+(lv||isNext?'':' locked')+'"><img class="ic" src="assets/'+st.img+'.webp" alt=""'+(lv||isNext?'':' style="filter:grayscale(.8) brightness(.6)"')+'><div class="mid"><div class="nm">'+t('st_'+st.id)+(lv?' · '+t('lv')+' '+lv:'')+'</div><div class="ds">'+
        (lv?t('mkRate',{n:fmt(Math.round(stallRate(st,lv)*60))}):isNext?'+'+t('mkRate',{n:fmt(Math.round(st.rate*60))}):t('mkNeed'))+'</div></div>'+
        (lv?buyBtn(stallUpCost(st,lv),'','mkup',st.id,lv>=STALL_MAX):isNext?buyBtn(st.cost,t('mkBuild'),'mkbuild',st.id):'<img src="assets/lock.webp" alt="" style="width:30px">')+'</div>';});
    h+='<div class="ds" style="font-size:12px;opacity:.6;text-align:center;margin-top:10px">Kairon Arcade · ห้องเกม ไครอน</div>';
  }else if(p==='pets'){
    h=head(t('pets'))+'<div class="ds shopd">'+t('petD')+'</div><div class="gembal">'+gemsTxt(S.gems)+'</div>'+boatPrev(S.cos.hat,S.cos.boat,S.pets.on);
    PETS.forEach(function(x){var own=S.pets.own.indexOf(x.id)>=0,on=S.pets.on===x.id;
      h+='<div class="row'+(on?' on':'')+'"><img class="ic" src="assets/pet_'+x.id+'.webp" alt=""><div class="mid"><div class="nm">'+t('pet_'+x.id)+'</div><div class="ds">'+t('pd_'+x.id)+'</div></div>'+
        (on?'<button class="buy max">'+t('onboard')+'</button>':own?'<button class="buy" data-a="petuse" data-i="'+x.id+'">'+t('equip')+'</button>':x.login?'<span class="arew"><img src="assets/i_gift.webp" alt="" class="ci">'+t('petLogin')+'</span>':gemBtn(x.cost,'petbuy',x.id))+'</div>';});
  }else if(p==='book'){
    var got=Object.keys(S.book.s).length;
    h=head(t('book'))+'<div class="ds shopd">'+t('bookD')+' '+t('frD')+'</div><div class="gembal">'+got+' / '+bookTotal()+'</div>';
    BOOK.forEach(function(pg,i){var full=pageFull(i),gfull=pageGold(i),rw=pageRew(i);
      h+='<div class="bpage"><div class="sec">'+t(PLANETS[pg.pl].name)+'</div><div class="stk">'+pg.al.map(function(a){var o=S.book.s[a],g=S.book.g[a];
        var lv=frLv(a);return '<div class="stw"><div class="st'+(o?'':' miss')+(g?' gold':'')+'"><img src="assets/'+a+'.webp" alt="">'+(g?'<i>'+t('bookGold')+'</i>':'')+'</div>'+
          (o?'<small class="frl lv'+lv+'"><b>'+'♥♥♥'.slice(0,lv)+'</b>'+t('fr'+lv)+'<br>'+t('p_'+(PTYPE[a]||'curious'))+'</small>':'<small class="frl">?</small>')+'</div>';}).join('')+'</div>'+
        '<div class="row brw"><div class="mid"><div class="ds">'+coinsTxt(rw.c)+' &nbsp;'+gemsTxt(rw.g)+'</div></div>'+(S.book.pc[i]?'<button class="buy max">'+t('pageDone')+'</button>':full?'<button class="buy" data-a="pgclaim" data-i="'+i+'">'+t('pageClaim')+'</button>':'<span class="arew">'+pg.al.filter(function(a){return S.book.s[a];}).length+' / '+pg.al.length+'</span>')+'</div>'+
        '<div class="row brw"><div class="mid"><div class="ds">'+t('goldPage')+' · '+gemsTxt(30)+'</div></div>'+(S.book.gc[i]?'<button class="buy max">'+t('pageDone')+'</button>':gfull?'<button class="buy" data-a="pggold" data-i="'+i+'">'+t('pageClaim')+'</button>':'<span class="arew">'+pg.al.filter(function(a){return S.book.g[a];}).length+' / '+pg.al.length+'</span>')+'</div></div>';});
    h+='<div class="bpage"><div class="sec">'+t('crowns')+' · '+crownCount()+'/5</div><div class="stk">'+[1,2,3,4,5].map(function(n){var K=kingOf(n);
      return '<div class="stw"><div class="st'+(K.c?' gold':' miss')+'"><img src="assets/'+KINGS[n].img+'.webp" alt="">'+(K.c?'<i><img src="assets/i_crown.webp" alt="" style="width:18px;height:18px;vertical-align:middle"> x'+K.c+'</i>':'')+'</div><small class="frl">'+t('king'+n)+'</small></div>';}).join('')+'</div></div>';
  }else if(p==='cal'){
    var nx=loginNext(),cd=nx?nx.day:0,done=nx?cd-1:S.login.streak,adC=nx&&cd<7&&adAvailable();
    h=head(t('login'))+'<div class="ds shopd">'+t('loginD')+'</div><div class="cal">';
    LOGIN.forEach(function(L,i){var d=i+1,rw=loginRew(d),ic=rw.k==='coin'?'coin':rw.k==='gem'?'gem':rw.k==='ff'?'firefly':'pet_bunny',
      tx=rw.k==='coin'?fmt(rw.n):rw.k==='pet'?t('pet_bunny'):String(rw.n);
      h+='<div class="cd'+(d<=done?' got':'')+(d===cd?' today':'')+(d===7?' d7':'')+'"><small>'+t('day',{n:d})+'</small><img src="assets/'+ic+'.webp" alt=""><b>'+tx+'</b>'+(d<=done?'<em>✓</em>':'')+'</div>';});
    h+='</div>';
    if(nx){var rr=loginRew(cd);
      if(nx.back)h+='<div class="pop-d calnote">'+t('loginBack')+'</div>';
      h+='<div class="pop-d calr">'+t(adC?'loginAdD':'loginToday',{r:rewTxt(rr)})+'</div>';
      h+=adC?'<div class="btns"><button class="b-yes" data-a="adwatch" data-i="login2x">'+t('loginX2')+'</button><button class="b-no" data-a="lclaim">'+t('claimGift')+'</button></div>'
        :'<div class="btns"><button class="b-yes" data-a="lclaim">'+t('claimGift')+'</button></div>';}
    else h+='<div class="pop-d calr">'+t('comeBack',{n:S.login.streak>=7?1:S.login.streak+1})+'</div>';
    h+='<div class="ds calrule">'+t('loginRule')+'</div>';
  }else if(p==='_meteor'){
    h='<img class="pop-ic big" src="assets/i_meteor.webp" alt=""><div class="pop-t">'+t('evT')+'</div><div class="pop-d">'+t('evD')+'</div>'+
      '<div class="pop-big">'+gemsTxt('x2')+'</div><div class="btns"><button class="b-yes" data-a="evok">'+t('evOk')+'</button></div>';
  }else if(p==='_welcome'){
    var amt=panelCtx.amt,can2=adAvailable();
    h='<img class="pop-ic" src="assets/staff.webp" alt=""><div class="pop-t">'+t('wbT')+'</div><div class="pop-d">'+t('wbD')+' ('+t('minutes',{m:Math.round(panelCtx.secs/60)})+')</div>'+
      '<div class="pop-big">'+coinsTxt(amt)+'</div>'+
      (can2?'<div class="pop-d" style="font-size:14px;margin-bottom:10px">'+t('wbAdD')+' <b>'+fmt(amt*2)+'</b></div><div class="btns"><button class="b-yes" data-a="adwatch" data-i="welcome">'+t('wbX2')+'</button><button class="b-no" data-a="wbclaim">'+t('wbClaim')+'</button></div>'
          :'<div class="btns"><button class="b-yes" data-a="wbclaim">'+t('wbClaim')+'</button></div>');
  }
  var st=sh.scrollTop;sh.innerHTML=h;if(soft)sh.scrollTop=st;
}
$('sheet').addEventListener('click',function(e){
  var b=e.target.closest('[data-a]');if(!b)return;var a=b.dataset.a,i=b.dataset.i;audioUnlock();
  if(a==='close'){play('tap',{vol:0.5});close();return;}
  if(a==='up'){var u=UPS.filter(function(x){return x.id===i;})[0],lv=S.up[i];if(lv>=UP_MAX)return;if(!spend(upCost(u,lv)))return;S.up[i]++;play('upgrade');say('upgrade',800);sparkle(L.boat.x,L.boat.y,30);boatSquash=1;
    if(tut.step==='up2'){save();close();return;}}
  else if(a==='staff'){var s=STAFF[+i],lv2=S.staff[+i],c2=lv2?staffUpCost(s,lv2):s.hire;if(lv2>=STAFF_MAX)return;if(!spend(c2))return;S.staff[+i]++;
    if(!lv2){play('unlock');say('hire',800);}else{play('upgrade');say('upgrade',800);}sparkle(W*(+i?0.75:0.25),BY+40,24);}
  else if(a==='good'){var g=goodById(i),lv3=S.goods[i],c3=lv3?goodUpCost(g,lv3):g.unlock;if(lv3>=GOOD_MAX)return;if(!spend(c3))return;S.goods[i]++;
    if(!lv3){play('unlock');say('unlock',800);}else{play('upgrade');if(Math.random()<0.5)say('upgrade',1500);}sparkle(W/2,H*0.5,20);}
  else if(a==='ld'){var pr=i.split(':'),d=+pr[1]*loadStep(),cur=S.load[pr[0]]||0,free=cap()-loadTotal();
    var nv=Math.max(0,cur+(d>0?Math.min(d,free):d));if(nv===cur){play('nope',{vol:0.5});return;}S.load[pr[0]]=nv;play('tap',{vol:0.5,rate:d>0?1.1:0.9});}
  else if(a==='fill'){autoFill();play('tap');}
  else if(a==='clear'){GOODS.forEach(function(g){S.load[g.id]=0;});play('tap',{vol:0.5});}
  else if(a==='go'){if(loadTotal()<=0)return;setOff();return;}
  else if(a==='mute'){setMute(!S.mute);if(!S.mute)play('tap');}
  else if(a==='lang'){S.lang=S.lang==='th'?'en':'th';play('tap',{vol:0.6});applyLang();save();return;}
  else if(a==='howto'){play('tap',{vol:0.6});open('howto');return;}
  else if(a==='credits'){play('tap',{vol:0.6});open('credits');return;}
  else if(a==='kingok'){play('coin');close();arriveDest(false);return;}
  else if(a==='legendask'){play('tap');if(phase!=='port'||!legendAvail()){toast(t('legendNeed'));return;}close();open('_legend');return;}
  else if(a==='legendgo'){doLegend();return;}
  else if(a==='legendno'){play('tap',{vol:0.6});close();return;}
  else if(a==='replay'){S.tut.done=false;save();close();if(phase==='port')tutShow('intro');else toast(t('tutLater'));return;}
  else if(a==='adwatch'){adReturnCtx={panel:openPanel,ctx:panelCtx};close();startAd(i);return;}
  else if(a==='wbclaim'){addCoins(panelCtx.amt);welcomeAmt=0;coinBurst(W/2,H*0.5,10);play('sell');close();save();afterWelcome();return;}
  else if(a==='sumok'){play('coin');close();finishTrip();return;}
  else if(a==='travel'){if(phase!=='port')return;close();warpTo(+i);return;}
  else if(a==='ulgo'){var un=(panelCtx&&panelCtx.n)||2;close();warpTo(un);return;}
  else if(a==='evok'){play('tap');close();return;}
  else if(a==='mkcollect'){mkTick();var mb=Math.floor(S.market.bank);if(mb<=0){play('nope',{vol:0.5});return;}S.market.bank-=mb;addCoins(mb);coinBurst(W/2,H*0.5,10);play('sell');}
  else if(a==='mkad'){if(!adAvailable()){toast(t('adLimit'));return;}mkTick();if(S.market.bank<1)return;open('_adoffer',{kind:'mk2x'});return;}
  else if(a==='mkbuild'||a==='mkup'){var st=stallOf(i),slv=S.market.st[i]|0;if(!st)return;
    if(a==='mkbuild'){var nx2=mkNext();if(!nx2||nx2.id!==i||slv>0)return;mkTick();if(!spend(st.cost))return;S.market.st[i]=1;play('build');play('unlock',{vol:0.5});say(mkBuilt()>=3?'market':'build',0);}
    else{if(slv<1||slv>=STALL_MAX)return;mkTick();if(!spend(stallUpCost(st,slv)))return;S.market.st[i]++;play('build',{vol:0.6,rate:1.15});if(Math.random()<0.4)say('upgrade',1500);}
    sparkle(W/2,H*0.32,30);}
  else if(a==='petbuy'){var pt=petOf(i);if(!pt||S.pets.own.indexOf(i)>=0)return;if(!spendGems(pt.cost))return;S.pets.own.push(i);S.pets.on=i;play('pet');play('buy',{vol:0.6});say('pet',0);toast(t('petNew'));sparkle(L.boat.x,L.boat.y-L.boat.h*0.3,30);boatSquash=1;}
  else if(a==='petuse'){if(S.pets.own.indexOf(i)<0)return;S.pets.on=i;play('pet',{vol:0.7});boatSquash=1;sparkle(L.boat.x,L.boat.y-L.boat.h*0.3,16);}
  else if(a==='ulstay'){play('tap');close();if(!S.tut.done&&tut.step==='wait_port')tutShow('up');hudDirty=true;return;}
  else if(a==='arok'){play('coin');close();save();hudDirty=true;return;}
  else if(a==='boost'){var bo=BOOSTS.filter(function(x){return x.id===i;})[0],bc=boostCost(bo);if(!bc)return;if(!spendGems(bc))return;S.shop[i]++;bought();if(i==='cap'&&phase==='port')fixLoad();}
  else if(a==='buyhat'){var hx=hatOf(i);if(S.cos.hats.indexOf(i)>=0)return;if(hx.ff?!spendFF(hx.ff):!spendGems(hx.cost))return;S.cos.hats.push(i);S.cos.hat=i;bought();if(hx.ff)say('swap',0);}
  else if(a==='buyboat'){var sx=skinOf(i);if(S.cos.boats.indexOf(i)>=0)return;if(sx.ff?!spendFF(sx.ff):!spendGems(sx.cost))return;S.cos.boats.push(i);S.cos.boat=i;bought();if(sx.ff)say('swap',0);}
  else if(a==='ffbuy'){var fx=FF_ITEMS.filter(function(x){return x.id===i;})[0];if(!fx||!spendFF(fx.cost))return;S.items[i]=(S.items[i]|0)+1;play('firefly');play('buy',{vol:0.6});say('swap',0);toast(t('swapOk'));sparkle(W/2,H*0.4,24);}
  else if(a==='tier'){var TT=TIERS[+i-1];if(!TT||+i!==S.tier+1)return;if(TT.cur==='gem'?!spendGems(TT.cost):!spend(TT.cost))return;S.tier=+i;layout();
    play('boatup');play('unlock',{vol:0.5});say('boatup',0);boatSquash=1;sparkle(L.boat.x,L.boat.y-L.boat.h*0.2,50);coinBurst(L.boat.x,L.boat.y,8);}
  else if(a==='pgclaim'){var pi2=+i,rw2=pageRew(pi2);if(S.book.pc[pi2]||!pageFull(pi2))return;S.book.pc[pi2]=1;addCoins(rw2.c);addGems(rw2.g);play('page');play('sell',{vol:0.5});say('page',0);sparkle(W/2,H*0.4,36);coinBurst(W/2,H*0.5,10);}
  else if(a==='pggold'){var pi3=+i;if(S.book.gc[pi3]||!pageGold(pi3))return;S.book.gc[pi3]=1;addGems(30);play('golden');play('page',{vol:0.6});say('golden',0);sparkle(W/2,H*0.4,50);}
  else if(a==='lclaim'){if(!loginNext())return;claimLogin(1);}
  else if(a==='wear'){S.cos.hat=i;play('tap');boatSquash=1;sparkle(L.boat.x,L.boat.y-L.boat.h*0.4,14);}
  else if(a==='useboat'){S.cos.boat=i;play('tap');boatSquash=1;sparkle(L.boat.x,L.boat.y,14);}
  else if(a==='qclaim'){qClaim(+i,1);}
  else if(a==='aclaim'){var ac=ACH.filter(function(x){return x.id===i;})[0];if(!ac||S.ach[i]||ac.f()<ac.n)return;S.ach[i]=1;var ag=addGems(ac.g);play('unlock');say('achieve',0);sparkle(W/2,H*0.45,30);toast(t('achT')+' +'+ag);}
  else if(a==='qad'){var qa=i.split(':');if(!adAvailable()){toast(t('adLimit'));return;}open('_adoffer',{kind:qa[0],qi:+qa[1]});return;}
  else if(a==='edgeok'){play('tap');close();if(!S.tut.done&&tut.step==='wait_port')tutShow('up');return;}
  save();hudDirty=true;updateHud();renderPanel(openPanel,true);
});
function spendGems(c){if(S.gems<c){play('nope');toast(t('noGems'));return false;}S.gems-=c;return true;}
function bought(){play('buy');say('shop',0);boatSquash=1;sparkle(L.boat.x,L.boat.y-L.boat.h*0.3,36);toast(t('bought'));}
function spend(c){if(S.coins<c){play('nope');toast(t('noCoins'));return false;}S.coins-=c;return true;}
document.querySelectorAll('.nb').forEach(function(b){b.addEventListener('click',function(){audioUnlock();play('tap',{vol:0.6});open(b.dataset.p);});});
$('cta').addEventListener('click',function(){audioUnlock();play('tap');if(loadTotal()<=0)autoFill();open('load');});
$('btn-mute').addEventListener('click',function(){audioUnlock();setMute(!S.mute);if(!S.mute)play('tap');});
$('btn-lang').addEventListener('click',function(){S.lang=S.lang==='th'?'en':'th';play('tap',{vol:0.6});applyLang();save();});
$('btn-set').addEventListener('click',function(){audioUnlock();play('tap',{vol:0.6});open('settings');});
$('gems').parentNode.addEventListener('click',function(){audioUnlock();play('tap',{vol:0.6});if(phase==='port')open('shop');else toast(t('shopD'));});
$('mkbtn').addEventListener('click',function(){audioUnlock();play('tap',{vol:0.6});if(phase==='port'){mkTick();open('market');}});
$('petbtn').addEventListener('click',function(){audioUnlock();play('tap',{vol:0.6});if(phase==='port')open('pets');});
$('bookbtn').addEventListener('click',function(){audioUnlock();play('tap',{vol:0.6});if(phase==='port'){bookNew=false;open('book');hudDirty=true;}});
$('calbtn').addEventListener('click',function(){audioUnlock();play('tap',{vol:0.6});if(phase==='port')open('cal');});
$('fk-l').addEventListener('pointerdown',function(e){e.preventDefault();e.stopPropagation();audioUnlock();pickFork(-1);});
$('fk-r').addEventListener('pointerdown',function(e){e.preventDefault();e.stopPropagation();audioUnlock();pickFork(1);});
$('ln-l').addEventListener('pointerdown',function(e){e.preventDefault();audioUnlock();steer(-1);});
$('ln-r').addEventListener('pointerdown',function(e){e.preventDefault();audioUnlock();steer(1);});
$('evb').addEventListener('click',function(){audioUnlock();if(phase==='port'&&!openPanel){play('meteor',{vol:0.6});open('_meteor');}});
$('adbtn').addEventListener('click',function(){audioUnlock();play('tap');var k=this.dataset.k;if(!k)return;if(!adAvailable()){toast(t('adLimit'));return;}open('_adoffer',{kind:k});});

// ---------- rewarded ads (mock; real SDK plugs in here) ----------
function today(){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();}
function adSdkReady(){return !urlNoAds;}  // real SDK: return sdk.isRewardedReady()
function adAvailable(){
  if(!adSdkReady())return false;
  if(S.ad.day!==today()){S.ad.day=today();S.ad.count=0;}
  if(S.ad.count>=AD.cap)return false;
  if(Date.now()-S.ad.last<AD.cooldown*1000)return false;
  return true;
}
var adOpen=null,adReturnCtx=null;
function startAd(kind){
  if(!adAvailable()){toast(t('adLimit'));reopen(kind);return;}
  adOpen={kind:kind,t0:performance.now(),done:false};holding=false;
  if(A.ctx)A.master.gain.setTargetAtTime(0,A.ctx.currentTime,0.05);
  $('ad').classList.remove('hidden');renderAd();adTick();
}
function adTick(){if(!adOpen)return;var left=Math.ceil(AD.watch-(performance.now()-adOpen.t0)/1000);
  if(left<=0&&!adOpen.done){adOpen.done=true;renderAd();return;}if(!adOpen.done){var c=$('adc');if(c)c.textContent=left;}setTimeout(adTick,200);}
function renderAd(){
  var e=$('ad'),left=Math.max(0,Math.ceil(AD.watch-(performance.now()-adOpen.t0)/1000));
  e.innerHTML='<button class="adx" data-a="adclose">×</button><div class="adl">'+t('adLabel')+'</div><img src="assets/tv.webp" alt=""><div class="adt">'+t('title')+'</div>'+
   (adOpen.done?'<div class="adt">'+t('adDone')+'</div><div class="btns" style="width:80%"><button class="b-yes" data-a="adclaim">'+t('claim')+'</button></div>'
     :'<div class="adc" id="adc">'+left+'</div><div class="adl">'+t('adWait')+'</div>');
}
function reopen(kind){if(kind==='king10')return;var r=adReturnCtx;adReturnCtx=null;if(r&&(r.panel==='_welcome'||r.panel==='_summary'))open(r.panel,r.ctx);else if(kind==='q2x'||kind==='qreroll')open('quests');else if(kind==='mk2x')open('market');else if(kind==='login2x')open('cal');}
$('ad').addEventListener('click',function(e){var b=e.target.closest('[data-a]');if(!b||!adOpen)return;
  var k=adOpen.kind,good=b.dataset.a==='adclaim'&&adOpen.done;
  if(b.dataset.a==='adclose'&&adOpen.done)good=true; // finished: closing still grants
  $('ad').classList.add('hidden');adOpen=null;
  if(A.ctx)A.master.gain.setTargetAtTime(S.mute?0:1,A.ctx.currentTime,0.05);
  if(!good){toast(t('adEarly'));reopen(k);return;}
  var r=adReturnCtx;adReturnCtx=null;
  S.ad.count++;S.ad.last=Date.now();
  if(k==='vip'){vipWin=0;var c=spawnAlien(null,true);if(!c){aliens[0]=null;spawnAlien(null,true);}play('unlock');}
  else if(k==='restock'){if(loadTotal()<=0)autoFill();var add=0;for(var g in stock){stock[g]=Math.max(stock[g],S.load[g]||0);add+=stock[g];}
    if(add<cap()){autoFill();for(g in stock)stock[g]=S.load[g]||0;}emptyNoted=false;say('restock',0);play('upgrade');sparkle(L.boat.x,L.boat.y,30);}
  else if(k==='trip2x'&&r&&r.ctx){var amt=r.ctx.earned;addCoins(amt);coinBurst(W/2,H*0.5,14);play('sell');say('x2',0);finishTrip();}
  else if(k==='q2x'&&r&&r.ctx){qClaim(r.ctx.qi,2);open('quests');}
  else if(k==='qreroll'&&r&&r.ctx){qReroll(r.ctx.qi);open('quests');}
  else if(k==='mk2x'){mkTick();var mb=Math.floor(S.market.bank);S.market.bank-=mb;addCoins(mb*2);coinBurst(W/2,H*0.5,14);play('sell');say('x2',0);open('market');}
  else if(k==='king10'&&kingC&&kingC.state==='wait'){kingC.pat+=10;kingAdUsed=true;play('upgrade');toast('+10');}
  else if(k==='login2x'){if(loginNext())claimLogin(2);say('x2',1500);open('cal');}
  else if(k==='welcome'&&welcomeAmt){addCoins(welcomeAmt*2);coinBurst(W/2,H*0.5,14);play('sell');say('x2',0);welcomeAmt=0;afterWelcome();}
  save();hudDirty=true;
});
var welcomeAmt=0;
$('kingui').addEventListener('click',function(e){var b=e.target.closest('[data-kg]');if(!b||!kingC)return;audioUnlock();
  if(b.dataset.kg==='ad'){if(!kingAdUsed&&adAvailable())startAd('king10');return;}kingGive(b.dataset.kg);});
document.addEventListener('input',function(e){var el=e.target;if(!el||!el.dataset||!el.dataset.v)return;var v=Math.max(0,Math.min(100,+el.value||0))/100;S.vol[el.dataset.v]=v;
  var b=el.parentNode.querySelector('b');if(b)b.textContent=Math.round(v*100);setVol();});
document.addEventListener('change',function(e){var el=e.target;if(el&&el.dataset&&el.dataset.v){save();if(el.dataset.v==='v')say('hello',0);else play(el.dataset.v==='m'?'coin':'tap');}});

// ---------- daily quests (reset at local midnight) + achievements ----------
function rng(seed){var x=0;for(var i=0;i<seed.length;i++)x=(x*31+seed.charCodeAt(i))>>>0;return function(){x=(x*1664525+1013904223)>>>0;return x/4294967296;};}
function qMake(k,r){var Q=QUESTS.filter(function(q){return q.k===k;})[0],n=Q.ns[Math.floor(r()*Q.ns.length)],tier=Q.ns.indexOf(n);
  var base=Math.max(40,bestPrice()*incMul());return {k:k,n:n,p:0,c:Math.round(base*(20+12*tier)),g:2+tier+(r()<0.3?1:0),cl:false};}
function qEnsure(){
  var d=today();if(S.quests.day===d&&S.quests.list.length===3)return;
  var r=rng(d+':'+S.created),pool=QUESTS.slice(1).map(function(q){return q.k;}),list=[qMake('sell',r)];
  while(list.length<3){var k=pool.splice(Math.floor(r()*pool.length),1)[0];list.push(qMake(k,r));}
  S.quests={day:d,list:list,rerolled:false};save();hudDirty=true;
}
function qDoneFx(q){play('quest');say('quest',0);toast(t('qDoneT')+' · '+t('q_'+q.k,{n:q.n}));hudDirty=true;}
function qAdd(k,n){qEnsure();S.quests.list.forEach(function(q){if(q.k!==k||q.cl||q.p>=q.n)return;q.p=Math.min(q.n,q.p+(n||1));if(q.p>=q.n)qDoneFx(q);});}
function qMax(k,v){qEnsure();S.quests.list.forEach(function(q){if(q.k!==k||q.cl||q.p>=q.n)return;q.p=Math.min(q.n,Math.max(q.p,v));if(q.p>=q.n)qDoneFx(q);});}
function qRewardTxt(q,m){return q?coinsTxt(q.c*m)+' &nbsp;'+gemsTxt(q.g*m):'';}
function qClaim(i,m){var q=S.quests.list[i];if(!q||q.cl||q.p<q.n)return;q.cl=true;addCoins(q.c*m);addGems(q.g*m);S.stats.quests++;
  play('sell');play('unlock',{vol:0.6});coinBurst(W/2,H*0.5,12);sparkle(W/2,H*0.45,24);if(m>1)say('x2',0);save();hudDirty=true;}
function qReroll(i){var q=S.quests.list[i];if(!q||q.cl)return;var used=S.quests.list.map(function(x){return x.k;}),pool=QUESTS.filter(function(x){return used.indexOf(x.k)<0;});
  if(!pool.length)return;var r=Math.random;S.quests.list[i]=qMake(pool[Math.floor(r()*pool.length)].k,r);S.quests.rerolled=true;play('upgrade');save();hudDirty=true;}
function achRank(a){return S.ach[a.id]?2:a.f()>=a.n?0:1;}
function questCan(){if(!S.quests||!S.quests.list)return false;return S.quests.list.some(function(q){return !q.cl&&q.p>=q.n;})||ACH.some(function(a){return !S.ach[a.id]&&a.f()>=a.n;});}
function untilMidnight(){var n=new Date(),m=new Date(n.getFullYear(),n.getMonth(),n.getDate()+1),s=Math.max(0,Math.floor((m-n)/1000));
  return Math.floor(s/3600)+':'+('0'+Math.floor(s%3600/60)).slice(-2)+':'+('0'+s%60).slice(-2);}
var achNoted={};ACH.forEach(function(a){if(a.f()>=a.n)achNoted[a.id]=1;});
function qBadge(){hudDirty=true;}
function qTick(){ // once a second: midnight reset, new achievements, live countdown
  qEnsure();
  ACH.forEach(function(a){if(!achNoted[a.id]&&!S.ach[a.id]&&a.f()>=a.n){achNoted[a.id]=1;toast(t('achT')+' · '+t('a_'+a.id));play('quest',{vol:0.7});hudDirty=true;}});
  if(openPanel==='quests')renderPanel('quests',true);
  mkTick();if(openPanel==='market'){var e=$('mkbank');if(e)e.innerHTML=coinsTxt(Math.floor(S.market.bank));}
  // 7-day gifts: pop up once per day at port when nothing else is showing
  if(S.login.pop!==today()&&loginNext()&&!splashOn&&!openPanel&&!adOpen&&phase==='port'&&S.tut.done&&!tut.step){S.login.pop=today();save();open('cal');play('gift');return;}
  // weekend meteor shower: announce once per day, only when nothing else is on screen
  if(isWk()&&S.ev.seen!==today()&&!splashOn&&!openPanel&&!adOpen&&phase==='port'&&S.tut.done&&!tut.step){S.ev.seen=today();save();open('_meteor');play('meteor');say('meteor',0);sparkle(W/2,H*0.3,40);}
}
setInterval(qTick,1000);

// ---------- planets: warp between Home Star and Candy Planet ----------
function applyPlanet(){document.body.classList.toggle('p2',S.planet===2);document.body.classList.toggle('p3',S.planet===3);document.body.classList.toggle('p4',S.planet===4);document.body.classList.toggle('p5',S.planet===5);ALIENS=PL().aliens;startMusic();hudDirty=true;}
function warpTo(n){
  if(S.unlocked.indexOf(n)<0||phase!=='port')return;
  var w=$('warp');$('warp-t').textContent=t('warpTo');$('warp-n').textContent=t(PLANETS[n].name);$('warp-i').src='assets/'+PLANETS[n].icon+'.webp';
  w.classList.remove('hidden');w.classList.add('on');play('setoff');play('unlock',{vol:0.6});
  setTimeout(function(){
    S.planet=n;aliens=[null,null,null,null];dockC=[null,null,null,null,null];gifts=[];obs=[];lane=0;boatU=0;
    piers=[{z:dist+1.4,side:-1,kind:'home'}];fork=null;ffs=[];
    if(n>2&&S.arrived.indexOf(n)<0){starterGoods(S,n);GOODS.forEach(function(g){S.load[g.id]=0;});} // first visit: pack this planet's two starter goods so mixed orders work right away
    fixLoad();if(loadTotal()<=0)autoFill();applyPlanet();save();updatePhaseUi();updateHud();
  },700);preload(planetSet(n),function(){});
  setTimeout(function(){w.classList.remove('on');setTimeout(function(){w.classList.add('hidden');},450);
    if(n>1&&S.arrived.indexOf(n)<0){S.arrived.push(n);var ag=addGems(ARRIVE_GEMS);save();open('_arrive',{n:n,g:ag});play('fanfare');say(n===3?'ice':n===4?'forest':n===5?'lava':'planet',0);sparkle(W/2,H*0.4,70);fangExcited(true);}
    else{say(n===1?'home':n===3?'ice':n===4?'forest':n===5?'lava':'planet',0);fangExcited(false);}
    hudDirty=true;},1600);
}

// ---------- offline earnings ----------
function staffRatePerSec(){
  var u=unlockedGoods();if(!u.length)return 0;
  var avg=u.reduce(function(s,g){return s+goodPrice(g,S.goods[g.id]);},0)/u.length;
  var r=0;for(var i=0;i<STAFF.length;i++)if(S.staff[i])r+=1/staffEvery(S.staff[i]);
  return r*avg*0.35; // away from the boat, the convoy sells slower
}
function checkOffline(){
  var secs=Math.min(OFFLINE_CAP,Math.max(0,(Date.now()-bootSeen)/1000));bootSeen=Date.now();
  if(secs<60)return false;
  var amt=Math.floor(staffRatePerSec()*secs);
  if(amt<1){return false;}
  welcomeAmt=amt;open('_welcome',{amt:amt,secs:secs});say('welcome',0);return true;
}
function afterWelcome(){if(!S.tut.done&&!tut.step&&phase==='port'&&!openPanel)setTimeout(function(){tutShow('intro');},300);}

// ---------- tutorial (voiced by น้องฟาง, one step at a time, skippable) ----------
var tut={step:null,t:0,dockShown:false};
var TUT={intro:{k:'tIntro',v:'t_intro',dim:1,next:1},load:{k:'tLoad',v:'t_load'},go:{k:'tGo'},hold:{k:'tHold',v:'t_hold'},tap:{k:'tTap',v:'t_tap'},
  nice:{k:'tNice'},dock:{k:'tDock',v:'t_dock'},up:{k:'tUp',v:'t_upgrade'},up2:{k:'tUp2'},done:{k:'tDone',v:'t_done'}};
function tutShow(s){
  if(S.tut.done&&s!=='done')return;
  tut.step=s;tut.t=0;var d=TUT[s];$('tut').classList.remove('hidden');$('tut').classList.toggle('dim',!!d.dim);
  $('tut').classList.toggle('low',false);$('tut').classList.toggle('bot',s==='dock'); // dock tip sits over the stock panel, never over the boat
  tutRender();if(d.v)say(d.v,0);
  if(s==='tap'){var c=spawnAlien('fruit');if(!c){aliens[0]=null;c=spawnAlien('fruit');}if(c)c.tutHold=true;}
  if(s==='nice'){setTimeout(function(){if(tut.step==='nice')tutHide();},2400);}
  if(s==='done'){S.tut.done=true;save();if(trip)trip.tut=false;setTimeout(function(){if(tut.step==='done')tutHide();},2800);}
}
function tutNext(s){tutShow(s);}
function tutRender(){var d=TUT[tut.step];if(!d)return;$('tut-txt').textContent=t(d.k);
  $('tut-next').classList.toggle('hidden',!d.next);$('tut-next').textContent=t('next');$('tut-skip').textContent=t('skip');
  $('tut-skip').classList.toggle('hidden',tut.step==='done'||tut.step==='nice');}
function tutHide(){var s=tut.step;tut.step=(s==='dock')?'wait_port':null;$('tut').classList.add('hidden');$('hand').classList.add('hidden');}
function tutSkip(){S.tut.done=true;save();tut.step=null;if(trip)trip.tut=false;aliens.forEach(function(a){if(a)a.tutHold=false;});$('tut').classList.add('hidden');$('hand').classList.add('hidden');}
$('tut-next').addEventListener('click',function(){audioUnlock();play('tap');if(tut.step==='intro')tutShow('load');});
$('tut-skip').addEventListener('click',function(){audioUnlock();play('tap',{vol:0.5});tutSkip();});
function placeHand(){
  var hd=$('hand'),gr=game.getBoundingClientRect(),x=null,y=null,press=false;
  if(tut.step==='hold'){tut.t+=1/60;if(tut.t>6)tutNext('tap');x=W*0.5;y=H*0.5;press=true;}
  else if(tut.step==='tap'){var a=aliens.filter(function(a){return a&&a.tutHold;})[0];if(a&&a.state==='wait'){var p=custPos(a);x=p.x;y=p.y-p.w*0.2;}}
  else if(tut.step==='dock'){var c=dockC.filter(function(a){return a&&a.state==='wait';})[0];if(c){var q=custPos(c);x=q.x;y=q.y-q.w*0.2;}}
  else{var el=tut.step==='load'?$('cta'):tut.step==='go'?$('go'):tut.step==='up'?document.querySelector('.nb[data-p="boat"]'):tut.step==='up2'?document.querySelector('#sheet .buy:not(.off):not(.max)')||document.querySelector('#sheet .buy'):null;
    if(el&&el.offsetParent){var r=el.getBoundingClientRect();
      if(tut.step==='go'&&r.bottom>gr.bottom-4&&el.scrollIntoView)el.scrollIntoView({block:'nearest'}),r=el.getBoundingClientRect();
      x=r.left-gr.left+r.width*0.6;y=r.top-gr.top+r.height*(tut.step==='go'?0.35:0.55);}}
  if(y!=null)y=Math.min(y,H-(hd.offsetHeight||90)-12);if(x!=null)x=Math.max(8,Math.min(x,W-48)); // keep the hand fully on screen
  if(x==null){hd.classList.add('hidden');return;}
  hd.classList.remove('hidden');hd.classList.toggle('press',press);hd.style.transform='translate('+(x-14)+'px,'+(y-4)+'px)';
}

// ---------- boot ----------
var resumed=false;
(function resumeTrip(){ // mid-trip save: put the boat back on the river with the same goods
  var c=S.cur;if(!c||c.pl!==S.planet||!c.docks||!(c.end>c.dist))return;
  trip={z0:c.z0,docks:c.docks,end:c.end,di:c.di|0,sold:c.sold|0,tips:c.tips|0,best:c.best|0,earned:c.earned|0,tut:false,jar:c.jar|0,lure:c.lure|0,heat:c.heat||{},king:c.king||null};forkNext=c.dist+20;
  for(var k in stock)stock[k]=Math.max(0,(c.stock&&c.stock[k])|0);dist=c.dist;
  piers=[];trip.docks.forEach(function(z,j){if(j>=trip.di)piers.push({z:z,side:j%2?1:-1,kind:'dock'});});piers.push({z:trip.end,side:1,kind:'end'});
  if(trip.king&&trip.king.done)trip.king=null;if(dist>=trip.end-0.05)dist=trip.end-0.3;lbs=[];lbNext=dist+10;
  phase='travel';spawnT=1.5;giftT=4;vipWin=0;vipNext=20+Math.random()*10;emptyNoted=stockTotal()<=0;resumed=true;
})();
qEnsure();mkTick();applyPlanet();
resize();applyLang();drawMuteIcon();updatePhaseUi();updateHud();
requestAnimationFrame(frame);
var ldReady=false;
(function(){var sp=$('splash'),bar=$('ldbar'),tx=$('ldtxt'),done=function(){if(ldReady)return;ldReady=true;sp.classList.add('ready');};
  preload(coreSet().concat(planetSet(S.planet)),function(n,tot){var p=tot?Math.round(n/tot*100):100;bar.style.width=p+'%';tx.textContent=t('loading',{n:p});if(n>=tot)done();});
  setTimeout(done,10000);
  window.addEventListener('load',function(){setTimeout(function(){var idle=window.requestIdleCallback||function(f){setTimeout(f,1200);};
    idle(function(){S.unlocked.forEach(function(n){if(n!==S.planet)preload(planetSet(n),function(){});});});},2500);});})();
$('splash').addEventListener('pointerdown',function(){
  if(!splashOn||!ldReady)return;splashOn=false;audioUnlock();
  $('splash').classList.add('out');setTimeout(function(){$('splash').style.display='none';},500);
  setTimeout(function(){layout();startMusic();
    if(resumed){toast(t('resume'));say('setoff',0);return;}
    if(S.unlocked.indexOf(2)>=0&&!S.ulSeen&&S.arrived.indexOf(2)<0){S.ulSeen=true;save();open('_unlock');play('fanfare');sparkle(W/2,H*0.4,50);return;}
    if(S.unlocked.indexOf(3)>=0&&!S.ul3Seen&&S.arrived.indexOf(3)<0){S.ul3Seen=true;save();open('_unlock',{n:3});play('fanfare');say('iceopen',0);sparkle(W/2,H*0.4,50);return;}
    if(S.unlocked.indexOf(4)>=0&&!S.ul4Seen&&S.arrived.indexOf(4)<0){S.ul4Seen=true;save();open('_unlock',{n:4});play('fanfare');say('forestopen',0);sparkle(W/2,H*0.4,50);return;}
    if(S.unlocked.indexOf(5)>=0&&!S.ul5Seen&&S.arrived.indexOf(5)<0){S.ul5Seen=true;save();open('_unlock',{n:5});play('fanfare');say('lavaopen',0);sparkle(W/2,H*0.4,50);return;}
    var off=checkOffline();if(!off){if(!S.tut.done)tutShow('intro');else say('hello',0);}
    if(mkRate()>0&&S.market.bank>=1)setTimeout(function(){toast(t('mkReady')+' · '+fmt(Math.floor(S.market.bank)));},off?400:1500);},250);
});
window.addEventListener('pagehide',save);
})();
