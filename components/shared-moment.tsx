'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Heart, Home, Info, RefreshCw, Sparkles, WifiOff } from 'lucide-react';
import { nextPromptIndex, situations, type SituationId } from './prompt-library';
import { choices, tinyMissions } from './activities';

type Screen = 'home' | 'discover' | 'prompts' | 'about';
type Activity = 'ask' | 'choose' | 'do';
type ChoicePhase = 'first' | 'handoff' | 'second' | 'reveal';

const steps = [
  { icon: '✳', title: 'Show up', text: 'The best connections can begin with simply being there.', tone: 'peach' },
  { icon: '♡', title: 'Find a spark', text: 'The original idea is about private, mutual interest.', tone: 'lilac' },
  { icon: '↗', title: 'Say hello', text: 'Take a small conversation starter into real life.', tone: 'yellow' },
];

const tabs = [
  { id: 'home', label: 'Home', icon: Home, figmaIcon: 'imgHome' },
  { id: 'discover', label: 'Explore', icon: Sparkles, figmaIcon: 'imgSun' },
  { id: 'prompts', label: 'Play', icon: BookOpen, figmaIcon: 'imgBookOpenAlt' },
  { id: 'about', label: 'About', icon: Info, figmaIcon: 'imgInfo' },
] as const;

const homeAsset = (name: string) => `/figma/home/${name}.svg`;

function FigmaHomeArt() {
  return <div className="figma-art" aria-hidden="true">
    <img className="figma-art-layer cloud-pink" src={homeAsset('imgUnion')} width="154.5" height="131" alt="" />
    <img className="figma-art-layer cloud-pink-edge" src={homeAsset('imgUnion1')} width="55" height="98" alt="" />
    <img className="figma-art-layer cloud-floor-right" src={homeAsset('imgUnion2')} width="209" height="35" alt="" />
    <img className="figma-art-layer cloud-mask" src={homeAsset('imgMaskGroup')} width="121" height="96" alt="" />
    <img className="figma-art-layer cloud-right" src={homeAsset('imgUnion3')} width="88" height="93" alt="" />
    <img className="figma-art-layer cloud-blue" src={homeAsset('imgUnion4')} width="209" height="107" alt="" />
    <img className="figma-art-layer cloud-floor-left" src={homeAsset('imgUnion5')} width="204" height="24" alt="" />
    <img className="figma-art-layer deco-small-star" src={homeAsset('imgStar1')} width="15" height="14" alt="" />
    <img className="figma-art-layer deco-star" src={homeAsset('imgStarFill')} width="24" height="24" alt="" />
    <img className="figma-art-layer deco-heart" src={homeAsset('imgFavoriteFill')} width="24" height="24" alt="" />
    <img className="figma-art-layer deco-snowflake" src={homeAsset('imgUSnowflake')} width="24" height="24" alt="" />
    <img className="figma-art-layer deco-headphones" src={homeAsset('imgUHeadphonesAlt')} width="17" height="17" alt="" />
    <img className="figma-art-layer deco-moon" src={homeAsset('imgMoonDuotone')} width="64" height="63" alt="" />
    <img className="figma-art-layer deco-sun" src={homeAsset('imgSunDuotone')} width="35" height="35" alt="" />
  </div>;
}

export default function SharedMoment() {
  const [screen, setScreen] = useState<Screen>('home');
  const [situationId, setSituationId] = useState<SituationId>('first-hello');
  const [promptIndex, setPromptIndex] = useState(0);
  const [pairMode, setPairMode] = useState(false);
  const [person, setPerson] = useState<1 | 2>(1);
  const [activity, setActivity] = useState<Activity>('ask');
  const [choiceIndex, setChoiceIndex] = useState(0);
  const [missionIndex, setMissionIndex] = useState(0);
  const [choicePhase, setChoicePhase] = useState<ChoicePhase>('first');
  const [firstChoice, setFirstChoice] = useState<string | null>(null);
  const [secondChoice, setSecondChoice] = useState<string | null>(null);
  const [online, setOnline] = useState(true);
  const situation = situations.find(item => item.id === situationId) ?? situations[0];

  const chooseSituation = (id: SituationId) => {
    const chosen = situations.find(item => item.id === id) ?? situations[0];
    setSituationId(id);
    setPromptIndex(Math.floor(Math.random() * chosen.prompts.length));
    setPerson(1);
  };

  const anotherIdea = () => {
    setPromptIndex(index => nextPromptIndex(index, situation.prompts.length));
    setPerson(1);
  };

  const anotherRound = () => {
    if (activity === 'choose') {
      setChoiceIndex(index => nextPromptIndex(index, choices.length));
      setChoicePhase('first');
      setFirstChoice(null);
      setSecondChoice(null);
    } else if (activity === 'do') {
      setMissionIndex(index => nextPromptIndex(index, tinyMissions.length));
    } else anotherIdea();
  };

  const chooseActivity = (next: Activity) => {
    setActivity(next);
    setChoicePhase('first');
    setFirstChoice(null);
    setSecondChoice(null);
  };

  useEffect(() => {
    const updateStatus = () => setOnline(navigator.onLine);
    updateStatus();
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  const openScreen = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return <div className={screen === 'home' ? 'app-frame figma-shell' : 'app-frame figma-shell figma-secondary-shell'}>
    <a className="skip-link" href="#app-content">Skip to content</a>
    <aside className="app-sidebar" aria-label="App navigation">
      <div className="sidebar-brand"><span className="logo" aria-hidden="true">♡</span><span>Shared<br/>Moment</span></div>
      <nav className="sidebar-nav" aria-label="Main navigation">{tabs.map(tab => <button key={tab.id} className={screen === tab.id ? 'nav-item active' : 'nav-item'} type="button" aria-current={screen === tab.id ? 'page' : undefined} onClick={() => openScreen(tab.id)}><tab.icon size={20} aria-hidden="true"/><span>{tab.label}</span></button>)}</nav>
      <p className="sidebar-note">A simple PWA concept project.<br/>No sign-in or saved data.</p>
    </aside>

    <div className="app-main-area">
      <header className="app-topbar"><div className="mobile-brand"><span className="logo" aria-hidden="true"><img src={homeAsset('imgHeart')} width="22" height="24" alt="" /></span><strong>Shared Moment</strong></div><span className="app-status" role="status">{online ? <img src={homeAsset('imgIcon')} width="15" height="11" alt=""/> : <WifiOff size={15} aria-hidden="true"/>}{online ? 'Ready' : 'Offline'}</span><img className="figma-header-line" src={homeAsset('imgLine2')} width="400" height="1" alt="" /></header>
      <main id="app-content" className="app-content" tabIndex={-1}>
        {screen === 'home' && <div className="figma-home">
          <div className="page-kicker">YOUR SPACE TO CONNECT</div>
          <h1 className="page-title">Hello, there <img className="greeting-stars" src={homeAsset('imgStars')} width="24" height="24" alt="" /></h1>
          <p className="page-subtitle">A little hello can lead to a lovely moment.</p>

          <section className="welcome-card" aria-label="Welcome to Shared Moment"><FigmaHomeArt/><div className="welcome-copy"><span className="card-eyebrow">SHARED MOMENT</span><h2>Make room for a moment that matters.</h2><p>Find a small way to connect at your next event.</p><button className="app-button figma-prompt-button" type="button" onClick={() => openScreen('prompts')}><img className="button-fill" src={homeAsset('imgRectangle6')} width="150" height="41" alt=""/><span>Play together</span><img src={homeAsset('imgArrowRight')} width="22" height="18" alt="" /></button></div></section>

          <div className="section-row"><h2>Where to begin</h2></div>
          <div className="quick-grid"><button type="button" className="quick-card figma-quick-card blue" onClick={() => openScreen('discover')}><img className="quick-figma-icon" src={homeAsset('imgFavoritesFill')} width="30" height="30" alt=""/><strong>Explore the idea</strong><span>A softer way to meet</span><img className="quick-arrow" src={homeAsset('imgArrowRightLong')} width="17" height="17" alt=""/></button><button type="button" className="quick-card figma-quick-card purple" onClick={() => openScreen('prompts')}><img className="quick-figma-icon" src={homeAsset('imgFavoritesLight')} width="30" height="30" alt=""/><strong>Play together</strong><span>Three ways to connect</span><img className="quick-arrow" src={homeAsset('imgArrowRightLong1')} width="17" height="17" alt=""/></button></div>
        </div>}

        {screen === 'discover' && <div className="explore-screen">
          <div className="page-kicker">THE IDEA</div><h1 className="page-title">Less pressure.<br/><span className="accent">More possibility.</span></h1><p className="page-subtitle">Shared Moment imagines a gentler way to connect at social events.</p>
          <div className="step-list">{steps.map((step, index) => <article className={`step-card ${step.tone}`} key={step.title}><span className="step-number">0{index + 1}</span><span className="step-icon" aria-hidden="true">{index === 0 ? <img src="/figma/pages/imgShowUpSparkle.svg" width="24" height="24" alt=""/> : index === 1 ? <img src={homeAsset('imgHeart')} width="18" height="20" alt=""/> : <img src={homeAsset('imgArrowRight')} width="22" height="18" alt=""/>}</span><div><h2>{step.title}</h2><p>{step.text}</p></div></article>)}</div>
          <div className="info-card"><Heart size={23} aria-hidden="true"/><div><h2>Keep it comfortable</h2><p>Try a question, compare two choices, or complete a tiny mission together. Skip anything that does not feel right.</p></div></div>
          <button className="app-button coral" type="button" onClick={() => openScreen('prompts')}>Try a conversation prompt <ArrowRight size={17} aria-hidden="true"/></button>
        </div>}

        {screen === 'prompts' && <div className="play-screen">
          <div className="page-kicker">PLAY TOGETHER</div><h1 className="page-title">Start with a moment.</h1><p className="page-subtitle">Three small ways to connect in person. Pass the phone or talk face to face.</p>
          <div className="activity-picker" aria-label="Choose an activity"><button type="button" aria-pressed={activity === 'ask'} className={activity === 'ask' ? 'activity-tab active' : 'activity-tab'} onClick={() => chooseActivity('ask')}>Ask a question</button><button type="button" aria-pressed={activity === 'choose'} className={activity === 'choose' ? 'activity-tab active' : 'activity-tab'} onClick={() => chooseActivity('choose')}>This or that</button><button type="button" aria-pressed={activity === 'do'} className={activity === 'do' ? 'activity-tab active' : 'activity-tab'} onClick={() => chooseActivity('do')}>Tiny mission</button></div>
          <section className={`prompt-panel activity-panel activity-${activity}${activity === 'ask' && pairMode ? ' paired' : ''} phase-${choicePhase}`} aria-labelledby="prompt-label"><span className="prompt-decoration" aria-hidden="true">✳</span><p id="prompt-label" className="prompt-count">{activity === 'ask' ? `${situation.label.toUpperCase()} · ${promptIndex + 1} / ${situation.prompts.length}` : activity === 'choose' ? `THIS OR THAT · ${choiceIndex + 1} / ${choices.length}` : `TINY MISSION · ${missionIndex + 1} / ${tinyMissions.length}`}</p>
            {activity === 'ask' && <><fieldset className="situation-picker"><legend>Pick a moment</legend><div className="situation-options">{situations.map(item => <button key={item.id} type="button" className={item.id === situationId ? 'situation-option selected' : 'situation-option'} aria-pressed={item.id === situationId} onClick={() => chooseSituation(item.id)}><strong>{item.label}</strong><span>{item.description}</span></button>)}</div></fieldset>{pairMode && <p className="turn-label">Person {person}: {person === 1 ? 'answer, then pass the phone' : 'your turn to answer'}</p>}<blockquote key={`${situationId}-${promptIndex}`}>{situation.prompts[promptIndex]}</blockquote><div className="prompt-actions">{!pairMode && <button className="app-button light" type="button" onClick={anotherRound}><RefreshCw size={18} aria-hidden="true"/> Another idea</button>}{pairMode && <button className="app-button light" type="button" onClick={() => setPerson(value => value === 1 ? 2 : 1)}>{person === 1 ? 'Pass to person 2' : 'Pass to person 1'} <ArrowRight size={17} aria-hidden="true"/></button>}</div></>}
            {activity === 'choose' && <><p className="turn-label">{choicePhase === 'first' ? 'Person 1: choose privately' : choicePhase === 'handoff' ? 'Pass the phone to person 2' : choicePhase === 'second' ? 'Person 2: choose privately' : 'Your choices'}</p>{choicePhase !== 'handoff' && choicePhase !== 'reveal' && <blockquote>{choices[choiceIndex].question}</blockquote>}{(choicePhase === 'first' || choicePhase === 'second') && <div className="choice-options">{choices[choiceIndex].options.map(option => <button type="button" key={option} onClick={() => { if (choicePhase === 'first') { setFirstChoice(option); setChoicePhase('handoff'); } else { setSecondChoice(option); setChoicePhase('reveal'); } }}>{option}</button>)}</div>}{choicePhase === 'handoff' && <><p className="handoff-copy">Person 1’s choice stays hidden while person 2 makes theirs.</p><button className="app-button light" type="button" onClick={() => setChoicePhase('second')}>I’m person 2 <ArrowRight size={17} aria-hidden="true"/></button></>}{choicePhase === 'reveal' && <div className="choice-reveal"><p><strong>Person 1 ·</strong> {firstChoice}</p><p><strong>Person 2 ·</strong> {secondChoice}</p><span>{firstChoice === secondChoice ? 'You picked the same thing! What drew you to it?' : 'Two different picks — what made each one interesting?'}</span></div>}<div className="prompt-actions"><button className="app-button light" type="button" onClick={anotherRound}><RefreshCw size={18} aria-hidden="true"/> New round</button></div></>}
            {activity === 'do' && <><p className="turn-label">One small thing to try together</p><blockquote>{tinyMissions[missionIndex]}</blockquote><div className="prompt-actions"><button className="app-button light" type="button" onClick={anotherRound}><RefreshCw size={18} aria-hidden="true"/> Another mission</button></div></>}
          </section>
          {activity === 'ask' && <label className="pair-switch"><input type="checkbox" checked={pairMode} onChange={event => { setPairMode(event.target.checked); setPerson(1); }}/><span><strong>Two-person mode</strong><small>Take turns answering the same question.</small></span></label>}
          <p className="privacy-note"><Heart size={17} aria-hidden="true"/> No answers, choices, or profiles are saved.</p>
        </div>}

        {screen === 'about' && <>
          <div className="page-kicker">GOOD TO KNOW</div><h1 className="page-title">About this app.</h1><p className="page-subtitle">A small, thoughtful PWA made for a class project.</p>
          <div className="about-mark" aria-hidden="true"><img src="/figma/pages/imgAboutHeart.svg" width="40" height="43" alt=""/></div>
          <div className="about-list"><section><h2>What can I do here?</h2><p>Ask questions, compare private “this or that” choices, or try tiny missions together in person.</p></section><section><h2>Do I need an account?</h2><p>No. There is no sign-in, profile, database, or personal-data form.</p></section><section><h2>Does it save my choices?</h2><p>No. Your current screen and choices reset when you refresh or close the app.</p></section><section><h2>What works offline?</h2><p>The installable PWA shows a generic help screen when the site cannot load. Reconnect to use the app.</p></section></div>
          <p className="small-note">Matching, event creation, and messaging are not active features in this version.</p>
        </>}
      </main>
    </div>

    <nav className="bottom-nav" aria-label="Main navigation"><img className="figma-nav-background" src={homeAsset('imgRectangle2')} width="400" height="52" alt=""/><img className="figma-nav-line top" src={homeAsset('imgLine3')} width="400" height="1" alt=""/><img className="figma-nav-line bottom" src={homeAsset('imgLine4')} width="402" height="1" alt=""/>{tabs.map(tab => <button key={tab.id} className={screen === tab.id ? 'bottom-item active' : 'bottom-item'} type="button" aria-current={screen === tab.id ? 'page' : undefined} onClick={() => openScreen(tab.id)}><img src={homeAsset(tab.figmaIcon)} width="24" height="24" alt=""/><span>{tab.label}</span></button>)}</nav>
  </div>;
}
