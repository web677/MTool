
const { ipcRenderer } = require('electron')

const $ = require('jquery')
Toast = require('./assets/js/toast')

const {
    filterFiles,
    dealFiles
} = require('./assets/js/files')

var state = 'resolve'

$(document).on({
    dragleave: function (e) {
        e.preventDefault();
    },
    drop: function (e) {
        e.preventDefault();
    },
    dragenter: function (e) {
        e.preventDefault();
    },
    dragover: function (e) {
        e.preventDefault();
    }
});

$(document).on("click", ".J_mtiny_mini", function(){
    ipcRenderer.send("mini-window-main")
})

$(document).on("click", ".J_mtiny_close", function () {
    ipcRenderer.send("close-window-main")
})

$("#J_mtiny_box").on({
    dragenter: function (e) {
        state != 'pending' && stateOver()
    },
    dragleave: function (e) {
       state != 'pending' && stateInit()
    },
    dragover: function(){
        state != 'pending' && stateOver()
    },
    drop: async function (e) {
        if (state == 'pending'){
            Toast.open('处理中，请稍后重试')
            return
        }
        state = 'pending'
        stateDealling()
        let files = e.originalEvent.dataTransfer.files
        let _result = filterFiles(files)
        if (_result && _result.length > 0){
            let _dealInfo = await dealFiles(_result)
            state = 'resolve'
            stateDone(_dealInfo)
        }else{
            state = 'resolve'
            stateInit()
        }
    }
})

function stateInit() {
    $(".J_mtiny_step").removeClass("dealling")
    $(".J_mtiny_tips").text("Drop your .png or .jpg files here!")
    $(".J_mtiny_subtips").text("Up to 20 images, max 5 MB each.").removeClass("red")
}

function stateDealling() {
    $(".J_mtiny_step").addClass("dealling")
    $(".J_mtiny_tips").text("处理中")
    $(".J_mtiny_subtips").addClass("red").text("Up to 20 images, max 5 MB each.")
}

function stateOver() {
    $(".J_mtiny_step").addClass("dealling")
    $(".J_mtiny_tips").text("松开鼠标开始处理")
    $(".J_mtiny_subtips").addClass("red").text("Up to 20 images, max 5 MB each.")
}

function stateDone(dealInfo) {
    let _reduce = dealInfo.initSize - dealInfo.resultSize
    $(".J_mtiny_step").addClass("dealling")
    $(".J_mtiny_tips").text(`已处理${dealInfo.count}个文件`)
    $(".J_mtiny_subtips").removeClass("red").text(`压缩空间${(_reduce / 1024).toFixed(2)}kb；压缩占比${Math.round((_reduce/dealInfo.initSize).toFixed(2) * 100)}%`)
}