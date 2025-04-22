import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

interface PdfViewerProps {
  file: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
    console.log('PDF chargé avec succès, nombre de pages :', numPages);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Erreur lors du chargement du PDF :', error);
    setError(`Erreur : ${error.message}`);
  };

  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '2rem',
        maxHeight: '65vh',
        overflowY: 'auto', // Ajoute un scroll si le contenu dépasse
        padding: '10px',
      }}
    >
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
        >
          {numPages === null ? (
            <p>Chargement du PDF...</p>
          ) : (
            Array.from(new Array(numPages), (_, index) => (
              <Page
                key={index + 1}
                pageNumber={index + 1}
                scale={1.2} // Réduit la taille des pages
                width={600} // Limite la largeur des pages
                renderAnnotationLayer={false} // Désactive la couche d'annotations
                renderTextLayer={false} // Désactive la couche de texte
              />
            ))
          )}
        </Document>
      )}
    </div>
  );
};

export default PdfViewer;