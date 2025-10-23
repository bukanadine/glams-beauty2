import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  /**
   * Show profile page
   * If logged in, show user profile
   * If not logged in, show login button
   */
  async index({ auth, view }: HttpContext) {
    await auth.check()
    const user = auth.user || null
    
    return view.render('pages/profile', { user })
  }
}
