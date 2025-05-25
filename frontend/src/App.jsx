import UnauthenApp from './pages/Unauthenticated/UnauthenApp'
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './contexts/authenContext'
import AuthenticatedApp from './AuthenticatedApp'
import AdminAuthenticated from './AdminAuthenticated';

function App() {
  const { isAuthenticated, state } = useAuth();
  return isAuthenticated ? state.role == 'user' ? <AuthenticatedApp /> : <AdminAuthenticated /> : <UnauthenApp />
}

export default App
