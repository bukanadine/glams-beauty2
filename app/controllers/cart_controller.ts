import type { HttpContext } from '@adonisjs/core/http'
import Cart from '#models/cart'
import Product from '#models/product'

export default class CartController {
  // Display cart page with items
  async index({ view }: HttpContext) {
    const userName = 'Guest' // Sementara pakai Guest, bisa diganti dengan auth nanti
    
    const cartItems = await Cart.query()
      .where('user_name', userName)
      .preload('product')
      .orderBy('created_at', 'desc')
    
    // Calculate subtotal
    let subtotal = 0
    cartItems.forEach(item => {
      subtotal += Number(item.product.price) * item.quantity
    })
    
    return view.render('pages/cart', { cartItems, subtotal })
  }

  // Add product to cart
  async store({ request, response, session }: HttpContext) {
    const userName = 'Guest'
    const productId = request.input('product_id')
    const quantity = request.input('quantity', 1)

    // Check if product exists
    const product = await Product.find(productId)
    if (!product) {
      session.flash('error', 'Product not found')
      return response.redirect().back()
    }

    // Check if item already in cart
    const existingCart = await Cart.query()
      .where('user_name', userName)
      .where('product_id', productId)
      .first()

    if (existingCart) {
      // Update quantity
      existingCart.quantity += quantity
      await existingCart.save()
      session.flash('success', 'Cart updated successfully')
    } else {
      // Create new cart item
      await Cart.create({
        productId,
        userName,
        quantity
      })
      session.flash('success', 'Product added to cart')
    }

    return response.redirect().toRoute('cart')
  }

  // Update quantity
  async update({ params, request, response, session }: HttpContext) {
    const cart = await Cart.find(params.id)
    
    if (!cart) {
      session.flash('error', 'Cart item not found')
      return response.redirect().back()
    }

    const quantity = request.input('quantity', 1)
    if (quantity < 1) {
      session.flash('error', 'Quantity must be at least 1')
      return response.redirect().back()
    }

    cart.quantity = quantity
    await cart.save()
    
    session.flash('success', 'Cart updated')
    return response.redirect().toRoute('cart')
  }

  // Remove from cart
  async destroy({ params, response, session }: HttpContext) {
    const cart = await Cart.find(params.id)
    
    if (!cart) {
      session.flash('error', 'Cart item not found')
      return response.redirect().back()
    }

    await cart.delete()
    session.flash('success', 'Product removed from cart')
    
    return response.redirect().toRoute('cart')
  }

  // Clear all cart items
  async clear({ response, session }: HttpContext) {
    const userName = 'Guest'
    
    await Cart.query().where('user_name', userName).delete()
    
    session.flash('success', 'Cart cleared')
    return response.redirect().toRoute('cart')
  }
}
