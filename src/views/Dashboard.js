import React, { useEffect, useState } from "react";
import axiosInstance from "utility/axiosInstance";

import { Card, Container, Row, Col } from "react-bootstrap";
import Loader from "components/Loader/Loader"; // Adjust the path as necessary
import { useAuth } from "AuthProvider ";

function Dashboard() {
  const { retrievedToken } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('Admin/GetDashboard');
        setData(response.data.data);
        console.log("GetDashboard Response:", response.data.data);
      } catch (error) {
        setError('Failed to fetch user data. Please try again.');
        console.error("GetDashboard Error:", error);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };
    fetchData();
  }, [retrievedToken]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data && (
           <Container fluid>
        <Row>

          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div><b>userCount</b></div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category"></p>
                      <Card.Title as="h4">{data.userCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  userCount
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div>
                      <b> blogCount</b>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      
                      <Card.Title as="h4">{data.blogCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
          
                  blogCount
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                  <div>
                    <b>courseCategoryCount
                    </b>
                  </div>
                    {/* <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div> */}
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                
                      <Card.Title as="h4">{data.courseCategoryCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  {/* <i className="far fa-clock-o mr-1"></i> */}
                  courseCategoryCount
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div>
                      <b>liveLinkCount
                      </b>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                    
                      <Card.Title as="h4">{data.liveLinkCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  {/* <i className="fas fa-redo mr-1"></i> */}
                  liveLinkCount
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                   <div>
                    <b>publishCourseCount</b>
                   </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <Card.Title as="h4">{data.publishCourseCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  publishCourseCount
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    {/* <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div> */}
                    <div>
                      <b>unPublishCourseCount</b>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      {/* <p className="card-category">Followers</p> */}
                      <Card.Title as="h4">{data.unPublishCourseCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  {/* <i className="fas fa-redo mr-1"></i> */}
                  unPublishCourseCount
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
      )}
    </div>
  );
}

export default Dashboard;
