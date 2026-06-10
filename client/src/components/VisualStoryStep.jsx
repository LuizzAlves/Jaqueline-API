import { useCallback, useRef, useState } from 'react';

const scenes = [
  {
    id: 'origin',
    title: 'O inicio',
    text: 'O dia que tudo comecou: um pontinho preto de luz em meio a multidao clara.',
  },
  {
    id: 'light',
    title: 'A luz',
    text: 'Eu ainda nao sabia, mas voce ia mudar muita coisa. Aquele pontinho de escuridao, ironicamente, comecou a me iluminar.',
  },
  {
    id: 'beautiful-chaos',
    title: 'Nosso caos bonito',
    text: 'Entre risadas, conversas, treinos e alguns surtos de loucura da sua pessoa.',
  },
  {
    id: 'home',
    title: 'Voce virou casa',
    text: 'Voce virou a pessoa mais bacanuda e maravilhosa que eu poderia imaginar na minha vida.',
  },
  {
    id: 'almost',
    title: 'Ainda falta uma coisa',
    text: 'Mas ainda falta uma coisa...',
  },
];

const particles = [
  [12, 18, 0.1],
  [22, 31, 1.3],
  [33, 17, 0.5],
  [45, 27, 1.8],
  [58, 14, 0.8],
  [70, 33, 2.2],
  [84, 22, 0.2],
  [16, 48, 2.6],
  [29, 61, 1.1],
  [43, 53, 2.9],
  [61, 58, 0.7],
  [76, 49, 1.7],
  [88, 64, 2.4],
  [10, 73, 1.9],
  [24, 79, 0.4],
  [39, 71, 2.1],
  [56, 78, 1.5],
  [74, 75, 0.9],
  [90, 82, 2.7],
  [50, 40, 0.3],
];

const storyChips = ['risadas', 'conversas', 'treinos', 'loucuras'];

const flowerGarden = [
  { type: 'lily', variant: 'lily-1' },
  { type: 'lily', variant: 'lily-2' },
  { type: 'lily', variant: 'lily-3' },
  { type: 'lily', variant: 'lily-4' },
  { type: 'lily', variant: 'lily-5' },
  { type: 'lily', variant: 'lily-6' },
  { type: 'lily', variant: 'lily-7' },
  { type: 'daisy', variant: 'daisy-1' },
  { type: 'daisy', variant: 'daisy-2' },
  { type: 'daisy', variant: 'daisy-3' },
  { type: 'daisy', variant: 'daisy-4' },
  { type: 'sunflower', variant: 'sunflower-1' },
];

function getPetalCount(type) {
  if (type === 'sunflower') return 14;
  if (type === 'daisy') return 10;
  return 5;
}

function Flower({ type, variant }) {
  const petalCount = getPetalCount(type);

  return (
    <span className={`story-flower story-flower--${type} story-flower--${variant}`} aria-hidden="true">
      <span className="flower-stem" />
      <span className="flower-leaf flower-leaf--left" />
      <span className="flower-leaf flower-leaf--right" />
      <span className="flower-bloom">
        {Array.from({ length: petalCount }).map((_, index) => (
          <span
            className="flower-petal"
            key={index}
            style={{ '--angle': `${(360 / petalCount) * index}deg` }}
          />
        ))}
        <span className="flower-core" />
      </span>
    </span>
  );
}

function StoryProgress({ scene }) {
  return (
    <div className="story-progress" aria-hidden="true">
      {scenes.map((item, index) => (
        <span
          className={[
            'story-progress-track',
            index < scene ? 'is-complete' : '',
            index === scene ? 'is-active' : '',
          ].filter(Boolean).join(' ')}
          key={item.id}
        >
          <span className="story-progress-fill" />
        </span>
      ))}
    </div>
  );
}

function StoryArtwork({ sceneId }) {
  return (
    <div className={`story-artwork story-artwork--${sceneId}`} aria-hidden="true">
      <div className="story-grain" />
      <div className="story-moon" />
      <div className="gothic-window-grid">
        <span className="gothic-window" />
        <span className="gothic-window" />
        <span className="gothic-window" />
      </div>

      <div className="cathedral">
        <span className="cathedral__spire cathedral__spire--left" />
        <span className="cathedral__spire cathedral__spire--main" />
        <span className="cathedral__spire cathedral__spire--right" />
        <span className="cathedral__body" />
        <span className="cathedral__door" />
        <span className="cathedral__window cathedral__window--left" />
        <span className="cathedral__window cathedral__window--right" />
      </div>

      <div className="dark-point">
        <span />
      </div>

      <div className="halo-field">
        <span />
        <span />
        <span />
      </div>

      <div className="particle-field">
        {particles.map(([x, y, delay], index) => (
          <span
            key={`${x}-${y}-${index}`}
            style={{
              '--x': `${x}%`,
              '--y': `${y}%`,
              '--delay': `${delay}s`,
            }}
          />
        ))}
      </div>

      <div className="story-chip-cloud">
        {storyChips.map((chip, index) => (
          <span key={chip} className={`story-chip story-chip--${index + 1}`}>
            {chip}
          </span>
        ))}
      </div>

      <div className="flower-bed">
        {flowerGarden.map((flower) => (
          <Flower key={flower.variant} type={flower.type} variant={flower.variant} />
        ))}
      </div>

      <span className="fog fog--low" />
      <span className="fog fog--mid" />
      <span className="fog fog--high" />
    </div>
  );
}

export default function VisualStoryStep({ onNext }) {
  const [scene, setScene] = useState(0);
  const touchStartRef = useRef(null);
  const currentScene = scenes[scene];
  const isLast = scene === scenes.length - 1;

  const goPrevious = useCallback(() => {
    setScene((current) => Math.max(0, current - 1));
  }, []);

  const goNext = useCallback(() => {
    setScene((current) => Math.min(scenes.length - 1, current + 1));
  }, []);

  const handleTouchStart = useCallback((event) => {
    touchStartRef.current = event.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((event) => {
    if (touchStartRef.current === null) return;
    const diff = event.changedTouches[0].clientX - touchStartRef.current;

    if (Math.abs(diff) > 44) {
      if (diff < 0) goNext();
      if (diff > 0) goPrevious();
    }

    touchStartRef.current = null;
  }, [goNext, goPrevious]);

  return (
    <div className="step-container visual-story-step">
      <section className="visual-story" aria-label="Historia visual para Jaqueline">
        <div
          className="story-phone"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <StoryProgress scene={scene} />

          <header className="story-topbar">
            <span className="story-kicker">Cena {scene + 1} de {scenes.length}</span>
            <span className="story-dedication">Para Jaqueline</span>
          </header>

          <button
            className="story-hit-zone story-hit-zone--prev"
            onClick={goPrevious}
            disabled={scene === 0}
            aria-label="Cena anterior"
          />
          <button
            className="story-hit-zone story-hit-zone--next"
            onClick={goNext}
            disabled={isLast}
            aria-label="Proxima cena"
          />

          <article className={`story-scene story-scene--${currentScene.id}`} key={currentScene.id}>
            <StoryArtwork sceneId={currentScene.id} />

            <div className={`story-copy ${currentScene.text.length > 112 ? 'is-long' : ''}`}>
              <span>{currentScene.title}</span>
              <p>{currentScene.text}</p>
            </div>

          </article>
        </div>

        <div className="story-nav">
          <button className="story-nav-btn" onClick={goPrevious} disabled={scene === 0}>
            Anterior
          </button>
          <div className="story-dots" aria-label="Cenas">
            {scenes.map((item, index) => (
              <button
                key={item.id}
                className={`story-dot ${index === scene ? 'is-active' : ''}`}
                onClick={() => setScene(index)}
                aria-label={`Ir para ${item.title}`}
              />
            ))}
          </div>
          <button className="story-nav-btn" onClick={goNext} disabled={isLast}>
            Proxima
          </button>
        </div>

        <button className={`btn-continue ${isLast ? 'highlight' : ''}`} onClick={onNext}>
          Continuar
        </button>
      </section>
    </div>
  );
}
