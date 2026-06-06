import React from "react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router";
import {
  CreatePage,
  EditPage,
  HomePage,
  ProductPage,
  ProfilePage
} from "./pages";
import useAuthReq from "./hooks/useAuthReq"
import useUserSync from "./hooks/useUserSync"

function App() {

  const { isClerkLoaded, isSignedIn } = useAuthReq();
  useUserSync();

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={isSignedIn ? <ProfilePage /> : <Navigate to="/"/>} />
          <Route path="/create" element={isSignedIn ? <CreatePage /> : <Navigate to="/" />} />
          <Route path="/edit/:id" element={isSignedIn ? <EditPage /> : <Navigate to="/"/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
