import { Navigate, Route, Routes } from 'react-router'
import toast, { Toaster } from "react-hot-toast"

import HomePage from "./pages/HomePage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import OnBoardingPage from "./pages/OnBoardingPage.jsx"
import NotificationsPage from "./pages/NotificationsPage.jsx"
import CallPage from "./pages/CallPage.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import PageLoader from './components/PageLoader.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import SignUpPage from './pages/SignupPage.jsx'


const App = () => {

  const { isLoading, authUser } = useAuthUser()

  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded

  if (isLoading) return <PageLoader/>

  return (
    <div >
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (
          <HomePage />
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onBoarding"}/>
        )} />
         <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        {/* <Route path="/onBoarding" element={isAuthenticated ? <OnBoardingPage /> : <Navigate to="/login"/>} /> */}
        <Route
          path="/onboarding"
          element={isAuthenticated ? (!isOnboarded ? (<OnBoardingPage />) : (<Navigate to="/" />)) : 
          (<Navigate to="/login" />)
          }
        />
        <Route path="/notifications" element={isAuthenticated ? <NotificationsPage /> : <Navigate to="/login"/>} />
        <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/login"/>} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login"/>} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
