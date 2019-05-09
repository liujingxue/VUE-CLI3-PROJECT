
//保存
export const setLocal = (key, value) => {
    if (typeof value == 'object') {
        value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
}

//取出
export const getLocal = (key) => {
    return localStorage.getItem(key);
}