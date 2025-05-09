import { useState, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/apiConfig';

/**
 * Reusable image upload component
 * @param {Object} props Component properties
 * @param {string} props.endpoint The API endpoint to use for upload
 * @param {Function} props.onSuccess Callback function when upload is successful
 * @param {Function} props.onError Callback function when upload fails
 * @param {boolean} props.multiple Allow multiple file uploads
 * @param {number} props.maxFiles Maximum number of files allowed
 * @param {number} props.maxSize Maximum file size in bytes (default: 5MB)
 */
const ImageUpload = ({ 
  endpoint, 
  onSuccess, 
  onError, 
  multiple = false, 
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024 
}) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState([]);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Check file count
    if (multiple && selectedFiles.length > maxFiles) {
      setErrors([`You can only upload a maximum of ${maxFiles} files at once`]);
      return;
    }
    
    // Validate files
    const newErrors = [];
    const validFiles = selectedFiles.filter(file => {
      // Check file type
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        newErrors.push(`${file.name}: Invalid file type. Only JPEG and PNG are allowed`);
        return false;
      }
      
      // Check file size
      if (file.size > maxSize) {
        newErrors.push(`${file.name}: File size exceeds the limit of ${maxSize / (1024 * 1024)}MB`);
        return false;
      }
      
      return true;
    });
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      setErrors([]);
    }
    
    setFiles(validFiles);
    
    // Generate previews
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setPreview(newPreviews);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setErrors(['Please select files to upload']);
      return;
    }
    
    try {
      setUploading(true);
      setErrors([]);
      
      const formData = new FormData();
      
      if (multiple) {
        files.forEach((file, index) => {
          formData.append(`images[${index}]`, file);
        });
      } else {
        formData.append('images', files[0]);
      }
      
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        `${API_BASE_URL}${endpoint}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data.errors && response.data.errors.length > 0) {
        setErrors(response.data.errors);
      }
      
      if (onSuccess) {
        onSuccess(response.data);
      }
      
      // Reset the form
      setFiles([]);
      setPreview([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      
      let errorMessage = 'Upload failed. Please try again.';
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      
      setErrors([errorMessage]);
      
      if (onError) {
        onError(error);
      }
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    const newPreview = [...preview];
    
    // Release object URL to prevent memory leaks
    URL.revokeObjectURL(newPreview[index]);
    
    newFiles.splice(index, 1);
    newPreview.splice(index, 1);
    
    setFiles(newFiles);
    setPreview(newPreview);
  };

  return (
    <div className="mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Upload Images
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          multiple={multiple}
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-500 mt-1">
          Accepted formats: JPG, PNG. Max size: {maxSize / (1024 * 1024)}MB
          {multiple && ` (max ${maxFiles} files)`}
        </p>
      </div>

      {errors.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">
          <h3 className="font-medium">Errors:</h3>
          <ul className="list-disc pl-5">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {preview.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Preview:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {preview.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className={`px-4 py-2 rounded font-medium ${
          uploading || files.length === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default ImageUpload; 