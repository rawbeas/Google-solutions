import React from "react";

const ProfileCard = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
      {/* Photo placeholder - 2/6 width */}
      <div className="bg-gray-500 rounded-lg w-full sm:w-2/6 h-32 flex items-center justify-center text-white">
        photo
      </div>

      {/* Name section - 4/6 width */}
      <div className="bg-gray-500 rounded-lg w-full sm:w-4/6 h-32 flex items-center justify-center text-white">
        Name
      </div>
    </div>
  );
};

export default ProfileCard;
