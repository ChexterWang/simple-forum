const getTimeString = (time, normal=true) => {
    var t = new Date(time);
    var ret = t.getFullYear();
    ret += (normal) ? '/' : '\\';
    ret += (t.getMonth() < 10) ? '0' : '';
    ret += t.getMonth();
    ret += (normal) ? '/' : '\\';
    ret += (t.getDate() < 10) ? '0' : '';
    ret += t.getDate() + ' ';
    ret += (t.getHours() < 10) ? '0' : '';
    ret += t.getHours() + ':';
    ret += (t.getMinutes() < 10) ? '0' : '';
    ret += t.getMinutes();
    return ret;
}

export { getTimeString };