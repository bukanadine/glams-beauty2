import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class BuyerAuthMiddleware {
  async handle({ auth, response, session }: HttpContext, next: NextFn) {
    // Check if user is authenticated
    await auth.check()
    
    if (!auth.user) {
      session.flash('error', 'Please login as buyer to add items to wishlist')
      return response.redirect().toRoute('auth.login')
    }

    // Check if user has buyer role
    if (auth.user.role !== 'buyer') {
      session.flash('error', 'Only buyers can add items to wishlist')
      return response.redirect().back()
    }

    return next()
  }
}
