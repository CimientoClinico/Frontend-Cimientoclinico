import React, { useState, useEffect } from 'react';
function HelpAlerts({ alerts }) {
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [showAlerts, setShowAlerts] = useState(false);

  useEffect(() => {
    const alertShown = localStorage.getItem('alertShown');

    if (!alertShown) {
      setShowAlerts(true);
      localStorage.setItem('alertShown', true);
    }
  }, []);

  const handleNextAlert = () => {
    setCurrentAlertIndex(currentAlertIndex + 1);
  }

  const handleCloseAlerts = () => {
    setShowAlerts(false);
    localStorage.setItem('alertShown', false);
  }

  return (
    <>
    {showAlerts && (
      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <p className="text-gray-700">{alerts[currentAlertIndex].message}</p>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              {currentAlertIndex < alerts.length - 1 ? (
                <button onClick={handleNextAlert} className="ml-3">
                  Siguiente
                </button>
              ) : (
                <button onClick={handleCloseAlerts} className="ml-3">
                  Cerrar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  );
}

export default HelpAlerts;