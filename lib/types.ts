export interface ApiUser {
    id:number;
    name:string;
    email:string;
    phone:string;

    address? : {
        street : string;
        city : string;
        zipcode : string;
    }
}

export interface User {
    id:number;
    name:string;
    email:string;
    phone:string;
    city:string;
}

export interface BasicInfo {
    name:string;
    email:string;
    phone?:string;
}

export interface AddressInfo {
    street : string;
    city : string;
    zip:string;
}

export interface NewUserForm {
    step : 1 | 2 | 3;
    basicInfo : BasicInfo;
    addressInfo : AddressInfo;
    isComplete : boolean;
}

export interface DashboardState {
    users : User[];
    filteredUsers : User[];
    searchTerm : string;
    isLoading : boolean;
    error : string | null;
}

export interface ValidationResult {
    success : boolean;
    error?:Record<string,string>;
    data?:any;
}

export interface CompleteForm {
    basicInfo : BasicInfo;  
    addressInfo :  AddressInfo;
}