import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom'
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

// Portal Pages - Admin
import AdminLayout from './pages/layouts/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminStudents from './pages/admin/AdminStudents'
import AdminFaculty from './pages/admin/AdminFaculty'

// Portal Pages - Faculty
import FacultyLayout from './pages/layouts/FacultyLayout'
import FacultyDashboard from './pages/faculty/FacultyDashboard'
import FacultyClasses from './pages/faculty/FacultyClasses'

// Portal Pages - Student
import StudentLayout from './pages/layouts/StudentLayout'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentGrades from './pages/student/StudentGrades'

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

        {/* Admin Portal Routes */}
        <Route path="/portal/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="faculty" element={<AdminFaculty />} />
        </Route>

        {/* Faculty Portal Routes */}
        <Route path="/portal/faculty" element={<FacultyLayout />}>
          <Route index element={<FacultyDashboard />} />
          <Route path="classes" element={<FacultyClasses />} />
        </Route>

        {/* Student Portal Routes */}
        <Route path="/portal/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="grades" element={<StudentGrades />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  )
}

export default App
