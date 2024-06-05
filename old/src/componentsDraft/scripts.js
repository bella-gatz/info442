// this function fetches data from the Seattle Cultural Space Inventory API
function getData() {
  try {
    const response = fetch('https://data.seattle.gov/resource/vsxr-aydq.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = response.json();
    let filteredData = data.filter(item => item.name && item.name.toLowerCase().includes('museum'));
    filteredData = filteredData.filter(item => item.phone != null);

    // Transform longitude and latitude keys to an array
    filteredData = filteredData.map(item => ({
      ...item,
      coordinates: [item.longitude, item.latitude]
    }));

    return filteredData;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }

}