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
        maxHeight: '50vh', // Limite à la moitié de la hauteur de l'écran
        overflowY: 'auto', // Ajoute un scroll si le contenu dépasse
        border: '1px solid #ccc', // Optionnel : pour visualiser les limites
        padding: '10px', // Optionnel : pour un peu d'espace interne
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
                scale={0.8} // Réduit la taille des pages (optionnel)
                width={600} // Limite la largeur des pages (ajuste selon tes besoins)
              />
            ))
          )}
        </Document>
      )}
    </div>
  );
};

export default PdfViewer;