'use client'
import React, { useEffect } from 'react'
import Prayer from './prayer'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const Main = () => {
  const [city, setCity] = React.useState('Cairo');
  const [data, setData] = React.useState("17 محرم 1446")
  const [datetwo , setDatatwo] = React.useState("25 اكتوبر 2024")
  const [timings, setTimings] = React.useState({
  Fajr: "04:29",
  Sunrise: "06:09",
  Dhuhr: "13:01",
  Asr: "16:38",
  Sunset: "19:53",
  Maghrib: "19:53",
  Isha: "21:22",
  })
  const getData = async () => {
    const res = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=egypt&method=8`)
    const data = await res.json()
    setTimings(data.data.timings)
    setData(`${data.data.date.hijri.day} ${data.data.date.hijri.month.ar} ${data.data.date.hijri.year}`)
    setDatatwo(`${data.data.date.gregorian.day} ${data.data.date.gregorian.month.en} ${data.data.date.gregorian.year}`)
  }
  useEffect(() => {
    getData()
  }, [city])
  const cites = [
    {
      id: 1,
      displayName: "القاهرة",
      code: "cairo"
    },
    {
      id: 2,
      displayName: "الاسكندرية",
      code: "alex"
    },
    {
      id: 3,
      displayName: "اسوان",
      code: "aswan"
    },
    {
      id: 4,
      displayName: "الغردقة",
      code: "Hurghada"
    },
    {
      id: 5,
      displayName: "الفيوم",
      code: "fayoum"
    },
    {
      id: 6,
      displayName: "المنيا",
      code: "Minya"
    },
    {
      id: 7,
      displayName: "الاسماعيلية",
      code: "ismailia"
    },
    {
      id: 8,
      displayName: "اسيوط",
      code: "Asyut"
    },
    {
      id: 9,
      displayName: "بني سويف",
      code: "Beni Suef"
    },
    {
      id: 10,
      displayName: "بورسعيد",
      code: "Port Said"
    },
    {
      id: 11,
      displayName: "دمياط",
      code: "Damietta"
    },
    {
      id: 12,
      displayName: "جنوب سيناء",
      code: "South Sinai"
    },
    {
      id: 13,
      displayName: "كفر الشيخ",
      code: "Kafr El-Shaikh"
    },
    {
      id: 14,
      displayName: "مطروح",
      code: "Marsa Matruh"
    },
    {
      id: 15,
      displayName: "المنصورة",
      code: "Mansoura"
    },
    {
      id: 16,
      displayName: "الاقصر",
      code: "Luxor"
    },
    {
      id: 17,
      displayName: "شمال سيناء",
      code: "North Sinai"
    },
    {
      id: 18,
      displayName: "سوهاج",
      code: "Sohag"
    },
    {
      id: 19,
      displayName: "قنا",
      code: "Qena"  
    },
    {
      id: 20,
      displayName: "البحيرة",
      code: "Beheira"
    },
    {
      id: 21,
      displayName: "الدقهلية",
      code: "Dakahlia"
    },
    {
      id: 22,
      displayName: "الشرقية",
      code: "Al-Sharqia"
    },
    {
      id: 23,
      displayName: "القليوبية",
      code: "Al-Qalyubia"
    },
    {
      id: 24,
      displayName: "الغربية",
      code: "Gharbia" 
    },
    {
      id: 25,
      displayName: "الفيوم",
      code: "Faiyum"
    },
    {
      id: 26,
      displayName: "الوادي الجديد",
      code: "The New Valley "
    },
  ]
  const handleChange=(e) => {
    setCity(e.target.value)
  }
  function getTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let time = hours + ':' + minutes;
    return time
  }
  const time = getTime()
  function subtractTimes(time1, time2) {
    // Parse the times into Date objects
    const time1Parts = time1.split(':');
    const time2Parts = time2.split(':');

    const date1 = new Date();
    date1.setHours(parseInt(time1Parts[0], 10));
    date1.setMinutes(parseInt(time1Parts[1], 10));
    date1.setSeconds(0);
    date1.setMilliseconds(0);

    const date2 = new Date();
    date2.setHours(parseInt(time2Parts[0], 10));
    date2.setMinutes(parseInt(time2Parts[1], 10));
    date2.setSeconds(0);
    date2.setMilliseconds(0);

    // Convert to milliseconds
    const time1Ms = date1.getTime();
    const time2Ms = date2.getTime();

    // Subtract the times
    const diffMs = Math.abs(time1Ms - time2Ms);

    // Convert back to hours and minutes
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    // Return the result as a formatted string

    return `${diffHours}h:${diffMinutes}m`;
  }
  return (
    <div className='w-full min-h-[100vh] flex items-center justify-center program'>
      <div className='container mx-auto'>
        <span className='font-bold tracking-[.3rem] text-5xl text-accent font-sans flex items-center justify-center mb-12'>مواقيت الصلوات</span>
        {/* top program */}
        <div className='top_program grid grid-cols-3 border-b-[1px] border-[#d9d9d947] pb-8'>
          <div className='flex flex-col items-center gap-1'>
            <span className='text-3xl font-bold text-white font-sans'>{data}</span>
            <span className='text-3xl font-bold text-accent'>{datetwo}</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <span className='text-3xl font-bold text-white font-sans uppercase'>city</span>
            <span className='text-3xl font-bold text-accent capitalize'>{city}</span>
          </div>
          <div className='flex flex-col items-center gap-1'>
            <span className='text-3xl font-bold text-white font-sans'>الساعه الان</span>
            <span className='text-3xl font-bold text-accent'>
              {
                time
              }
            </span>
          </div>
        </div>
        {/* end top program */}
        {/* Prayers Cards */}
        <div className='grid grid-cols-2 xl:grid-cols-5 gap-8 mt-4'>
          <Prayer img="/fajr-prayer.png" name="الفجر" time={timings.Fajr} />
          <Prayer img="/dhhr-prayer-mosque.png" name="الظهر" time={timings.Dhuhr} />
          <Prayer img="/asr-prayer-mosque.png" name="العصر" time={timings.Asr} />
          <Prayer img="/sunset-prayer-mosque.png" name="المغرب" time={timings.Maghrib} />
          <Prayer img="/night-prayer-mosque.png" name="العشاء" time={timings.Isha}/>
        </div>
        {/* end Prayers Cards */}
        {/* Select */}
        <div className='flex items-center justify-center mt-7'>
          <FormControl className='w-[300px]' >
            <InputLabel className='text-accent '>المدينة</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={city}
              onChange={handleChange}
              label="Age"
              className='text-accent border-[1px] border-accent mt-4'
            >
              {cites.map((city) => (
                <MenuItem key={city.id} value={city.code} className="item capitalize bg-black border-[1px] border-accent text-accent hover:text-black hover:bg-accent transition-all duration-500">{city.displayName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* end Select */}
      </div>
    </div>
  )
}

export default Main