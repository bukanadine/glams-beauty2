import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Cart from '#models/cart'

export default class extends BaseSeeder {
  async run() {
    // Clear existing cart items first
    await Cart.query().delete()

    // Add sample cart items
    await Cart.createMany([
      {
        productId: 1,
        userName: 'Guest',
        quantity: 2, // 2 items of Maybelline Mascara
      },
      {
        productId: 3,
        userName: 'Guest',
        quantity: 1, // 1 item of Rose Inc Lipstick
      },
      {
        productId: 5,
        userName: 'Guest',
        quantity: 3, // 3 items of Huda Beauty Palette
      },
    ])

    console.log('Cart seeded with sample items!')
  }
}
