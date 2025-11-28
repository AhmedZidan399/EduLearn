import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeLanding from './pages/home-landing';
import AdminCourseManagement from './pages/admin-course-management';
import StudentDashboard from './pages/student-dashboard';
import CourseCatalog from './pages/course-catalog';
import UserAuthentication from './pages/user-authentication';
import CourseDetails from './pages/course-details';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <ScrollToTop />
                <RouterRoutes>
                    {/* Define your routes here */}
                    <Route path="/" element={<HomeLanding />} />
                    <Route path="/home-landing" element={<HomeLanding />} />
                    <Route path="/admin-course-management" element={<AdminCourseManagement />} />
                    <Route path="/student-dashboard" element={<StudentDashboard />} />
                    <Route path="/course-catalog" element={<CourseCatalog />} />
                    <Route path="/user-authentication" element={<UserAuthentication />} />
                    <Route path="/course-details" element={<CourseDetails />} />
                    <Route path="*" element={<NotFound />} />
                </RouterRoutes>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default Routes;
