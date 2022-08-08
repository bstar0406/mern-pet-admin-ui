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
    { Header: "BabyName", accessor: "babyName", align: "left" },
    { Header: "LiterDOB", accessor: "literDOB", align: "center" },
    { Header: "BabyStatus", accessor: "babyStatus", align: "center" },
    { Header: "Description", accessor: "description", align: "center" },
    { Header: "BabyPic", accessor: "babyPic", align: "center" },
    { Header: "Date", accessor: "date", align: "center" },
    { Header: "FirstName", accessor: "firstName", align: "center" },
    { Header: "LastName", accessor: "lastName", align: "center" },
    { Header: "Email", accessor: "email", align: "center" },
    { Header: "Phone", accessor: "phone", align: "center" },
    { Header: "Location", accessor: "location", align: "center" },
    { Header: "DomainName", accessor: "domainName", align: "center" },
    { Header: "PaymentStatus", accessor: "paymentStatus", align: "center" },
    { Header: "City", accessor: "city", align: "center" },
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
        babyName: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.babyId.babyName}
          </MDTypography>
        ),
        literDOB: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.babyId.literDOB}
          </MDTypography>
        ),
        babyStatus: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.babyId.babyStatus}
          </MDTypography>
        ),
        description: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.babyId.petDescriptionId.petDescription}
          </MDTypography>
        ),
        babyPic: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <img src={`${baseURL}/${item.babyId.babyPic}`} alt="image1" width={50} height={50} />
          </MDTypography>
        ),
        date: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.reservationDate}
          </MDTypography>
        ),
        firstName: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.reservationFirstName}
          </MDTypography>
        ),
        lastName: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.reservationLastName}
          </MDTypography>
        ),
        email: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.reservationEmail}
          </MDTypography>
        ),
        phone: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.reservationPhone}
          </MDTypography>
        ),
        location: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.reservationLocation}
          </MDTypography>
        ),
        domainName: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.domainId.domainName}
          </MDTypography>
        ),
        paymentStatus: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.reservationPaymentStatus}
          </MDTypography>
        ),
        city: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.city}
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
    axios.delete(`${baseURL}/api/reservations/${selectedId}`).then(response => new Promise(resolve => {
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
      if (obj._id === item.breederId) {
        return {
          ...obj,
          babyId: item.babyId,
          reservationDate: item.reservationDate,
          reservationFirstName: item.reservationFirstName,
          reservationLastName: item.reservationLastName,
          reservationEmail: item.reservationEmail,
          reservationPhone: item.reservationPhone,
          reservationLocation: item.reservationLocation,
          domainId: item.domainId,
          reservationPaymentStatus: item.reservationPaymentStatus,
          city: item.city,
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
      if(item.babyId.babyName.includes(val) || 
      item.babyId.literDOB.includes(val) || 
      item.babyId.babyStatus.includes(val) || 
      item.babyId.petDescriptionId.petDescription.includes(val) || 
      item.reservationDate.includes(val) ||
      item.reservationFirstName.includes(val) ||
      item.reservationLastName.includes(val) ||
      item.reservationEmail.includes(val) ||
      item.reservationPhone.includes(val) ||
      item.reservationLocation.includes(val) ||
      item.domainId.domainName.includes(val) ||
      item.reservationPaymentStatus.includes(val) ||
      item.city.includes(val) )
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
                  Reservation Table
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
