import { useState, useEffect } from "react";
import classes from "./InboxPage.module.css";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../store/inbox-slice";
import { Link } from "react-router-dom";
import SentEmailList from "./SentEmailList";


const SentBox = () => {
  const dispatch = useDispatch();
  const mailId = useSelector((state) => state.auth.email);
  const [sentMailList, setSentMailList] = useState([]);

  const composeMailHandler = () => {
    dispatch(inboxActions.openComposeMail());
  };

  //get data
  const getData = async () => {
    try {
      const response = await fetch(
        "https://react-project-3793d-default-rtdb.firebaseio.com/email.json"
      );
      const data = await response.json();
      console.log("data", data);
      const loadData = [];

      for (const key in data) {
        if (data[key].sender === mailId) {
          loadData.push({
            id: key,
            to: data[key].to,
            sub: data[key].sub,
            msg: data[key].msg,
            time: data[key].time,
          });
        }
      }
      console.log("load", loadData);
      setSentMailList(loadData);
      //dispatch(inboxActions.saveMailData(loadData))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={classes.inbox}>
      <Container>
        <Row className={classes.header}>
          <Col xs={2}>
            <img src="Gmail-Logo.png" alt="logo"/>
          </Col>
          <Col xs={6} className={classes.search}>
            <Form.Control
              type="text"
              placeholder="Find messages, documents, photos or people"
            />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xs={2} className={classes.leftside}>
            <Button variant="info" onClick={composeMailHandler}>
              Compose
            </Button>
            
            <div className={classes.leftoptions}>
              <div ><Link to="/inbox">Inbox</Link></div>
              <div className={classes.active}><Link to="/sentbox">Sent</Link></div>
              
            </div>
          </Col>
          <Col xs={10} className={classes.rightside}>
            {sentMailList.map((email) => (
              <SentEmailList
                key={email.id}
                id={email.id}
                to={email.to}
                sub={email.sub}
                msg={email.msg}
                time={email.time}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SentBox;
