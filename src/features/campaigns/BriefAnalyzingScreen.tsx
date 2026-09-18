import { AgentRun } from './AgentRun';
import { briefDocument } from '../../data/brief';
import { useAppStore } from '../../store/appStore';

const STEPS = [
  'Parsing the brief',
  'Locating objective and scope',
  'Extracting and normalising values',
  'Scoring confidence and citations',
];

export function BriefAnalyzingScreen() {
  const progress = useAppStore((state) => state.briefProgress);
  return (
    <AgentRun
      title="Reading the campaign brief"
      subtitle={briefDocument.name}
      progress={progress}
      steps={STEPS}
      progressLabel="Extraction"
    />
  );
}
