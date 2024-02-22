import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./InboxPage.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../store/inbox-slice";


const SentEmailList = ({ id, to, sub, msg, time }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.inbox.emails);
  console.log("emails", emails);

  

  const openMail = () => {
    dispatch(inboxActions.openSelectedMail({ to, sub, msg, time }));
    history.push("/sentemaildetail");
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
      <div className={classes.list} onClick={() => openMail()}>
        <CheckBoxOutlineBlankIcon />
        <div className={classes.bluedot}></div>
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

export default SentEmailList;
