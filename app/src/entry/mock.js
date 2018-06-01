(function () {

    const $ = require('jquery')

    const MOCK_URL = "https://api.eshengeshu.com/ajaxMock";
    const REMOVE_HISTORY_URL = "https://api.eshengeshu.com/ajaxRemoveHistory";
    const INIT_HISTORY_URL = "https://api.eshengeshu.com/ajaxGetHistory";
    // const MOCK_URL = "//127.0.0.1:5000/ajaxMock";
    // const REMOVE_HISTORY_URL = "//127.0.0.1:5000/ajaxRemoveHistory";
    // const INIT_HISTORY_URL = "//127.0.0.1:5000/ajaxGetHistory";
    var resultUrl = "";

    class Toast {

        static open(content, toastClass) {
            let $toast = $("#J_singleton_toast");
            let toastOnClass = "text-toast-on";
            let custClass = typeof toastClass === "string" ? toastClass : '';

            if ($toast.length == 0) {
                $toast = $(`<div id="J_singleton_toast" class="text-toast ${custClass}"></div>`).appendTo('body');
            } else {
                $toast[0]['className'] = `text-toast ${custClass}`;
            }

            $toast.html(content).removeClass(toastOnClass).css({
                marginLeft: 0
            });

            setTimeout(function () {
                $toast.css({
                    marginLeft: Math.round(($(window).width() - ($toast.outerWidth ? $toast.outerWidth() : $toast.width())) / 2) + 'px'
                }).addClass(toastOnClass);
            }, 0);
        }
    }

    const editor = CodeMirror.fromTextArea(document.getElementById("J_json_editor"), {
        lineNumbers: true,
        mode: "application/json",
        matchBrackets: true,
        smartIndent: true,
        indentUnit: 4,
        tabSize: 4,
        theme: "eclipse",
        gutters: ["CodeMirror-lint-markers"],
        lint: true
    });

    editor.setValue(
        `{
    "status": 1,
    "data": {

    },
    "info": "success"
}`)
    editor.setSize("100%", 250);

    initHistory();
    $("#J_mock").on("click", mockHander);
    $(".J_copy").on("click", copyResult);
    $(document).on("click", ".J_edit", editHistory)
        .on("click", ".J_remove", removeHistory);


    function mockHander() {
        var jsonText = editor.getValue();
        var protocol = $(".J_protocol:checked").val();
        var des = $("#J_description").val();
        var mockId = $("#J_mock_id").val();

        if (jsonText == "") {
            Toast.open("请输入需要mock的json数据");
            return
        }

        if (CodeMirror.lint.json(jsonText).length > 0) {
            Toast.open("输入json数据格式有误");
            return
        }

        if (protocol == "") {
            Toast.open("请选择接口协议类型");
            return
        }

        if (des == "") {
            Toast.open("请输入接口描述");
            return
        }

        $("#J_result").val("");
        resultUrl = "";

        $.getJSON(MOCK_URL, {
            jsonText: jsonText,
            protocol: protocol,
            des: des,
            mockId: mockId
        }, function (res) {
            if (res.status == 1) {
                $("#J_result").val(res.data.mockUrl);
                $("#J_mock_id").val(res.data.mockId);
                Toast.open("Mock成功！")
            } else {
                Toast.open(res.info)
            }
        })

    }

    function copyResult() {

        if ($("#J_result").val() == "") {
            Toast.open("暂未获取到mock结果");
            return
        }

        document.getElementById("J_result").select();
        try {
            document.execCommand('copy');
            Toast.open("复制成功！")
        } catch (e) {
            Toast.open("按 Ctrl/Command + C 复制！")
        }

    }

    function editHistory() {
        var $parent = $(this).parents(".J_history_item");

        var value = $parent.data("json");
        var mockId = $parent.data("mockid");
        var protocol = $parent.data("protocol");
        var des = $parent.data("des");

        $("#J_mock_id").val(mockId);
        editor.setValue(JSON.parse(value));
        $(`.J_protocol[value='${protocol}']`).prop("checked", true);
        $("#J_description").val(des);

    }

    function initHistory() {
        $.getJSON(INIT_HISTORY_URL, function (res) {
            if (res.status == 1) {
                var _historyHtml = "";
                res.data.history.forEach(function (v) {
                    _historyHtml += `
                        <li class="request-item flex J_history_item" data-mockid='${v.mockId}' data-json='${v.jsonText}' data-protocol="${v.protocol}" data-des="${v.des}" data-invalid="${v.goingInvalid}">
                            <p class="flex-1">${v.url}</p>
                            <p class="flex-1">${v.des}</p>
                            <p class="request-item-remove"><button class="J_edit">编辑</button><button class="J_remove">删除</button></p>
                        </li>
                    `
                })
                $(".J_history").append(_historyHtml);
            }
        })
    }

    function removeHistory() {
        var $parent = $(this).parents(".J_history_item");

        var mockId = $parent.data("mockid");

        $.getJSON(REMOVE_HISTORY_URL, {
            mockId: mockId
        }, function (res) {
            if (res.status == 1) {
                Toast.open("删除成功！");
                $parent.remove();
            } else {
                Toast.open(res.info)
            }
        })
    }

})()