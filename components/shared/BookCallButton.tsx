'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { PopupModal } from 'react-calendly';

interface BookCallButtonProps {
  label?: string;
  style?: React.CSSProperties;
}

export default function BookCallButton({ label = 'Book a Free Call', style }: BookCallButtonProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [open, setOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/nishantteach/30min';

  useEffect(() => {
    setRootElement(document.body);
  }, []);

  if (!mounted) {
    return (
      <button style={style} disabled>
        {label}
      </button>
    );
  }

  return (
    <>
      <button onClick={() => setOpen(true)} style={style}>
        {label}
      </button>

      {rootElement && (
        <PopupModal
          url={calendlyUrl}
          open={open}
          onModalClose={() => setOpen(false)}
          rootElement={rootElement}
        />
      )}
    </>
  );
}
