/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as('home')

// products route: render the products page and pass query param `q` to the view
router.get('/products', async ({ request, view }) => {
	const q = request.qs().q || ''
	return view.render('pages/product', { q })
}).as('products')

router.on('/about').render('pages/about').as('about')
router.on('/contact').render('pages/contact').as('contact')
router.on('/cart').render('pages/cart').as('cart')
router.on('/details').render('pages/detail').as('details')
