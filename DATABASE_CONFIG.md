# SQLite Database Configuration - Glams Beauty

## ✅ Configuration Complete

### Database File Location
- **Path**: `/database/database.sqlite`
- **Type**: SQLite (better-sqlite3)
- **Status**: ✅ Created and configured

---

## 📊 Database Schema

### 1. **Products Table**
```
id              INTEGER PRIMARY KEY
name            VARCHAR (required)
price           DECIMAL(10,2) (required)
description     TEXT (required)
image           VARCHAR (required)
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### 2. **Wishlists Table**
```
id              INTEGER PRIMARY KEY
product_id      INTEGER (FK -> products.id) ON DELETE CASCADE
user_name       VARCHAR (required)
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### 3. **Users Table**
```
id              INTEGER PRIMARY KEY
full_name       VARCHAR (nullable)
email           VARCHAR (unique, required)
password        VARCHAR (required)
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

---

## 🚀 Commands Used

### Create Database & Run Migrations
```bash
node ace migration:run
```

### Seed Sample Data
```bash
node ace db:seed
```

### Rollback Migrations (if needed)
```bash
node ace migration:rollback
```

### Fresh Migration (drop all & recreate)
```bash
node ace migration:fresh --seed
```

---

## 📝 Sample Data Seeded

### Products (6 items)
1. Maybelline Lash Sensational Sky High Mascara - Rp 279,000
2. Rare Beauty Soft Pinch Luminous Powder Blush - Rp 364,000
3. Rose Inc Satin Lip Color Rich Refillable Lipstick - Rp 220,000
4. Cosnori Easy Draw Auto Eyebrow - Rp 125,000
5. Huda Beauty Eyeshadow Palette - Rp 495,000
6. YSL Touche Éclat Glow Cushion - Rp 995,000

### Users (2 items)
- customer@glams.com / password123
- seller@glams.com / password123

---

## 🔧 Configuration File

Location: `config/database.ts`

```typescript
connection: {
  filename: app.makePath('database/database.sqlite')
}
```

This ensures the SQLite database file is created in the `database/` directory instead of temporary storage.

---

## ✨ Features

### Simplified Schema Benefits:
- ✅ No category field (removed complexity)
- ✅ No sold counter (focus on core features)
- ✅ user_name instead of user_id (simpler, no auth required)
- ✅ Clean and minimal structure
- ✅ Perfect for learning and prototyping

### Working Features:
- ✅ Product CRUD (Create, Read, Update, Delete)
- ✅ Wishlist management (Add, View, Remove)
- ✅ Seller dashboard
- ✅ Product listing and detail pages
- ✅ Cascading deletes (when product deleted, wishlists auto-removed)

---

## 🎯 Next Steps

1. **Start the server**:
   ```bash
   npm run dev
   ```

2. **Access the application**:
   - Home: http://localhost:3333
   - Products: http://localhost:3333/products
   - Wishlist: http://localhost:3333/wishlist
   - Seller Dashboard: http://localhost:3333/seller/dashboard

3. **Test the features**:
   - Browse products
   - Add items to wishlist (as "Guest")
   - Manage products via seller dashboard
   - View all wishlists in seller panel

---

## 🐛 Troubleshooting

### If database is locked:
```bash
# Stop the server (Ctrl+C)
# Remove the database
rm database/database.sqlite
# Recreate
node ace migration:run
node ace db:seed
```

### If tables are missing:
```bash
node ace migration:fresh --seed
```

### If data needs reset:
```bash
# Rollback and re-run
node ace migration:rollback
node ace migration:run
node ace db:seed
```

---

## ✅ Status

- ✅ Database configured: `database/database.sqlite`
- ✅ Migrations created and run successfully
- ✅ Sample data seeded
- ✅ All models updated to match simplified schema
- ✅ All controllers updated
- ✅ All views updated
- ✅ No TypeScript errors
- ✅ Ready to run!

**The project is now fully configured and ready to use!** 🎉
