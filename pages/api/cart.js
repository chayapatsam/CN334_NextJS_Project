//api/cart.js
import { connectToDatabase } from '@/utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { id, name, price, quantity } = req.body;

      const itemTotalPrice = parseFloat((price * quantity).toFixed(2));

      const db = await connectToDatabase();
      const collection = db.collection('carts');

      // Check if the product already exists in the cart
      const existingProduct = await collection.findOne({ id });

      if (existingProduct) {
        const updatedQuantity = existingProduct.quantity + quantity;
        const updatedItemTotalPrice = existingProduct.itemTotalPrice + itemTotalPrice;

        await collection.updateOne(
          { id },
          { $set: { quantity: updatedQuantity, itemTotalPrice: updatedItemTotalPrice } }
        );

        res.status(200).json({ message: 'Product quantity updated in cart successfully' });
      } else {
        await collection.insertOne({
          id,
          name,
          price,
          quantity,
          itemTotalPrice
        });

        res.status(201).json({ message: 'Product added to cart successfully' });
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).json({ message: 'Failed to add product to cart' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
