"use client";

import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';

interface SanitizedHtmlDisplayProps {
  html: string;
}

export default function SanitizedHtmlDisplay({ html }: SanitizedHtmlDisplayProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.innerHTML = DOMPurify.sanitize(html);
    }
  }, [html]);

  return <div ref={divRef} />;
}
