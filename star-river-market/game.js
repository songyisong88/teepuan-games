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
GOODS.forEach(function(g){if(!g.pl)g.pl=1;});
var ALIENS1=[{img:'alien_blue',likes:['fruit','crystal']},{img:'alien_green',likes:['jelly']},{img:'alien_pink',likes:['candy']}];
var ALIENS2=[{img:'alien_gummy',likes:['cotton','donut']},{img:'alien_marsh',likes:['lolli']},{img:'alien_choco',likes:['syrup']}];
var ALIENS3=[{img:'alien_snow',likes:['snowcone','pearl']},{img:'alien_icejel',likes:['aurora']},{img:'alien_peng',likes:['cocoa']}];
var ALIENS4=[{img:'alien_shroom',likes:['berry','honey']},{img:'alien_leaf',likes:['glowshroom']},{img:'alien_frog',likes:['emerald']}];
// planets: own look, customers, goods, route length and income multiplier
var PLANETS={
 1:{n:1,name:'planet1',desc:'planet1d',icon:'i_map',aliens:ALIENS1,vip:'alien_pink',trips:8,len:360,mul:1,music:'music',
    bg:'bg_space',isl:'islet',stall:'stall',river:['rgba(190,170,255,0.75)','rgba(110,90,220,0.82)','rgba(60,40,160,0.9)'],shine:'#8f7dff',bank:'#d9ccff',flow:['#c9b6ff','#8fd0ff','#ffffff'],glow:'lav',rip:'#e4dcff'},
 2:{n:2,name:'planet2',desc:'planet2d',icon:'i_planet2',aliens:ALIENS2,vip:'alien_marsh',trips:12,len:420,mul:1.25,music:'music_candy',
    bg:'bg_candy',isl:'cislet',stall:'stall_candy',river:['rgba(255,226,244,0.82)','rgba(255,160,214,0.86)','rgba(190,96,190,0.92)'],shine:'#ffe0f6',bank:'#fff4fb',flow:['#ffffff','#c6ffe9','#ffd1f0'],glow:'warm',rip:'#fff6fb'},
 3:{n:3,name:'planet3',desc:'planet3d',icon:'i_ice',aliens:ALIENS3,vip:'alien_yeti',trips:14,len:460,mul:1.6,music:'music_ice',lanes:true,
    bg:'bg_ice',isl:'iislet',stall:'stall_ice',river:['rgba(225,250,255,0.82)','rgba(130,215,245,0.86)','rgba(60,130,205,0.92)'],shine:'#e8fbff',bank:'#ffffff',flow:['#ffffff','#bff4ff','#d9ccff'],glow:'cyan',rip:'#f2fdff'},
 4:{n:4,name:'planet4',desc:'planet4d',icon:'i_forest',aliens:ALIENS4,vip:'alien_owl',trips:16,len:480,mul:2,music:'music_forest',fork:true,
    bg:'bg_forest',isl:'fislet',stall:'stall_forest',river:['rgba(210,255,225,0.8)','rgba(90,200,150,0.86)','rgba(30,110,100,0.92)'],shine:'#e6ffe9',bank:'#f4fff0',flow:['#ffffff','#c9ffb8','#fff3a6'],glow:'green',rip:'#effff2'}
};
// stage 4: boat classes (each has its own empty-deck art; cargo is drawn from what is really on board)
// hx/hy/s/ar: hat anchor transform from the original boat art; pets: per-pet anchors; slots: cargo spots; lan: lantern glow
var TIERS=[
 {id:1,img:'boat_t1',ar:437/593,sz:1.0,capM:1,hx:.58,hy:.025,s:1.0,lan:[.14,.7],cw:.15,slots:[[.3,.62],[.42,.6],[.2,.58]],pets:null,ps:1},
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
  {pl:3,al:['alien_snow','alien_icejel','alien_peng','alien_yeti']},{pl:4,al:['alien_shroom','alien_leaf','alien_frog','alien_owl']}];
// 7-day gifts (device local date); day 7 = Forest Bunny pet
var LOGIN=[{k:'coin',n:30},{k:'gem',n:3},{k:'coin',n:80},{k:'ff',n:5},{k:'gem',n:6},{k:'coin',n:200},{k:'pet',n:'bunny'}];
var FF_ITEMS=[{id:'jar',cost:6,ic:'i_jar'},{id:'lure',cost:8,ic:'i_lure'}];
function PL(){return PLANETS[S.planet]||PLANETS[1];}
var ALIENS=ALIENS1;
// star-gem shop: permanent boosts + cosmetics (all visible in play)
var BOOSTS=[{id:'inc',ic:'gem',cost:[10,20,35,50,75]},{id:'cap',ic:'i_boat',cost:[8,15,25,40,60]},{id:'pat',ic:'i_goods',cost:[6,12,20,32,50]},{id:'rush',ic:'stall',cost:[8,15,25,40,60]}];
var HATS=[{id:'none',cost:0},{id:'bow',cost:15,x:.71,y:.15,w:.17,r:.3},{id:'star',cost:20,x:.59,y:.085,w:.27,r:0},{id:'wizard',cost:25,x:.585,y:.17,w:.27,r:0},{id:'crown',cost:30,x:.59,y:.10,w:.21,r:0},{id:'leaf',ff:12,cost:0,x:.585,y:.11,w:.25,r:0}];
var SKINS=[{id:'classic',cost:0,img:'boat'},{id:'pink',cost:20,img:'boat_pink'},{id:'mint',cost:20,img:'boat_mint'},{id:'night',cost:35,img:'boat_night'},{id:'forest',ff:20,cost:0,img:'boat_forest'}];
function incMul(){return (1+0.1*(S.shop.inc||0))*PL().mul*(trip&&trip.jar?1.25:1);}
// daily quests + achievements
var QUESTS=[{k:'sell',ns:[30,50,80]},{k:'combo',ns:[10,15]},{k:'trips',ns:[3,4]},{k:'gifts',ns:[3,5]},{k:'tips',ns:[5,10]},{k:'likes',ns:[10,20]},{k:'dock',ns:[20,40]}];
var ACH=[{id:'sold100',f:function(){return S.stats.sold;},n:100,g:5},{id:'trips10',f:function(){return S.stats.trips;},n:10,g:5},
 {id:'combo20',f:function(){return S.stats.bestCombo;},n:20,g:10},{id:'planet2',f:function(){return S.unlocked.indexOf(2)>=0?1:0;},n:1,g:15},
 {id:'staff2',f:function(){return S.staff.filter(function(x){return x>0;}).length;},n:2,g:10},{id:'lvl10',f:function(){return S.lvl;},n:10,g:10},
 {id:'cos',f:function(){return S.cos.hats.length+S.cos.boats.length-1;},n:1,g:5},{id:'quests',f:function(){return S.stats.quests;},n:10,g:10},
 {id:'sold1000',f:function(){return S.stats.sold;},n:1000,g:10},{id:'trips50',f:function(){return S.stats.trips;},n:50,g:15},
 {id:'earn',f:function(){return S.stats.earned;},n:100000,g:10},{id:'sold10000',f:function(){return S.stats.sold;},n:10000,g:20},
 {id:'planet3',f:function(){return S.unlocked.indexOf(3)>=0?1:0;},n:1,g:20},{id:'orders',f:function(){return S.stats.orders|0;},n:10,g:10},
 {id:'planet4',f:function(){return S.unlocked.indexOf(4)>=0?1:0;},n:1,g:25},{id:'book10',f:function(){return Object.keys(S.book.s).length;},n:10,g:15}];
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
var SAVE_KEY='kairon.starriver.save', SAVE_VERSION=5;

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
  goods:{fruit:1,candy:0,jelly:0,crystal:0,cotton:0,lolli:0,syrup:0,donut:0,snowcone:0,cocoa:0,aurora:0,pearl:0,berry:0,honey:0,glowshroom:0,emerald:0},staff:[0,0],
  load:{fruit:30,candy:0,jelly:0,crystal:0,cotton:0,lolli:0,syrup:0,donut:0,snowcone:0,cocoa:0,aurora:0,pearl:0,berry:0,honey:0,glowshroom:0,emerald:0},
  routes:{'1':{trips:0,done:false},'2':{trips:0,done:false},'3':{trips:0,done:false},'4':{trips:0,done:false}},dist:0,cur:null,ulSeen:false,ul3Seen:false,ul4Seen:false,tut:{done:false},
  tier:1,ff:0,items:{jar:0,lure:0},book:{s:{},g:{},pc:{},gc:{}},login:{last:'',streak:0,total:0,pop:''},
  market:{st:{coffee:0,souv:0,repair:0,smooth:0,lantern:0},bank:0,last:Date.now()},pets:{own:[],on:''},ev:{seen:''},
  shop:{inc:0,cap:0,pat:0,rush:0},cos:{hats:[],boats:['classic'],hat:'none',boat:'classic'},
  quests:{day:'',list:[],prog:{},rerolled:false},ach:{},
  ad:{day:'',count:0,last:0},stats:{sold:0,earned:0,trips:0,bestCombo:0,quests:0,orders:0},
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
  var f=fresh();
  for(var k in f){if(d[k]===undefined||(d[k]===null&&k!=='cur'))d[k]=f[k];}
  ['up','goods','load','routes','tut','shop','cos','quests','ach','ad','stats','market','pets','ev','items','book','login'].forEach(function(o){if(typeof d[o]!=='object')d[o]=f[o];for(var j in f[o])if(d[o][j]===undefined)d[o][j]=f[o][j];});
  while(d.staff.length<STAFF.length)d.staff.push(0);
  if(!(d.goods.fruit>0))d.goods.fruit=1;
  if(!Array.isArray(d.unlocked)||!d.unlocked.length)d.unlocked=[1];
  if(!Array.isArray(d.arrived))d.arrived=[1];
  if(d.unlocked.indexOf(d.planet)<0)d.planet=1;
  if(d.unlocked.indexOf(2)>=0&&!(d.goods.cotton>0))d.goods.cotton=1;
  ['1','2','3','4'].forEach(function(n){if(typeof d.routes[n]!=='object'||!d.routes[n])d.routes[n]={trips:0,done:false};});
  [3,4].forEach(function(n){if(d.unlocked.indexOf(n)>=0)starterGoods(d,n);}); // every newer planet starts with two goods, so mixed orders work on arrival
  ['s','g','pc','gc'].forEach(function(k){if(typeof d.book[k]!=='object'||!d.book[k])d.book[k]={};});
  d.tier=Math.max(1,Math.min(3,d.tier|0||1));d.ff=Math.max(0,d.ff|0);d.items.jar=Math.max(0,d.items.jar|0);d.items.lure=Math.max(0,d.items.lure|0);
  d.login.streak=Math.max(0,Math.min(7,d.login.streak|0));if(typeof d.login.last!=='string')d.login.last='';
  if(typeof d.market.st!=='object'||!d.market.st)d.market.st={};STALLS.forEach(function(x){d.market.st[x.id]=Math.max(0,d.market.st[x.id]|0);});
  d.market.bank=Math.max(0,+d.market.bank||0);if(!(d.market.last>0))d.market.last=Date.now();
  if(!Array.isArray(d.pets.own))d.pets.own=[];if(d.pets.own.indexOf(d.pets.on)<0)d.pets.on='';
  if(!Array.isArray(d.cos.hats))d.cos.hats=[];if(!Array.isArray(d.cos.boats)||d.cos.boats.indexOf('classic')<0)d.cos.boats=['classic'].concat(Array.isArray(d.cos.boats)?d.cos.boats:[]);
  if(!Array.isArray(d.quests.list))d.quests.list=[];
  d.v=SAVE_VERSION;return d;
}
function starterGoods(d,n){GOODS.filter(function(g){return g.pl===n;}).slice(0,2).forEach(function(g){d.goods[g.id]=Math.max(1,d.goods[g.id]|0);});}
function load(){try{var r=localStorage.getItem(SAVE_KEY);return migrate(r?JSON.parse(r):null);}catch(e){return fresh();}}
function save(){S.lastSeen=Date.now();S.dist=dist;
  // mid-trip save: a reload resumes the trip with the goods still on board
  S.cur=(trip&&(phase==='travel'||phase==='dock'))?{pl:S.planet,z0:trip.z0,docks:trip.docks,end:trip.end,di:trip.di,sold:trip.sold,tips:trip.tips,best:trip.best,earned:trip.earned,stock:stock,dist:dist,jar:trip.jar|0,lure:trip.lure|0}:null;
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
 'v_forestopen','v_forest','v_fork','v_risky','v_safe','v_night','v_firefly','v_boatup','v_sticker','v_golden','v_page','v_login','v_day7','v_swap'];
function audioInit(){
  if(A.ctx)return;
  var C=window.AudioContext||window.webkitAudioContext;if(!C)return;
  A.ctx=new C();A.master=A.ctx.createGain();A.master.connect(A.ctx.destination);
  A.music=A.ctx.createGain();A.music.gain.value=0.28;A.music.connect(A.master);
  A.sfx=A.ctx.createGain();A.sfx.gain.value=0.8;A.sfx.connect(A.master);
  A.voice=A.ctx.createGain();A.voice.gain.value=1.0;A.voice.connect(A.master);
  A.master.gain.value=S.mute?0:1;
  SOUNDS.forEach(function(n){
    fetch('audio/'+n+'.mp3').then(function(r){return r.arrayBuffer();}).then(function(ab){
      return new Promise(function(res,rej){A.ctx.decodeAudioData(ab,res,rej);});
    }).then(function(b){A.buf[n]=b;if(n===PL().music)startMusic();if(n==='paddle')startPaddle();}).catch(function(){});
  });
}
function audioUnlock(){
  audioInit();if(!A.ctx)return;
  if(A.ctx.state!=='running'){A.ctx.resume();}
  try{var b=A.ctx.createBuffer(1,1,22050),s=A.ctx.createBufferSource();s.buffer=b;s.connect(A.ctx.destination);s.start(0);}catch(e){}
  startMusic();startPaddle();
}
function startMusic(){ // each planet has its own loop (Candy Planet: brighter music-box variation)
  var m=PL().music;
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
  o=o||{};if(!A.ctx||!A.buf[n]||A.ctx.state!=='running')return;
  var s=A.ctx.createBufferSource();s.buffer=A.buf[n];
  if(o.rate)s.playbackRate.value=o.rate;
  var g=A.ctx.createGain();g.gain.value=o.vol==null?1:o.vol;s.connect(g);g.connect(n.charAt(0)==='v'&&n.charAt(1)==='_'?A.voice:A.sfx);s.start(0);
}
function say(n,minGap){var now=performance.now();if(now-A.lastVoice<(minGap==null?1600:minGap))return;A.lastVoice=now;play('v_'+n);}
function setMute(m){S.mute=m;if(A.master)A.master.gain.setTargetAtTime(m?0:1,A.ctx.currentTime,0.03);drawMuteIcon();save();}
function drawMuteIcon(){document.getElementById('mute-ico').setAttribute('d',S.mute?
 'M3 9v6h4l5 5V4L7 9H3zm13.6 3l2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z':
 'M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z');}
document.addEventListener('visibilitychange',function(){
  if(!A.ctx)return;
  if(document.hidden){A.ctx.suspend();save();}else if(!splashOn){A.ctx.resume();}
});

// ---------- images ----------
var IMG={},IMGS=['bg_space','staff','alien_blue','alien_green','alien_pink','stall','g_fruit','g_candy','g_jelly','g_crystal','coin','gem','islet0','islet1','islet2','islet3','i_map',
 'bg_candy','stall_candy','cislet0','cislet1','cislet2','cislet3','alien_gummy','alien_marsh','alien_choco','g_cotton','g_lolli','g_syrup','g_donut',
 'hat_bow','hat_star','hat_wizard','hat_crown','i_planet2',
 'bg_ice','stall_ice','iislet0','iislet1','iislet2','iislet3','alien_snow','alien_icejel','alien_peng','alien_yeti','g_snowcone','g_cocoa','g_aurora','g_pearl',
 'ob_ice','ob_meteor','ob_crate','pet_cat','pet_octo','pet_bird','market_base','mk_coffee','mk_souv','mk_repair','mk_smooth','mk_lantern',
 'bg_forest','stall_forest','fislet0','fislet1','fislet2','fislet3','alien_shroom','alien_leaf','alien_frog','alien_owl','g_berry','g_honey','g_glowshroom','g_emerald',
 'ob_log','ob_thorn','firefly','sign_fork','pet_bunny','hat_leaf'];
[1,2,3].forEach(function(n){['','_pink','_mint','_night','_forest'].forEach(function(k){IMGS.push('boat_t'+n+k);});});
IMGS.forEach(function(n){var i=new Image();i.src='assets/'+n+'.webp';IMG[n]=i;});
function ok(im){return !!im&&(im.tagName==='CANVAS'?im.width>0:(im.complete&&im.naturalWidth>0));}
function iw(im){return im.naturalWidth||im.width;}function ih(im){return im.naturalHeight||im.height;}
// pre-rendered glow sprites (cheap on mobile)
function makeGlow(r,g,b){var c=document.createElement('canvas');c.width=c.height=64;var x=c.getContext('2d'),gr=x.createRadialGradient(32,32,0,32,32,32);
  gr.addColorStop(0,'rgba('+r+','+g+','+b+',1)');gr.addColorStop(0.35,'rgba('+r+','+g+','+b+',.45)');gr.addColorStop(1,'rgba('+r+','+g+','+b+',0)');x.fillStyle=gr;x.fillRect(0,0,64,64);return c;}
var GLOW={warm:makeGlow(255,190,100),cyan:makeGlow(120,230,255),lav:makeGlow(190,160,255),gold:makeGlow(255,215,90),white:makeGlow(255,255,255),green:makeGlow(150,255,170)};

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
  trip={z0:z0,docks:docks,end:z0+len,di:0,sold:0,tips:0,best:0,earned:0,tut:!S.tut.done};
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
  return {slot:slot,img:a.img,likes:a.likes.indexOf(g.id)>=0,good:g,t:0,state:'in',pat:dock?3.4*(1+0.05*(S.up.pat-1))*(1+0.1*S.shop.pat):patOf(S.up.pat),
    ph:Math.random()*6,born:time,dock:!!dock,side:slot%2?1:-1};
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
function custPos(a){
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
function orderVal(a,onlyGot){var s=0;a.order.forEach(function(g,i){if(!onlyGot||a.got[i])s+=goodPrice(g,S.goods[g.id]);});return s*incMul();}
function deliverOrder(a){
  var p=custPos(a),idx=orderNext(a);
  if(idx<0){play('nope');var miss=a.order.filter(function(g,i){return !a.got[i];})[0];toast(t('noStock',{g:t(miss.id)}));a.shake=1;return false;}
  stock[a.order[idx].id]--;a.got[idx]=1;
  var n=a.got.filter(Boolean).length;play('grab',{vol:0.75,rate:1+n*0.1});sparkle(p.x,p.y-p.w*0.9,12);
  if(n<a.order.length){floats.push({x:p.x,y:p.y-p.w*0.5,txt:n+'/'+a.order.length,t:0,big:false});a.good=a.order[a.got.indexOf(0)];}
  else{var amt=Math.round(orderVal(a)*1.8*forkMul()*(a.gold?3:1));a.state='out';bookAdd(a);a.t=0;a.happy=true;addCoins(amt);S.stats.sold+=n;S.stats.orders=(S.stats.orders|0)+1;qAdd('sell',n);
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
    amt=Math.round(goodPrice(a.good,S.goods[a.good.id])*incMul()*forkMul()*(a.gold?3:1));if(a.likes)amt=Math.round(amt*1.25);
    if(!a.dock&&!byStaff&&a.t<a.pat*(petOn('octo')?0.55:0.4)){tip=Math.max(1,Math.round(amt*0.5*(petOn('octo')?1.5:1)));}
    if(a.dock&&!byStaff){combo++;comboT=1.6;comboPop=1;var mult=1+0.1*Math.min(combo,20);amt=Math.round(amt*mult);
      if(trip)trip.best=Math.max(trip.best,combo);qMax('combo',combo);
      play('combo',{rate:Math.min(1.9,1+combo*0.04),vol:0.7});
      if(combo===5||combo===15)say('combo',0);else if(combo===10||combo===20)say('great',0);}
  }
  a.state='out';a.t=0;a.happy=true;bookAdd(a);
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
  play('bump');if(Math.random()<0.6)say('bump',5000);sparkle(bx,L.boat.y-L.boat.h*0.2,14);hudDirty=true;
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
  x.globalCompositeOperation='lighter';x.fillStyle='rgba(255,240,170,0.18)';x.fillRect(0,0,c.width,c.height);GOLD[n]=c;return c;}
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
    if(fork){if(!fork.ch&&dist>fork.z0-1.5)pickFork(-fork.rich,true); // no choice made: take the safe branch
      if(dist>fork.z1+1.5){fork=null;lane=0;forkNext=dist+55+Math.random()*25;hudDirty=true;}}
  }
  // Emerald Forest: day/night cycle with fireflies to tap
  var nk=nightK();nightS+=(nk-nightS)*Math.min(1,dt*1.5);
  if(nk>0.5&&!wasNight&&phase==='travel'){wasNight=true;play('night');say('night',0);}else if(nk<0.2)wasNight=false;
  if((phase==='travel'||phase==='dock')&&nightS>0.5){ffT-=dt;if(ffT<=0&&ffs.filter(function(f){return !f.got;}).length<4){
    ffs.push({x:W*(0.12+Math.random()*0.76),y:H*(0.3+Math.random()*0.3),ph:Math.random()*6,t:0,life:7+Math.random()*3,got:false,gt:0});ffT=1.3+Math.random()*1.5;}}
  ffs.forEach(function(f){f.t+=dt;if(f.got)f.gt+=dt;});ffs=ffs.filter(function(f){return f.got?f.gt<0.5:(f.t<f.life&&!(nightS<0.25));});
  // Glow Ice: lane easing, drifting ice/meteors/crates, gentle bumps
  boatU+=(lane*LANE-boatU)*Math.min(1,dt*9);if(bumpT>0)bumpT=Math.max(0,bumpT-dt*2.5);
  obs.forEach(function(o){if(phase==='travel')o.z-=dt*0.5;if(o.done){o.t+=dt;if(o.push)o.u+=o.push*dt*5;return;}
    var d=o.z-dist;if(phase==='travel'&&d<0.35&&d>-0.6&&Math.abs(o.u-boatU)<0.72){o.done=true;o.t=0;if(o.k==='crate')grabCrate(o);else{o.push=o.u>=boatU?1:-1;bump(o);}}});
  obs=obs.filter(function(o){return o.z-dist>-4&&!(o.done&&o.k==='crate'&&o.t>0.4);});
  // dock rush
  if(phase==='dock'){
    dockT-=dt;spawnT-=dt;
    if(spawnT<=0&&dockT>0.8){spawnDockCust();spawnT=0.28;}
    if(comboT>0){comboT-=dt;if(comboT<=0)combo=0;}
    if(dockT<=0)leaveDock();
  }
  comboPop=Math.max(0,comboPop-dt*3);
  // customers lifecycle
  [aliens,dockC].forEach(function(arr){arr.forEach(function(a,i){if(!a)return;a.t+=dt;if(a.shake)a.shake=Math.max(0,a.shake-dt*3);
    var tin=a.dock?0.25:0.9;
    if(a.state==='in'&&a.t>tin){a.state='wait';a.t=0;if(a.gold){play('golden');say('golden',0);}else if(!a.dock&&Math.random()<0.25)say(Math.random()<0.5?'a_want':'a_wow',3000);if(a.vip)say('vip',0);}
    else if(a.state==='wait'&&a.t>a.pat&&!a.tutHold){if(a.vip){sellTo(a,true);}else{if(a.order)orderPartial(a);a.state='pass';a.t=0;}}
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
    play('dock');say('dock',0);banner={txt:'docking',t:0};
    if(trip.tut&&!tut.dockShown){tut.dockShown=true;tutShow('dock');}
  }else{ // destination
    phase='arrive';RT().trips++;S.stats.trips++;qAdd('trips');S.stats.bestCombo=Math.max(S.stats.bestCombo,trip.best);
    play('dock');play('fanfare',{vol:0.7});say('arrive',0);sparkle(W/2,H*0.45,40);save();
    var sc={sold:trip.sold,tips:trip.tips,best:trip.best,earned:trip.earned};setTimeout(function(){open('_summary',sc);},900);
  }
  updatePhaseUi();
}
function leaveDock(){
  dockC.forEach(function(a,i){if(a&&a.state!=='out'){a.state='pass';a.t=0;}});
  combo=0;comboT=0;phase='travel';spawnT=1.5;play('setoff');say('setoff',0);banner={txt:'setoff',t:0};
  if(tut.step==='dock')tutHide();
  updatePhaseUi();
}
function finishTrip(x2){
  phase='port';trip=null;for(var k in stock)stock[k]=0;lane=0;obs=[];fork=null;ffs=[];
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
  dockC.forEach(drawCust);aliens.forEach(drawCust);
  drawFF();
  drawFx(dt);
  drawOverlayText();
}
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
  var paddle=phase==='travel'?Math.sin(time*(holding?11:6))*0.03:0;
  cx.globalCompositeOperation='lighter';glow('lav',b.x,b.y+b.h*0.3,b.w*0.7,0.45);cx.globalCompositeOperation='source-over';
  // V wake behind the boat
  if(spd>0.3){cx.globalAlpha=Math.min(0.5,spd*0.06);cx.strokeStyle='#efe9ff';cx.lineWidth=2.5;
    cx.beginPath();cx.moveTo(b.x-b.w*0.3,b.y+b.h*0.32);cx.lineTo(b.x-b.w*0.75,H*0.98);cx.moveTo(b.x+b.w*0.3,b.y+b.h*0.32);cx.lineTo(b.x+b.w*0.75,H*0.98);cx.stroke();cx.globalAlpha=1;}
  var T=tierOf(),im=IMG[boatImg(S.cos.boat)];if(!ok(im))im=IMG[T.img];if(!ok(im))return;
  cx.globalAlpha=1;cx.save();cx.translate(b.x,b.y+bob);cx.rotate(rot+paddle);cx.scale(1+sq,1-sq);cx.drawImage(im,-b.w/2,-b.h/2,b.w,b.h);
  cargoIcons().forEach(function(c,i){var sl=T.slots[i],cw=b.w*T.cw,gi=IMG[c];if(!sl||!ok(gi))return;var ch=cw*ih(gi)/iw(gi);
    cx.drawImage(gi,-b.w/2+b.w*sl[0]-cw/2,-b.h/2+b.h*sl[1]-ch*0.85+Math.sin(time*2+i)*0.8,cw,ch);});
  var ht=hatOf(S.cos.hat),hi=ht&&ht.id!=='none'?IMG['hat_'+ht.id]:null;
  if(ok(hi)){var hp=hatPos(ht,T),hw=b.w*hp.w,hh=hw*hi.naturalHeight/hi.naturalWidth,hx=-b.w/2+b.w*hp.x,hy=-b.h/2+b.h*hp.y;
    cx.save();cx.translate(hx,hy);cx.rotate(ht.r+Math.sin(time*2.4)*0.03);cx.drawImage(hi,-hw/2,-hh,hw,hh);cx.restore();}
  var pet=petOf(S.pets.on),pi=pet?IMG['pet_'+pet.id]:null;
  if(ok(pi)){var pp=petPos(pet,T),pw=b.w*pp.w,ph=pw*pi.naturalHeight/pi.naturalWidth,px=-b.w/2+b.w*pp.x,py=-b.h/2+b.h*pp.y+(pet.fly?Math.sin(time*3.2)*6-6:Math.abs(Math.sin(time*2.6))*-3);
    cx.save();cx.translate(px,py);cx.rotate(pet.fly?Math.sin(time*3.2)*0.08:Math.sin(time*1.7)*0.04);cx.drawImage(pi,-pw/2,-ph,pw,ph);cx.restore();}
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
function drawCust(a){
  if(!a)return;var p=custPos(a);if(p.al<=0)return;
  var sh=a.shake?Math.sin(a.shake*30)*6*a.shake:0;
  cx.globalCompositeOperation='lighter';glow(a.vip||a.gold?'gold':'cyan',p.x,p.y+p.w*0.3,p.w*(a.vip||a.gold?0.8:0.5),(a.gold?0.7:0.4)*p.al);cx.globalCompositeOperation='source-over';cx.globalAlpha=1;
  drawImg(a.gold?(goldOf(a.img)||a.img):a.img,p.x+sh,p.y,p.w,.5,.6,Math.sin(time*2.2+a.ph)*0.05,p.al);
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
  var j1=$('j1'),j2=$('j2'),i1='assets/'+PL().icon+'.webp',i2=S.planet===1?'assets/i_planet2.webp':S.planet===2?'assets/i_ice.webp':S.planet===3?'assets/i_forest.webp':'assets/i_planet3.webp';
  if(j1.getAttribute('src')!==i1)j1.setAttribute('src',i1);if(j2.getAttribute('src')!==i2)j2.setAttribute('src',i2);
  j2.classList.toggle('lockd',S.planet<4?S.unlocked.indexOf(S.planet+1)<0:true);
  $('mkbtn').classList.toggle('can',!!can.market);$('petbtn').classList.toggle('can',!!can.pets);$('bookbtn').classList.toggle('can',!!can.book||bookNew);$('calbtn').classList.toggle('can',!!can.cal);
  $('evb').classList.toggle('hidden',!isWk());
  renderChips();
  if(openPanel&&openPanel!=='map'&&openPanel.charAt(0)!=='_')renderPanel(openPanel,true);
}
function renderChips(){
  var h='';PG().forEach(function(g){if(!S.goods[g.id])return;var n=phase==='port'?(S.load[g.id]||0):stock[g.id];if(phase!=='port'&&!(S.load[g.id]>0)&&!n)return;
    h+='<div class="chip'+(n?'':' zero')+'"><img src="assets/'+g.img+'.webp" alt=""><b>'+n+'</b></div>';});
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
  if(tut.step)placeHand();
}
function updatePhaseUi(){
  var port=phase==='port';
  $('bar').classList.toggle('hidden',!port);$('cta').classList.toggle('hidden',!port);$('stock').classList.toggle('hidden',port);
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
var STICKY={_welcome:1,_summary:1,_edge:1,_unlock:1,_arrive:1,_meteor:1};
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
    [1,2,3,4].forEach(function(n){var P=PLANETS[n],un=S.unlocked.indexOf(n)>=0,rt=S.routes[n];
      h+='<div class="planet'+(un?'':' lock')+(S.planet===n?' here':'')+'"><div class="pl"><img class="p" src="assets/'+P.icon+'.webp" alt="">'+(un?'':'<img class="lk" src="assets/lock.webp" alt="">')+'</div><div class="pm"><div class="nm" style="font-weight:800;font-size:18px">'+t(P.name)+'</div><div class="ds" style="font-size:14px;opacity:.8">'+t(P.desc)+'</div>'+
        '<div class="ds" style="font-size:14px">'+(un?t('route',{a:Math.min(rt.trips,P.trips),b:P.trips})+(P.mul>1?' · '+t('incomeX',{n:P.mul}):''):t('route',{a:Math.min(S.routes[n-1].trips,PLANETS[n-1].trips),b:PLANETS[n-1].trips}))+'</div>'+
        (S.planet===n?'<span class="tag">'+t('here')+'</span>':un?'<button class="buy trv" data-a="travel" data-i="'+n+'">'+t('travel')+'</button>':'<span class="tag">'+t('soon')+'</span>')+'</div></div>';});
    h+='<div class="planet lock"><div class="pl"><img class="p" src="assets/i_planet3.webp" alt=""><img class="lk" src="assets/lock.webp" alt=""></div><div><div class="nm" style="font-weight:800;font-size:18px">'+t('planet5')+'</div><span class="tag">'+t('soon')+'</span></div></div>'+
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
      '<button class="srow" data-a="lang"><span>'+t('language')+'</span><b>'+(S.lang==='th'?'ไทย':'English')+'</b></button>'+
      '<button class="srow" data-a="howto"><span>'+t('howto')+'</span><b>›</b></button>'+
      '<div class="ds" style="font-size:12px;opacity:.6;text-align:center;margin-top:10px">Kairon Arcade · ห้องเกม ไครอน</div>';
  }else if(p==='howto'){
    h=head(t('howto'));
    [['i_goods','h1'],['hand','h2'],['alien_blue','h3'],['stall','h4'],['i_boat','h5'],['ob_ice','h6'],['i_market','h7'],['pet_cat','h8'],['alien_snow','h9'],['sign_fork','h10'],['firefly','h11'],['i_book','h12'],['i_boatup','h13'],['i_gift','h14']].forEach(function(r,i){
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
    var e4=S.planet===4;
    h='<img class="pop-ic" src="assets/'+(e4?'i_forest':'i_ice')+'.webp" alt="" style="width:120px;height:110px"><div class="pop-t">'+t(e4?'edge4T':'edge3T')+'</div><div class="pop-d">'+t(e4?'edge4D':'edge3D')+'</div>'+
      '<div class="planet lock" style="margin-bottom:14px"><div class="pl"><img class="p" src="assets/i_planet3.webp" alt=""><img class="lk" src="assets/lock.webp" alt=""></div><div><div class="nm" style="font-weight:800;font-size:18px">'+t(e4?'planet5':'planet4')+'</div><span class="tag">'+t('soon')+'</span></div></div>'+
      '<div class="btns"><button class="b-yes" data-a="edgeok">'+t('edgeOk')+'</button></div>';
  }else if(p==='_unlock'){
    var un=(panelCtx&&panelCtx.n)||2,un3=un===3,un4=un===4,UA=un4?ALIENS4.concat([{img:'alien_owl'}]):un3?ALIENS3.concat([{img:'alien_yeti'}]):ALIENS2;
    h='<img class="pop-ic big" src="assets/'+(un4?'i_forest':un3?'i_ice':'i_planet2')+'.webp" alt=""><div class="pop-t">'+t(un4?'ul4T':un3?'ul3T':'ulT')+'</div><div class="pop-d">'+t(un4?'ul4D':un3?'ul3D':'ulD')+'</div>'+
      '<div class="newrow">'+UA.map(function(a){return '<img src="assets/'+a.img+'.webp" alt="">';}).join('')+'</div>'+
      '<div class="btns"><button class="b-yes" data-a="ulgo">'+t(un4?'ul4Go':un3?'ul3Go':'ulGo')+'</button><button class="b-no" data-a="ulstay">'+t('ulStay')+'</button></div>';
  }else if(p==='_arrive'){
    var an=(panelCtx&&panelCtx.n)||2;
    h='<img class="pop-ic big" src="assets/'+PLANETS[an].icon+'.webp" alt=""><div class="pop-t">'+t(an===4?'ar4T':an===3?'ar3T':'arT')+'</div><div class="pop-d">'+t(an===4?'ar4D':an===3?'ar3D':'arD')+'</div>'+
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
    h=head(t('book'))+'<div class="ds shopd">'+t('bookD')+'</div><div class="gembal">'+got+' / '+bookTotal()+'</div>';
    BOOK.forEach(function(pg,i){var full=pageFull(i),gfull=pageGold(i),rw=pageRew(i);
      h+='<div class="bpage"><div class="sec">'+t(PLANETS[pg.pl].name)+'</div><div class="stk">'+pg.al.map(function(a){var o=S.book.s[a],g=S.book.g[a];
        return '<div class="st'+(o?'':' miss')+(g?' gold':'')+'"><img src="assets/'+a+'.webp" alt="">'+(g?'<i>'+t('bookGold')+'</i>':'')+'</div>';}).join('')+'</div>'+
        '<div class="row brw"><div class="mid"><div class="ds">'+coinsTxt(rw.c)+' &nbsp;'+gemsTxt(rw.g)+'</div></div>'+(S.book.pc[i]?'<button class="buy max">'+t('pageDone')+'</button>':full?'<button class="buy" data-a="pgclaim" data-i="'+i+'">'+t('pageClaim')+'</button>':'<span class="arew">'+pg.al.filter(function(a){return S.book.s[a];}).length+' / '+pg.al.length+'</span>')+'</div>'+
        '<div class="row brw"><div class="mid"><div class="ds">'+t('goldPage')+' · '+gemsTxt(30)+'</div></div>'+(S.book.gc[i]?'<button class="buy max">'+t('pageDone')+'</button>':gfull?'<button class="buy" data-a="pggold" data-i="'+i+'">'+t('pageClaim')+'</button>':'<span class="arew">'+pg.al.filter(function(a){return S.book.g[a];}).length+' / '+pg.al.length+'</span>')+'</div></div>';});
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
function reopen(kind){var r=adReturnCtx;adReturnCtx=null;if(r&&(r.panel==='_welcome'||r.panel==='_summary'))open(r.panel,r.ctx);else if(kind==='q2x'||kind==='qreroll')open('quests');else if(kind==='mk2x')open('market');else if(kind==='login2x')open('cal');}
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
  else if(k==='login2x'){if(loginNext())claimLogin(2);say('x2',1500);open('cal');}
  else if(k==='welcome'&&welcomeAmt){addCoins(welcomeAmt*2);coinBurst(W/2,H*0.5,14);play('sell');say('x2',0);welcomeAmt=0;afterWelcome();}
  save();hudDirty=true;
});
var welcomeAmt=0;

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
function applyPlanet(){document.body.classList.toggle('p2',S.planet===2);document.body.classList.toggle('p3',S.planet===3);document.body.classList.toggle('p4',S.planet===4);ALIENS=PL().aliens;startMusic();hudDirty=true;}
function warpTo(n){
  if(S.unlocked.indexOf(n)<0||phase!=='port')return;
  var w=$('warp');$('warp-t').textContent=t('warpTo');$('warp-n').textContent=t(PLANETS[n].name);$('warp-i').src='assets/'+PLANETS[n].icon+'.webp';
  w.classList.remove('hidden');w.classList.add('on');play('setoff');play('unlock',{vol:0.6});
  setTimeout(function(){
    S.planet=n;aliens=[null,null,null,null];dockC=[null,null,null,null,null];gifts=[];obs=[];lane=0;boatU=0;
    piers=[{z:dist+1.4,side:-1,kind:'home'}];fork=null;ffs=[];
    if(n>2&&S.arrived.indexOf(n)<0){starterGoods(S,n);GOODS.forEach(function(g){S.load[g.id]=0;});} // first visit: pack this planet's two starter goods so mixed orders work right away
    fixLoad();if(loadTotal()<=0)autoFill();applyPlanet();save();updatePhaseUi();updateHud();
  },700);
  setTimeout(function(){w.classList.remove('on');setTimeout(function(){w.classList.add('hidden');},450);
    if(n>1&&S.arrived.indexOf(n)<0){S.arrived.push(n);var ag=addGems(ARRIVE_GEMS);save();open('_arrive',{n:n,g:ag});play('fanfare');say(n===3?'ice':n===4?'forest':'planet',0);sparkle(W/2,H*0.4,70);}
    else say(n===1?'home':n===3?'ice':n===4?'forest':'planet',0);
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
  trip={z0:c.z0,docks:c.docks,end:c.end,di:c.di|0,sold:c.sold|0,tips:c.tips|0,best:c.best|0,earned:c.earned|0,tut:false,jar:c.jar|0,lure:c.lure|0};forkNext=c.dist+20;
  for(var k in stock)stock[k]=Math.max(0,(c.stock&&c.stock[k])|0);dist=c.dist;
  piers=[];trip.docks.forEach(function(z,j){if(j>=trip.di)piers.push({z:z,side:j%2?1:-1,kind:'dock'});});piers.push({z:trip.end,side:1,kind:'end'});
  phase='travel';spawnT=1.5;giftT=4;vipWin=0;vipNext=20+Math.random()*10;emptyNoted=stockTotal()<=0;resumed=true;
})();
qEnsure();mkTick();applyPlanet();
resize();applyLang();drawMuteIcon();updatePhaseUi();updateHud();
requestAnimationFrame(frame);
$('splash').addEventListener('pointerdown',function(){
  if(!splashOn)return;splashOn=false;audioUnlock();
  $('splash').classList.add('out');setTimeout(function(){$('splash').style.display='none';},500);
  setTimeout(function(){layout();startMusic();
    if(resumed){toast(t('resume'));say('setoff',0);return;}
    if(S.unlocked.indexOf(2)>=0&&!S.ulSeen&&S.arrived.indexOf(2)<0){S.ulSeen=true;save();open('_unlock');play('fanfare');sparkle(W/2,H*0.4,50);return;}
    if(S.unlocked.indexOf(3)>=0&&!S.ul3Seen&&S.arrived.indexOf(3)<0){S.ul3Seen=true;save();open('_unlock',{n:3});play('fanfare');say('iceopen',0);sparkle(W/2,H*0.4,50);return;}
    if(S.unlocked.indexOf(4)>=0&&!S.ul4Seen&&S.arrived.indexOf(4)<0){S.ul4Seen=true;save();open('_unlock',{n:4});play('fanfare');say('forestopen',0);sparkle(W/2,H*0.4,50);return;}
    var off=checkOffline();if(!off){if(!S.tut.done)tutShow('intro');else say('hello',0);}
    if(mkRate()>0&&S.market.bank>=1)setTimeout(function(){toast(t('mkReady')+' · '+fmt(Math.floor(S.market.bank)));},off?400:1500);},250);
});
window.addEventListener('pagehide',save);
})();
