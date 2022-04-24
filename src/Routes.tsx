import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Modal from "view/components/Modal";
import LoginPage from "./view/pages/LoginPage";
import WorkspacePage from "./view/pages/WorkspacePage";

export function AfterLoginRoutes() {
  return (
    <BrowserRouter>
      <Modal />
      <Routes>
        <Route
          path="/workspace/projects"
          element={<WorkspacePage operation="project-list" />}
        />
        <Route
          path="/workspace/tasktree/:projectId"
          element={<WorkspacePage operation="task-tree" />}
        />
        <Route path="*" element={<Navigate to="/workspace/projects" />} />
      </Routes>
    </BrowserRouter>
  );
}

export function BeforeLoginRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
