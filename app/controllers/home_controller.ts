import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  /**
   * Display home page with latest products
   */
  async index({ view }: HttpContext) {
    const bestSellers = await Product.query().orderBy('created_at', 'desc').limit(3)

    return view.render('pages/home', { bestSellers })
  }
}
