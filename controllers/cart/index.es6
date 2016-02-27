'use strict';

import Product from '../../models/productModel';
import getBundle from '../../lib/getBundle';

module.exports = function (router) {

	/**
	 * Display the shopping cart
	 */
	router.get('/', getBundle, (req, res) =>{

		//Retrieve the shopping cart from memory
		const cart = req.session.cart;
		let	displayCart = {items: [], total: 0},
			total = 0;
		const locals = res.locals;
        const i18n = res.app.kraken.get('i18n');
        const locality = locals && locals.context && locals.context.locality || i18n.fallback;
		let cartLength;
		if (!cart) {
			res.bundle.get({'bundle': 'messages', 'model': {}, 'locality': locality}, function bundleReturn(err, messages) {
				res.render('result', {result: messages.empty, continueMessage: messages.keepShopping});
			});

			return;
		}

		//Ready the products for display
		for (let item in cart) {
			displayCart.items.push(cart[item]);
			total += (cart[item].qty * cart[item].price);
		}
		req.session.total = displayCart.total = total.toFixed(2);
		cartLength = Object.keys(cart).length;
		let model =
		{
			cart: displayCart
		};
		res.bundle.get({'bundle': 'messages', 'model': {'cartItemLength': cartLength}, 'locality': locality}, function bundleReturn(err, messages) {
			model.itemsInCart = messages.items;
			res.render('cart', model);
		});

	});

	/**
	 * Add an item to the shopping cart
	 */
	router.post('/', (req, res) =>{

		//Load (or initialize) the cart
		req.session.cart = req.session.cart || {};
		const cart = req.session.cart;

		//Read the incoming product data
		const id = req.param('item_id');

		//Locate the product to be added
		Product.findById(id, (err, prod)=> {
			if (err) {
				console.log('Error adding product to cart: ', err);
				res.redirect('/cart');
				return;
			}

			//Add or increase the product quantity in the shopping cart.
			if (cart[id]) {
				cart[id].qty++;
			}
			else {
				cart[id] = {
					name: prod.name,
					price: prod.price,
					prettyPrice: prod.prettyPrice(),
					qty: 1
				};
			}

			res.redirect('/cart');

		});
	});
};
