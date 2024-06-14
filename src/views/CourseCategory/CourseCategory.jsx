import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axiosInstance from "utility/axiosInstance";
import "./CourseCategory.css";
import { useAuth } from "AuthProvider ";

const CourseCategory = () => {
    const { retrievedToken } = useAuth();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [formValues, setFormValues] = useState({
      courseCategoryName: "",
      courseCategoryImage: ""
    });
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axiosInstance.post("Course/AddCourseCategory", {
          courseCategoryName: formValues.courseCategoryName,
          courseCategoryImage: formValues.courseCategoryImage
        });
        console.log("AddCourseCategory Response:", response.data);
  
         
        setData([...data, response.data.data]);
  
        // Reset the form values
        setFormValues({
          courseCategoryName: "",
          courseCategoryImage: ""
        });
  
        // Close the modal
        setShow(false);
      } catch (error) {
        setError("Failed to add course category. Please try again.");
        console.error("AddCourseCategory Error:", error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(
            "Admin/GetAllAdminCourseCategory"
          );
          setData(response.data.data);
          console.log("GetAllAdminCourseCategory Response:", response.data.data);
        } catch (error) {
          setError("Failed to fetch user data. Please try again.");
          console.error("GetAllAdminCourseCategory Error:", error);
        }
      };
      fetchData();
    }, [retrievedToken]);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className="">
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h3>Course Category</h3>
                  </div>
  
                  <div className="Add-btn">
                    <Button variant="primary" onClick={handleShow}>
                      Category Add
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
  
          <Row>
            {data.map((category) => (
              <Col key={category.courseCategoryID} sm={12} md={6} lg={4} xl={3}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={category.courseCategoryImage}
                    alt={category.courseCategoryName}
                    onError={(e) => (e.target.src = "placeholder-image-url")}
                  />
                  <Card.Body>
                    <Card.Title>
                      <h5>
                        <b>{category.courseCategoryName}</b>
                      </h5>
                    </Card.Title>
                    <Card.Text>
                      {category.isFeatured
                        ? "Featured Category"
                        : "Regular Category"}
                    </Card.Text>
                    <Button className="me-3" variant="primary">
                      Edit
                    </Button>
                    <Button className="delete-btn btn-danger" variant="primary">
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Add Course Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 d-flex flex-wrap align-items-center">
                <label htmlFor="courseCategoryName" className="form-label">
                  Course Category Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Course Category Name"
                  name="courseCategoryName"
                  value={formValues.courseCategoryName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 d-flex flex-wrap align-items-center">
                <label htmlFor="courseCategoryImage" className="form-label">
                  Course Category Image
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Course Category Image"
                  name="courseCategoryImage"
                  value={formValues.courseCategoryImage}
                  onChange={handleChange}
                />
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  };
  
  export default CourseCategory;