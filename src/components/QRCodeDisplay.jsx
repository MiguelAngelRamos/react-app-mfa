import React from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Importamos el componente para generar QR en formato SVG

const QRCodeDisplay = ({ qrCodeUrl }) => {
  return (
    <div className="mt-3">
      <h4>Scan this QR code with your Google Authenticator app:</h4>
      <QRCodeSVG value={qrCodeUrl} size={256} /> {/* Ajusta el tamaño según necesites */}
    </div>
  );
};

export default QRCodeDisplay;
