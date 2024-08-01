// pages/DetailsPage.js
import React from "react";

const DetailsPage = ({ rowData }) => {
  // Use rowData to display details on this page
  return (
    <div>
      <h2>Details Page</h2>
      <p>{`Company Name: ${rowData.company_name}`}</p>
      <p>{`Date Created: ${rowData.firstName}`}</p>
      {/* Add other details as needed */}
    </div>
  );
};

export default DetailsPage;
