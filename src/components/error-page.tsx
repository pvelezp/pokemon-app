import React from 'react';

type ErrorMessageProps = {
  title: string;
  description?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  description = 'Lo sentimos, no pudimos cargar los datos. Por favor, intenta nuevamente.',
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 flex flex-col items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center border border-red-500">
        <div className="mb-6">
          <span className="text-red-500 text-5xl">❌</span>
        </div>
        <h2 className="text-red-500 text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300 mb-6">{description}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center mx-auto"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
