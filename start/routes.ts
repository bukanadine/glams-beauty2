/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const HomeController = () => import('#controllers/home_controller')
const ProductsController = () => import('#controllers/products_controller')
const WishlistController = () => import('#controllers/wishlist_controller')
const CartController = () => import('#controllers/cart_controller')
const SellerProductsController = () => import('#controllers/seller_products_controller')
const SellerWishlistController = () => import('#controllers/seller_wishlist_controller')
const WishlistBrowseController = () => import('#controllers/wishlist_browse_controller')
const ProfileController = () => import('#controllers/profile_controller')
const AuthController = () => import('#controllers/auth_controller')

// Auth Routes
router.get('/login', [AuthController, 'showLogin']).as('auth.login')
router.post('/login', [AuthController, 'login'])
router.get('/register', [AuthController, 'showRegister']).as('auth.register')
router.post('/register', [AuthController, 'register'])
router.post('/logout', [AuthController, 'logout']).as('auth.logout')

// User Routes
router.get('/', [HomeController, 'index']).as('home')
router.get('/profile', [ProfileController, 'index']).as('profile')
router.get('/products', [ProductsController, 'index']).as('products')
router.get('/products/:id', [ProductsController, 'show']).as('products.show')

// Wishlist Browse (no auth required - show products)
router.get('/wishlist/browse', [WishlistBrowseController, 'index']).as('wishlist.browse')

// Wishlist Routes (buyer auth required)
router.get('/wishlist', [WishlistController, 'index']).as('wishlist').use(middleware.buyerAuth())
router.post('/wishlist', [WishlistController, 'store']).as('wishlist.store').use(middleware.buyerAuth())
router.delete('/wishlist/:id', [WishlistController, 'destroy']).as('wishlist.destroy').use(middleware.buyerAuth())
router.post('/wishlist/:id/delete', [WishlistController, 'destroy']).as('wishlist.destroy.post').use(middleware.buyerAuth())

// Cart Routes
router.get('/cart', [CartController, 'index']).as('cart').use(middleware.buyerAuth())
router.post('/cart', [CartController, 'store']).as('cart.store').use(middleware.buyerAuth())
router.put('/cart/:id', [CartController, 'update']).as('cart.update').use(middleware.buyerAuth())
router.post('/cart/:id/update', [CartController, 'update']).as('cart.update.post').use(middleware.buyerAuth())
router.delete('/cart/:id', [CartController, 'destroy']).as('cart.destroy').use(middleware.buyerAuth())
router.post('/cart/:id/delete', [CartController, 'destroy']).as('cart.destroy.post').use(middleware.buyerAuth())
router.post('/cart/clear', [CartController, 'clear']).as('cart.clear').use(middleware.buyerAuth())

// Static Pages
router.on('/about').render('pages/about').as('about')
router.on('/contact').render('pages/contact').as('contact')

// Seller Routes (Admin Dashboard)
router.group(() => {
  router.get('/dashboard', [SellerProductsController, 'index']).as('dashboard')
  router.get('/products/create', [SellerProductsController, 'create']).as('products.create')
  router.post('/products', [SellerProductsController, 'store']).as('products.store')
  router.get('/products/:id/edit', [SellerProductsController, 'edit']).as('products.edit')
  router.put('/products/:id', [SellerProductsController, 'update']).as('products.update')
  router.delete('/products/:id', [SellerProductsController, 'destroy']).as('products.destroy')
  router.get('/wishlists', [SellerWishlistController, 'index']).as('wishlists')
}).prefix('/seller').as('seller').use(middleware.sellerAuth())
