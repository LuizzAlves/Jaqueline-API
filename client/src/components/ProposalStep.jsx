import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

const LETTER_LINES = [
  'Jaqueline,',
  '',
  'Nos ultimos meses voce se tornou uma das pessoas mais importantes da minha vida.',
  '',
  'Eu adoro os momentos que passamos juntos, as conversas, as risadas, as loucuras que aparecem no caminho e ate mesmo os momentos de bico.',
  '',
  'Porque o que importa e apenas estar ao seu lado.',
  '',
  'Entao eu tenho uma pergunta muito importante...',
];

function fireConfetti() {
  const duration = 6000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#ec4899', '#fb7185', '#f9a8d4', '#fbbf24', '#ffffff'],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#ec4899', '#fb7185', '#f9a8d4', '#fbbf24', '#ffffff'],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };

  // Big initial burst
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#ec4899', '#fb7185', '#f9a8d4', '#fbbf24', '#ffffff'],
  });

  frame();
}

export default function ProposalStep({ onAccepted }) {
  const [phase, setPhase] = useState('letter'); // letter | ready | modal | analyzing | error | accepted

  // After 4 seconds, reveal the button that opens the proposal.
  useEffect(() => {
    if (phase === 'letter') {
      const timer = setTimeout(() => {
        setPhase('ready');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleOpenProposal = useCallback(() => {
    setPhase('modal');
  }, []);

  const handleNo = useCallback(() => {
    setPhase('analyzing');
    setTimeout(() => {
      setPhase('error');
    }, 3000);
  }, []);

  const handleYes = useCallback(() => {
    setPhase('accepted');
    fireConfetti();

    // Try to play music
    try {
      const audio = document.getElementById('musica');
      if (audio) {
        audio.play().catch((err) => {
          console.warn('Autoplay bloqueado ou arquivo não encontrado:', err);
        });
      }
    } catch (err) {
      console.warn('Erro ao reproduzir audio:', err);
    }

    if (onAccepted) onAccepted();
  }, [onAccepted]);

  const handleBack = useCallback(() => {
    setPhase('modal');
  }, []);

  return (
    <div className="step-container">
      <div className="proposal">
        <audio id="musica" src="/musica.mp3" preload="auto" />

        {/* Letter */}
        {(phase === 'letter' || phase === 'ready' || phase === 'modal') && (
          <>
            <div className="proposal-letter">
              {LETTER_LINES.filter(Boolean).map((line, i) => (
                <p key={i} className={i === 0 ? 'name' : ''}>
                  {line}
                </p>
              ))}

              {phase === 'ready' && (
                <button className="btn-open-proposal" onClick={handleOpenProposal}>
                  Abrir pedido
                </button>
              )}
            </div>
          </>
        )}

        {/* Accepted / Celebration */}
        {phase === 'accepted' && (
          <div className="celebration" id="celebration">
            <div className="celebration-text">
              Pedido aceito com sucesso ❤️
            </div>
            <p className="celebration-sub">Te amo, Jaqueline! 💕</p>
          </div>
        )}

        {(phase === 'modal' || phase === 'analyzing' || phase === 'error') && (
          <div className="proposal-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="proposal-title">
            <div className="proposal-modal">
              {phase === 'modal' && (
                <>
                  <p className="proposal-modal-kicker">A pergunta importante</p>
                  <div className="proposal-question" id="proposal-title">
                    Quer namorar comigo?
                  </div>

                  <div className="proposal-buttons">
                    <button className="btn-yes" onClick={handleYes} id="btn-sim">
                      SIM ❤️
                    </button>
                    <button className="btn-no" onClick={handleNo} id="btn-nao">
                      NAO
                    </button>
                  </div>
                </>
              )}

              {phase === 'analyzing' && (
                <div className="analyzing">
                  <p className="analyzing-text">Analisando resposta...</p>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" />
                  </div>
                </div>
              )}

              {phase === 'error' && (
                <div className="error-screen" id="error-screen">
                  <div className="error-code">ERRO 0x00000001</div>
                  <div className="error-message">
                    O sistema detectou uma resposta invalida.
                    <br />
                    Por favor, revise sua decisao e tente novamente.
                    <span className="error-cursor" />
                  </div>
                  <button className="btn-back" onClick={handleBack} id="btn-voltar">
                    Voltar
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
