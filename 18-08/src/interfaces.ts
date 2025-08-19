import zod from 'zod'

export const countrySchema = zod.object({
    name: zod.string(),
    region: zod.string(),
    capital: zod.string(),
    population: zod.string(),
    flags: zod.string()
})

export const Regions = zod.enum([
   'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
])

export const AllCountriesSchema = zod.array(countrySchema);

export type ICountry = zod.infer<typeof countrySchema>;