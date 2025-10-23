import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'

export default class extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: 'Maybelline Lash Sensational Sky High Mascara',
        price: 279000,
        description: 'Sky High Mascara delivers full volume and limitless length. Infused with bamboo extract and fibers, the mascara builds lashes up and up without weighing them down.',
        image: '/assets/sample1.jpg',
      },
      {
        name: 'Rare Beauty Soft Pinch Luminous Powder Blush',
        price: 364000,
        description: 'A weightless, long-lasting blush that blends and builds beautifully for a soft, healthy flush. Available in matte or luminous finishes.',
        image: '/assets/sample2.jpg',
      },
      {
        name: 'Rose Inc Satin Lip Color Rich Refillable Lipstick',
        price: 220000,
        description: 'A luxurious lipstick that delivers rich color with a satin finish. The refillable design makes it sustainable and eco-friendly.',
        image: '/assets/sample3.jpg',
      },
      {
        name: 'Cosnori Easy Draw Auto Eyebrow',
        price: 125000,
        description: 'An easy-to-use automatic eyebrow pencil with a ultra-fine tip for precise application. Creates natural-looking, hair-like strokes.',
        image: '/assets/sample4.jpg',
      },
      {
        name: 'Huda Beauty Eyeshadow Palette',
        price: 495000,
        description: 'A highly-pigmented eyeshadow palette featuring 18 shades in matte, shimmer, and metallic finishes. Perfect for creating endless eye looks.',
        image: '/assets/sample5.jpg',
      },
      {
        name: 'YSL Touche Éclat Glow Cushion',
        price: 995000,
        description: 'A luxurious cushion foundation that provides buildable coverage with a natural glow finish. Infused with skin-loving ingredients.',
        image: '/assets/sample6.jpg',
      },
    ])
  }
}
