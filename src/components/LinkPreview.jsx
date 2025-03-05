import React from 'react'

const LinkPreview = ({ previewData }) => {
    if (!previewData) return null;
  
    return (
      <div className="mt-2 border border-gray-300 rounded-lg p-3 max-w-xs bg-white shadow-md">
        {previewData.image && (
          <img src={previewData.image} alt="Preview" className="w-full h-auto object-cover rounded-lg" />
        )}
        <h4 className="mt-2 text-sm font-semibold text-gray-800">{previewData.title}</h4>
        <p className="text-xs text-gray-600 line-clamp-2">{previewData.description}</p>
        <a
          href={previewData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-xs font-bold mt-2 inline-block"
        >
          Visit Site
        </a>
      </div>
    );
  };

export default LinkPreview