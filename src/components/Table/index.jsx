import MaterialReactTable from "material-react-table";
import { Button, Icon } from "@mui/material";
import "./Table.scss";

const Table = ({
  columns,
  data,
  columnOrder,
  toolbarButtons,
  rowClickAction,
  rowsPerPage,
}) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}

      initialState={{
        columnOrder: columnOrder,
        density: "compact",
        pagination: {
          pageSize: rowsPerPage,
        }
      }}
      /**
       * Custom Table Actions
       */
      renderTopToolbarCustomActions={() => (
        <>
          {toolbarButtons &&
            toolbarButtons.map((button) => (
              <Button
                color={button.color}
                className="MuiTableHead-custom-button"
                onClick={button.onCustomClick}
                variant="contained"
              >
                <Icon fontSize="small">{button.icon}</Icon>
                {button.label}
              </Button>
            ))}
        </>
      )}
      muiTableBodyRowProps={({ row, table }) => ({
        onClick: () => rowClickAction(row, table),
        sx: {
          cursor: "pointer",
          backgroundColor: "transparent",
        },
      })}
      /**
       * Custom Table Styling
       */
      muiTopToolbarProps={{
        sx: {
          padding: 0,
          margin: 0,
          backgroundColor: "transparent",
        },
      }}
      muiTableHeadRowProps={{
        sx: {
          backgroundColor: "#1A73E8",
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          color: "white!important",
          alignItems: "center",
        },
        className: "muiTableHeadCell",
      }}
      muiTableContainerProps={{
        sx: {
          padding: 0,
          margin: 0,
        },
      }}
      muiTablePaperProps={{
        sx: {
          boxShadow: "none",
        },
      }}
      muiBottomToolbarProps={{
        sx: {
          boxShadow: "none",
          backgroundColor: "transparent",
        },
      }}
    />
  );
};

export default Table;
