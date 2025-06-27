import Overlay from "@/components/ui/Overlay";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import useCountryStore from "@/store/useCountryStore";
import { debounce } from "lodash";
import { ICountry } from "@/types/misc";
import { FormikProps } from "formik";

interface Props {
  close: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
}

const CountryCodeModal = ({ close, formik }: Props) => {
  const { countries, fetchCountries } = useCountryStore();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const debouncedFetch = debounce(async (query) => {
      await fetchCountries(query);
      setLoading(false);
    }, 500);

    debouncedFetch(search);

    return () => debouncedFetch.cancel();
  }, [search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredCountries: ICountry[] = useMemo(() => {
    return countries.filter((country) =>
      country.country_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, countries]);

  const handleSelect = (country: ICountry) => {
    formik.setFieldValue("country_id", country.country_id);
    formik.setFieldValue("country_name", country.country_name);
    close();
  };

  return (
    <Overlay width="400px" close={close}>
      <div className="flex flex-col  h-full py-8 px-5 ">
        <h5 className="text-raiz-gray-950 text-xl font-bold  leading-normal">
          Select your Country
        </h5>
        <div className="relative h-12 min-w-[300px]  mt-[15px] mb-[30px]">
          <Image
            className="absolute top-3.5 left-3"
            src={"/icons/search.svg"}
            alt="search"
            width={22}
            height={22}
          />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search"
            className="pl-10 h-full bg-[#fcfcfc] rounded-[20px] border border-raiz-gray-200 justify-start items-center gap-2 inline-flex w-full outline-none text-sm"
          />
        </div>

        {/* Countries */}
        <div className="flex flex-col gap-[20px] font-brSonoma h-[287px] md:h-[350px] overflow-y-scroll ">
          {loading ? (
            <p className="text-center text-sm text-raiz-gray-600">
              Loading countries...
            </p>
          ) : filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <button
                onClick={() => handleSelect(country)}
                key={index}
                className="flex justify-between hover:bg-slate-100 p-3 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <Image
                    className="w-[22px] h-[15px] rounded-full"
                    src={country.country_flag}
                    alt={country.country_name}
                    width={22}
                    height={15}
                  />
                  <span className="text-raiz-gray-950 text-sm font-semibold">
                    {country.country_name}
                  </span>
                </div>
                <span className="text-raiz-gray-600 text-[13px] font-semibold">
                  {country.area_code}
                </span>
              </button>
            ))
          ) : (
            <p className="text-center text-sm text-raiz-gray-600">
              No countries found
            </p>
          )}
        </div>
      </div>
    </Overlay>
  );
};

export default CountryCodeModal;
