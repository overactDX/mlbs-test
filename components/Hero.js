import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "./Search";

export default function Hero({}) {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [gender, setGender] = useState([]);
  const [country, setCountry] = useState([]);

  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterCountry, setFilterCountry] = useState("");

  const fetchData = async () => {
    await axios.get("/MOCK_DATA.json").then((res) => {
      setData(res.data);
      let gender = res.data.map((item) => item.gender);
      let uniqueGender = [...new Set(gender)];
      setGender(uniqueGender);

      let country = res.data.map((item) => item.country);
      let uniqueCountry = [...new Set(country)];
      setCountry(uniqueCountry);
    });
  };

  useEffect(() => {
    fetchData();
    if (search || filterGender || filterCountry) {
      checkFilter();
    } else {
      setFilterData(data);
    }
  }, [data, search, filterGender, filterCountry]);

  const onChangeSearch = (e) => {
    setSearch(e);
    setFilterCountry("");
    setFilterGender("");
  };

  const resetInputField = () => {
    setSearch("");
    setFilterCountry("");
    setFilterGender("");
  };

  const clickGender = (e) => {
    setFilterGender(e);
  };

  const clickCountry = (e) => {
    setFilterCountry(e);
  };

  const checkFilter = () => {
    if (search) {
      let filterSearch = data.filter(
        (items) =>
          items.first_name.toLowerCase().includes(search.toLowerCase()) ||
          items.last_name.toLowerCase().includes(search.toLowerCase())
      );
      setFilterData(filterSearch);
    }

    if (filterGender) {
      if (!filterCountry) {
        let gender = data.filter((items) =>
          items.gender.toLowerCase().includes(filterGender.toLowerCase())
        );
        setFilterData(gender);
        setSearch("");
      } else {
        let gender = data.filter(
          (items) =>
            items.gender == filterGender && items.country == filterCountry
        );
        setFilterData(gender);
        setSearch("");
      }
    }

    if (filterCountry) {
      if (!filterGender) {
        let country = data.filter((items) =>
          items.country.toLowerCase().includes(filterCountry.toLowerCase())
        );
        setFilterData(country);
        setSearch("");
      } else {
        let country = data.filter(
          (items) =>
            items.country == filterCountry && items.gender == filterGender
        );
        setFilterData(country);
        setSearch("");
      }
    }
  };

  return (
    <div className="h-full w-full space-y-5 text-black bg-white border-">
      <div className="flex items-center justify-center space-x-3 px-10 pt-10">
        {gender.map((item, i) => (
          <button
            className={`${
              filterGender == item
                ? "text-white bg-black hover:bg-black"
                : "bg-slate-400"
            } h-10 px-5 rounded-none  transition ease-in-out duration-500 hover:bg-black hover:text-white`}
            key={i}
            onClick={() => clickGender(item)}
          >
            <p className="capitalize" key={i}>
              {item}
            </p>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-3 px-10 pt-10">
        {country.map((item, i) => (
          <button
            className={`${
              filterCountry == item
                ? "text-white bg-black hover:bg-black"
                : "bg-slate-400"
            } h-10 px-5 rounded-none transition ease-in-out duration-500 hover:bg-black hover:text-white`}
            key={i}
            onClick={() => clickCountry(item)}
          >
            <p className="capitalize" key={i}>
              {item}
            </p>
          </button>
        ))}
      </div>

      <Search
        onChangeSearch={onChangeSearch}
        resetInputField={resetInputField}
        setSearchValue={search}
      />

      <div className="h-full w-full grid grid-cols-5 gap-10 px-10">
        {filterData.map((item, i) => (
          <div
            className="h-96 w-full flex flex-col justify-center items-center  space-y-3 rounded-xl bg-white border border-text shadow-md transition ease-in-out duration-500 pb-4 "
            key={i}
          >
            <img
              src={item.image}
              alt={item.image}
              className="h-full object-cover"
            />
            <div className="w-full space-y-3 text-center">
              <p>
                {item.first_name} {item.last_name}
              </p>
              <p>{item.gender}</p>
              <p>{item.email}</p>
              <p>{item.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
