import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { properties } from '../services/api';
import ImageUpload from '../components/common/ImageUpload';
import Layout from '../components/layout/Layout';

const PropertyImageUpload = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const data = await properties.getById(id);
        setProperty(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Failed to load property details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  const handleUploadSuccess = (data) => {
    console.log('Upload success:', data);
    setUploadSuccess(true);
    
    // Refresh property data to show new images
    setTimeout(async () => {
      try {
        const updatedData = await properties.getById(id);
        setProperty(updatedData);
      } catch (err) {
        console.error('Error refreshing property:', err);
      }
    }, 1000);
  };

  const handleUploadError = (error) => {
    console.error('Upload error:', error);
    setError('Failed to upload images. Please try again.');
  };

  const handleBackToProperty = () => {
    navigate(`/properties/${id}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading property details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto p-6">
          <div className="bg-red-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="container mx-auto p-6">
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-yellow-700 mb-2">Property Not Found</h2>
            <p className="text-yellow-600">The property you're looking for doesn't exist or you don't have permission to view it.</p>
            <button
              onClick={() => navigate('/properties')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View All Properties
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Upload Images for {property.title}
            </h1>
            <button
              onClick={handleBackToProperty}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Back to Property
            </button>
          </div>

          {uploadSuccess && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded">
              <p className="font-medium">Images uploaded successfully!</p>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Current Images</h2>
            {property.images && property.images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {property.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.image_url}
                      alt={image.caption || `Property image ${index + 1}`}
                      className="w-full h-40 object-cover rounded"
                    />
                    {image.caption && (
                      <p className="mt-1 text-sm text-gray-600 truncate">{image.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No images uploaded yet.</p>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">Upload New Images</h2>
            <ImageUpload
              endpoint={`/properties/images/${id}`}
              onSuccess={handleUploadSuccess}
              onError={handleUploadError}
              multiple={true}
              maxFiles={5}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyImageUpload; 