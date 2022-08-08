import { useEffect, useState } from "react";
import {baseURL} from "../../config"
import axios from "axios";
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
    { Header: "Name", accessor: "breederName", align: "left" },
    { Header: "PetType", accessor: "petType", align: "center" },
    { Header: "Gender", accessor: "breederGender", align: "center" },
    { Header: "DOB", accessor: "breederDOB", align: "center" },
    { Header: "Desc", accessor: "breederDesc", align: "center" },
    { Header: "Photo", accessor: "breederPhoto", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ]
 
  useEffect(() => {
    axios.get(`${baseURL}/api/breeders/`).then(async (response) => {
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
        breederName: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.breederName}
          </MDTypography>
        ),
        petType: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.petTypeId.petType}
          </MDTypography>
        ),
        breederGender: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.breederGender}
          </MDTypography>
        ),
        breederDOB: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.breederDOB}
          </MDTypography>
        ),
        breederDesc: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.breederDesc}
          </MDTypography>
        ),
        breederPhoto: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <img src={`${baseURL}/${item.breederPhoto}`} alt="image1" width={50} height={50} />
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
    console.log(id);
    setSelectedId(id)
    setIsConfirm(true)
  }
  const deleteItem = () => {
    axios.delete(`${baseURL}/api/breeders/${selectedId}`).then(response => new Promise(resolve => {
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
    console.log(item)
    const temp = data.map(obj => {
      if (obj._id === item.breederId) {
        return {
          ...obj,
          breederName: item.breederName,
          petTypeId: item.petTypeId,
          breederGender: item.breederGender,
          breederDOB: item.breederDOB,
          breederDesc: item.breederDesc,
          breederPhoto: item.breederPhoto
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
      if(item.breederName.includes(val) || 
      item.petTypeId.petType.includes(val) ||
      item.breederGender.includes(val) ||
      item.breederDOB.includes(val) ||
      item.breederDesc.includes(val) ||
      item.breederPhoto.includes(val) )
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
                  PetDescription Table
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
                {/* <FullFeaturedCrudGrid/> */}
              </MDBox>
            </Card>
          </Grid>
          {/* <Grid item xs={12}>
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
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
      <AddModal isAdd={isAdd} open={isOpen} handleClose={handleClose} addNewRow={addNewRow} editSelectedItem={editSelectedItem} id={selectedId} />
      <ConfirmModal open={isConfirm} deleteItem={deleteItem} handleClose={handleClose} />
    </DashboardLayout>

  );
}

export default Tables;
