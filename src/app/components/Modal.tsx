"use client";

import { useCallback, useEffect, useRef, type MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

type ModalProps = {
  children: React.ReactNode;
  dismissHref?: string;
};

export default function Modal({ children, dismissHref = "/" }: ModalProps) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.push(dismissHref);
  }, [router, dismissHref]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        onDismiss();
      }
    },
    [onDismiss]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onDismiss]);

  return (
    <div ref={overlay} className="modal-overlay" onClick={onClick}>
      <div ref={wrapper} className="modal-wrapper">
        <button
          type="button"
          className="modal-close"
          onClick={onDismiss}
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
