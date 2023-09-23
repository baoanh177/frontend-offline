// Bai 1

function timMin(arr) {
    console.group("Bai 1")
    if (Array.isArray(arr)) {
        let min = arr[0]
        for (let i = 0; i < arr.length; i++) {
            if (min > arr[i]) {
                min = arr[i]
            }
        }
        console.log("Min:", min)
    } else {
        console.log("0 phai mang")
    }
    console.groupEnd()
}

timMin([3, 2, 6, 1])

// Bai 2: Cho trước 1 mảng số nguyên, tính trung bình các số nguyên tố trong mảng. 
// Nếu trong mảng không có số nguyên tố thì hiển thị “Không có số nguyên tố”

console.group("Bai 2")
function avgSoNguyenTo(arr) {}

avgSoNguyenTo([1, 2, 3, 4, 5, 7])
console.groupEnd()

// Bai 3: Cho trước 1 mảng bất kỳ, nếu trong mảng có các phần tử trùng nhau thì
// chỉ giữa lại 1 (Gọi là lọc trùng). In ra mảng sau khi đã xử lý

/* Bai 4:
    Cho trước 1 mảng số nguyên và thực hiện các yêu cầu sau
    Sắp xếp mảng theo thứ tự tăng dần
    Chèn thêm 1 số vào bất kỳ vị trí nào trong mảng mà không làm thay đổi thứ tự sắp xếp của mảng

    var numbers = [5, 1, 9, 8, 10];
    var element = 4;

    output: [1, 4, 5, 8, 9, 10]

 */
