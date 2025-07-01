'use client'
import React, { useEffect } from 'react'
import { usePrayer } from '../Context/PrayersCon';
import { bigCitiesByCountry } from '../utils/data';

const MainPage = () => {
  const { setSelectedCity, selectedCity, prayers, setSelectedCountry, selectedCountry, info } = usePrayer();
  const countries = Object.keys(bigCitiesByCountry);
  const cities = Array.isArray(bigCitiesByCountry[selectedCountry]) ? bigCitiesByCountry[selectedCountry] : [];

  useEffect(() => {
    console.log(prayers);
  }, [prayers]);

  const arabicNames = {
    Fajr: "الفجر",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء"
  };

  const icons = {
    Fajr: "🌅",
    Dhuhr: "🌞",
    Asr: "☀️",
    Maghrib: "🌇",
    Isha: "🌙"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f0f7] to-[#d6e4f0] p-6 flex flex-col items-center font-[sans-serif]">
      {/* رأس الصفحة */}
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 drop-shadow-sm">
          🕌 مواقيت الصلاة
        </h1>
        <p className="mt-2 text-gray-600 text-base md:text-lg">
          احصل على أوقات الصلاة اليومية بدقة حسب مدينتك
        </p>
      </header>

      {/* اختيار الدولة والمدينة */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 border border-blue-100">
        <div className='w-full'>
          <label className="block  mb-2 text-sm font-medium text-gray-700">
            اختر الدولة
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedCity("");
            }}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- اختر الدولة --</option>
            {countries.map((country, i) => (
              <option key={i} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {cities.length > 0 && (
          <div className='w-full'>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              اختر المدينة
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- اختر المدينة --</option>
              {cities.map((city, index) => (
                <option key={index} value={city.en}>
                  {city.ar}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* معلومات اليوم */}
      {info?.date && (
        <div className="bg-white rounded-xl shadow-md px-6 py-4 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-around w-full max-w-4xl border border-blue-200">
          <div className="text-center text-blue-900 font-semibold">
            <p className="text-base">📆 اليوم</p>
            <p className="text-lg">{info.day}</p>
          </div>
          <div className="text-center text-blue-900 font-semibold">
            <p className="text-base">🗓 التاريخ الميلادي</p>
            <p className="text-lg">{info.date}</p>
          </div>
          <div className="text-center text-blue-900 font-semibold">
            <p className="text-base">🕋 التاريخ الهجري</p>
            <p className="text-lg">{info.hijri} - {info.hijriMonth}</p>
          </div>
        </div>
      )}

      {/* كروت مواقيت الصلاة */}
      {prayers && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-6xl mt-2">
          {Object.entries(prayers)
            .filter(([name]) => Object.keys(arabicNames).includes(name))
            .map(([name, time], index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center border border-blue-100"
              >
                <div className="text-4xl mb-2">{icons[name]}</div>
                <h2 className="text-xl font-bold text-blue-800 mb-1">
                  {arabicNames[name]}
                </h2>
                <p className="text-2xl font-semibold text-gray-700">
                  {time}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MainPage;
