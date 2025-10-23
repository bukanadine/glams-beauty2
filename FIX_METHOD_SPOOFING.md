# Fix: Cannot POST /cart/1

## ✅ Problem Solved!

### Issue
Error "Cannot POST:/cart/1" terjadi karena method spoofing tidak berfungsi dengan benar.

### Root Cause
AdonisJS 6 memerlukan method spoofing menggunakan **query parameter** `?_method=PUT/DELETE` di URL, bukan hidden field `<input type="hidden" name="_method">`.

### Solution Applied

**Before (Tidak Bekerja):**
```edge
<form action="{{ route('cart.update', [item.id]) }}" method="POST">
  <input type="hidden" name="_method" value="PUT">
  ...
</form>
```

**After (Bekerja!):**
```edge
<form action="{{ route('cart.update', [item.id]) }}?_method=PUT" method="POST">
  {{ csrfField() }}
  ...
</form>
```

### Files Fixed
✅ `resources/views/pages/cart.edge`
- Updated all 3 quantity update forms (-, input, +) to use `?_method=PUT`
- Updated remove button form to use `?_method=DELETE`

### Test Commands

**Test cart page loads:**
```bash
curl -s http://localhost:3333/cart | head -20
```

**Test add to cart:**
```bash
curl -X POST http://localhost:3333/cart \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "product_id=1&quantity=2"
```

**Test update quantity (with method spoofing):**
```bash
curl -X POST "http://localhost:3333/cart/1?_method=PUT" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "quantity=5"
```

### How to Test in Browser

1. **Add product to cart:**
   - Go to: `http://localhost:3333/products`
   - Click "Add to Cart" on any product
   - Should redirect to cart page ✅

2. **Update quantity with + button:**
   - Go to: `http://localhost:3333/cart`
   - Click **+** button on any item
   - Quantity should increase ✅
   - Price should update ✅

3. **Update quantity with - button:**
   - Click **-** button on any item (with qty > 1)
   - Quantity should decrease ✅
   - Price should update ✅

4. **Update quantity by typing:**
   - Click in quantity input field
   - Type new number (e.g., 10)
   - Press Enter
   - Quantity should update to 10 ✅
   - Price should show × 10 ✅

5. **Remove item:**
   - Click "Remove" button
   - Item should be deleted from cart ✅

### Expected Behavior

✅ **All quantity updates work without errors**
✅ **No more "Cannot POST /cart/1" error**
✅ **Prices update automatically**
✅ **Subtotal recalculates correctly**

### Method Spoofing in AdonisJS 6

AdonisJS 6 supports method spoofing through query parameters:
- `?_method=PUT` - for UPDATE operations
- `?_method=PATCH` - for partial updates
- `?_method=DELETE` - for DELETE operations

All forms must use `method="POST"` with the desired HTTP method in query string.

### Related Routes

```typescript
// routes.ts
router.put('/cart/:id', [CartController, 'update']).as('cart.update')
router.delete('/cart/:id', [CartController, 'destroy']).as('cart.destroy')
router.post('/cart/clear', [CartController, 'clear']).as('cart.clear')
```

### CSRF Protection

All forms include CSRF token via `{{ csrfField() }}` directive, which is required for POST/PUT/DELETE requests.

---

## 🎉 Status: FIXED!

Cart quantity update sekarang berfungsi dengan sempurna menggunakan method spoofing yang benar dengan query parameter!
