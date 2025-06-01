import  {z} from 'zod';

export const ApiUserSchema = z.object ({
    id:z.number(),
    name: z.string().min(3 , " Name is Required | atleast 3 Characters"),
    email : z.string().email('Invalid email format'),
    phone : z.string().min(10, "Phone Number is required | 10 chars"),
    address : z.object ({
        street : z.string(),
        city : z.string().min(3,"City is required"),
        zipcode :z.string()
    })
})

export const UserSchema = z.object({
    id:z.number(),
    name: z.string().min(3 , " Name is Required | atleast 3 Characters"),
    email : z.string().email('Invalid email format'),
    phone : z.string().min(10, "Phone Number is required | 10 chars"),
    address : z.object ({
        street : z.string(),
        city : z.string().min(3,"City is required"),
        zipcode :z.string()
    }),
}).transform((apiUser) => ({
    id:apiUser.id,
    name:apiUser.name,
    email:apiUser.email,
    phone:apiUser.phone,
    city:apiUser.address.city
}))

export const BasicInfoSchema = z.object ({
    name : z.string()
    .min(3,"Name must be atleast 3 characters")
    .max(31, "Name must be less 31 characters"),

    email : z.string()
    .email("Please enter a valid email address")
    .min(3,"Email is required"),
    phone : z.string()
    .min(10, "Phone is required")
});

export const AddressInfoSchema = z.object ({
    street: z.string()
    .min(5, "Please enter a complete street address")
    .max(50, "Street address is too long"),
    ciy : z.string()
    .min(3, "City name must be at least 2 characters")
    .max(31, "City name is too long"),
    zip : z.string()
})

export const CompleteFormSchema = z.object({
    basicInfo : BasicInfoSchema,
    addressInfo : AddressInfoSchema,
})

export const SearchSchema = z.object({
    searchTerm : z.string().optional(),
    filterBy : z.enum(['name', 'city', 'all']).default('all')
})

export type User = z.infer<typeof UserSchema>
export type BasicInfo = z.infer<typeof BasicInfoSchema>
export type AddressInfo = z.infer<typeof AddressInfoSchema>
export type CompleteForm = z.infer<typeof CompleteFormSchema>
export type SearchParams = z.infer<typeof SearchSchema>

export function validateBasicInfo(data : unknown){
    return BasicInfoSchema.safeParse(data);
}

export function validateAdressInfo(data : unknown){
    return AddressInfoSchema.safeParse(data);
}

export function validateCompleteForm(data : unknown){
    return CompleteFormSchema.safeParse(data);
}
