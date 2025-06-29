import { useEffect, useRef } from 'react';
import * as docx from 'docx-preview';

interface DocxPreviewerProps {
  file: File | null;
}

export function DocxPreviewer({ file }: DocxPreviewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (file && viewerRef.current) {
      viewerRef.current.innerHTML = '';

      docx.renderAsync(file, viewerRef.current).catch((error) => {
        console.error(error);
      });
    }
  }, [file]);

  if (!file) {
    return null;
  }

  return (
    <div
      ref={viewerRef}
      className="docx-preview-container h-full w-full overflow-y-auto rounded-lg bg-white p-8 text-black shadow-inner"
    />
  );
}
