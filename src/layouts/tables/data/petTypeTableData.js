import { useState, useEffect } from "react";
import axios from "axios";

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomUpdatedDate,
//   randomId,
// } from '@mui/x-data-grid-generator';

const initialRows = [

];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = 1;
    setRows((oldRows) => [...oldRows, { id, petType: '', petTypeMomCalled: '', petTypeDadCalled: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'petType' },
    }))
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function FullFeaturedCrudGrid() {

  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/petTypes/").then(response => {
      console.log(response.data.entities)
      const itemList = response.data.entities.map(item => {
        return {
          id: item._id,
          petType: item.petType,
          petTypeMomCalled: item.petTypeMomCalled,
          petTypeDadCalled: item.petTypeDadCalled,
        }
      })
      setRows(itemList)
    }
    )
  }, [])

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    console.log(GridRowModes.View)
    // new Promise(resolve => {
      
    //   const data = new FormData();
    //   data.append("petType", newData.petType);
    //   data.append("petTypeMomCalled", newData.petTypeMomCalled);
    //   data.append("petTypeDadCalled", newData.petTypeDadCalled);
    //   axios.post("http://localhost:5000/api/petTypes/").then(response => {
    //     console.log(response.data)


    //     if (response.data.message.statusCode === 200) {
    //       console.log("success")
    //       setState({ data });
    //       const data = response.data.result
    //       console.log(data)
    //       resolve();
    //       setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    //       // setMessage("Thank You For Add");
    //       // setVariant("success");
    //       // setOpen(true)
    //     } else {
    //       console.log("error")
    //       resolve();
    //       // setMessage("You can not add album");
    //       // setVariant("error");
    //       // setOpen(true);
    //     }
    //   }).catch(err => {
    //     resolve();
    //     // setOpen(true);
    //     // setMessage("You can not Add");
    //     // setVariant("error");
    //   });
    // })
    
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    { field: 'petType', headerName: 'PetType', width: 180, editable: true },
    { field: 'petTypeMomCalled', headerName: 'PetTypeMomCalled', width: 180, editable: true },
    { field: 'petTypeDadCalled', headerName: 'PetTypeDadCalled', width: 180, editable: true },
    // { field: 'age', headerName: 'Age', type: 'number', editable: true },
    // {
    //   field: 'dateCreated',
    //   headerName: 'Date Created',
    //   type: 'date',
    //   width: 180,
    //   editable: true,
    // },
    // {
    //   field: 'lastLogin',
    //   headerName: 'Last Login',
    //   type: 'dateTime',
    //   width: 220,
    //   editable: true,
    // },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGridPro
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
