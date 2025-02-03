import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import React, { useState } from 'react';
import { Product } from '../../../../types/types';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import { color } from 'chart.js/helpers';
import UploadImage from './UploadImage';
import { useAddProductMutation } from '../../../../redux/features/products/productApi';

const categories = [
  { label: 'Select Category', value: '' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Dress', value: 'dress' },
  { label: 'Jewelry', value: 'jewelry' },
  { label: 'Cosmetics', value: 'cosmetics' },
  { label: 'Skin care', value: 'skin care' },
];

const colors = [
  { label: 'Select a Color', value: '' },
  { label: 'Black', value: 'black' },
  { label: 'Red', value: 'red' },
  { label: 'Gold', value: 'gold' },
  { label: 'Blue', value: 'blue' },
  { label: 'Silver', value: 'silver' },
  { label: 'Beige', value: 'beige' },
  { label: 'Green', value: 'green' },
];

const AddProduct = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [product, setProduct] = useState<Product>({
    _id: 0,
    name: '',
    category: '',
    description: '',
    price: 0,
    oldPrice: 0,
    image: 'string',
    color: '',
    rating: 0,
    author: '',
    quantity: 0,
  });
  const [image, setImage] = useState('');

  const [addProduct, { isLoading, error }] = useAddProductMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.description ||
      !product.color
    ) {
      alert('Please fill all required fields');
    }
    try {
      await addProduct({ ...product, image, author: user._id }).unwrap();
      alert('Product added successfully');
      //setProduct()
    } catch (error) {
      console.log('Failed to submit product', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <TextInput
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          type="text"
          placeholder="Product name"
        />
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />
        <SelectInput
          label="Colors"
          name="colors"
          value={product.color}
          onChange={handleChange}
          options={colors}
        />
        <TextInput
          label="Price"
          name="price"
          value={product.price.toString()}
          onChange={handleChange}
          type="number"
          placeholder="0"
        />
        <UploadImage
          name="image"
          id="image"
          value={(e) => setImage(e.target.value)}
          setImage={setImage}
        />
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="add-product-InputCSS"
            value={product.description}
            placeholder="Write the product description"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <button type="submit" className="add-product-btn">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
