import axios from 'axios';
import { useState } from 'react';
import { getBaseUrl } from '../../../../utils/baseURL';

type UploadImageProps = {
  name: string;
  id: string;
  value: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const UploadImage = ({ name, id, value, setImage }: UploadImageProps) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  //request to upload a file
  const uploadSingleImage = (base64: any) => {
    setLoading(true);
    axios
      .post(`${getBaseUrl()}/uploadImage`, { image: base64 })
      .then((res) => {
        const imageUrl = res.data;
        setUrl(imageUrl);
        // console.log(imageUrl);
        alert('Image uploaded successfully');
        setImage(imageUrl);
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return; // Handle the case where files is null
    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      return;
    }

    const base64s = [];
    for (let i = 0; i < files.length; i++) {
      const base = await convertBase64(files[i]);
      base64s.push(base);
    }
  };

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
