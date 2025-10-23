import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.updateOrCreate(
      { email: 'customer@glams.com' },
      {
        fullName: 'Default Customer',
        email: 'customer@glams.com',
        password: 'password123',
        role: 'buyer',
      }
    )

    await User.updateOrCreate(
      { email: 'seller@glams.com' },
      {
        fullName: 'Glams Seller',
        email: 'seller@glams.com',
        password: 'password123',
        role: 'seller',
      }
    )
  }
}
