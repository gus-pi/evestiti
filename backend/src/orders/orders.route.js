const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('./orders.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

//create checkout session
router.post('/create-checkout-session', async (req, res) => {
  const { products } = req.body;

  try {
    const line_items = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    res.json({
      id: session.id,
    });
  } catch (error) {
    console.error('Error creating checkout session', error);
    res.status(500).send({ message: 'Error creating checkout session' });
  }
});

//confirm payment
router.post('/confirm-payment', async (req, res) => {
  const { session_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent'],
    });

    const paymentIntentId = session.payment_intent.id;
    let order = await Order.findOne({ orderId: paymentIntentId });

    if (!order) {
      const lineItems = session.line_items.data.map((item) => ({
        productId: item.price.product,
        quantity: item.quantity,
      }));
      const amount = session.amount_total / 100;
      order = new Order({
        orderId: paymentIntentId,
        amount,
        products: lineItems,
        email: session.customer_details.email,
        status:
          session.payment_intent.status === 'succeeded' ? 'pending' : 'failed',
      });
    } else {
      order.status =
        session.payment_intent.status === 'succeeded' ? 'pending' : 'failed';
    }

    await order.save();
    res.json({ order });
  } catch (error) {
    console.error('Error confirming payment', error);
    res.status(500).send({ message: 'Error confirming payment' });
  }
});

//get order by email
router.get('/:email', async (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).send({ message: 'Email is required' });
  }

  try {
    const orders = await Order.find({ email });

    if (orders.length === 0 || !orders) {
      return res.status(404).send({ orders: 0, message: 'Order not found' });
    }

    res.status(200).send({ orders });
  } catch (error) {
    console.error('Error fetching order by email', error);
    res.status(500).send({ message: 'Error fetching order by email' });
  }
});

//get order by id
router.get('/order/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }

    res.status(200).send({ order });
  } catch (error) {
    console.error('Error fetching order by id', error);
    res.status(500).send({ message: 'Error fetching order by id' });
  }
});

//get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders) {
      return res.status(404).send({ message: 'No orders found' });
    }

    res.status(200).send({ orders });
  } catch (error) {
    console.error('Error fetching orders', error);
    res.status(500).send({ message: 'Error fetching orders' });
  }
});

//update order status
router.patch('/update-order-status/:id', async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  if (!status) {
    return res.status(400).send({ message: 'Status is required' });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status,
        updatedAt: new Date(),
      },
      {
        new: true,
        runValidators,
      }
    );

    if (!updatedOrder) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.status(200).send({
      message: 'Order status updated succesfully',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order status', error);
    res.status(500).send({ message: 'Error updating order status' });
  }
});

//delete order
router.delete('/delete-order/"id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res
      .status(200)
      .send({ message: 'Order deleted succesfully', order: deletedOrder });
  } catch (error) {
    console.error('Error deleting order', error);
    res.status(500).send({ message: 'Error deleting order' });
  }
});

module.exports = router;
