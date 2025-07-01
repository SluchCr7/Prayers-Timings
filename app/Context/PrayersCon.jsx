'use client'
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const PrayersCon = createContext();

export const PrayersContextProvider = ({ children }) => {
    const [prayers, setPrayers] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    
    const [info, setInfo] = useState({
        date: '',
        hijri: '',
        hijriMonth: '',
        day: '',
    });
    useEffect(() => {
        const getPrayers = async () => {
            try {
                const res = await axios(
                    `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=${selectedCountry}&method=8`
                );
                setPrayers(res.data.data.timings);
                setInfo({
                    date: res.data.data.date.readable,
                    hijri: res.data.data.date.hijri.date,
                    hijriMonth: res.data.data.date.hijri.month.ar,
                    day: res.data.data.date.hijri.weekday.ar
                })
            } catch (err) {
                console.log("Error fetching prayer times:", err);
            }
        };

        if (selectedCity && selectedCountry) {
            getPrayers();
        }
    }, [selectedCity, selectedCountry]);

    return (
        <PrayersCon.Provider value={{
            prayers,
            selectedCity,
            selectedCountry,
            setSelectedCity,
            setSelectedCountry,
            info
        }}>
            {children}
        </PrayersCon.Provider>
    );
};

export const usePrayer = () => useContext(PrayersCon);
