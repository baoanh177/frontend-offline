//Bai 1
function tinhTienTaxi(km) {
    let price = 0
    if(km <= 1) {
        price = 15000
    }else if(km <= 5) {
        price = 13500
    }else {
        price = 11000
    }
    let total = price * km
    if(km > 120) {
        total -= total * 0.1
    }
    return total
}

console.log("Tien taxi:", tinhTienTaxi(121))
console.log("")

// Bai 2
function tinhTienDien(kw) {
    let total = 0
    if(kw <= 50) {
        total = kw * 1.678
    }else if(kw <= 100) {
        total = 50 * 1.678 + (kw - 50) * 1.734
    }else if(kw <= 200) {
        total = 50 * 1.678 + 50 * 1.734 + (kw - 100) * 2.014
    }else if(kw <= 300) {
        total = 50 * 1.678 + 50 * 1.734 + 100 * 2.014 + (kw - 200) * 2.536
    }else if(kw <= 400) {
        total = 50 * 1.678 + 50 * 1.734 + 100 * 2.014 + 100 * 2.536 + (kw - 300) * 2.834
    }else {
        total = 50 * 1.678 + 50 * 1.734 + 100 * 2.014 + 100 * 2.536 + 100 * 2.834 + (kw - 400) * 2.927
    }
    return total
}

console.log("Tien dien:", tinhTienDien(300))
console.log("")

// Bai 3
function tinhGTBT(n) {
    let total = 0
    for(let i = 1; i <= n; i++) {
        total += i*(i+1)
    }
    return total
}

console.log("Gia tri BT:", tinhGTBT(4))
console.log("")

// Bai 4
function kiemTraSNT(num) {
    if(num < 2) {
        console.log(num, "khong phai so nguyen to")
        return
    }
    for(let i = 2; i < num-1; i++) {
        if(num % i == 0) {
            console.log(num, "khong phai so nguyen to")
            return
        }
    }
    console.log(num, "la so nguyen to")
}

kiemTraSNT(7)
console.log("")

// Bai 5
function hehe(n) {
    count = 1
    for(let i = 1; i <= n; i++) {
        row = ""
        for(let j = 1; j <= i; j++) {
            row += count + " "
            ++count
        }
        console.log(row)
    }
}
hehe(5)
console.log("")

const hphp = () => {
    for(let j = 1; j <= 8; j++) {
        let row = ""
        for(let O = 1; O <=8; O++) {
            if(j % 2 != 0) {
                if(O % 2 != 0) {
                    row += " X "
                }else {
                    row += " O "
                }
            }else {
                if(O % 2 == 0) {
                    row += " X "
                }else {
                    row += " O "
                }
            }
        }
        console.log(row)
    }
}

hphp()
console.log("")

const bangCuuChuong = () => {
    board = 1
    for(let i = 1; i <= 10; ++i) {
        let row = ""
        for(let j = 1; j <= 10; j++) {
            row += `${i} x ${j} = ${i * j}\n`
        }
        console.log(row,"\n")
    }
}

bangCuuChuong()
console.log("")

function abd(n) {
    let result = 0
    for(let i = 1; i <= n; i++) {
        result += 1/i
    }
    console.log(result)
}

abd(2)

