const HOST_URL = 'https://banking-microservices.dev/api';
const USER_URL = '/users'
const LOGIN_URL = `${HOST_URL}${USER_URL}/signin`;
const REGISTRATION_URL = `${HOST_URL}${USER_URL}/signup`;
const USER_INFO_URL = `${HOST_URL}${USER_URL}/currentuser`;
const LOGOUT_URL = `${HOST_URL}${USER_URL}/signout`;
const FORGOT_PASSWORD_URL = `${HOST_URL}${USER_URL}/password`;
const WEATHER_URL = 'https://pro.openweathermap.org/data/2.5/weather';
const WEATHER_APIKEY = '6a7df18cbb01ec4d6dea89d7038d8e6f';
const BASE_URL = 'https://banking-microservices.dev/api';
const CURRENCIES_URL = 'https://api.apilayer.com/fixer/latest&base=UAH';
const CURRENCIES_APIKEY = 'Sm25XagYMeRj5CB5VprQPwMILcfzMFss';

// Dropdown Options
const CURRENCIES_OPTIONS = [
  { label: 'USD', value: 'USD' },
  { label: 'UAH', value: 'UAH' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' },
];

const PERIOD_OPTIONS = [
  { label: 'Past 30 days', value: '30' },
  { label: 'Past 1 day', value: '1' },
  { label: 'Past 7 days', value: '7' },
  { label: 'Past 365 days', value: '365' },
];


// Weather
const WEATHER_TYPES = [
  {
    type: "Clear",
    img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
  },
  {
    type: "Rain",
    img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
  },
  {
    type: "Snow",
    img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
  },
  {
    type: "Clouds",
    img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  },
  {
    type: "Haze",
    img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
  },
  {
    type: "Smoke",
    img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
  },
  {
    type: "Mist",
    img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
  },
  {
    type: "Drizzle",
    img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
  },
];


// Regex
const ASSIGNMENT_REGEX = /^.{1,}$/;
const NAME_REGEX = /^[A-Z][a-z]{3,23}$/;
const CREDIT_CARD_REGEX =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
const SURNAME_REGEX = /^[A-Z][a-z]{3,23}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PWD_WEAK_REGEX = /^(?=.*[A-z])(?=.*[0-9]).{8,24}$/;
const PWD_STRONG_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%-_]).{8,24}$/;
const PASSWORD_REGEX = /^.{8,}$/;

// Carousel
const CAROUSEL_WIDTH = 288;
const CAROUSEL_MARGIN = 25;
  

export {
  LOGIN_URL,
  REGISTRATION_URL,
  USER_INFO_URL,
  LOGOUT_URL,
  FORGOT_PASSWORD_URL,
  CURRENCIES_URL,
  CURRENCIES_APIKEY,
  WEATHER_TYPES,
  WEATHER_URL,
  WEATHER_APIKEY,
  CURRENCIES_OPTIONS,
  BASE_URL,
  ASSIGNMENT_REGEX,
  NAME_REGEX,
  CREDIT_CARD_REGEX,
  SURNAME_REGEX,
  EMAIL_REGEX,
  PWD_WEAK_REGEX,
  PWD_STRONG_REGEX,
  PASSWORD_REGEX,
  CAROUSEL_WIDTH,
  CAROUSEL_MARGIN,
  PERIOD_OPTIONS
}