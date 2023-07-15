import axios from "axios";

export interface Country {
  dialCode: string;
  flag?: string;
  name: string;
}

export const fetchCountries = async (): Promise<Array<Country>> => {
  const { data } = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name,ccn3,flags"
  );
  return data.map((item: any) => ({
    dialCode: `+${item.ccn3}`,
    flag: item.flags.png,
    name: item.name.common,
  }));
};
