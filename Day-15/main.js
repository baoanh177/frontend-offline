// Bai 1
var a = 2, b = 1
a = a - b
b = a + b
a = b - a
console.log('Bai 1:', a, b)

// Bai 2
var s = 10 + 20 + Math.pow(5, 10) / 2
console.log('Bai 2: 10 + 20 + 5^10 / 2 =', s)
// Bai 3
function timMax(a, b, c) {
    let max = a
    if(b > max) {
        max = b
    }
    if(c > max) {
        max = c
    }
    console.log("Bai 3:", a, b, c, "Max:", max)
}

timMax(7, 5, 6)
// Bai 4
function hehe(a, b) {
    if(a > 0 && b > 0) {
        console.log('Bai 4:', a, b, "Cung dau +")
    }else if (a < 0 && b < 0) {
        console.log('Bai 4:', a, b, "Cung dau -")
    }else if (a == 0 && b == 0) {
        console.log('Bai 4:', a, b, "Cung bang 0")
    }else if(a != 0 && b != 0) {
        console.log('Bai 4:', a, b, "Khac dau")
    }else {
        console.log('Bai 4:', a, b, "Mot so bang 0, mot so khac 0 =)))")
    }
}
hehe(1, -2)
// Bai 5
function sapXep(a, b, c) {
    let soMot, soHai, soBa;
    if(a > b && a > c) {
        soMot = a
    }else{
        a > b || a > c ? soHai = a : soBa = a
    }
        
    if(b > a && b > c) {
        soMot = b
    }else {
        b > a || b > c ? soHai = b : soBa = b
    }

    if(c > b && c > a) {
        soMot = c
    }else {
        c > b || c > a ? soHai = c : soBa = c
    }
    console.log('Bai 5: ', soMot, soHai, soBa)
}

sapXep(3, 6, 5)