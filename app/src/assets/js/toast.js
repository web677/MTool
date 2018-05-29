const $ = require('jquery')

const Toast = module.exports = {
    open(content, toastClass) {
        var $toast = $("#J_singleton_toast")
        var toastOnClass = "text-toast-on"
        var custClass = typeof toastClass === "string" ? toastClass : ''

        if ($toast.length == 0) {
            $toast = $(`<div id="J_singleton_toast" class="text-toast ${custClass}"></div>`).appendTo('body')
        } else {
            $toast[0]['className'] = `text-toast ${custClass}`
        }

        $toast.html(content).removeClass(toastOnClass).css({
            marginLeft: 0
        })

        setTimeout(function () {
            $toast.css({
                marginLeft: Math.round(($(window).width() - ($toast.outerWidth ? $toast.outerWidth() : $toast.width())) / 2) + 'px'
            }).addClass(toastOnClass)
        }, 0)
    }
}
