import zod from "zod";

export const countrySchema = zod.object({
  name: zod.object({
        common: zod.string()
    }),
  region: zod.string(),
  capital: zod.array(zod.string()),
  population: zod.number(),
  flags: zod.object({
        png: zod.string(),
        svg: zod.string()
    })
});

export const Regions = zod.enum([
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
]);

export const AllCountriesSchema = zod.array(countrySchema);

export type ICountry = zod.infer<typeof countrySchema>;
