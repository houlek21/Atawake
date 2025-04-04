import React, { useState } from 'react';

const ImageUploader = ({ productId, token }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  
  // Handle file selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!acceptedTypes.includes(file.type)) {
      setError('Only JPEG, PNG, GIF, and WebP images are allowed');
      return;
    }
    
    // Validate file size (3 MB max)
    const maxSizeBytes = 3 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError('File is too large. Maximum size is 5MB');
      return;
    }
    
    setError(null);
    setIsUploading(true);
    
    try {
      // Upload file to server
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch(`http://localhost:5000/api/products/${productId}/images`, {
        method: 'POST',
        headers: {
          'Authorization': token
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Upload successful:', data);
      
      // Show image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        // Create image preview element
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.objectFit = 'cover';
        
        // Find the output element where this input is located
        const fileInput = document.getElementById('file-input');
        const outputElement = fileInput.closest('.show');
        if (outputElement) {
          // Replace the input with the image
          outputElement.innerHTML = '';
          outputElement.appendChild(imgElement);
          
          // Create a new upload element
          createNewUploadElement();
        }
      };
      reader.readAsDataURL(file);
      
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  // Create a new upload element after successful upload
  const createNewUploadElement = () => {
    const uploadGrid = document.getElementById('imgrid');
    if (!uploadGrid) return;
    
    // Get the number of existing uploads
    const childCount = uploadGrid.childElementCount;
    
    // Limit to 5 images
    if (childCount >= 5) return;
    
    // Create the new upload element structure
    const element1 = document.createElement("div");
    element1.className = "upload2";
    
    const element2 = document.createElement("div");
    element2.className = "upload";
    
    const element3 = document.createElement("output");
    element3.className = "show";
    element3.id = `list${childCount}`;
    
    const element4 = document.createElement("input");
    element4.className = "fileim";
    element4.id = "file-input";
    element4.type = "file";
    
    // Add event listener to the new input
    element4.addEventListener('change', handleFileChange);
    
    // Assemble the elements
    element3.appendChild(element4);
    element2.appendChild(element3);
    element1.appendChild(element2);
    
    // Add to the grid
    uploadGrid.appendChild(element1);
  };
  
  return (
    <div className="upload2">
      <div className="upload">
        <output className="show" id="list0">
          <input 
            onChange={handleFileChange} 
            className="fileim" 
            id="file-input" 
            type="file"
            disabled={isUploading}
          />
          {isUploading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px'
            }}>
              Uploading...
            </div>
          )}
        </output>
      </div>
      {error && (
        <div style={{
          color: '#93151f',
          fontSize: '12px',
          marginTop: '5px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;