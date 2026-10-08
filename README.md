# NOI NOW

เว็บสำรวจวัฒนธรรมตลาดน้อย ตามดีไซน์หน้า `03 — Prototype • สำรวจตลาดน้อย` ใน [Figma](https://www.figma.com/design/AvejcFnb4YFfJSV0gJVn8x/NOI-NOW?node-id=37-2)

## รันในเครื่อง

ต้องใช้ Node.js 22.12 ขึ้นไป (แนะนำ Node.js 24)

```sh
npm ci
npm run dev
```

เปิด http://127.0.0.1:5173/th

```sh
npm run build
npm run preview
```

## Deploy บน Vercel

1. นำโค้ดขึ้น Git repository แล้ว Import Project ใน Vercel หรือรัน `npx vercel` จากโฟลเดอร์นี้สำหรับ preview deployment
2. ใช้ Framework Preset **Vite**, Root Directory **.**, Install Command **npm ci**, Build Command **npm run build**, Output Directory **dist**, Node.js **24.x**
3. ไม่ต้องตั้ง Environment Variables, API keys หรือฐานข้อมูล
4. `vercel.json` ตั้งค่า SPA rewrite สำหรับเปิด `/th/places/so-heng-tai` และเส้นทางย่อยโดยตรงแล้ว
5. หาก deploy ผ่าน CLI และต้องการ production ให้รัน `npx vercel --prod` หลังเลือก team/project ที่ถูกต้อง

การเตรียมโค้ดนี้ไม่ได้สร้าง Vercel project หรือเผยแพร่เว็บไซต์ให้โดยอัตโนมัติ

## ฟังก์ชัน

- หน้าหลัก, สำรวจ, แผนผังย่าน, เรื่องราว, สิ่งของ, เกี่ยวกับ
- รายละเอียดสถานที่ 4 แห่ง, เรื่องราว 4 เรื่อง, จุดสังเกต 3 ประเภท
- URL ภาษาไทย `/th` และอังกฤษ `/en`; สลับภาษาโดยคงหน้าปัจจุบันและคำค้น
- ค้นหาไทย/อังกฤษ, ตัวกรองประเภท, สถานะไม่พบข้อมูล, หน้าหาไม่พบ
- เมนูมือถือ, ค้นหาผ่านเมนูมือถือหรือ Ctrl/Cmd+K, ปิดด้วย Escape
- เลือกจุดบนแผนผังแล้วเปิด Google Maps สำหรับเส้นทางจริง
- ฟอนต์ Noto Sans Thai จากไฟล์ในเว็บไซต์ ไม่เรียก Google Fonts

## แก้ข้อมูลและดีไซน์

- `src/data.ts`: ชื่อสถานที่ คำแปล แหล่งอ้างอิง ลิงก์เส้นทาง และคำถามจุดสังเกต
- `src/pages.tsx`: เนื้อหาและหน้าต่าง ๆ (ข้อความย่อหน้าสถานที่ภาษาไทยแยกบรรทัดตาม Figma ใน PlaceDetail)
- `src/Art.tsx`: ภาพประกอบ SVG
- `src/styles.css`: design tokens และ responsive layout

ภาพทั้งหมดเป็นภาพประกอบเชิงสัญลักษณ์ตาม Figma ไม่ใช่ภาพอาคารจริง แผนผังย่านไม่ใช้มาตราส่วนจริง ข้อมูลการเข้าชมต้องตรวจจากสถานที่โดยตรง วันที่ทบทวนแหล่งข้อมูลของเนื้อหาต้นฉบับคือ 7 ตุลาคม 2026 ไม่ได้อ้างว่าเป็นข้อมูลเวลาเปิดปิดล่าสุด

เว็บนี้เป็น frontend ใช้ข้อมูลในไฟล์ ยังไม่มี CMS หรือระบบแก้เนื้อหาหลังบ้าน
