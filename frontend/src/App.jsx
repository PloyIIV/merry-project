import UnauthenApp from './pages/Unauthenticated/UnauthenApp'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './contexts/authenContext'
import AuthenticatedApp from './AuthenticatedApp'

function App() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenApp />
}

export default App
