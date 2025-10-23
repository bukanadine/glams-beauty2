import Wishlist from '#models/wishlist'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class SellerWishlistController {
  /**
   * Display all wishlists from all users
   */
  async index({ view }: HttpContext) {
    const wishlists = await Wishlist.query()
      .preload('product')
      .orderBy('created_at', 'desc')

    // Group by user name to get stats
    const userStats = await db
      .from('wishlists')
      .select('user_name')
      .count('* as total')
      .groupBy('user_name')
      .orderBy('total', 'desc')

    return view.render('pages/seller/wishlist_viewer', { wishlists, userStats })
  }
}
