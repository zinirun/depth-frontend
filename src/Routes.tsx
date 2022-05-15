import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Modal from "view/components/Modal";
import AssignPage from "view/pages/LoginPage/Assign";
import LoginPage from "./view/pages/LoginPage";
import WorkspacePage from "./view/pages/WorkspacePage";

export function AfterLoginRoutes() {
  return (
    <BrowserRouter>
      <Modal />
      <Routes>
        <Route path="/workspace" element={<WorkspacePage operation="main" />} />
        <Route
          path="/workspace/tasktree/:projectId"
          element={<WorkspacePage operation="task-tree" />}
        />
        <Route path="*" element={<Navigate to="/workspace" />} />
      </Routes>
    </BrowserRouter>
  );
}

export function BeforeLoginRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/assign" element={<AssignPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
