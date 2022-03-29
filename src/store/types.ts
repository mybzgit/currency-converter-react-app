export type CodeType = {
    code: string;
    description: string;
};

export type ConversionRate = {
    [name: string]: number;
};

export type SupportedCodesResponse = {
    result: string;
    supported_codes: [string, string][];
};

export type ConversionRatesResponse = {
    result: string;
    base_code: string;
    conversion_rates: ConversionRate;
};
