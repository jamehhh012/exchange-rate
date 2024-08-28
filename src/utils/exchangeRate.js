
/**
 * 获取最新汇率
 * @param {string} inCountry - 输入的货币符号。
 * @param {string} outCountry - 输出的货币符号。
 * @return {number} - 返回的汇率值。
 */
const updateExchangeRate = (inCountry, outCountry) => {
    console.log(inCountry, outCountry);
    // 生成一个在 0.1 到 5 之间的随机汇率
    const minRate = 0.1;
    const maxRate = 5;
    const randomRate = Math.random() * (maxRate - minRate) + minRate;
    return randomRate
}
const formatterAmount = (value) => {
    // 限制只能填入数字
    value = value.replace(/[^0-9.]/g, "");

    // 如果以小数点开头，补充0
    if (/^\.$/.test(value)) {
        value = "0" + value;
    }
    // 移除前导零（对于整数部分），确保结果符合要求
    value = value.replace(/^0+(?=\d)/, "");
    // 对数字进行千分位分割
    value = `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //多个小数点只取第一个
    value = value.replace(/\.{2,}/g, ".");
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    // 限制小数点后最多两位
    value = value.replace(/(\.\d{2})\d+/, "$1");
    return value;
}


export {
    updateExchangeRate,
    formatterAmount

}
