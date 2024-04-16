// Danh sách các tài khoản đã đăng ký
var registeredAccounts = [
    { username: 'admin', password: 'admin' },
];

// Xử lý sự kiện đăng nhập
function handleLogin(event) {
    // Code xử lý đăng nhập
    event.preventDefault(); // Ngăn chặn việc gửi biểu mẫu

        // Lấy giá trị từ các trường biểu mẫu
        var username = document.querySelector('input[name="uname"]').value;
        var password = document.querySelector('input[name="psw"]').value;

        // Kiểm tra thông tin đăng nhập với danh sách tài khoản đã đăng ký
        var authenticated = registeredAccounts.some(function(account) {
            return account.username === username && account.password === password;
        });

        if (authenticated) {
            // Đăng nhập thành công
            document.getElementById("name").innerHTML = username;
            document.getElementById("wellcome").innerHTML = "Wellcome, "+ username
            document.getElementById("wellcome").style.display= 'block';
            document.getElementById('id01').style.display='none'

          if (username === "admin") {
              // Hiển thị thông tin người dùng lên giao diện
              document.getElementById("hoTen").innerHTML = "Nguyen Thanh Hiep";
              document.getElementById("ngaySinh").innerHTML = "18/07/2004";
              document.getElementById("sdt").innerHTML = "0862xxx517";
              document.getElementById("email").innerHTML = "22641211.hiep.@student.iuh.edu.vn";
          }else{
            document.getElementById("hoTen").innerHTML = "___";
              document.getElementById("ngaySinh").innerHTML = "___";
              document.getElementById("sdt").innerHTML = "___";
              document.getElementById("email").innerHTML = "___";
          }
            document.getElementById("capnhat").disabled = false;
        } else {
            // Đăng nhập thất bại
            alert('Tên người dùng hoặc mật khẩu không đúng!');
        }
}

// Xử lý sự kiện đăng ký
function handleRegister(event) {
    event.preventDefault(); // Ngăn chặn việc gửi biểu mẫu đăng ký

    // Lấy giá trị từ các trường biểu mẫu đăng ký
    var newUsername = document.querySelector('input[name="usernameDK"]').value;
    var newPassword = document.querySelector('input[name="pswDK"]').value;
    var confirmPassword = document.querySelector('input[name="psw-repeat"]').value;

    // Kiểm tra xác nhận mật khẩu
    if (newPassword !== confirmPassword) {
        alert('Mật khẩu nhập lại không khớp!');
        return;
    }

    // Tạo một đối tượng mới chứa thông tin tài khoản đăng ký
    var newAccount = { username: newUsername, password: newPassword };

    // Thêm đối tượng mới vào mảng các tài khoản đã đăng ký
    registeredAccounts.push(newAccount);

    // Thông báo đăng ký thành công và đóng biểu mẫu đăng ký
    alert('Đăng ký thành công!');
    document.getElementById('id02').style.display = 'none';
}
//sử lý họ và tên
function ktTen(){
  var regex = /^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/
  var chuoi = document.getElementById("txtTen").value
  var kq = regex.test(chuoi)
  if (kq) {
    document.getElementById("tbTen").innerHTML = ""
    return true;
  }else{
    document.getElementById("tbTen").innerHTML = "Họ và tên phải được viết không dấu và viết hoa chữ cái đầu"
    return false;
  }
}
//Sử lý ngày tháng năm
function validateDOB() {
var dateString = document.getElementById("txtNS").value;
var tbNS = document.getElementById("tbNS");
var isValid = isValidDOB(dateString);

if (isValid) {
    tbNS.innerHTML = ""; // Xóa thông báo nếu ngày sinh hợp lệ
    return true; // Trả về true nếu hợp lệ
} else {
    tbNS.innerHTML = "Ngày sinh phải ít nhất là 10 năm trước."; // Hiển thị thông báo nếu ngày sinh không hợp lệ
    return false; // Trả về false nếu không hợp lệ
}
}

// Hàm kiểm tra ngày sinh
function isValidDOB(dateString) {
    var today = new Date();
    var dob = new Date(dateString);

    if (isNaN(dob.getTime())) {
        return false;
    }

    var age = today.getFullYear() - dob.getFullYear();
    var monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (age < 10) {
        return false;
    }

    return true;
}
function ktSDT(){
  var regex = /^0[\d]{9}$/;
  var chuoi = document.getElementById("txtSDT").value;
  var kq = regex.test(chuoi);
  if (kq) {
    document.getElementById("tbSDT").innerHTML = ""
    return true;
  } else {
    document.getElementById("tbSDT").innerHTML = "Số điện thoại phải bắt đầu bằng số 0 và gồm 10 chữ số"
    return false;
  }
}

function ktEmail(){
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var chuoi = document.getElementById("txtEmail").value;
  var kq = regex.test(chuoi);
  if (kq) {
    document.getElementById("tbEmail").innerHTML = ""
    return true;
  } else {
    document.getElementById("tbEmail").innerHTML = "Vui lòng nhập Email đúng định dạng"
    return false;
  }
}

function update(){
  if (ktTen() && ktSDT() && ktEmail() && validateDOB()) {
    var ten = document.getElementById("txtTen").value
    var dateString = document.getElementById("txtNS").value;
    var date = new Date(dateString);
    var ngay = date.getDate();
    var thang = date.getMonth();
    thang = thang+1;
    var nam = date.getFullYear();
    var ns = ngay+"/"+thang+"/"+nam;
    var sdt = document.getElementById("txtSDT").value;
    var email = document.getElementById("txtEmail").value;
    
    document.getElementById("hoTen").innerHTML = ten;
    document.getElementById("ngaySinh").innerHTML = ns;
    document.getElementById("sdt").innerHTML = sdt;
    document.getElementById("email").innerHTML = email;
    return true;
  }else{
    alert("Vui lòng điền đầy đủ thông tin");
    return false;
  }
}
document.addEventListener('DOMContentLoaded', function () {
    // Chọn phần tử đăng nhập và đăng ký
    var loginForm = document.getElementById('loginForm');
    var registerForm = document.getElementById('registerForm');
    

    // Gắn hàm xử lý vào sự kiện submit của form đăng nhập
    loginForm.addEventListener('submit', handleLogin);

    // Gắn hàm xử lý vào sự kiện submit của form đăng ký
    registerForm.addEventListener('submit', handleRegister);

  });