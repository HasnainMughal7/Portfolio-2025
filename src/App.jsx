import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import './App.css'
import Home from "./Pages/Home/Home.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import Projects from "./Pages/Projects/Projects.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import About from "./Pages/About/About.jsx";
import { Analytics } from '@vercel/analytics/next';

const Layout = () => {
  return (
    <>
      <Analytics />
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        { path: "/contact", element: <Contact /> },
        { path: "/projects", element: <Projects /> },
        { path: "/about", element: <About /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App