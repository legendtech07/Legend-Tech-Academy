// Shared validation function
function validateCourseId(courseId) {
    const validCourses = ['crs1', 'crs2', 'crs3', 'crs4', 'crs5', 'crs6', 'crs7', 'crs8', 'crs9', 'crs10','crs11','crs12','crs13','crs14','crs15'];
    return validCourses.includes(courseId);
}
