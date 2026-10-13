# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user: บุคคลทั่วไป / สมาชิกในครอบครัว (Household & personal inventory tracker) ที่ต้องการจัดการเสบียง อาหาร ของใช้ในบ้าน และรายการซื้อของอย่างรวดเร็ว โดยไม่มีความยุ่งยากของระบบล็อกอินหลายขั้นตอน เน้นความคล่องตัวเมื่อหยิบมือถือขึ้นมาเช็คของในบ้านหรือขณะกำลังเดินซื้อของ

## Product Purpose

Moodeng Stock เป็นเว็บแอปพลิเคชันสำหรับบันทึกและตรวจเช็คสต็อกของใช้ เสบียงในครัว บันทึกเมนูประจำวัน และจัดการรายการซื้อของเข้าบ้าน เพื่อแก้ปัญหา "ของหมดแล้วลืมซื้อ" หรือ "ซื้อของซ้ำเพราะจำไม่ได้ว่าในตู้เย็นมีอะไรบ้าง" โดยมอบประสบการณ์ที่อบอุ่นและมีชีวิตชีวาด้วยธีมน้องหมูเด้ง (Moo Deng)

## Positioning

ระบบจัดการสต็อกของใช้ในบ้านที่ผสานความน่ารักเป็นกันเองสไตล์ Doodle และมาสคอตน้องหมูเด้ง เข้ากับความสะดวกรวดเร็วของ Mobile-first Web App ที่ไม่มีสิ่งกีดขวางเรื่องการล็อกอิน มีระบบจำลองตู้เย็น/ไวท์บอร์ด และการจัดการตะกร้าพร้อมออกใบเสร็จย้อนหลังที่ใช้งานได้จริงในชีวิตประจำวัน

## Operating Context

- ใช้งานบนสมาร์ทโฟนขณะเดินซูเปอร์มาร์เก็ตหรือยืนหน้าตู้เย็น/ห้องครัว
- รองรับการเปิดผ่านเบราว์เซอร์หรือติดตั้งเป็น PWA บนหน้าจอมือถือ
- หน้าจอแนวตั้งเป็นหลัก (Mobile-first 2-column grid layout)
- ตะกร้าสินค้าจดจำสถานะผ่าน Local Storage แม้จะสลับแท็บหรือปิดเบราว์เซอร์
- การเชื่อมต่อข้อมูลสดกับ Cloud Database (Supabase) เพื่อซิงก์ข้อมูลสต็อกและประวัติการซื้อ

## Capabilities and Constraints

- **ความสามารถหลัก:**
  - ตรวจสอบรายการของในสต็อก แยกหมวดหมู่ (อาหาร, เครื่องดื่ม, ของใช้, ยา, อื่นๆ)
  - ปรับเพิ่ม/ลดจำนวน หรือแจ้งเตือนเมื่อของใกล้หมด (Low Stock Banner)
  - ระบบจัดของลงตะกร้าช้อปปิ้ง คำนวณราคารวม อัปเดตสต็อกอัตโนมัติ และดูประวัติบิลย้อนหลัง
  - ระบบหน้าตู้เย็น (Kitchen Tab) พร้อมไวท์บอร์ดเมนูวันนี้ และโพสต์อิทโน้ต 4 สไตล์
  - ระบบแจ้งเตือนและ Pop-up แบบคัสตอมน่ารัก (หลีกเลี่ยง `window.alert` และ `window.confirm`)
- **ข้อจำกัดทางเทคนิค:**
  - สถาปัตยกรรม Single-user / Anonymous RLS บน Supabase
  - Deployment บน Render.com (พร้อมรองรับ Cold Start)
  - ไม่ใช้ Native Browser Dialogs เด็ดขาด
  - ปุ่ม Action ต่างๆ บนการ์ดต้องแสดงผลตลอดเวลา (ห้ามซ่อนด้วย Hover effect เพื่อรองรับจอสัมผัส)

## Brand Commitments

- **ชื่อแอป:** Moodeng Stock (น้องหมูเด้ง สต็อก)
- **ธีมและโทนสี:** น่ารัก อบอุ่น ลายเส้นวาดมือ (Doodle / Hand-drawn) โทนสีชมพู ครีม ขาว และฟ้าอ่อนสำหรับโซนตู้เย็น
- **ฟอนต์หลัก:** Mali (ฟอนต์ลายมือภาษาไทยน่ารักและอ่านง่าย)
- **มาสคอต:** น้องหมูเด้ง (Pygmy Hippo) ประกอบกับไอคอนและขอบเส้นขยุกขยิก (Doodle Borders & Buttons)
- **ภาษา:** ภาษาไทยเป็นหลัก ใช้ถ้อยคำที่เป็นกันเองและน่ารัก

## Evidence on Hand

- ซอร์สโค้ดฟังก์ชันสต็อกและตะกร้าใน [StockTab.tsx](file:///C:/Users/User/.gemini/antigravity/scratch/moodeng-stock/app/components/stock/StockTab.tsx) และ [ShoppingTab.tsx](file:///C:/Users/User/.gemini/antigravity/scratch/moodeng-stock/app/components/shopping/ShoppingTab.tsx)
- ฐานข้อมูลและโครงสร้าง Schema ใน Supabase (`items`, `shopping_trips`, `shopping_trip_items`, `fridge_notes`, `notes`)
- UI คอมโพเนนต์เฉพาะตัวใน [DoodleButton.tsx](file:///C:/Users/User/.gemini/antigravity/scratch/moodeng-stock/app/components/ui/DoodleButton.tsx), [DoodleBorder.tsx](file:///C:/Users/User/.gemini/antigravity/scratch/moodeng-stock/app/components/svg/DoodleBorder.tsx), [ToastAlert.tsx](file:///C:/Users/User/.gemini/antigravity/scratch/moodeng-stock/app/components/ui/ToastAlert.tsx)

## Product Principles

1. **Delightful & Warm:** ทุกการตอบสนองและการแจ้งเตือนต้องสะท้อนคาแรคเตอร์น่ารักของน้องหมูเด้งอย่างสม่ำเสมอ ปราศจาก Dialog ดิบๆ ของเบราว์เซอร์
2. **Frictionless Utility:** บันทึกและตรวจเช็คได้อย่างรวดเร็วในไม่กี่แตะ ไม่ต้องผ่านแบบฟอร์มซับซ้อนหรือขั้นตอนยืนยันตัวตนที่ไม่จำเป็น
3. **Mobile-First Clarity:** ข้อมูลแสดงผลกระชับ สบายตา บนหน้าจอมือถือ ปุ่มกดขนาดพอดีนิ้ว ไม่พึ่งพาการ Hover
4. **Durable Local State:** ข้อมูลการกรอกและของในตะกร้าไม่สูญหายเมื่อสลับแท็บหรือทำงานขัดจังหวะ

## Accessibility & Inclusion

- สีข้อความและปุ่มมีความเปรียบต่าง (Contrast) ชัดเจน อ่านได้สะดวกทุกสภาพแสง
- ปุ่มกดและเป้าสัมผัส (Touch Targets) มีขนาดเหมาะสมกับการใช้งานด้วยมือเดียวบนสมาร์ทโฟน
