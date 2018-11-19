// 函数自调用
;
(function () {

    // 需求:
    // 1. 点击垃圾桶, 盖子起飞
    // 2. 显示模态框

    // 找对象
    var delete_boxs = document.querySelectorAll(".delete_box");
    var jd_modal = document.querySelector(".jd_modal");
    var cancel = document.querySelector(".jd_modal .cancel");

    // 存储当前盖子飞起的 桶
    var currentBox;

    // 给所有的桶添加点击事件
    delete_boxs.forEach(function (v, i) {
        v.addEventListener("click", function () {

            // 盖子起飞
            this.classList.add("current");

            // 显示模态框
            jd_modal.style.display = "block";

            // 存储盖子飞起的桶
            currentBox = this;
        })
    });


    // 取消效果
    cancel.addEventListener("click", function () {

        // 关闭模态框
        jd_modal.style.display = "none";

        // 盖上盖子, 移除自己的 current类
        currentBox.classList.remove("current");

    })




})();