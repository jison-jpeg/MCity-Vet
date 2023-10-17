import React, { useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {
    const mainStylesheet = document.getElementById('main-stylesheet');
    const dashboardStylesheet = document.getElementById('dashboard-stylesheet');
    
    mainStylesheet.setAttribute('disabled', 'true');
    dashboardStylesheet.removeAttribute('disabled');
  }, []);

  return (
    <div>
      Dashboard
    </div>
  );
}
