export default {
    currentTimeYMDHMS: function() {
        var date = new Date() //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '.'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.'
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
        var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':'
        var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':'
        var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
        return Y + M + D + ' ' + h + m + s
    },
    currentTimeYMDHM: function() {
        var date = new Date() //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
        var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':'
        var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
        return Y + M + D + ' ' + h + m
    },
    currentTimeYMD: function(timestamp) {
        var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + ''
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + ''
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
        var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':'
        var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
        return Y + M + D
    },
    currentTimeYMD_: function(timestamp) {
        var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
        var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':'
        var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
        return Y + M + D
    },
    dateToNum: function(date) {
        let d = new Date(date)
        return d.getTime(d)
    },
    toQfw: function(param) {
        //if (parseInt(param) % 1 != 0) { //非整數
        let arr = param.split('.')
        let str = arr[0].toString()
        let re = /(?=(?!(\b))(\d{3})+$)/g;
        str = str.replace(re, ",");
        return str + '.' + arr[1]
    },
    numToQfw: function(value) {
        if (!value) return '0.00';   
        value = value.toString();
        var intPart = parseInt(Number(value)); //获取整数部分
           
        var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
           
        var floatPart = ".00"; //预定义小数部分
           
        var value2Array = value.split(".");    //=2表示数据有小数位
           
        if (value2Array.length == 2) {    
            floatPart = value2Array[1].toString(); //拿到小数部分
                
            if (floatPart.length == 1) { //补0,实际上用不着
                     
                return intPartFormat + "." + floatPart + '0';    
            } else {     
                return intPartFormat + "." + floatPart;    
            }   
        } else {
            return intPartFormat + floatPart;   
        }
    },
    /**
     * 数字格式化
     * @param s 需要格式化数字  4222.3363
     * @param n 取小数点后位数  2
     * @param comma 是否带逗号   true显示带逗号，false显示不带逗号
     * @param f 是否显示0   true显示0 false显示''
     * @type int
     * @returns 4,222.34或者 4222.34
     */
    fmoney: function(s, n, comma, f) {
        var flag = '0',
            result; //  是否带逗号
        if (!s || s == "") {
            if (f) {
                return 0;
            }
            return '';
        }
        s = s.toString();
        //记录负号标志
        if (s.substring(0, 1) == '-') {
            s = s.substring(1, s.length);
            flag = '1';
        }

        n = n >= 0 && n <= 20 ? n : 2;
        // s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        s = (s + "").replace(/[^\d\.-]/g, "") + "";
        s = s * 1 * Math.pow(10, n);
        let tempInt = parseInt(s) + 0.5;
        if (Math.abs(tempInt - s) < 0.00000001) {
            s = tempInt;
        }
        s = Math.round(s) / Math.pow(10, n);
        s = parseFloat(s + "").toFixed(n) + "";
        if (comma) {
            var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1];
            var t = "";
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            result = t.split("").reverse().join("");
            if (n > 0) {
                result += "." + r;
            }
        } else {
            result = s;
        }

        if (flag == 1)
            result = "-" + result;
        var re = /^(\-)?0.0+$/;
        if (re.test(result)) {
            result = "0";
        }
        if (!f) {
            if (parseFloat(result) == 0)
                result = "";
        }
        return result;
    },
    getNowTime: function(data) {

        //获取当前时间
        if (data) {
            var date = new Date(data);
        } else {
            var date = new Date();
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        var nowDate = year + "-" + month + "-" + day;
        return nowDate;
    },
}

function name(params) {

}