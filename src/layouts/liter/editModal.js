import { useEffect, useState, forwardRef } from "react";
import {baseURL} from "../../config"
import axios from "axios";
import Modal from '@mui/material/Modal';
import Card from "@mui/material/Card";
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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

  const [literDad, setLiterDad] = useState(null);
  const [literDadFlag, setLiterDadFlag] = useState(false);
  const [literMom, setLiterMom] = useState(null);
  const [literMomFlag, setLiterMomFlag] = useState(false);
  const [literDOB, setLiterDOB] = useState(null);
  const [literDOBFlag, setLiterDOBFlag] = useState(false);
  const [breeders, setBreeders] = useState([]);

  const [severity, setSeverity] = useState("success")
  const [message, setMessage] = useState("")
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

    axios.get(`${baseURL}/api/breeders/`).then(response => {
      if (response.data.success === true) {
        setBreeders(response.data.entities);
      }
    })

    if (props.open === true && props.isAdd === false && props.id !== '') {
      axios.get(`${baseURL}/api/liters/${props.id}`).then(response => {
        if (response.data.success === true) {
          setLiterDOB(response.data.liter.literDOB);
          setLiterDad(response.data.liter.literDad._id);
          setLiterMom(response.data.liter.literMom._id);
        }
      })
    }
    else {
      setLiterDOB('');
      setLiterDad('');
      setLiterMom('');
    }
    setOpen(props.open)
  }, [props.open])


  const saveData = () => {
    let flag = true;
    if (literDad === '') {
      flag = false;
      setLiterDadFlag(true)
    }
    if (literMom === '') {
      flag = false;
      setLiterMomFlag(true)
    }
    if (literDOB === '') {
      flag = false;
      setLiterDOBFlag(true)
    }
    if (!flag) {
      return;
    }
    if (props.isAdd === false && props.id !== '') {
      new Promise(resolve => {
        const item = {
          literId: props.id,
          literDad: literDad,
          literMom: literMom,
          literDOB: literDOB,
        }
        axios.put(`${baseURL}/api/liters/`, item).then(response => {
          if (response.data.success === true) {
            resolve();
            props.editSelectedItem(response.data.liter);
            handleClose()
            setOpenAlert(true)
            setMessage("Successfully updated!")
            setSeverity("success")
          }
        }).catch(err => {
          resolve();
          setOpenAlert(true)
          setMessage("Operation failed!")
          setSeverity("error")
        })
      })
    } else {
      new Promise(resolve => {
        const item = {
          literDad: literDad,
          literMom: literMom,
          literDOB: literDOB,
        }
        axios.post(`${baseURL}/api/liters/`, item).then(response => {
          if (response.data.success === true) {
            resolve();
            props.addNewRow(response.data.liter);
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
  const onChangeLiterDad = (event) => {
    setLiterDadFlag(false)
    setLiterDad(event.target.value)
    if (event.target.value === '') {
      setLiterDadFlag(true)
    }
  }
  const onChangeLiterMom = (event) => {
    setLiterMomFlag(false)
    setLiterMom(event.target.value)
    if (event.target.value === '' ) {
      setLiterMomFlag(true)
    }
  }
  const onChangeLiterDOB = (value) => {
    setLiterDOBFlag(false)
    setLiterDOB(value)
    if (value === '')
      setLiterDOBFlag(true)
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
              New Liter
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">LiterDad</InputLabel>
                  <Select
                    error={literDadFlag}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={literDad}
                    sx={{ height: "3rem" }}
                    label="LiterDad"
                    onChange={onChangeLiterDad}
                  >
                    {breeders.map((item, index) => (
                      <MenuItem key={index} value={item._id}>{item.breederName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">LiterMom</InputLabel>
                  <Select
                    error={literMomFlag}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={literMom}
                    sx={{ height: "3rem" }}
                    label="Age"
                    onChange={onChangeLiterMom}
                  >
                    {breeders.map((item, index) => (
                      <MenuItem key={index} value={item._id}>{item.breederName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    error={literDOBFlag}
                    label="LiterDOB"
                    value={literDOB}
                    onChange={onChangeLiterDOB}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
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
