import { AgentRun } from './AgentRun';
import { useAppStore } from '../../store/appStore';

const STEPS = [
  'Reading confirmed brand rules',
  'Framing three angles',
  'Writing headlines and body copy',
  'Applying legal footnotes',
];

export function DirectionsScreen() {
  const progress = useAppStore((state) => state.dirProgress);
  return (
    <AgentRun
      title="Generating initial directions"
      subtitle="Three directions from your brand rules and the confirmed brief"
      progress={progress}
      steps={STEPS}
      progressLabel="Drafting"
    />
  );
}
