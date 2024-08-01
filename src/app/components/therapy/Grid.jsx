import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';




const headerCellStyle = {
    backgroundColor: 'lightblue', // Custom header row color
  };

  const tableStyles = {
    border: 'none',

  };
  const cellStyles = {
    borderBottom: 'none',
  };
  const columnHeaderStyles = {
    borderRight: 'none',
  };

export default function DataGridDemo({ rows, columns }) {
    
  return (
    <Box sx={{ height: 400, width: '100%' }}>
       
      <DataGrid
       style={tableStyles}
       classes={{
         cell: 'custom-cell',
         columnHeader: 'custom-column-header',
       }}
        rows={rows}
        columns={columns.map((column) => ({
            ...column,
            headerClassName: 'custom-header',
            headerAlign: 'center', // Optional: Center align headings
            headerClassName:"text-lg font-bold bg-[#497C7C] border border-r-black text-white",
            headerStyle: headerCellStyle,
            align: "center border border-r-black"
          }))}
          // Other props...
        
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        hideFooterPagination={true}
      />
    </Box>
  );
}