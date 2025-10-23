# Cart Quantity & Price Testing Guide

## Test Scenario: Adding Same Product Multiple Times

### Setup
1. Start server: `npm run dev`
2. Navigate to: `http://localhost:3333/products`
3. Have sample products seeded in database

### Test Case 1: Add Same Product from Product List
**Steps:**
1. Go to `/products`
2. Find "Maybelline Lash Sensational Sky High Mascara" (Rp279.000)
3. Click "Add to Cart" (adds quantity: 1)
4. Go to `/cart` - should show:
   - Quantity: 1
   - Total: Rp279.000
5. Go back to `/products`
6. Click "Add to Cart" on the SAME product again
7. Go to `/cart` - should now show:
   - **Quantity: 2** ✅ (quantity increased)
   - **Total: Rp558.000** ✅ (price doubled)

### Test Case 2: Add Product with Custom Quantity from Detail Page
**Steps:**
1. Go to `/products`
2. Click on any product to view details
3. Set quantity to **3** in the quantity input
4. Click "Add to Cart"
5. Check cart - should show quantity: 3, total: price × 3
6. Go back to same product detail page
7. Set quantity to **2**
8. Click "Add to Cart" again
9. Check cart - should now show:
   - **Quantity: 5** ✅ (3 + 2 = 5)
   - **Total: price × 5** ✅

### Test Case 3: Update Quantity in Cart
**Steps:**
1. Go to `/cart`
2. Find a product with quantity 2
3. Change quantity input to **5**
4. Press Enter or click outside
5. Page reloads with:
   - **Quantity: 5** ✅
   - **Total updated** ✅
   - **Subtotal updated** ✅

### Test Case 4: Multiple Products
**Steps:**
1. Clear cart first (click "Clear Cart")
2. Add Product A: 2 items → Cart shows: 2× Product A
3. Add Product B: 1 item → Cart shows: 2× Product A + 1× Product B
4. Add Product A again: 3 items → Cart shows: **5×** Product A + 1× Product B ✅
5. Check subtotal: (Product A price × 5) + (Product B price × 1) ✅

### Expected Behavior Summary

| Action | Cart Before | User Action | Cart After |
|--------|-------------|-------------|------------|
| Add new product | Empty | Add 1× Product A | 1× Product A |
| Add same product | 1× Product A | Add 1× Product A | **2×** Product A |
| Add with quantity | 2× Product A | Add 3× Product A | **5×** Product A |
| Update in cart | 5× Product A | Change to 10 | **10×** Product A |

### Price Calculation Examples

**Product: Maybelline Mascara - Rp279.000**
- Quantity 1: Rp279.000
- Quantity 2: Rp558.000
- Quantity 5: Rp1.395.000
- Quantity 10: Rp2.790.000

**Product: Rose Inc Lipstick - Rp220.000**
- Quantity 1: Rp220.000
- Quantity 3: Rp660.000
- Quantity 7: Rp1.540.000

**Multiple Products Example:**
```
Cart Contents:
- 2× Maybelline Mascara @ Rp279.000 = Rp558.000
- 3× Rose Inc Lipstick @ Rp220.000  = Rp660.000
- 1× Huda Beauty Palette @ Rp495.000 = Rp495.000
                            SUBTOTAL = Rp1.713.000
```

## Automatic Features

✅ **Quantity Accumulation**: Adding same product multiple times increases quantity
✅ **Price Multiplication**: Total = Unit Price × Quantity
✅ **Subtotal Calculation**: Sum of all item totals
✅ **Auto Format**: All prices formatted with Indonesian locale (Rp1.234.567)
✅ **Real-time Update**: Changing quantity in cart immediately updates totals
✅ **Duplicate Prevention**: Same product appears only once with combined quantity

## Database Verification

Check database to verify quantities:
```bash
# Using SQLite CLI
sqlite3 database/database.sqlite "SELECT c.id, p.name, c.quantity, p.price, (c.quantity * p.price) as total FROM carts c JOIN products p ON c.product_id = p.id;"
```

Expected output shows:
- product_id
- quantity (accumulated from multiple adds)
- price × quantity = total
