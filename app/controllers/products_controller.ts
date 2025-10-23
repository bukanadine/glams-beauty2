import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of all products
   */
  async index({ request, view }: HttpContext) {
    const q = request.input('q', '')

    let query = Product.query()

    if (q) {
      query = query.where('name', 'like', `%${q}%`)
    }

    const products = await query.orderBy('created_at', 'desc')

    return view.render('pages/product', { products, q })
  }

  /**
   * Display a single product
   */
  async show({ params, view }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    return view.render('pages/detail', { product })
  }
}
