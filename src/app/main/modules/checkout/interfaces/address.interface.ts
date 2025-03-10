export interface Address {
    features: Feature[];
}

export interface Feature {
    properties: Properties; 
}


export interface Properties {
    country:            string;
    country_code:       string;
    state:              string;
    county:             string;
    postcode:           string;
   
}

