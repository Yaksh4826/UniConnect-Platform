import React from 'react';

export const LostFoundPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-[#130745] mb-4">
            Lost & Found
          </h1>
          <p className="text-lg text-purple-600 font-medium">
            Report lost items or help others find what they're looking for.
          </p>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-600 text-center py-12">
            Lost & Found functionality coming soon. Connect with your campus community to find and return lost items.
          </p>
        </div>
      </div>
    </div>
  );
}
