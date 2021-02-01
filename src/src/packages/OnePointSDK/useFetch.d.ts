/// <reference types="react" />
export default function (onePointSdkFn: () => Promise<any>, initData?: any, watch?: any[]): {
    data: any;
    loading: boolean;
    isError: boolean;
    setData: import("react").Dispatch<any>;
    recall: () => void;
};
