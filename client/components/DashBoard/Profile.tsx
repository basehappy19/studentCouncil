import React from 'react';

const ProfileCard = ({ user }) => {
    const profileImgSrc = process.env.NEXT_PUBLIC_APP_USERS_PROFILE_PATH_SERVER || "";
    
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:1/2 flex-1">
            <div className="bg-gradient-to-r from-cyan-300 to-orange-200 p-4">
                <div className="flex justify-center">
                    <img
                        src={profileImgSrc + user.image}
                        alt={user.displayName}
                        className="h-48 w-48 object-cover rounded-full border-4 border-white shadow-md"
                    />
                </div>
            </div>
            <div className="p-4">
                <h2 className="text-2xl font-bold text-center text-gray-800">{user.displayName}</h2>
                <p className="text-center text-gray-600 mb-4">@{user.username}</p>
            </div>
            <div className="bg-gray-100 p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">ตำแหน่ง</h3>
                <div className="flex flex-wrap gap-2">
                    {user.role &&
                        user.role.map((role) => (
                            <span key={role.id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {role.name}
                            </span>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;