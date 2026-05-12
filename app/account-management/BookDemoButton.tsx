'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { PopupModal } from 'react-calendly';

export default function BookDemoButton() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [showModal, setShowModal] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/nishantteach/30min';

  useEffect(() => {
    setRootElement(document.body);
  }, []);

  const btnStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: '10px', padding: '16px 32px', borderRadius: '10px',
    background: 'var(--ink)', color: '#fff',
    fontFamily: 'var(--font-heading, sans-serif)', fontSize: '15px',
    fontWeight: 700, letterSpacing: '0.02em',
    boxShadow: '0 4px 14px rgba(15,23,42,0.15)',
    border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
  };

  // Listen for Calendly booking confirmation
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.event === 'calendly.event_scheduled') {
        fetch('/api/webhooks/calendly', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'invitee.created',
            payload: {
              name,
              email,
              uri: e.data?.payload?.invitee?.uri || `client-${Date.now()}`,
              scheduled_event: {
                name: '30 Minute Meeting',
                start_time: new Date().toISOString(),
                uri: e.data?.payload?.event?.uri || '',
              },
            },
          }),
        }).then(() => setSaved(true)).catch(() => {});
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [name, email]);

  function handleModalSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowModal(false);
    setShowCalendly(true);
  }

  if (!mounted) return <button style={btnStyle}>Book A Demo</button>;

  return (
    <>
      {/* Pre-booking modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: '20px',
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '32px',
            maxWidth: '420px', width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 8px', fontFamily: 'var(--font-heading, sans-serif)', fontSize: '22px', fontWeight: 800, color: 'var(--ink)' }}>
              Before we open Calendly
            </h2>
            <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-body, sans-serif)', fontSize: '14px', color: 'var(--muted)' }}>
              Enter your details so we can prepare for the call.
            </p>
            <form onSubmit={handleModalSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text" required value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <button type="submit" style={{ ...btnStyle, width: '100%', justifyContent: 'center' }}>
                Continue to Book →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Calendly popup */}
      {rootElement && (
        <PopupModal
          url={calendlyUrl}
          prefill={{ name, email }}
          open={showCalendly}
          onModalClose={() => setShowCalendly(false)}
          rootElement={rootElement}
        />
      )}

      {/* Main button */}
      <button
        style={btnStyle}
        onClick={() => { setShowModal(true); setSaved(false); }}
      >
        Book A Demo
      </button>

      {saved && (
        <p style={{ marginTop: '10px', fontSize: '13px', color: '#16a34a', fontFamily: 'var(--font-body, sans-serif)' }}>
          ✅ Booking recorded!
        </p>
      )}
    </>
  );
}
