export const createPlayer = async ({ username, userEmail }) => {
  try {
    const response = await fetch('/api/createPlayer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, userEmail }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json(); 
    return result;
  } catch (error) {
    console.error(error);
    alert('Error: No se pudo crear al jugador.', error);
  }
};
