var dsnv = new danhSachNhanVien();
var validation = new Validation();
getLocalStorage();

// xử lý form khi thêm nv mới
document.getElementById("btnThem").addEventListener("click", function(){
    document.getElementById("msnv").removeAttribute("disabled");
    document.getElementById("formNV").reset();

    // xử lý button
    document.getElementById("btnThemNV").style.display = "block";
    document.getElementById("btnCapNhat").style.display = "none";
});
document.getElementById("btnSua").addEventListener("click", function(){
    document.getElementById("btnThemNV").style.display = "none";
    document.getElementById("btnCapNhat").style.display = "block";
});


function layThongTin() {
    var ma = document.getElementById("msnv").value;
    var hoTen = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var matkhau = document.getElementById("password").value;
    var ngay = document.getElementById("datepicker").value;
    var chucVu = document.getElementById("chucvu").value;
    console.log(ma, hoTen, email, matkhau, ngay, chucVu);

    // xử lý kiểm tra dữ liệu thông tin
    var isValid = true;
    // kiểm tra mã nv: nv ko đc rỗng
    // idValid(mới) = isValid(cũ) & validation.kiemTraRong
    isValid &= validation.kiemTraRong(ma, "tbMaNV", "Mã nhân viên không được để trống") && validation.kiemTraMaTrung(ma, dsnv.mangNV ,"tbMaNV", "Mã nhân viên bị trùng");
    isValid &= validation.kiemTraRong(hoTen, "tbTen", "Họ tên nhân viên không được để trống") && validation.kiemTraTen(hoTen, "tbTen", "Tên nhân viên không hợp lệ");
    isValid &= validation.kiemTraRong(email, "tbEmail", "Email nhân viên không được để trống") && validation.kiemTraEmail(email, "tbEmail", "Email không hợp lệ");
    isValid &= validation.kiemTraRong(matkhau, "tbMatKhau", "Mật khẩu nhân viên không được để trống") && validation.kiemTraDoDai(matkhau, "tbMatKhau", "Mật khẩu nhân viên không hợp lệ", 8, 10);
    isValid &= validation.kiemTraRong(ngay, "tbNgay", "Ngày làm nhân viên không được để trống");
    // kiểm tra chức vụ: chon chức vụ phải chọn các option từ vị trí thứ 2 trở đi (index = 1)
    isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "Chưa chọn chức vụ");
    // tất cả thông tin nv đều hợp lệ
    if(isValid == true){
        // thể hiện (instance của đối tượng nhân viên)
        var nv = new NhanVien(ma, hoTen, email, matkhau, ngay, chucVu);
        console.log(nv);
        dsnv.themNhanVien(nv);
        console.log(dsnv.mangNV);
        setLocalStorage(dsnv.mangNV)
    }
}
document.getElementById("btnThemNV").addEventListener("click", function(){
    layThongTin();
    hienThiDanhSach();
});
function hienThiDanhSach(mangNV) {
    var tbody = document.getElementById("tableDanhSach");
    var content = "";
    for (var i = 0; i < mangNV.length; i++){
        content += `
            <tr>
                <td>${mangNV[i].maNV}</td>
                <td>${mangNV[i].hoTenNV}</td>
                <td>${mangNV[i].emailNV}</td>
                <td>${mangNV[i].ngayLam}</td>
                <td>${mangNV[i].chucVuNV}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${dsnv.mangNV[i].maNV}')">Xóa</button>
                    <button id="btnSua" class="btn btn-success" onclick="suaNhanVien('${dsnv.mangNV[i].maNV}')" data-toggle="modal" data-target="#myModal">Sửa</button>
                </td>
            </tr>
        `;
    }
    tbody.innerHTML = content;
}
function themNhanVien(){
    layThongTin();
    hienThiDanhSach();
} 
// lưu danh sách xuống local storage
function setLocalStorage(mangNV){
    // chuyển từ mảng về JSON để lưu xuống localStorage
    localStorage.setItem("DSNV", JSON.stringify(mangNV));
}
//lấy danh sách nhân viên từ local storage
function getLocalStorage(){
    // chuyển từ JSON về mảng để hiện lên table
    if(localStorage.getItem("DSNV") != null){
        // nếu có DSNV trong local storage thì mới lấy lên và lưu vào mảng
        var ds = JSON.parse(localStorage.getItem("DSNV"));
        dsnv.mangNV = ds;
        hienThiDanhSach(dsnv.mangNV);
    }
}
// hàm xóa nhân viên
function xoaNhanVien(ma){
    dsnv.xoaNV(ma);
    hienThiDanhSach(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);
}
function suaNhanVien(ma) {
    var nv = dsnv.layThongTinNV(ma);
    // console.log(nv);
    document.getElementById("msnv").setAttribute('disabled', true);
    document.getElementById("msnv").value = nv.maNV;
    document.getElementById("name").value = nv.hoTenNV;
    document.getElementById("email").value = nv.emailNV;
    document.getElementById("password").value = nv.password;
    document.getElementById("datepicker").value = nv.ngayLam;
    document.getElementById("chucvu").value = nv.chucVuNV;//function hienThi.emailNV
}
document.getElementById("btnCapNhat").addEventListener('click', function(){
    var ma = document.getElementById("msnv").value;
    var hoTen = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var matkhau = document.getElementById("password").value;
    var ngay = document.getElementById("datepicker").value;
    var chucVu = document.getElementById("chucvu").value;
    console.log(ma, hoTen, email, matkhau, ngay, chucVu);
    // thể hiện (instance của đối tượng nhân viên)
    var nv = new NhanVien(ma, hoTen, email, matkhau, ngay, chucVu);
    console.log(nv);
    dsnv.capNhatNV(nv);
    hienThiDanhSach(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);
});
// Khai báo hàm tìm kiếm nhân viên theo tên
document.getElementById("btnTimNV").addEventListener('click', function(){
    // trim: xóa khoảng cách trước và sau của chuỗi
    // nếu keyword có khoảng cách ở giữa chuỗi thì dung replace() để thay thế ký tự của dấu cách bằng kí tự rỗng
    var keyword = document.getElementById("searchName").value.trim();
    var mangKQ = dsnv.timKiemNhanVien(keyword);
    hienThiDanhSach(mangKQ);
});
// Version 2: search ngay khi người dùng gõ từ khóa
document.getElementById("searchName").addEventListener('keyup', function(){
    // trim: xóa khoảng cách trước và sau của chuỗi
    // nếu keyword có khoảng cách ở giữa chuỗi thì dung replace() để thay thế ký tự của dấu cách bằng kí tự rỗng
    var keyword = document.getElementById("searchName").value.trim();
    var mangKQ = dsnv.timKiemNhanVien(keyword);
    hienThiDanhSach(mangKQ);
});