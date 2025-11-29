import React from 'react';

export const MarketplacePage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-[#130745] mb-4">
            Collaborate
          </h1>
          <p className="text-lg text-purple-600 font-medium">
            Connect with fellow students, share resources, and collaborate on projects.
          </p>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-600 text-center py-12">
            Collaboration marketplace coming soon. Find study groups, project partners, and more.
          </p>
        </div>
      </div>
    </div>
  );
}
