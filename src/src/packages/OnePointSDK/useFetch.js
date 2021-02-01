"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function default_1(onePointSdkFn, initData = [], watch = []) {
    const [data, setData] = react_1.useState(initData);
    const [loading, setLoading] = react_1.useState(true);
    const [isError, setIsError] = react_1.useState(false);
    const recall = () => {
        onePointSdkFn().then((res) => {
            if (res.isError) {
                setIsError(true);
            }
            else {
                setData(res.data);
            }
            setLoading(false);
        });
    };
    react_1.useEffect(() => {
        recall();
    }, watch);
    return { data, loading, isError, setData, recall };
}
exports.default = default_1;
//# sourceMappingURL=useFetch.js.map