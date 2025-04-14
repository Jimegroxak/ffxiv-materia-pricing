export interface ItemInfo {
    name: String | undefined,
    minListingDC: MinListingDC
}

export interface MinListingDC {
    price: number;
    worldName?: String | undefined
    worldId?: Number
}

export interface ApiResponse {
    results: ResultItem | ResultItem[];
}

export interface ResultItem {
    itemId: number;
    nq: {
        minListing: {
            dc: MinListingDC
        }
    }
}

export const itemNameMap = new Map<String, String>([
    ["5664", "Heavens' Eye Materia I"],
    ["5669", "Savage Aim Materia I"],
    ["5674", "Savage Might Materia I"],
    ["5679", "Battledance Materia I"],
    ["5714", "Quickarm Materia I"],
    ["5719", "Quicktongue Materia I"]
])

export const worldNameMap = new Map<Number, String>([
    [404, "Marilith"],
    [405, "Seraph"],
    [406, "Halicarnassus"],
    [407, "Maduin"],
    [408, "Cuchulainn"],
    [409, "Kraken"],
    [410, "Rafflesia"],
    [411, "Golem"]
])