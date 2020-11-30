function Validation(){
    //Kiểm tra rỗng
    this.kiemTraRong = function(value, spanID, message){
        if(value == ""){
            // nếu giá trị bị trống
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display =  "block";
            return false;
        } //giá trị không bị rỗng 
        document.getElementById(spanID).innerHTML = "";
        document.getElementById(spanID).style.display =  "none";
        return true;
    }
    this.kiemTraMaTrung = function(value, mangNV, spanID, message){
        // giả sử chưa tồn tại mã nv
        var isExist = false;
        mangNV.map(function(item, index){
            if(item.maNV === value){
                // mã bị trùng
                // gán lại giá trị isExist thành true (đã tồn tại mã nv)
                isExist = true;
            }
        })
        // mã ko bị trùng
        if(isExist == true){
            // thông báo k hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display =  "block";
            return false;
        }else{
            // thông báo hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display =  "none";
            return true;
        }
        
    }
    this.kiemTraTen = function(value, spanID, message) {
        // khai báo 1 thể hiện của biểu thức Regular Expression
        var pattern = new RegExp(
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
              "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
              "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
        );
        if(pattern.test(value)){
            //tên hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display =  "none";
            return true;
        }else{
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display =  "block";
            return false;
        }
    }
    this.kiemTraEmail = function(value, spanID, message) {
        // biểu thức của regular expression
        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(value.match(mailFormat)) {
            // Nếu email hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display =  "none";
            return true;
        }
        // nếu email không hợp lệ
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display =  "block";
        return false;
    }
    this.kiemTraDoDai = function(value, spanID, message, min, max){
        if(value.length >= min && value.length <= max){
            // Nếu password hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display =  "none";
            return true;
        }
        // Nếu password không hợp lệ
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display =  "block";
        return false;
    }
    this.kiemTraChucVu = function(selectID, spanID, message){
        // selectedIndex
        // nếu lựa chon khác vị trí đầu tiên
        if(document.getElementById(selectID).selectedIndex != 0){
            // nếu hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display =  "none";
            return true;
        }
        // nếu chức vụ k hợp lệ
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display =  "block";
        return false;
    }
}