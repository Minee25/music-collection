# Music Collection

แอปพลิเคชันจัดการคอลเลกชันเพลงที่พัฒนาด้วย Node.js, Express และ MongoDB

## รายละเอียดโปรเจค

Music Collection เป็นเว็บแอปพลิเคชันที่ช่วยให้ผู้ใช้สามารถจัดการคอลเลกชันเพลงของตนเองได้ โดยมีฟีเจอร์หลักดังนี้:

- เพิ่ม แก้ไข ลบ เพลงในคอลเลกชัน
- ระบบจัดการผู้ดูแล (Admin) และการยืนยันตัวตน
- ระบบคอมเมนต์และไลค์
- เล่นเพลงผ่าน YouTube Link
- Responsive Design ด้วย Tailwind CSS

## เทคโนโลยีที่ใช้

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Template Engine**: EJS
- **Authentication**: JWT, bcryptjs
- **Session Management**: express-session

### Frontend
- **CSS Framework**: Tailwind CSS
- **Layout**: express-ejs-layouts

### Development Tools
- **Process Manager**: nodemon (development)
- **HTTP Logger**: morgan
- **Environment Variables**: dotenv

## การติดตั้ง

### ข้อกำหนดเบื้องต้น
- Node.js (เวอร์ชัน 14 หรือสูงกว่า)
- npm
- MongoDB Database

### ขั้นตอนการติดตั้ง

1. **Clone โปรเจค**
   ```bash
   git clone https://github.com/Minee25/music-collection.git
   cd music-collection
   ```

2. **ติดตั้ง Dependencies**
   ```bash
   npm install
   ```

3. **ตั้งค่า Environment Variables**
   สร้างไฟล์ `.env` ในโฟลเดอร์หลักและเพิ่มค่าต่อไปนี้:
   ```env
   PORT=8000
   MONGO_URI=mongodb://localhost:27017/music-collection
   SESSION_SECRET=your-session-secret-key
   JWT_SECRET=your-jwt-secret-key
   ```

4. **Build CSS**
   ```bash
   npm run build:css
   ```

5. **รันแอปพลิเคชัน**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **เปิดเบราว์เซอร์**
   ```
   http://localhost:8000
   ```

## Scripts ที่ใช้ได้

- `npm start` - รันแอปพลิเคชันในโหมด Production
- `npm run dev` - รันแอปพลิเคชันในโหมด Development
- `npm run devcss` - Build และ watch CSS files
- `npm run build:css` - Build CSS files ครั้งเดียว

## โครงสร้างโปรเจค

```
music-collection-mongodb/
├── app.js                    # Entry point
├── public/                   # Static files
│   ├── css/
│   └── img/
└── src/
    ├── assets/               # Source assets
    ├── config/               # Database config
    ├── controllers/          # Business logic
    ├── middleware/           # Custom middleware
    ├── models/               # MongoDB Models
    ├── routes/               # Route definitions
    └── views/                # EJS templates
```

## ฟีเจอร์หลัก

### จัดการเพลง
- เพิ่มเพลงใหม่พร้อม YouTube Link
- แก้ไขข้อมูลเพลง (ชื่อเพลง, ศิลปิน, คำอธิบาย)
- ลบเพลงจากคอลเลกชัน

### ระบบสังคม
- เพิ่มคอมเมนต์ในเพลง
- ระบบไลค์เพลง

### ระบบผู้ดูแลและการยืนยันตัวตน
- ผู้ดูแลสามารถเข้าสู่ระบบด้วยชื่อผู้ใช้และรหัสผ่าน
- JWT Authentication
- Session Management

### ระบบผู้ดูแล
- จัดการเพลงทั้งหมด
- เพิ่ม/แก้ไข/ลบเพลง

## ผู้พัฒนา

พัฒนาโดย **Thaksin Mualsuk**