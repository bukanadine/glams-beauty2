import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SellerAuthMiddleware {
  async handle({ auth, response, session }: HttpContext, next: NextFn) {
    // Check if user is authenticated
    await auth.check()
    
    if (!auth.user) {
      session.flash('error', 'Please login to access seller dashboard')
      return response.redirect().toRoute('auth.login')
    }

    // Check if user has seller role
    if (auth.user.role !== 'seller') {
      session.flash('error', 'Access denied. Seller account required.')
      return response.redirect().toRoute('home')
    }

    return next()
  }
}