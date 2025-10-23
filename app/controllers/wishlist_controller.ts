import Wishlist from '#models/wishlist'
import type { HttpContext } from '@adonisjs/core/http'

export default class WishlistController {
  /**
   * Display user's wishlist
   */
  async index({ view, request }: HttpContext) {
    // Get user_name from query or use default
    const userName = request.input('user_name', 'Guest')

    const wishlists = await Wishlist.query()
      .where('user_name', userName)
      .preload('product')
      .orderBy('created_at', 'desc')

    return view.render('pages/wishlist', { wishlists, userName })
  }

  /**
   * Add product to wishlist
   */
  async store({ request, response, session }: HttpContext) {
    const userName = request.input('user_name', 'Guest')
    const productId = request.input('product_id')

    // Check if already in wishlist
    const existing = await Wishlist.query()
      .where('user_name', userName)
      .where('product_id', productId)
      .first()

    if (!existing) {
      await Wishlist.create({
        userName,
        productId,
      })
      session.flash('success', 'Product added to wishlist')
    } else {
      session.flash('info', 'Product already in wishlist')
    }

    return response.redirect().back()
  }

  /**
   * Remove product from wishlist
   */
  async destroy({ params, response, request, session }: HttpContext) {
    const userName = request.input('user_name', 'Guest')

    const wishlist = await Wishlist.query()
      .where('id', params.id)
      .where('user_name', userName)
      .first()

    if (wishlist) {
      await wishlist.delete()
      session.flash('success', 'Product removed from wishlist')
    } else {
      session.flash('error', 'Wishlist item not found')
    }

    return response.redirect().back()
  }
}
