import { useEffect, useState, forwardRef, useRef } from "react";
import {baseURL} from "../../config"
import axios from "axios";
import Modal from '@mui/material/Modal';
import Card from "@mui/material/Card";
import http from "../../config";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import DefaultImage from "../../assets/images/default.png";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
};


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={4} ref={ref} variant="filled" {...props} />;
});

export default function BasicModal(props) {
  const [openAlert, setOpenAlert] = useState(false);
  const [open, setOpen] = useState(false);

  const [breederName, setBreederName] = useState('');
  const [breederNameFlag, setBreederNameFlag] = useState(false);
  const [petTypeId, setPetTypeId] = useState('');
  const [petTypeIdFlag, setPetTypeIdFlag] = useState(false);
  const [breederGender, setBreederGender] = useState('female');
  const [breederDOB, setBreederDOB] = useState('');
  const [breederDOBFlag, setBreederDOBFlag] = useState(false);
  const [breederDesc, setBreederDesc] = useState('');
  const [breederDescFlag, setBreederDescFlag] = useState(false);
  const [breederPhoto, setBreederPhoto] = useState(null);
  const [breederPhotoFlag, setBreederPhotoFlag] = useState(false);

  const [severity, setSeverity] = useState("success")
  const [message, setMessage] = useState("")
  const [petType, setPetType] = useState([])
  const [petTypeName, setPetTypeName] = useState("")
  const [file, setFile] = useState()

  const imageFileRef = useRef();
  const handleClose = () => {
    props.handleClose();
  }

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    axios.get(`${baseURL}/api/petTypes/`).then(response => {
      if (response.data.success === true) {
        setPetType(response.data.entities);
      }
    })

    if (props.open === true && props.isAdd === false && props.id !== '') {
      axios.get(`${baseURL}/api/breeders/${props.id}`).then(response => {
        if (response.data.success === true) {
          setBreederName(response.data.breeder.breederName);
          setPetTypeId(response.data.breeder.petTypeId._id);
          setPetTypeName(response.data.breeder.petTypeId._id);
          setBreederGender(response.data.breeder.breederGender);
          setBreederDOB(response.data.breeder.breederDOB);
          setBreederDesc(response.data.breeder.breederDesc);
          setBreederPhoto(`${baseURL}/`+response.data.breeder.breederPhoto);
        }
      })
    }
    else {
      setBreederName('');
      setPetTypeId('');
      setPetTypeName('');
      setBreederDOB('');
      setBreederDesc('');
      setBreederPhoto('');
    }
    setOpen(props.open)
  }, [props.open])


  const saveData = () => {
    let flag = true;
    if (breederName === '') {
      flag = false;
      setBreederNameFlag(true)
    }

    if (petTypeId === '') {
      flag = false;
      setPetTypeIdFlag(true)
    }

    if (breederDOB === '') {
      flag = false;
      setBreederDOBFlag(true)
    }
    if (breederDesc === '') {
      flag = false;
      setBreederDescFlag(true)
    }
    if (breederPhoto === '') {
      flag = false;
      setBreederPhotoFlag(true)
    }
    if (!flag) {
      return;
    }
    if (props.isAdd === false && props.id !== '') {
      new Promise(resolve => {

        const formData = new FormData();
        formData.append("breederId", props.id);
        formData.append("breederName",breederName);
        formData.append("petTypeId",petTypeId);
        formData.append("breederGender", breederGender);
        formData.append("breederDOB", breederDOB);
        formData.append("breederDesc", breederDesc);
        if(file)
          formData.append("file", file);
        axios.put(`${baseURL}/api/breeders/`, formData).then(response => {
          if (response.data.success === true) {
            resolve();
            props.editSelectedItem(response.data.breeder);
            handleClose()
            setOpenAlert(true)
            setMessage("Successfully updated!")
            setSeverity("success")
          }
        }).catch(err => {
          console.log(err)
          resolve();
          setOpenAlert(true)
          setMessage("Operation failed!")
          setSeverity("error")
        })
      })
    } else {
      new Promise(resolve => {

        const formData = new FormData();
        formData.append("breederName",breederName);
        formData.append("petTypeId",petTypeId);
        formData.append("breederGender", breederGender);
        formData.append("breederDOB", breederDOB);
        formData.append("breederDesc", breederDesc);
        formData.append("file", file);
        axios.post(`${baseURL}/api/breeders/`, formData).then(response => {
          if (response.data.success === true) {
            resolve();
            props.addNewRow(response.data.breeder);
            handleClose()
            setOpenAlert(true)
            setMessage("Successfully Saved!")
            setSeverity("success")
          }
        }).catch(err => {

          resolve();
          setOpenAlert(true)
          setMessage("Operation failed!")
          setSeverity("error")
        })
      })
    }


  }
  const onChangeBreederName = (event) => {
    setBreederNameFlag(false)
    setBreederName(event.target.value)
    if (event.target.value === '') {
      console.log(breederNameFlag+"--"+breederName)
      setBreederNameFlag(true)
    }
  }

  const onChangeBreederDOB = (value) => {
    setBreederDOBFlag(false)
    setBreederDOB(value)
    if (breederDOB === '') {
      setBreederDOBFlag(true)
    }
  }
  const onChangeBreederDesc = (event) => {
    setBreederDescFlag(false)
    setBreederDesc(event.target.value)
    if (breederDesc === '') {
      setBreederDescFlag(true)
    }
  }
  const onChangeBreederPhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      let reader = new FileReader();
      reader.onload = (e) => {
        setBreederPhoto(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  const onChangePetType = (event) => {
    setPetTypeIdFlag(false)
    setPetTypeName(event.target.value)
    setPetTypeId(event.target.value)
    if (!event.target.value) {
      setPetTypeIdFlag(true)
    }
  }

  const radioHandleChange = (event) => {
    setBreederGender(event.target.value);
  };
  const imageClick =()=>{
    imageFileRef.current.click();
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              New Breeder
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <TextField
                  error={breederNameFlag}
                  id="outlined-multiline-static"
                  label="BreederName"
                  value={breederName}
                  onChange={onChangeBreederName}
                  helperText=""
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">PetType</InputLabel>
                  <Select
                    error={petTypeIdFlag}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={petTypeName}
                    sx={{ height: "3rem" }}
                    label="Age"
                    onChange={onChangePetType}
                  >
                    {petType.map((item, index) => (
                      <MenuItem key={index} value={item._id}>{item.petType}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={2} row>
                <FormControl ml={2}>
                  {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={breederGender}
                    onChange={radioHandleChange}
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                  </RadioGroup>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns} ml={2}> 
                  <DatePicker
                    error={false}
                    label="BreederDOB"
                    value={breederDOB}
                    onChange={onChangeBreederDOB}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  error={breederDescFlag}
                  id="outlined-multiline-static"
                  label="BreederDesc"
                  multiline
                  rows={4}
                  value={breederDesc}
                  onChange={onChangeBreederDesc}
                  helperText=""
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                 <input type="file" onChange={onChangeBreederPhoto} hidden ref={imageFileRef}/>
                 <img src={breederPhoto?breederPhoto:DefaultImage} alt="image" onClick={imageClick} width={100} height={100} />
              </MDBox>
              <MDBox mt={2} mb={1}>
                <MDButton onClick={saveData} variant="gradient" color="info" fullWidth>
                  Save
                </MDButton>
              </MDBox>
              <MDBox mt={2} mb={1}>
                <MDButton onClick={handleClose} variant="gradient" color="white" fullWidth>
                  Cancel
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </Modal>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
