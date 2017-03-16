$(document).ready(function () {
    //提交表单
    (function () {
        var obj = {};
        $(".submit").on("click", function () {
            var pass = true;
            //填充
            $(".form").find("input").each(function () {
                var thisObj = this;
                if ($(this).val() == this.defaultValue || $(this).val().trim() == "") {
                    pass = false;
                    layer.alert('必须输入', {
                        yes: function (e) {
                            layer.closeAll();
                            $(thisObj).focus();
                        }
                    });
                    return false;
                }

                if ($(this).attr("name") == "Tel" && !$(this).val().isPhone() && !$(this).val().isMobile()) {
                    pass = false;
                    layer.alert('请输入合法联系方式. 11位手机号, 或区号-座机', {
                        yes: function (e) {
                            layer.closeAll();
                            $(thisObj).focus();
                        }
                    });
                    return false;
                }
                obj[$(this).attr("name")] = $(this).val();
            });


            //开始提交
            if (pass) {
                $.post("/About/Save/?t=" + new Date().getTime(),
                    obj,
                    function (d, t, x) {
                        if (d == "") {
                            //成功
                            layer.alert("录入成功.");
                            $("#form").get(0).reset();
                        } else {
                            layer.alert(d);
                        }
                    });
            }
            return false;
        });
    })();
});