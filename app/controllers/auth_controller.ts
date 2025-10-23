import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * Show login form
   */
  async showLogin({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  /**
   * Show register form
   */
  async showRegister({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  /**
   * Handle login
   */
  async login({ request, response, auth, session }: HttpContext) {
    const { email, password, role } = request.only(['email', 'password', 'role'])

    try {
      // Verify credentials
      const user = await User.verifyCredentials(email, password)

      // Check if user role matches selected role
      if (user.role !== role) {
        session.flash('error', `You are registered as a ${user.role}, not a ${role}`)
        return response.redirect().back()
      }

      // Login user
      await auth.use('web').login(user)

      // Redirect based on role
      if (role === 'seller') {
        return response.redirect().toRoute('seller.dashboard')
      } else {
        return response.redirect().toRoute('home')
      }
    } catch (error) {
      session.flash('error', 'Invalid credentials')
      return response.redirect().back()
    }
  }

  /**
   * Handle register
   */
  async register({ request, response, auth, session }: HttpContext) {
    const { fullName, email, password, role } = request.only([
      'fullName',
      'email',
      'password',
      'role',
    ])

    try {
      // Check if email already exists
      const existingUser = await User.findBy('email', email)
      
      if (existingUser) {
        session.flash('error', 'Email already registered. Please login instead.')
        session.flashAll()
        return response.redirect().toRoute('auth.login')
      }

      // Create user
      const user = await User.create({
        fullName,
        email,
        password,
        role: role || 'buyer',
      })

      // Login user
      await auth.use('web').login(user)

      session.flash('success', 'Account created successfully!')

      // Redirect based on role
      if (role === 'seller') {
        return response.redirect().toRoute('seller.dashboard')
      } else {
        return response.redirect().toRoute('home')
      }
    } catch (error) {
      session.flash('error', 'Registration failed. Please try again.')
      return response.redirect().back()
    }
  }

  /**
   * Handle logout
   */
  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('home')
  }
}