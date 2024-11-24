import React, { useEffect, useState } from "react";
import { GET_PROFILE } from "../Config/Service";
import { toast } from "sonner";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const profileData = await GET_PROFILE();
      setProfile(profileData);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-blue-500 text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h1 className="text-2xl font-bold text-blue-500 mb-4">Profile Details</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-600">ID:</span>
            <span className="text-gray-800">{profile?.id}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-600">Name:</span>
            <span className="text-gray-800">{profile?.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-600">Email:</span>
            <span className="text-gray-800">{profile?.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-600">Created At:</span>
            <span className="text-gray-800">
              {new Date(profile?.created_at).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
