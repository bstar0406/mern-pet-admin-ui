import { useEffect, useState } from "react";
import axios from "axios";
import {baseURL} from "../../config"
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";

import AddModal from './editModal';
import ConfirmModal from './comfirmModal';
import Icon from "@mui/material/Icon";

function Tables() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const pagiNation = { variant: "contained", color: "primary" }
  const columns = [
    { Header: "PetType", accessor: "petType", align: "left" },
    { Header: "PetType Mom Called", accessor: "petTypeMomCalled", align: "center" },
    { Header: "PetType Dad Called", accessor: "petTypeDadCalled", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ]
 
  useEffect(() => {
    axios.get(`${baseURL}/api/petTypes/`).then(async (response) => {
      setData(response.data.entities)
      rowItems(response.data.entities)
    }
    )
  }, [])

  const rowItems =(temp)=>{
    const itemList = temp.map(item => {
      return {
        id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item._id}
          </MDTypography>
        ),
        petType: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.petType}
          </MDTypography>
        ),
        petTypeMomCalled: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.petTypeMomCalled}
          </MDTypography>
        ),
        petTypeDadCalled: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.petTypeDadCalled}
          </MDTypography>
        ),
        action: (
          <>
            <MDTypography onClick={() => editItem(item._id)} component="a" href="#" variant="caption" color="text" fontWeight="medium">
              <Icon fontSize="small">assignment</Icon>  
            </MDTypography>
            <MDTypography onClick={() => deleteComfirm(item._id)} component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <Icon fontSize="small">delete</Icon>
            </MDTypography>
          </>
        ),
      }
    })
    setRows(itemList)
  }
  const deleteComfirm = (id) => {
    setSelectedId(id)
    setIsConfirm(true)
  }
  const deleteItem = () => {
    axios.delete(`${baseURL}/api/petTypes/${selectedId}`).then(response => new Promise(resolve => {
      if (response.data.state) {
        let temp = data;
        temp = temp.filter(item => {
          return item._id !== selectedId
        });
        setData(temp);
        rowItems(temp);
        setIsConfirm(false)
      }
    }))
  }

  const handleClose = () => {
    setIsOpen(false);
    setIsConfirm(false);
  }

  const addItem = () => {
    setIsOpen(true);
    setIsAdd(true);
    setSelectedId("");
  }
  const editItem = (id) => {
    setIsOpen(true);
    setIsAdd(false);
    setSelectedId(id);
  }

  const addNewRow = (newRow) => {
    let temp = data;
    temp = [...temp, newRow]
    setData(temp);
    rowItems(temp);
  }

  const editSelectedItem = (item) => {
    const temp = data.map(obj => {
      if (obj._id === item.petTypeId) {
        return {
          ...obj,
          petType: item.petType,
          petTypeMomCalled: item.petTypeMomCalled,
          petTypeDadCalled: item.petTypeDadCalled
        }
      }
      return obj
    })
    setData(temp);
    rowItems(temp);
  }

  const searchFunction = (val) => {
    let temp = data;
    temp = temp.filter(item => {
      if(item.petType.includes(val) || 
      item.petTypeDadCalled.includes(val) || 
      item.petTypeMomCalled.includes(val))
      return item
    });
    rowItems(temp);
  }

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex" 
                justifyContent="space-between" 
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  PetTypes Table
                </MDTypography>
                <MDTypography onClick={() => addItem()} variant="h6" color="white">
                  Add Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {rows && <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  canSearch={true}
                  searchFunction={searchFunction}
                  entriesPerPage={true}
                  showTotalEntries={false}
                  pagination={pagiNation}
                  noEndBorder
                />}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <AddModal isAdd={isAdd} open={isOpen} handleClose={handleClose} addNewRow={addNewRow} editSelectedItem={editSelectedItem} id={selectedId} />
      <ConfirmModal open={isConfirm} deleteItem={deleteItem} handleClose={handleClose} />
    </DashboardLayout>

  );
}

export default Tables;
