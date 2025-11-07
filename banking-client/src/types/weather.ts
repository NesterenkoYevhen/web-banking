interface IWeatherProps {
  type: string,
  img: string 
}

export interface IWeather {
  weatherProps: IWeatherProps,
  temperature: number,
  place: string
}