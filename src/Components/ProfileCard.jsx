import React from "react";

const ProfileCard = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Photo placeholder */}
      <div className="bg-gray-500 rounded-lg w-32 h-32 flex items-center justify-center text-white">
        photo
      </div>

      {/* Name section */}
      <div className="bg-gray-500 rounded-lg w-full sm:w-80 h-32 flex items-center justify-center text-white">
        Name
      </div>
    </div>
  );
};

export default ProfileCard;
