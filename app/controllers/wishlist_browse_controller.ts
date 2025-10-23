import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class WishlistBrowseController {
  /**
   * Show all products for wishlist (no auth required)
   */
  async index({ view }: HttpContext) {
    const products = await Product.query().orderBy('created_at', 'desc')
    return view.render('pages/wishlist_browse', { products })
  }
}
