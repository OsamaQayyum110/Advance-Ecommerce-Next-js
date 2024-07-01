import React from "react";
import PageHeader from "../_components/PageHeader";
import UserTable from "./_components/UserTable";

const User = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader>Users</PageHeader>
      </div>
      <UserTable />
    </>
  );
};

export default User;
