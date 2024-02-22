import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./InboxPage.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { inboxActions } from "../store/inbox-slice";


const EmailList = ({ id, to, sub, msg, time, read }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //console.log("re", read);

  const openMail = async (id) => {



    //get data

    const response2 = await fetch(
      `https://react-project-3793d-default-rtdb.firebaseio.com/email/${id}.json`
    );
    const data2 = await response2.json();
    //console.log("re", data2, id);

    //update data
    const response = await fetch(
      `https://react-project-3793d-default-rtdb.firebaseio.com/email/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          // to: data2.to,
          // sub: data2.sub,
          // msg: data2.msg,
          // time: new Date().toLocaleString("default", { time: "short" }),
          // sender: data2.sender,
          ...data2,
          read: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("d", data);

    dispatch(inboxActions.openSelectedMail(data));
    //dispatch(inboxActions.saveMailData(data));
    history.push("/emaildetail");
  };

  const deleteMail = async (id) => {
    console.log("del", id);
    try {
      const response = await fetch(
        `https://react-project-3793d-default-rtdb.firebaseio.com/email/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete email");
      }
      console.log("detele email successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.emailList}>
      <div className={classes.list} onClick={() => openMail(id)}>
        <CheckBoxOutlineBlankIcon />
         {!read && <div className={classes.bluedot}></div>} 
        <p>
          {to} {sub} {msg} {time}
        </p>
      </div>
      <DeleteIcon
        className={classes.deleteIcon}
        onClick={() => deleteMail(id)}
      />
    </div>
  );
};

export default EmailList;
