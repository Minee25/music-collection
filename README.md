# 🎵 Music Collection

แอปพลิเคชันจัดการคอลเลกชันเพลงที่พัฒนาด้วย Node.js และ Express

## 📋 รายละเอียดโปรเจค

Music Collection เป็นเว็บแอปพลิเคชันที่ช่วยให้ผู้ใช้สามารถจัดการคอลเลกชันเพลงของตนเองได้ โดยมีฟีเจอร์หลักดังนี้:

- 🎼 เพิ่ม แก้ไข ลบ เพลงในคอลเลกชัน
- 🔐 ระบบจัดการผู้ดูแล (Admin)
- 🎵 เล่นเพลงออนไลน์
- 📱 Responsive Design ด้วย Tailwind CSS

## 🛠️ เทคโนโลยีที่ใช้

- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Template Engine**: EJS
- **Frontend**: Tailwind CSS
- **Authentication**: JWT, bcryptjs
- **Session Management**: express-session

## 📦 การติดตั้ง

### ข้อกำหนดเบื้องต้น
- Node.js (เวอร์ชัน 14 หรือสูงกว่า)
- npm หรือ yarn

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

3. **Build CSS**
   ```bash
   npm run build:css
   ```

4. **รันแอปพลิเคชัน**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **เปิดเบราว์เซอร์**
   ```
   http://localhost:8000
   ```

## 🚀 Scripts ที่ใช้ได้

- `npm start` - รันแอปพลิเคชันในโหมด Production
- `npm run dev` - รันแอปพลิเคชันในโหมด Development (ใช้ nodemon)
- `npm run devcss` - Build และ watch CSS files
- `npm run build:css` - Build CSS files ครั้งเดียว

## 📁 โครงสร้างโปรเจค

```
music-collection/
├── app.js                 # Entry point
├── package.json
├── public/               # Static files
│   ├── css/
│   └── img/
└── src/
    ├── assets/           # Source assets
    ├── controllers/      # Business logic
    ├── database/         # Database configuration
    ├── middleware/       # Custom middleware
    ├── routes/           # Route definitions
    └── views/            # EJS templates
```

## 🔧 ฟีเจอร์หลัก

### 🎵 จัดการเพลง
- เพิ่มเพลงใหม่
- แก้ไขข้อมูลเพลง
- ลบเพลง
- ค้นหาเพลง

### 🔐 ระบบผู้ดูแล
- จัดการผู้ใช้
- ดูสถิติการใช้งาน
- จัดการเนื้อหา

## 👨‍💻 ผู้พัฒนา

พัฒนาโดย Thaksin Mualsuk