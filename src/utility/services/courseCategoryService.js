import axiosInstance from "../axiosInstance";

const courseData  = () => ({
  courseCategoryID: 0,
  courseCategoryName: "",
  courseCategoryImage: "",
  isFeatured: false, 
});

export default courseData ;


const getAllCourseCategories = async () => {
  try {
    const response = await axiosInstance.get("Admin/GetAllAdminCourseCategory");
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch course categories. Please try again.");
  }
};

const addCourseCategory = async (courseCategoryName, courseCategoryImage) => {
  try {
    const response = await axiosInstance.post("Course/AddCourseCategory", {
      courseCategoryName,
      courseCategoryImage,
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to add course category. Please try again.");
  }
};

const deleteCourseCategory = async (courseCategoryID) => {
  try {
    const response = await axiosInstance.post(`Course/DeleteCourseCategoryByID/${courseCategoryID}`);
    console.log("DeleteCourseCategory Response:", response);
    return response.data.data;
  } catch (error) {
    console.error("DeleteCourseCategory Error Response:", error.response);
    throw new Error("Failed to delete course category. Please try again.");
  }
};

const updateCourseCategory = async (courseData) => {
  try {
    const response = await axiosInstance.post("Course/UpdateCourseCategory", courseData);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to update course category. Please try again.");
  }
};

export {
  getAllCourseCategories,
  addCourseCategory,
  deleteCourseCategory,
  updateCourseCategory,
};
