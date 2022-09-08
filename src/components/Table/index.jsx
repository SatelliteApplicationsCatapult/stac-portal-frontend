import MaterialReactTable from "material-react-table";
import { Button, Icon } from "@mui/material";

const Table = ({
  columns,
  data,
  columnOrder,
  toolbarButtons,
  rowClickAction,
}) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      initialState={{
        columnOrder: columnOrder,
        density: "compact",
      }}
      /**
       * Custom Table Actions
       */
      renderTopToolbarCustomActions={() => (
        <>
          {toolbarButtons.map((button) => (
            <Button
              color={button.color}
              className="updater__custom-button"
              onClick={() => button.modalOpen(true)}
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
          backgroundColor: "white",
        },
      })}
      /**
       * Custom Table Styling
       */
      muiTopToolbarProps={{
        sx: {
          padding: 0,
          margin: 0,
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
        },
      }}
    />
  );
};

export default Table;
