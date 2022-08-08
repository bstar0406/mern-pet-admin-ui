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
import DefaultImage from "../../assets/images/default.png";
function Tables() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const pagiNation = { variant: "contained", color: "primary" }
  const columns = [
    { Header: "DOB", accessor: "babyDOB", align: "left" },
    { Header: "Dad-PetType", accessor: "dadPetType", align: "center" },
    { Header: "Mom-PetType", accessor: "momPetType", align: "center" },
    { Header: "BabyName", accessor: "babyName", align: "center" },
    { Header: "LiterDOB", accessor: "literDOB", align: "center" },
    { Header: "BabyGender", accessor: "babyGender", align: "center" },
    { Header: "Desc", accessor: "petDescription", align: "center" },
    { Header: "Pic1", accessor: "babyPic1", align: "center" },
    { Header: "Pic2", accessor: "babyPic2", align: "center" },
    { Header: "Pic3", accessor: "babyPic3", align: "center" },
    { Header: "Pic4", accessor: "babyPic4", align: "center" },
    { Header: "Pic5", accessor: "babyPic5", align: "center" },
    { Header: "Pic6", accessor: "babyPic6", align: "center" },
    { Header: "Price", accessor: "price", align: "center" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ]
 
  useEffect(() => {
    axios.get(`${baseURL}/api/babies/`).then(async (response) => {
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
        babyDOB: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.literId.literDOB}
          </MDTypography>
        ),
        dadPetType: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.literId.literDad.petTypeId.petType}
          </MDTypography>
        ),
        momPetType: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
             {item.literId.literMom.petTypeId.petType}
          </MDTypography>
        ),
        babyName: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.babyName}
          </MDTypography>
        ),
        literDOB: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.literDOB}
          </MDTypography>
        ),
        babyGender: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
             {item.babyGender}
          </MDTypography>
        ),
        petDescription: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
             {item.petDescription}
          </MDTypography>
        ),
        babyPic1: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <img src={item.babyPic1 === '' ? DefaultImage : `${baseURL}/${item.babyPic1}`} alt="image1" width={50} height={50} />
          </MDTypography>
        ),
        babyPic2: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <img src={item.babyPic2 === '' ? DefaultImage : `${baseURL}/${item.babyPic2}`} alt="image1" width={50} height={50} />
          </MDTypography>
        ),
        babyPic3: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <img src={item.babyPic3 === '' ? DefaultImage : `${baseURL}/${item.babyPic3}`} alt="image1" width={50} height={50} />
          </MDTypography>
        ),
        babyPic4: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <img src={item.babyPic4 === '' ? DefaultImage : `${baseURL}/${item.babyPic4}`} alt="image1" width={50} height={50} />
          </MDTypography>
        ),
        babyPic5: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <img src={item.babyPic5 === '' ? DefaultImage : `${baseURL}/${item.babyPic5}`} alt="image1" width={50} height={50} />
          </MDTypography>
        ),
        babyPic6: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <img src={item.babyPic6 === '' ? DefaultImage : `${baseURL}/${item.babyPic6}`} alt="image1" width={50} height={50} />
          </MDTypography>
        ),
        price: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.price}
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.status}
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
    axios.delete(`${baseURL}/api/babies/${selectedId}`).then(response => new Promise(resolve => {
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
          literId: item.literId,
          babyName: item.babyName,
          literDOB: item.literDOB,
          babyGender: item.babyGender,
          perDescription: item.perDescription,
          babyPic1: item.babyPic1,
          babyPic2: item.babyPic2,
          babyPic3: item.babyPic3,
          babyPic4: item.babyPic4,
          babyPic5: item.babyPic5,
          babyPic6: item.babyPic6,
          babyPrice: item.babyPrice,
          babyStatus: item.babyStatus,
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
      if(item.literId.literDad.petTypeId.petType.includes(val) || 
      item.literId.literMom.petTypeId.petType.includes(val) ||
      item.literId.literDOB.includes(val) ||
      item.babyName.includes(val) ||
      item.babyGender.includes(val) ||
      item.petDescriptionId.petDescription.includes(val) ||
      item.babyStatus.includes(val) )
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
                  Babies Table
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
