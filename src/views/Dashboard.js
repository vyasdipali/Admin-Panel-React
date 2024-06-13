import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "AuthProvider ";
import axiosInstance from "utility/axiosInstance";

function Dashboard() {
  
  const { retrievedToken } = useAuth(); // Assuming useAuth provides token
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('Admin/GetDashboard');
        setData(response.data.data);
        console.log("GetDashboard Response:", response.data.data);
      } catch (error) {
        setError('Failed to fetch user data. Please try again.');
        console.error("GetDashboard Error:", error);
      }
    };
    fetchData();
  }, [retrievedToken]);
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data && (
        <div>
          <p>User Count: {data.blogCount}</p>
          <p>Live Link Count: {data.liveLinkCount}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
// const { token, API_ENDPOINT } = useAuth();
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${API_ENDPOINT}Admin/GetDashboard`);
  //       console.log("API response:", response.data.data);
  //       setData(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setError("Failed to fetch user data. Please try again.");
  //     }
  //   };
  //   fetchData();
  // }, [token, API_ENDPOINT]);

  // return (
  //   <>
  //     <Container fluid>
  //       <Row>
  //         <Col lg="3" sm="6">
  //           <Card className="card-stats">
  //             <Card.Body>
  //               <Row>
  //                 <Col xs="5">
  //                   <div className="icon-big text-center icon-warning">
  //                     <i className="nc-icon nc-chart text-warning"></i>
  //                   </div>
  //                 </Col>
  //                 <Col xs="7">
  //                   <div className="numbers">
  //                     <p className="card-category"></p>
  //                     <Card.Title as="h4">150GB</Card.Title>
  //                   </div>
  //                 </Col>
  //               </Row>
  //             </Card.Body>
  //             <Card.Footer>
  //               <hr></hr>
  //               <div className="stats">
  //                 <i className="fas fa-redo mr-1"></i>
  //                 Update Now
  //               </div>
  //             </Card.Footer>
  //           </Card>
  //         </Col>
  //         <Col lg="3" sm="6">
  //           <Card className="card-stats">
  //             <Card.Body>
  //               <Row>
  //                 <Col xs="5">
  //                   <div className="icon-big text-center icon-warning">
  //                     <i className="nc-icon nc-light-3 text-success"></i>
  //                   </div>
  //                 </Col>
  //                 <Col xs="7">
  //                   <div className="numbers">
  //                     <p className="card-category">Revenue</p>
  //                     <Card.Title as="h4">$ 1,345</Card.Title>
  //                   </div>
  //                 </Col>
  //               </Row>
  //             </Card.Body>
  //             <Card.Footer>
  //               <hr></hr>
  //               <div className="stats">
  //                 <i className="far fa-calendar-alt mr-1"></i>
  //                 Last day
  //               </div>
  //             </Card.Footer>
  //           </Card>
  //         </Col>
  //         <Col lg="3" sm="6">
  //           <Card className="card-stats">
  //             <Card.Body>
  //               <Row>
  //                 <Col xs="5">
  //                   <div className="icon-big text-center icon-warning">
  //                     <i className="nc-icon nc-vector text-danger"></i>
  //                   </div>
  //                 </Col>
  //                 <Col xs="7">
  //                   <div className="numbers">
  //                     <p className="card-category">Errors</p>
  //                     <Card.Title as="h4">23</Card.Title>
  //                   </div>
  //                 </Col>
  //               </Row>
  //             </Card.Body>
  //             <Card.Footer>
  //               <hr></hr>
  //               <div className="stats">
  //                 <i className="far fa-clock-o mr-1"></i>
  //                 In the last hour
  //               </div>
  //             </Card.Footer>
  //           </Card>
  //         </Col>
  //         <Col lg="3" sm="6">
  //           <Card className="card-stats">
  //             <Card.Body>
  //               <Row>
  //                 <Col xs="5">
  //                   <div className="icon-big text-center icon-warning">
  //                     <i className="nc-icon nc-favourite-28 text-primary"></i>
  //                   </div>
  //                 </Col>
  //                 <Col xs="7">
  //                   <div className="numbers">
  //                     <p className="card-category">Followers</p>
  //                     <Card.Title as="h4">+45K</Card.Title>
  //                   </div>
  //                 </Col>
  //               </Row>
  //             </Card.Body>
  //             <Card.Footer>
  //               <hr></hr>
  //               <div className="stats">
  //                 <i className="fas fa-redo mr-1"></i>
  //                 Update now
  //               </div>
  //             </Card.Footer>
  //           </Card>
  //         </Col>
  //       </Row>
  //     </Container>
  //   </>