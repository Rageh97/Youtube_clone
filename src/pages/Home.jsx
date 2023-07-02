import Header from "../compenents/Header";
import "../App.css";
import VideoList from "../compenents/Videos";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../compenents/Sidebar";
import MobileFooter from "../compenents/MobileFooter";


const Home = () => {
  return (
    <>
      
      
      <Container  fluid>
        <Row>
          <Col className="d-none d-lg-block"  md={2} lg={2} xl={2} xxl={2}>
          <Sidebar />
          </Col>

          <Col  xs={12} md={12} lg={10} xl={10} xxl={10}>
            <VideoList />
          </Col>
        </Row>
        <MobileFooter/>
      </Container>
    </>
  );
};

export default Home;
