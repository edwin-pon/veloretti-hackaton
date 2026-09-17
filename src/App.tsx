import Shell from './components/Shell'
import AnalyzingScreen from './screens/AnalyzingScreen'
import DashboardScreen from './screens/DashboardScreen'
import HubScreen from './screens/HubScreen'
import ReviewScreen from './screens/ReviewScreen'
import UploadScreen from './screens/UploadScreen'
import { useStore } from './lib/store'

export default function App() {
  const { state } = useStore()

  return (
    <Shell>
      {state.screen === 'hub' && <HubScreen />}
      {state.screen === 'upload' && <UploadScreen />}
      {state.screen === 'analyzing' && <AnalyzingScreen />}
      {state.screen === 'review' && <ReviewScreen />}
      {state.screen === 'dashboard' && <DashboardScreen />}
    </Shell>
  )
}
