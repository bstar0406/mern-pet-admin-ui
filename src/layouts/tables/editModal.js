import { useEffect, useState } from "react";
import axios from "axios";
import Modal from '@mui/material/Modal';
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import TextField from '@mui/material/TextField';
// Authentication layout components

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

export default function BasicModal(props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => props.handleClose();
  const [petType, setPetType] = useState('');
  const [petTypeFlag, setPetTypeFlag] = useState(false);
  const [petMomCalled, setPetMomCalled] = useState('');
  const [petMomCalledFlag, setPetMomCalledFlag] = useState(false);
  const [petDadCalled, setPetDadCalled] = useState('');
  const [petDadCalledFlag, setPetDadCalledFlag] = useState(false);

  useEffect(() => {

    if (props.open === true && props.isAdd === false && props.id !== '') {
      axios.get(`http://localhost:5000/api/petTypes/${props.id}`).then(response => {
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
    if (props.isAdd === false && props.id !== '') {
      const item = {
        petTypeId: props.id,
        petType: petType,
        petTypeMomCalled: petMomCalled,
        petTypeDadCalled: petDadCalled,
      }
      axios.put("http://localhost:5000/api/petTypes/", item).then(response => {
        if (response.data.success === true) {
          props.editSelectedItem(item);
          handleClose()
        }
      })
    } else {
      const item = {
        petType: petType,
        petTypeMomCalled: petMomCalled,
        petTypeDadCalled: petDadCalled,
      }
      axios.post("http://localhost:5000/api/petTypes/", item).then(response => {
        if (response.data.success === true) {
          props.addNewRow(response.data.petType);
          handleClose()
        }
      }
      )
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
    </div>
  );
}
