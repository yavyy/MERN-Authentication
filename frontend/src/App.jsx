import { Navigate, Route, Routes } from "react-router-dom"
import FloatingShape from "./components/FloatingShape"
import { LoadingSpinner } from './components/LoadingSpinner'
import SignUpPage from "./Pages/SignUpPage"
import { LoginPage } from "./Pages/LoginPage"
import EmailVerification from "./Pages/EmailVerification"
import { Toaster } from 'react-hot-toast'
import { useEffect } from "react"
import { useAuthStore } from "./Store/authStore"
import DashboardPage from "./Pages/DashboardPage"
import ForgetPasswordPage from "./Pages/ForgetPasswordPage"
import ResetPasswordPage from "./Pages/ResetPasswordPage"


//protecting routes that require authentication
const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />
  }

  return children;
}


//redirect authenticated users to Home page.
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()

  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />
  }

  return children;
}


function App() {

  const { isCheckingAuth, checkAuth, } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  if (isCheckingAuth) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='10%' delay={2} />

      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <DashboardPage />
          </ProtectedRoutes>
        } />
        <Route path="/signup" element={
          <RedirectAuthenticatedUser>
            <SignUpPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/login" element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/verify-email" element={
          <RedirectAuthenticatedUser>
            <EmailVerification />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/forgot-password" element={
          <RedirectAuthenticatedUser>
            <ForgetPasswordPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/reset-password/:token" element={
          <RedirectAuthenticatedUser>
            <ResetPasswordPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path="*" element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster />

    </div>

  )
}

export default App
