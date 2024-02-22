import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import classes from './InboxPage.module.css';
import { useHistory} from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
const EmailDetail = () => {
  const history = useHistory();
  const selectedMail = useSelector((state) => state.inbox.selected);
  const read = useSelector((state) => state.inbox.read);
  //const emails = useSelector((state) => state.inbox.emails);
  //console.log("selectedmail",selectedMail);
  console.log("sel", selectedMail);
    

    return(
        <div className={classes.inbox}>
      <Container>
        <Row className={classes.header}>
          <Col xs={2}>
            <img src="Gmail-Logo.png" alt="logo" />
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
        <Row >
            <Col xs={2} className={classes.leftside}>
                <Button variant="info">Compose</Button>
                <div className={classes.leftoptions}>
                  <div className={classes.active}><Link to="/inbox">Inbox</Link></div>
                  <div><Link to="/sentbox">Sent</Link></div>
                </div>
            </Col>
            <Col xs={10} className={classes.rightside}>
               <header>
                <ArrowBackIcon onClick={() => history.push('/inbox')}/>
                {selectedMail.sub}
                <hr />
                
               </header>
               <div>
                    <AccountCircleIcon />
                    <span>{selectedMail.to}</span>
                    <p>{selectedMail.msg}</p>

               </div>
                
            </Col>
        </Row>
      </Container>
    </div>
    )
};

export default EmailDetail;