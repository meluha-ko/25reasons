import React from 'react';
import './App.css';

type Reason = {
  title: string;
  text: string;
  image: string;
};

const accessQuestion = 'Na unnoda ___________ sharu?';
const accessAnswer = 'chellakutty';

const reasonTitles = [
  'The way you love me.',
  'How you turn little moments into magic',
  'You call me chellakutty',
  'Hope you give me for our future',
  'How can someone look this cute in an ID picture',
  'Na veetla solla poren hit me hard',
  'I didnt know I would love talking to someone this much',
  'Who in the world is as beautiful as you',
  'Vidia vidiaa pesnalum we never wanted to stop',
  'Your hugs that feel like shelter',
  'Who is going to look at me the way you do',
  'We fight. We reapir. We stay.',
  'You find joy in simple things.',
  'Pottu vacha you look like a goddess'
];


const reasonTexts = [
  'What did I do to desrve this love, babygirl?',
  'You make the smallest moments feel special and unforgettable.',
  'When you call me chellakutty, I melt every time.',
  'Your hope keeps us looking forward with full hearts.',
  'If I was sight adichifying your ID card picture ivlo, think of how much I love looking at you!',
  'Hearing you say "Na veetla solla poren" hit me in the best way.',
  'I never knew I could love talking to someone this much until you.',
  'Stunning you are. Absolutely stunning.',
  'It was so easy to get comfortable with you.',
  'I didn\'t know two people could get this close in this short time!',
  'No one looks at me the way you do, and it means everything.',
  'All these made me so confident that we can get through anything together.',
  'You find joy in the simplest things, and it makes life brighter.',
  'I am mesmerized everytime I look at you wearing pottu.'
];

const loadReasonImage = (index: number) => {
  const baseName = `./Reason/Reason-${index}`;
  const extensions = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'];

  for (const ext of extensions) {
    try {
      return require(`${baseName}.${ext}`) as string;
    } catch {
      // Try the next extension.
    }
  }

  return '';
};

const reasons: Reason[] = reasonTitles.map((title, index) => {
  const number = index + 1;
  return {
    title,
    text: reasonTexts[index] ?? '',
    image: loadReasonImage(number),
  };
});

function App() {
  const [isUnlocked, setIsUnlocked] = React.useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem('isUnlocked') === 'true';
  });
  const [answerInput, setAnswerInput] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [reasonIndex] = React.useState(() => {
    if (typeof window === 'undefined') {
      return 0;
    }

    const storedIndex = window.localStorage.getItem('reasonIndex');
    const parsedIndex = storedIndex ? Number.parseInt(storedIndex, 10) : -1;
    const safeIndex = Number.isFinite(parsedIndex) ? parsedIndex : -1;

    return (safeIndex + 1) % reasons.length;
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem('reasonIndex', String(reasonIndex));
  }, [reasonIndex]);

  const handleUnlock = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = answerInput.trim().toLowerCase();

    if (normalized === accessAnswer) {
      setIsUnlocked(true);
      setErrorMessage('');
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('isUnlocked', 'true');
      }
      return;
    }

    setErrorMessage('Try again, love.');
  };

  const reason = reasons[reasonIndex];

  return (
    <div className="page">
      <div className="glow glow--one" />
      <div className="glow glow--two" />
      <div className="glow glow--three" />

      {!isUnlocked ? (
        <main className="card gate">
          <header className="card__header">
            <p className="eyebrow">Just for you</p>
            <h1>Answer to unlock</h1>
            <p className="subtitle">
              A tiny secret question before the reasons appear.
            </p>
          </header>

          <form className="gate__form" onSubmit={handleUnlock}>
            <label className="gate__label" htmlFor="secret-answer">
              {accessQuestion}
            </label>
            <input
              id="secret-answer"
              className="gate__input"
              type="password"
              autoComplete="off"
              value={answerInput}
              onChange={(event) => {
                setAnswerInput(event.target.value);
                if (errorMessage) {
                  setErrorMessage('');
                }
              }}
              placeholder="Your answer"
              aria-invalid={Boolean(errorMessage)}
            />
            {errorMessage ? (
              <p className="gate__error">{errorMessage}</p>
            ) : null}
            <button className="gate__button" type="submit">
              Unlock
            </button>
          </form>
        </main>
      ) : (
        <main className="card">
          <header className="card__header">
            <p className="eyebrow">Happyyyy 25th!</p>
            <h1>Reasons to love you, Sharu!</h1>
            <p className="subtitle">
              There are infintie reasons to love you but here are some.
            </p>
          </header>

          <section className="reason">
            <div className="reason__media">
              {reason.image ? (
                <img
                  src={reason.image}
                  alt={reason.title}
                  className="reason__image"
                />
              ) : (
                <div className="photo-placeholder">
                  <span>Photo placeholder</span>
                </div>
              )}
            </div>
            <div className="reason__content">
              <h2 className="reason__title">{reason.title}</h2>
              <p className="reason__text">{reason.text}</p>
              {/* <div className="editor-hint">
                Forever your Chellakutty!
              </div> */}
            </div>
          </section>

          <footer className="card__footer">
            <p>Open this page anytime you want a reminder of just how adored you are.</p>
            <div className="footer__dots">
              <span />
              <span />
              <span />
            </div>
          </footer>
        </main>
      )}
    </div>
  );
}

export default App;
