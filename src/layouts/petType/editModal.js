import { useEffect, useState, forwardRef } from "react";
import {baseURL} from "../../config";
import axios from "axios";
import Modal from '@mui/material/Modal';
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


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
  const [petType, setPetType] = useState('');
  const [petTypeFlag, setPetTypeFlag] = useState(false);
  const [petMomCalled, setPetMomCalled] = useState('');
  const [petMomCalledFlag, setPetMomCalledFlag] = useState(false);
  const [petDadCalled, setPetDadCalled] = useState('');
  const [petDadCalledFlag, setPetDadCalledFlag] = useState(false);
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

    if (props.open === true && props.isAdd === false && props.id !== '') {
      axios.get(`${baseURL}/api/petTypes/${props.id}`).then(response => {
        if (response.data.success === true) {
          setPetType(response.data.petType.petType);
          setPetMomCalled(response.data.petType.petTypeMomCalled);
          setPetDadCalled(response.data.petType.petTypeDadCalled);
        }
      })
    }
    else {
      setPetType('');
      setPetMomCalled('');
      setPetDadCalled('');
    }
    setOpen(props.open)
  }, [props.open])


  const saveData = () => {
    let flag = true;
    if(petType === ''){
      flag = false;
      setPetTypeFlag(true)
    }
    if(petDadCalled === ''){
      flag = false;
      setPetDadCalledFlag(true)
    }
    if(petMomCalled === ''){
      flag = false;
      setPetMomCalledFlag(true)
    }
    if(!flag){
      return;
    }
    if (props.isAdd === false && props.id !== '') {
      new Promise(resolve => {
        const item = {
          petTypeId: props.id,
          petType: petType,
          petTypeMomCalled: petMomCalled,
          petTypeDadCalled: petDadCalled,
        }
        axios.put(`${baseURL}/api/petTypes/`, item).then(response => {
          if (response.data.success === true) {
            resolve();
            props.editSelectedItem(item);
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
          petType: petType,
          petTypeMomCalled: petMomCalled,
          petTypeDadCalled: petDadCalled,
        }
        axios.post(`${baseURL}/api/petTypes/`, item).then(response => {
          if (response.data.success === true) {
            resolve();
            props.addNewRow(response.data.petType);
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
  const onChangePetType = (event) => {
    setPetTypeFlag(false)
    setPetType(event.target.value)
    if (petType === '') {
      setPetTypeFlag(true)
    }
  }
  const onChangePetMom = (event) => {
    setPetMomCalledFlag(false)
    setPetMomCalled(event.target.value)
    if (petMomCalled === '') {
      setPetMomCalledFlag(true)
    }
  }
  const onChangePetDad = (event) => {
    setPetDadCalledFlag(false)
    setPetDadCalled(event.target.value)
    if (petDadCalled === '')
      setPetDadCalledFlag(true)
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
              New PetType
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <TextField
                  error={petTypeFlag}
                  id="outlined-error-helper-text"
                  label="PetType"
                  value={petType}
                  onChange={onChangePetType}
                  helperText=""
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  error={petMomCalledFlag}
                  id="outlined-error-helper-text"
                  label="PetMomCalled"
                  value={petMomCalled}
                  onChange={onChangePetMom}
                  helperText=""
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <TextField
                  error={petDadCalledFlag}
                  id="outlined-error-helper-text"
                  label="PetDadCalled"
                  value={petDadCalled}
                  onChange={onChangePetDad}
                  helperText=""
                  fullWidth
                />
              </MDBox>

              <MDBox mt={4} mb={1}>
                <MDButton onClick={saveData} variant="gradient" color="info" fullWidth>
                  Save
                </MDButton>
              </MDBox>
              <MDBox mt={4} mb={1}>
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
