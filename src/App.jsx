import "./App.css";
import { Toaster } from "react-hot-toast";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import BookList from "./components/books/BookList";
import BorrowReturn from "./components/borrow-return/BorrowReturn";
import Genres from "./components/genres/Genres";
import Members from "./components/members/Members.jsx";
import Reports from "./components/report/Reports";
import Staff from "./components/staff/Staff";
import Layout from "./components/layout/Layout";
import PrivateRoute from "./components/login/PrivateRoute";
import Profile from "./components/layout/Profile";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="books" element={<BookList />} />
          <Route path="borrow-return" element={<BorrowReturn />} />
          <Route path="members" element={<Members />} />
          <Route path="staff" element={<Staff />} />
          <Route path="reports" element={<Reports />} />
          <Route path="genres" element={<Genres />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
