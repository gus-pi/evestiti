import { useNavigate, useParams } from 'react-router-dom';
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from '../../../../redux/features/products/productApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { FormEvent, useEffect, useState } from 'react';
import TextInput from '../addProduct/TextInput';
import UploadImage from '../addProduct/UploadImage';
import SelectInput from '../addProduct/SelectInput';

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

const UpdateProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  const {
    data: productData,
    isLoading: isProductLoading,
    error: fetchError,
    refetch,
  } = useFetchProductByIdQuery(id);

  const [newImage, setNewImage] = useState('');
  const [product, setProduct] = useState({
    name: '',
    category: '',
    color: '',
    description: '',
    image: '',
    price: '',
  });

  const {
    name,
    category,
    color,
    description,
    image: imageUrl,
    price,
  } = productData?.product || {};

  const [updateProduct, { isLoading, error: updateError }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (productData) {
      setProduct({
        name: name || '',
        category: category || '',
        color: color || '',
        description: description || '',
        image: imageUrl || '',
        price: price || '',
      });
    }
  }, [productData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      image: newImage ? newImage : product.image,
      author: user?._id,
    };
    try {
      await updateProduct({ id, ...updatedProduct }).unwrap();
      alert('Product udpated successfully!');
      await refetch();
      navigate('/dashboard/manage-products');
    } catch (error) {
      console.error('Failed to update the product', error);
    }
  };

  if (isProductLoading) return <div>Loading...</div>;
  if (fetchError) return <div>Error fetching product.</div>;
  if (updateError) return <div>Error updating product.</div>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Update a Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          label="Color"
          name="color"
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
          value={newImage || product.image}
          setImage={setNewImage}
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
        <button type="submit" className="add-product-btn">
          {isLoading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
