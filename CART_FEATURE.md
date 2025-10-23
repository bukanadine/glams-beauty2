# Shopping Cart Feature

## Overview
Shopping cart functionality has been implemented for the Glams Beauty e-commerce application.

## Database Schema

### Carts Table
- `id` (integer, primary key)
- `product_id` (integer, foreign key to products)
- `user_name` (string) - Currently using 'Guest', can be replaced with auth later
- `quantity` (integer, default: 1)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Features

### 1. Add to Cart
Users can add products to their cart from:
- **Product listing page** (`/products`) - Click "Add to Cart" button (adds 1 item)
- **Product detail page** (`/products/:id`) - Select quantity and click "Add to Cart"

**Smart Quantity Management:**
- If product is **NOT in cart**: Creates new cart item with specified quantity
- If product is **ALREADY in cart**: Automatically **adds** the quantity to existing item
  - Example: Cart has 2x Product A, user adds 3 more → Cart now shows 5x Product A
  - Price automatically updates: 5 × Product Price

### 2. View Cart
- Navigate to `/cart` to view all cart items
- Shows product image, name, price, quantity, and total per item
- **Automatic Price Calculation:**
  - **Unit Price**: Shows price per item
  - **Total per Item**: Automatically calculates `Unit Price × Quantity`
  - **Subtotal**: Sum of all item totals
  - All prices formatted in Indonesian Rupiah (Rp)

**Example Cart Display:**
```
Product              | Price      | Qty | Total
---------------------|------------|-----|-------------
Maybelline Mascara   | Rp279.000  | 2   | Rp558.000
Rose Inc Lipstick    | Rp220.000  | 1   | Rp220.000
Huda Beauty Palette  | Rp495.000  | 3   | Rp1.485.000
                                 Subtotal: Rp2.263.000
```

### 3. Update Quantity
- Change quantity directly in the cart page
- **Quantity updates automatically when changed** - form submits on change
- **Price recalculates instantly:**
  - Item Total = New Quantity × Unit Price
  - Subtotal updates to reflect all changes
- Minimum quantity is 1
- No maximum limit (can be added if needed for stock validation)

### 4. Remove from Cart
- Click "Remove" button to delete individual items
- Click "Clear Cart" to remove all items at once

### 5. Checkout (Coming Soon)
- Checkout button displays alert (placeholder for future implementation)

## Price Calculation Logic

### Frontend (Edge Template)
The cart page automatically calculates prices using Edge expressions:

```edge
{# Unit Price per product #}
<td>Rp{{ item.product.price.toLocaleString('id-ID') }}</td>

{# Quantity #}
<td>{{ item.quantity }}</td>

{# Total for this item (Price × Quantity) #}
<td>Rp{{ (item.product.price * item.quantity).toLocaleString('id-ID') }}</td>

{# Subtotal (calculated in controller) #}
Subtotal: Rp{{ subtotal.toLocaleString('id-ID') }}
```

### Backend (Controller)
```typescript
// Calculate subtotal for all cart items
let subtotal = 0
cartItems.forEach(item => {
  subtotal += Number(item.product.price) * item.quantity
})
```

### When Adding Same Product Multiple Times
```typescript
// Check if product already in cart
const existingCart = await Cart.query()
  .where('user_name', userName)
  .where('product_id', productId)
  .first()

if (existingCart) {
  // ADD to existing quantity (not replace)
  existingCart.quantity += quantity  // e.g., 2 + 3 = 5
  await existingCart.save()
} else {
  // Create new cart item
  await Cart.create({ productId, userName, quantity })
}
```

**Example Flow:**
1. User adds 2× Product A → Cart: 2× Product A (Rp279.000) = Rp558.000
2. User adds 3× Product A again → Cart: **5×** Product A (Rp279.000) = **Rp1.395.000**
3. Subtotal updates automatically

## API Routes

| Method | Route | Controller | Description |
|--------|-------|------------|-------------|
| GET | /cart | CartController.index | Display cart page |
| POST | /cart | CartController.store | Add product to cart |
| PUT | /cart/:id | CartController.update | Update cart item quantity |
| DELETE | /cart/:id | CartController.destroy | Remove cart item |
| POST | /cart/clear | CartController.clear | Clear all cart items |

## Files Modified/Created

### Created:
- `database/migrations/1760775793325_create_carts_table.ts` - Cart table migration
- `app/models/cart.ts` - Cart model with Product relationship
- `app/controllers/cart_controller.ts` - Cart CRUD operations

### Modified:
- `start/routes.ts` - Added cart routes
- `resources/views/pages/cart.edge` - Dynamic cart view with data binding
- `resources/views/pages/product.edge` - Add to cart buttons
- `resources/views/pages/detail.edge` - Add to cart form with quantity selector

## How to Use

### Adding Products to Cart:
1. Browse products at `/products`
2. Click "Add to Cart" button on any product
3. Or go to product detail page and select quantity before adding

### Managing Cart:
1. Click cart icon in header or navigate to `/cart`
2. View all cart items with prices and quantities
3. Update quantities by changing the number and pressing enter
4. Remove individual items with "Remove" button
5. Clear entire cart with "Clear Cart" button
6. Proceed to checkout (coming soon)

## Flash Messages
- Success messages appear when items are added/updated/removed
- Error messages appear when operations fail
- Messages auto-dismiss on page reload

## Technical Details

### Cart Model
```typescript
export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productId: number

  @column()
  declare userName: string

  @column()
  declare quantity: number

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}
```

### Controller Methods
- `index()` - Get all cart items for current user, calculate subtotal
- `store()` - Add product or update quantity if already in cart
- `update()` - Update quantity of existing cart item
- `destroy()` - Delete specific cart item
- `clear()` - Delete all cart items for user

## Future Enhancements
- [ ] User authentication integration (replace 'Guest' with real users)
- [ ] Checkout process
- [ ] Order creation from cart
- [ ] Payment integration
- [ ] Cart item count in header
- [ ] Persistent cart across sessions
- [ ] Stock validation before adding to cart
