//@ts-nocheck
"use strict"

import 'via/controller'
import 'via/receiver'
import { ViaClass } from 'via'

import MyWorker from './worker?worker'

let worker = null

document.addEventListener("DOMContentLoaded", function () {
    // Create worker
    // worker = new Worker("worker.js")
    worker = new MyWorker()

    // Hook up Via's messages with the worker's postMessage bridge
    worker.onmessage = (e => ViaReceiver.OnMessage(e.data))
    ViaReceiver.postMessage = (data => worker.postMessage(data))

    // Start the worker
    worker.postMessage("start")
})