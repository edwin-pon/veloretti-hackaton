import Shell from './components/Shell'
import AnalyzingScreen from './screens/AnalyzingScreen'
import CampaignFormScreen from './screens/CampaignFormScreen'
import CampaignSentScreen from './screens/CampaignSentScreen'
import CampaignsScreen from './screens/CampaignsScreen'
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
      {state.screen === 'campaigns' && <CampaignsScreen />}
      {state.screen === 'campaign' && <CampaignFormScreen />}
      {state.screen === 'campaign-sent' && <CampaignSentScreen />}
    </Shell>
  )
}
