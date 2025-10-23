import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class SellerProductsController {
  /**
   * Display seller dashboard with all products
   */
  async index({ view }: HttpContext) {
    const products = await Product.query().orderBy('created_at', 'desc')

    return view.render('pages/seller/dashboard', { products })
  }

  /**
   * Show form to add a new product
   */
  async create({ view }: HttpContext) {
    return view.render('pages/seller/add_product')
  }

  /**
   * Store a new product
   */
  async store({ request, response, session }: HttpContext) {
    const data = request.only(['name', 'price', 'description', 'image'])

    await Product.create(data)

    session.flash('success', 'Product added successfully!')
    return response.redirect().toRoute('seller.dashboard')
  }

  /**
   * Show form to edit a product
   */
  async edit({ params, view }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    return view.render('pages/seller/edit_product', { product })
  }

  /**
   * Update a product
   */
  async update({ params, request, response, session }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    const data = request.only(['name', 'price', 'description', 'image'])

    product.merge(data)
    await product.save()

    session.flash('success', 'Product updated successfully!')
    return response.redirect().toRoute('seller.dashboard')
  }

  /**
   * Delete a product
   */
  async destroy({ params, response, session }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.delete()

    session.flash('success', 'Product deleted successfully!')
    return response.redirect().toRoute('seller.dashboard')
  }
}
