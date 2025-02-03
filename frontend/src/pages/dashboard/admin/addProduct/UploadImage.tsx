import { useState } from 'react';

type UploadImageProps = {
  name: string;
  id: string;
  value: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const UploadImage = ({ name, id, value, setImage }: UploadImageProps) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');

  const uploadImage = () => {};

  return (
    <div>
      <label htmlFor={name}>Upload Image</label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={uploadImage}
        className="add-product-InputCSS"
      />
      {loading && (
        <div className="mt-2 text-sm text-blue-600">
          Uploading product image
        </div>
      )}
      {url && (
        <div className="mt-2 text-sm text-green-600">
          <p>Image Uploaded Successfully!</p>
          <img src={url} alt="uploaded image" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
