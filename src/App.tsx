import React from 'react';
import './App.css';

type Reason = {
  title: string;
  text: string;
  image: string;
};

const reasonTitles = [
  'How can someone look this cute in an ID picture',
  'How you turn little moments into magic',
  'You call me chellakutty',
  'How hopeful you are',
  'The way you love me.',
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
  'If I was sight adichifying your ID card picture ivlo, think of how much I love looking at you!',
  'You make the smallest moments feel special and unforgettable.',
  'When you call me chellakutty, I melt every time.',
  'Your hope keeps us looking forward with full hearts.',
  'What did I do to desrve this love, babygirl?',
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

  const reason = reasons[reasonIndex];

  return (
    <div className="page">
      <div className="glow glow--one" />
      <div className="glow glow--two" />
      <div className="glow glow--three" />

      <main className="card">
        <header className="card__header">
          <p className="eyebrow">Happyyyy 25th!</p>
          <h1>Reasons I love you, Sharu!</h1>
          <p className="subtitle">
            Open this page anytime you want a reminder of just how adored you are.
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
          <p>Refresh to shuffle another reason.</p>
          <div className="footer__dots">
            <span />
            <span />
            <span />
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
