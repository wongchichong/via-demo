"use strict"

//first line before voby initialization
import * as React from 'voby/via'
import { ViaClass } from 'via'
import { $, useEffect, render, } from 'voby/via'


declare global {
    interface Window {
        audioContext: AudioContext
        audioBuffer: AudioBuffer
    }
}

const Via = self.Via
const via: ViaClass & Window & typeof globalThis & { audioContext?: AudioContext } = self.via
const get = self.get

self.addEventListener("message", e => {
    if (e.data === "start") {
        Via.postMessage = (data => {
            try {
                self.postMessage(data)
            }
            catch (error) {
                console.error(error)
                debugger
            }
        })
        Start()
    }
    else {
        Via.onMessage(e.data)
    }
})

const F = () => { //comp
    const h = $(1)
    return <span>
        <span>FFFF</span>
        <h3>{h()}</h3>
        <button onClick={() => {
            h(h() + 1)
        }}>H+</button>
    </span>
}


const G = () => { //comp
    const h = $(1)
    const c = $('#' + (h() * 100))

    return <span>
        <span>Style (Color Changed)</span>
        <h3 style={{ color: c }} value={h}>{c}</h3>
        <button onClick={() => {
            h(h() + 1)
            c('#' + (h() * 100))
        }}>H+</button>
    </span>
}

const D = () => { //comp
    const state = $(0)

    return <span>
        <span>DDDD</span>
        <h3>{state()}</h3>
        <button onClick={() => {
            state(state() + 1)
        }}>D+</button>

        <button onClick={async () => { /* console.log('Inc'); */ state(state() + 1) }}>Inc</button>
        <button onClick={async () => { /* console.log('Dec'); */ state(state() - 1) }}>Dec</button>
    </span>
}

const J = () => { //comp
    const h = $(1)

    return <span>
        <span>JJJJ</span>
        <h3>{h()}</h3>
        <button onClick={() => {
            h(h() + 1)
        }}>H+</button>
    </span>
}


const Label = ({ label, ...p }: { label?: string }) => {
    return <div>
        <span>{label}</span>
    </div>
}


const Comp = () => {
    const state = $(1)
    const h = $(1)
    const t = $(1)

    useEffect(() => {
        console.log("State:" + state())
    })

    return <div>
        <h3><F /></h3>
        <h3> <J /></h3>
        <span>CCCC</span>
        <h3>{h()} {state()} {t()}</h3>

        <button onClick={async () => { /* console.log('Inc');  */state(state() + 1); if (state() % 2 === 0) h(h() + 1) }}>Inc</button>
        <button onClick={async () => { /* console.log('Dec');  */state(state() - 1); if (state() % 2 === 0) t(t() - 1) }}>Dec</button>
    </div>
}

async function OnClick(e: { clientX: any; clientY: any }) {
    const [x, y] = await Promise.all([
        get(e.clientX),
        get(e.clientY)
    ])

    console.log("[Worker] Click event at " + x + ", " + y)

    const source = via.audioContext.createBufferSource()
    source.buffer = self.audioBuffer
    source.connect(via.audioContext.destination)
    source.start(0)
}

async function Start() {
    const document = via.document

    // Demo of retrieving DOM property values
    const [docTitle, docUrl, nodeType] = await Promise.all([
        get(document.title),
        get(document.URL),
        get(document.body.nodeType)
    ])

    console.log("Document title is: " + docTitle + ", URL is: " + docUrl)


    //dom
    // {
    //     const h1 = document.createElement("h1")
    //     h1.textContent = "Via.js - using DOM in worker"
    //     document.body.appendChild(h1)

    //     const p = document.createElement("p")
    //     p.textContent = "This page's contents and logic, including this text, was created by a Web Worker using APIs almost identical to the usual DOM APIs. In this case the controller is the worker, and the receiver is the DOM. To demonstrate the flexibility of the approach, the button below uses the Web Audio API to load and play a sound effect when clicked. The entire process, from creating the button, attaching an event handler, running the callback, creating an AudioContext, decoding the audio, creating audio buffers and nodes, and starting playback of the sound, is controlled entirely by the worker."
    //     document.body.appendChild(p)

    //     const button = document.createElement("button")
    //     button.textContent = "Click me"
    //     button.style.fontWeight = "bold"
    //     button.addEventListener("click", OnClick)
    //     document.body.appendChild(button)

    //   }

    const EE = <div>
        {/* <h1>
            Via.js - using DOM in worker
        </h1>
        <p>
            This page's contents and logic, including this text, was created by a Web Worker using APIs almost identical to the usual DOM APIs. In this case the controller is the worker, and the receiver is the DOM. To demonstrate the flexibility of the approach, the button below uses the Web Audio API to load and play a sound effect when clicked. The entire process, from creating the button, attaching an event handler, running the callback, creating an AudioContext, decoding the audio, creating audio buffers and nodes, and starting playback of the sound, is controlled entirely by the worker.
        </p>
        <button style={{ fontWeight: 'bold' }} onClick={OnClick}>
            Click me
        </button> */}

        {/* <Label label='11111' />
        <Label label='22222' />
        <Comp /> */}
        <G />
        {/* <br />
        <F />
        <br />
        <D />
        <br />
        DIV
        <br />
        <F />
        <br />
        <F />
        <br />
        <div>abcd</div>
        <br />
        DIV */}
    </div>
    render(EE, document.body)

    via.audioContext = new via.AudioContext()

    const response = await fetch("sfx5.m4a")
    const arrayBuffer = await response.arrayBuffer()

    via.audioContext.decodeAudioData(arrayBuffer, audioBuffer => {
        self.audioBuffer = audioBuffer
    })
}
