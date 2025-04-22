import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';

const PdfViewer: React.FC = () => {
  const [pdfUrl] = useState<string>('/Franck_Chincholle_CV.pdf');

  return (
    <div>
      <h2>Visualisation du document</h2>
      <div style={{ height: '750px', border: '1px solid #ccc' }}>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      </div>
    </div>
  );
};

export default PdfViewer;