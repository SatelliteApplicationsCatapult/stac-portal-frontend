import MaterialReactTable from "material-react-table";
import { Button, Icon } from "@mui/material";
import "./Table.scss";
import MDButton from "components/MDButton";

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
        },
      }}
      /**
       * Custom Table Actions
       */
      renderTopToolbarCustomActions={() => (
        <div className="table-toolbar-buttons">
          {toolbarButtons &&
            toolbarButtons.map((button) => (
              <MDButton
                key={button.label}
                buttonType={'update'}
                color={button.color}
                className="table-toolbar-button"
                onClick={button.onCustomClick}
              >
                <Icon fontSize="small" className="table-icon">
                  {button.icon}
                </Icon>{" "}
                {button.label}
              </MDButton>
            ))}
        </div>
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
          backgroundColor: "#252527",
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
          backgroundColor: "transparent",
        },
        className: "table-toolbar",
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
