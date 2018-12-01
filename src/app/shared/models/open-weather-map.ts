export declare namespace OpenWeatherMap {
  export interface Coord {
    lon: number;
    lat: number;
  }

  export interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
  }

  export interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  }

  export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  export interface Main {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  }

  export interface Wind {
    speed: number;
    deg: number;
  }

  export interface Clouds {
    all: number;
  }

  export interface ThreeHourWeather {
    dt: number;
    dt_txt: string;
    main: Main;
    weather: Weather[];
    speed: number;
    clouds: number;
    wind: Wind;
    sys: Sys;
  }

  export interface Sys {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  }

  export interface Forecast {
    city: City;
    cod: string;
    message: number;
    cnt: NumberConstructor;
    list: ThreeHourWeather[];
  }

  export interface Current {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    id: number;
    name: string;
    cod: number;
  }
}
