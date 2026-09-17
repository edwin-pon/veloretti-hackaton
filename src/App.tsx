import Shell from './components/Shell'
import AnalyzingScreen from './screens/AnalyzingScreen'
import BriefAnalyzingScreen from './screens/BriefAnalyzingScreen'
import BriefReviewScreen from './screens/BriefReviewScreen'
import BriefUploadScreen from './screens/BriefUploadScreen'
import CampaignStartScreen from './screens/CampaignStartScreen'
import DashboardScreen from './screens/DashboardScreen'
import HubScreen from './screens/HubScreen'
import MatrixScreen from './screens/MatrixScreen'
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
      {state.screen === 'campaign-start' && <CampaignStartScreen />}
      {state.screen === 'brief-upload' && <BriefUploadScreen />}
      {state.screen === 'brief-analyzing' && <BriefAnalyzingScreen />}
      {state.screen === 'brief-review' && <BriefReviewScreen />}
      {state.screen === 'matrix' && <MatrixScreen />}
    </Shell>
  )
}
