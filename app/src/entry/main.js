const {
    ipcRenderer
} = require('electron')
const fs = require('fs')
const path = require('path')
const url = require('url')

const $ = require('jquery')

const $webview = $('.J_main_webview')

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

$(document).on("click", ".J_mtool_mini", function () {
    ipcRenderer.send("window-main-mini")
})

$(document).on("click", ".J_mtool_close", function () {
    ipcRenderer.send("window-main-close")
})

$(document).on("click", ".J_mtool_sites", function () {
    $webview.attr('src', 'sites.html')
})

$(document).on("click", ".J_mtool_mock", function () {
    $webview.attr('src', 'mock.html')
})

$(document).on("click", ".J_mtool_tiny", function () {
    $webview.attr('src', 'tiny.html')
})

