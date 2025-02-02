import React from 'react';

const Dashboard = ({ userType }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">
        Welcome to {userType === "developer" ? "Developer" : "Company"} Dashboard
      </h1>
      {userType === "developer" ? (
        <p className="text-lg text-gray-600 mt-4">Manage your projects, find jobs, and collaborate!</p>
      ) : (
        <p className="text-lg text-gray-600 mt-4">Post jobs, manage teams, and find skilled developers!</p>
      )}
    </div>
  );
};

export default Dashboard;
