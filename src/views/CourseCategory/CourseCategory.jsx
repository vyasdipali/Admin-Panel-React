import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, ToastContainer } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
    getAllCourseCategories,
    addCourseCategory,
    deleteCourseCategory,
    updateCourseCategory,
} from "../../utility/services/courseCategoryService";
import "./CourseCategory.css";
import { useAuth } from "AuthProvider ";
import Loader from "components/Loader/Loader";


const CourseCategory = () => {
    const { retrievedToken } = useAuth();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true); // State for loading
    const [formValues, setFormValues] = useState({
        courseCategoryID: null, // Add courseCategoryID to track for editing
        courseCategoryName: "",
        courseCategoryImage: "",
    });

    const handleClose = () => {
        setShow(false);
        setFormValues({
            courseCategoryID: null,
            courseCategoryName: "",
            courseCategoryImage: "",
        });
    };

    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading when submitting
        try {
            if (formValues.courseCategoryID) {
                // If courseCategoryID exists, update category
                const updatedCategory = await updateCourseCategory(formValues);
                const updatedData = data.map((category) =>
                    category.courseCategoryID === updatedCategory.courseCategoryID
                        ? updatedCategory
                        : category
                );
                setData(updatedData);
                toast.success("Course category updated successfully!");
                console.log("UpdateCourseCategory Response:", updatedCategory);
            } else {
                // Otherwise, add new category
                const newCategory = await addCourseCategory(
                    formValues.courseCategoryName,
                    formValues.courseCategoryImage
                );
                setData([...data, newCategory]);
                toast.success("Course category added successfully!");
                console.log("AddCourseCategory Response:", newCategory);
            }
            handleClose();
        } catch (error) {
            setError(error.message);
            toast.error("Error updating/adding course category.");
            console.error("Add/Update Course Category Error:", error);
        } finally {
            setLoading(false); // Stop loading after submitting
        }
    };

    const handleDelete = async (courseCategoryID) => {
        setLoading(true); // Start loading when deleting
        try {
            await deleteCourseCategory(courseCategoryID);
            setData(data.filter((category) => category.courseCategoryID !== courseCategoryID));
            toast.success("Course category deleted successfully!");
        } catch (error) {
            setError(error.message);
            toast.error("Error deleting course category.");
            console.error("DeleteCourseCategory Error:", error);
        } finally {
            setLoading(false); // Stop loading after deleting
        }
    };

    const handleEdit = (category) => {
        setFormValues({
            courseCategoryID: category.courseCategoryID,
            courseCategoryName: category.courseCategoryName,
            courseCategoryImage: category.courseCategoryImage,
        });
        handleShow();
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading when fetching data
            try {
                const categories = await getAllCourseCategories();
                setData(categories);
                console.log("GetAllAdminCourseCategory Response:", categories);
            } catch (error) {
                setError(error.message);
                console.error("GetAllAdminCourseCategory Error:", error);
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
                                <ToastContainer/>
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
                                    style={{width:"229px",height:"152px"}}
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
                                        {category.isFeatured ? "Featured Category" : "Regular Category"}
                                    </Card.Text>
                                    <Button
                                        className="me-3"
                                        variant="primary"
                                        onClick={() => handleEdit(category)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className="delete-btn btn-danger"
                                        onClick={() => handleDelete(category.courseCategoryID)}
                                    >
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
                    <Modal.Title>{formValues.courseCategoryID ? 'Edit' : 'Add'} Course Category</Modal.Title>
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
