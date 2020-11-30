function danhSachNhanVien(){
    this.mangNV = [];
    this.themNhanVien = function(nv){
        this.mangNV.push(nv);
    }
    //tìm vị trí của nhân viên trong mảng dựa vào mã nv
    this.timViTri = function(ma){
        var viTri = -1;
        this.mangNV.map(function(item, index){
            // item là 1 nhân viên trong mảng
            //index: vị trí của phần tử trong mảng
            // ma: mã nv cần tìm
            if(item.maNV == ma){
                // tìm thấy nhân viên thì gán vị trí của nv vào biến vị trí
                viTri = index;
            }
        });
        return viTri;
    };
    this.xoaNV = function(ma){
        var viTri = this.timViTri(ma);
        if(viTri > -1){
            this.mangNV.splice(viTri, 1);
        }
    }
    // lấy thông tin của 1 nv
    this.layThongTinNV = function(ma) {
        var viTri = this.timViTri(ma);
        var nhanVien;
        if(viTri > -1){
            // gán nhân viên tìm được trong mảng vào biến nhanVien
            nhanVien = this.mangNV[viTri];
        }
        return nhanVien;
    }
    this.capNhatNV = function(nv){
        var viTri = this.timViTri(nv.maNV);
        if(viTri > -1){
            // đem thông tin mới ghi đè lê thông tin cũ
            this.mangNV[viTri] = nv;
        }
    }
}

// prototype: chứa toàn bộ thuộc tính và phương thức của đối tượng
// prototype thêm thuộc tính và phương thức vào cho lớp đối tượng mà k cần sửa trực tiếp trong lớp đối tượng
danhSachNhanVien.prototype.timKiemNhanVien = function(keyword){
    //mảng kết quả tìm kiếm
    var mangKQ = [];
    //chuyển từ khóa sang kiểu chữ thường để đi so sánh
    keyword = keyword.toLowerCase();
    this.mangNV.map(function(item, index){
        // chuyển tên nv qua kiểu chữ thường
        var tenChuThuong = item.hoTenNV.toLowerCase();
        //indexOf: tìm vị trí của keyword trong tên chữ thường
        // nếu tìm thấy thì sẽ trả về vị trí của keyword
        if(tenChuThuong.indexOf(keyword) != -1){
            //tìm thấy keyword trong tên nhân viên (tenChuThuong)
            // thêm nv tìm thấy vào mảng kết quả
            mangKQ.push(item);
        }
    });
    return mangKQ;
}