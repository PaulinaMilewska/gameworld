// Component for User Info

import React, {useState, useEffect} from "react";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import "../stylings/modals.css";
import firebase from "firebase";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          style={{
            backgroundColor: "var(--secondary)",
            color: "whitesmoke",
            float: "right",
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "10px",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function UserProfileModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //* Getting data from firestore
  const userLoggedIn = firebase.auth().currentUser;

  // const email = userLoggedIn.email;
  const uid = userLoggedIn.uid;
  // console.log("userLoggedIn.email:", email, "userLoggedIn.uid:", uid);

  const [userInfo, setUserInfo] = useState({
    Email: "",
    gender: "male",
    Name: "",
  });

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        console.log("User's data", doc.data());
        setUserInfo(doc.data());
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, {});

  return (
    <div>
      <Button className="UserInfo" onClick={handleClickOpen}>
        User Profile
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          style={{backgroundColor: "var(--primary-light)", color: "whiteSmoke"}}
        >
          User Profile
        </DialogTitle>
        <DialogContent style={{backgroundColor: "whiteSmoke", padding: "16px"}}>
          <Typography style={{color: "black", margin: "16px"}}>Your name is: {userInfo.Name}</Typography>
          <Typography style={{color: "black", margin: "16px"}}>Your email address is: {userLoggedIn.email}</Typography>
          <Typography style={{color: "black", margin: "16px"}}>Your gender is: {userInfo.gender}</Typography>
        </DialogContent>
        <DialogActions style={{backgroundColor: "whiteSmoke", float: "right"}}>
          <Button autoFocus onClick={handleClose} className="UserInfoOk">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
