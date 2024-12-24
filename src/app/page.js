"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        "https://api.weatherapi.com/v1/forecast.json?key=c3a6dc4386cc49e7ba0155411242212&q=tashkent&days=8&aqi=yes&alerts=yes"
      );
      const data = await response.json();
      setWeatherData(data);
    };

    fetchWeather();
  }, []);

  if (!weatherData)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );

  const region = weatherData.location;
  const current = weatherData.current;
  const forecast = weatherData.forecast.forecastday;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-5 text-center">
        <h1 className="text-2xl font-bold">
          {region.country} / {region.region}
        </h1>
      </header>

      <div className="p-6 bg-gray-800 rounded-lg max-w-4xl mx-auto flex flex-col gap-6 justify-center items-center">
        <div className="flex items-center justify-center gap-6">
          <h2 className="text-3xl font-bold">{current.temp_c}°C</h2>
          <p className="text-lg">{current.condition.text}</p>
          <img
            src={`https:${current.condition.icon}`}
            alt={current.condition.text}
            className="mx-auto my-2"
          />
        </div>
        <p className="text-lg">
          Last updated: {new Date(region.localtime).toLocaleString()}
        </p>
        <div className="flex items-center gap-6 text-center">
          <div>
            <p className="text-sm">Feels Like: {current.feelslike_c}°C</p>
            <p className="text-sm">Humidity: {current.humidity}%</p>
          </div>
          <div>
            <p className="text-sm">Wind: {current.wind_kph} km/h</p>
            <p className="text-sm">Wind Degree: {current.wind_degree}°</p>
          </div>
          <div>
            <p className="text-sm">Cloud: {current.cloud}%</p>
            <p className="text-sm">Pressure: {current.pressure_mb} mb</p>
          </div>
          <div>
            <p className="text-sm">Visibility: {current.vis_km} km</p>
            <p className="text-sm">Gust: {current.gust_kph} km/h</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">8-Day Forecast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="p-4 bg-gray-800 rounded-lg text-center"
            >
              <p className="text-sm font-semibold">
                {new Date(day.date).toDateString()}
              </p>
              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                className="mx-auto my-2"
              />
              <p className="text-lg font-bold">{day.day.maxtemp_c}°C</p>
              <p className="text-sm">Min: {day.day.mintemp_c}°C</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
