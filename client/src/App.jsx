import { useState } from 'react';
import VisualStoryStep from './components/VisualStoryStep.jsx';
import QuizStep from './components/QuizStep.jsx';
import ProposalStep from './components/ProposalStep.jsx';

export default function App() {
  const [step, setStep] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const goToStep = (nextStep) => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(nextStep);
      setTransitioning(false);
    }, 400);
  };

  return (
    <div className={`app ${celebrating ? 'celebrating' : ''}`}>
      <div className={transitioning ? 'step-exit' : ''}>
        {step === 1 && <VisualStoryStep onNext={() => goToStep(2)} />}
        {step === 2 && <QuizStep onNext={() => goToStep(3)} />}
        {step === 3 && (
          <ProposalStep onAccepted={() => setCelebrating(true)} />
        )}
      </div>
    </div>
  );
}
