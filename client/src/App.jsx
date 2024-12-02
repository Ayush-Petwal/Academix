import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Hero from "./pages/student/Hero";
import MainLayout from "./layout/MainLayout"
import { RouterProvider } from "react-router";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: < MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Hero />
            {/* <Courses /> */}
          </>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
