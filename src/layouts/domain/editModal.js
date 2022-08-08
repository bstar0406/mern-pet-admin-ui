import { useEffect, useState, forwardRef } from "react";
import {baseURL} from "../../config"
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from "@mui/material/Autocomplete";
import MDInput from "components/MDInput";

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
  const [domainName, setDomainName] = useState('');
  const [domainNameFlag, setDomainNameFlag] = useState(false);
  const [petTypeId, setPetTypeId] = useState('');
  const [petTypeIdFlag, setPetTypeIdFlag] = useState(false);
  const [severity, setSeverity] = useState("success")
  const [message, setMessage] = useState("")
  const [petType, setPetType] = useState([])
  const [petTypeName, setPetTypeName] = useState("")
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
      axios.get(`${baseURL}/api/domains/${props.id}`).then(response => {
        if (response.data.success === true) {
          setDomainName(response.data.domain.domainName);
          setPetTypeId(response.data.domain.petTypeId._id);
          setPetTypeName(response.data.domain.petTypeId._id);
        }
      })
    }
    else {
      setDomainName('');
      setPetTypeId('');
      setPetTypeName('');
    }
    setOpen(props.open)
  }, [props.open])


  const saveData = () => {
    let flag = true;
    if (domainName === '') {
      flag = false;
      setDomainNameFlag(true)
    }
   
    if (petTypeId === '') {
      flag = false;
      setPetTypeIdFlag(true)
    }
    if (!flag) {
      return;
    }
    if (props.isAdd === false && props.id !== '') {
      new Promise(resolve => {
        const item = {
          domainId: props.id,
          domainName: domainName,
          petTypeId: petTypeId,
        }
        axios.put(`${baseURL}/api/domains/`, item).then(response => {
          if (response.data.success === true) {
            resolve();
            props.editSelectedItem(response.data.domain);
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
        const item = {
          domainName: domainName,
          petTypeId: petTypeId,
        }
        axios.post(`${baseURL}/api/domains/`, item).then(response => {
          if (response.data.success === true) {
            resolve();
            props.addNewRow(response.data.domain);
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
  const onChangeDomainName = (event) => {
    setDomainNameFlag(false)
    setDomainName(event.target.value)
    if (domainName === '') {
      setDomainNameFlag(true)
    }
  }

  const handleChange = (event) => {
    setPetTypeName(event.target.value)
    setPetTypeId(event.target.value)
    if ( event.target.value ) {
      setPetTypeIdFlag(true)
    }
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
              New Domain
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <TextField
                  error={domainNameFlag}
                  id="outlined-error-helper-text"
                  label="DomainName"
                  value={domainName}
                  onChange={onChangeDomainName}
                  helperText=""
                  fullWidth
                />
              </MDBox>
              
              <MDBox mb={2}>
                {/* <TextField
                  error={petTypeIdFlag}
                  id="outlined-error-helper-text"
                  label="PetType"
                  value={petTypeId}
                  onChange={onChangePetTypeId}
                  helperText=""
                  fullWidth
                /> */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">PetType</InputLabel>
                  <Select
                    error={petTypeIdFlag}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={petTypeName}
                    sx={{ height: "3rem" }}
                    label="Age"
                    onChange={handleChange}
                  >
                    {petType.map((item, index) => (
                      <MenuItem key={index} value={item._id}>{item.petType}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
