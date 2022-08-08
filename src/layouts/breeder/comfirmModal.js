import { useEffect, useState, forwardRef } from "react";
import Modal from '@mui/material/Modal';
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
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
  border: '2px solid #000',
  boxShadow: 24,
};
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={4} ref={ref} variant="filled" {...props} />;
});
export default function BasicModal(props) {
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success")
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false);
  const handleClose = () => props.handleClose();

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const deleteData = () => {
    props.deleteItem()
    setOpenAlert(true)
    setMessage("Successfully deleted!")
    setSeverity("success")
  }

  useEffect(() => {
    setOpen(props.open)
  }, [props.open])


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
              Do you want to delete this?
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mt={4} mb={1}>
                <MDButton onClick={deleteData} variant="gradient" color="info" fullWidth>
                  Yse
                </MDButton>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton onClick={handleClose} variant="gradient" color="white" fullWidth>
                  No
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
