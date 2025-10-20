import React, { useState } from "react";

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [previewImage, setPreviewImage] = useState<string>("");
  
  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setPreviewImage(selectedFile ? URL.createObjectURL(selectedFile) : "");
   
    onImageSelect(selectedFile);
  };

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="file" accept="image/*" onChange={selectImage} />
          </label>
        </div>
      </div>

      {previewImage && (
        <div>
          <img className="preview" src={previewImage} alt="preview" />
        </div>
      )}
    </div>
  );
};

export { ImageUpload };