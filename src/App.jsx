import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import ProgramsSection from './components/ProgramsSection'
import Footer from './components/Footer'

import Events from './pages/Events'
import Contact from './pages/Contact'

// Portal Pages - Auth
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

// Portal Pages - Admin
import AdminLayout from './pages/layouts/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminStudents from './pages/admin/AdminStudents'
import AdminFaculty from './pages/admin/AdminFaculty'
import AdminApplications from './pages/admin/AdminApplications'
import AdminMasterList from './pages/admin/AdminMasterList'
import AdminSchedule from './pages/admin/AdminSchedule'
import AdminClearance from './pages/admin/AdminClearance'
import AdminNews from './pages/admin/AdminNews'
import AdminEvents from './pages/admin/AdminEvents'
import AdminStats from './pages/admin/AdminStats'

// Portal Pages - Faculty
import FacultyLayout from './pages/layouts/FacultyLayout'
import FacultyDashboard from './pages/faculty/FacultyDashboard'
import FacultyClasses from './pages/faculty/FacultyClasses'
import FacultyAdvisory from './pages/faculty/FacultyAdvisory'
import FacultyGradebook from './pages/faculty/FacultyGradebook'
import FacultyResources from './pages/faculty/FacultyResources'

// Portal Pages - Student
import StudentLayout from './pages/layouts/StudentLayout'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentGrades from './pages/student/StudentGrades'
import StudentSchedule from './pages/student/StudentSchedule'
import StudentBilling from './pages/student/StudentBilling'
import StudentNews from './pages/student/StudentNews'
import StudentAttendance from './pages/student/StudentAttendance'
import StudentLMS from './pages/student/StudentLMS'

// Page Transition Animation Wrapper
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
)

// Layout for main site
const MainLayout = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <main className="tribal-border-bottom" style={{ flex: 1, paddingTop: '80px' }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Main Website Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PageTransition><Hero /><AboutSection /><ProgramsSection /></PageTransition>} />
          <Route path="about" element={<PageTransition><AboutSection /></PageTransition>} />
          <Route path="programs" element={<PageTransition><ProgramsSection /></PageTransition>} />
          <Route path="events" element={<PageTransition><Events /></PageTransition>} />
          <Route path="contact" element={<PageTransition><Contact /></PageTransition>} />
        </Route>

        {/* Portal Login */}
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

        {/* Admin Portal Routes */}
        <Route path="/portal/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="faculty" element={<AdminFaculty />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="master-list" element={<AdminMasterList />} />
          <Route path="schedule" element={<AdminSchedule />} />
          <Route path="clearance" element={<AdminClearance />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="stats" element={<AdminStats />} />
        </Route>

        {/* Faculty Portal Routes */}
        <Route path="/portal/faculty" element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <FacultyLayout />
          </ProtectedRoute>
        }>
          <Route index element={<FacultyDashboard />} />
          <Route path="classes" element={<FacultyClasses />} />
          <Route path="advisory" element={<FacultyAdvisory />} />
          <Route path="gradebook" element={<FacultyGradebook />} />
          <Route path="resources" element={<FacultyResources />} />
        </Route>

        {/* Student Portal Routes */}
        <Route path="/portal/student" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentLayout />
          </ProtectedRoute>
        }>
          <Route index element={<StudentDashboard />} />
          <Route path="grades" element={<StudentGrades />} />
          <Route path="schedule" element={<StudentSchedule />} />
          <Route path="billing" element={<StudentBilling />} />
          <Route path="news" element={<StudentNews />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="lms" element={<StudentLMS />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
