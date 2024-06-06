const axios = require('axios');
const cheerio = require('cheerio');

const scrapeBurkeMuseum = async () => {
  const url = 'https://www.burkemuseum.org/tickets';
  try {
    const response = await axios.get(url); // Await the axios call
    const html = response.data;
    const $ = cheerio.load(html);

    const burkeElement = $('ul.default-admission-ticket-pricing').find('li').find('div')[1];
    const burkeText = $(burkeElement).text();
    const burkePrice = burkeText.split('$')[1]; // Get the part after the "$"

    return burkePrice.trim();
  } catch (error) {
    console.error('Error fetching the URL:', error);
    throw error;
  }
};

const scrapePinballMuseum = async () => {
  const url = 'https://seattlepinballmuseum.com';
  try {
    const response = await axios.get(url); // Await the axios call
    const html = response.data;
    const $ = cheerio.load(html);

    const pinballElement = $('h4');
    const pinballText = $(pinballElement).text();
    const pinballPrice = pinballText.split('$')[1]; // Get the part after the "$"

    return pinballPrice.trim();
  } catch (error) {
    console.error('Error fetching the URL:', error);
    throw error;
  }
};

module.exports = {
  scrapeBurkeMuseum,
  scrapePinballMuseum,
};