import { useAuth } from "AuthProvider ";
import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
// import { useAuth } from "AuthProvider";
import axiosInstance from "utility/axiosInstance";
import "./CourseCategory.css"

const CourseCategory = () => {
    const { retrievedToken } = useAuth();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('Admin/GetAllAdminCourseCategory');
                setData(response.data.data); // Assuming response.data.data contains the array of categories
                console.log("GetAllAdminCourseCategory Response:", response.data.data);
            } catch (error) {
                setError('Failed to fetch user data. Please try again.');
                console.error("GetAllAdminCourseCategory Error:", error);
            }
        };
        fetchData();
    }, [retrievedToken]);

    
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Container>
                <Row>
                    {data.map((category) => (
                        <Col key={category.courseCategoryID} sm={12} md={6} lg={4} xl={3}>
                            <Card >
                                <Card.Img variant="top" src={category.courseCategoryImage} alt={category.courseCategoryName} onError={(e) => e.target.src = 'placeholder-image-url'} />
                                <Card.Body>
                                    <Card.Title><h5><b>{category.courseCategoryName}</b></h5></Card.Title>
                                    <Card.Text>
                                        {category.isFeatured ? "Featured Category" : "Regular Category"}
                                    </Card.Text>
                                    <Button className="me-3" variant="primary">Edit</Button>
                                    <Button className="delete-btn btn-danger" variant="primary">Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default CourseCategory;
