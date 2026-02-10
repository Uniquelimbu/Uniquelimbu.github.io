// ============================================
//  SHARED STATE — Global namespace & DOM refs
// ============================================

window.Valentine = {
    // DOM elements (populated by main.js)
    el: {},

    // Shared state
    state: {
        noAttempts: 0,
        yesBtnScale: 1,
        noBtnTarget: { x: 0, y: 0 },
        noBtnPos:    { x: 0, y: 0 },
        escaped:     false,
        faceTimeout: null,
        answered:    false,
        mouseX:      window.innerWidth / 2,
        mouseY:      window.innerHeight / 2,
        currentEmotion: '',   // tracks the active chase emotion
        hoveringYes: false,   // true while mouse is over YES button
    },

    // Sassy messages
    sassyMessages: [
        "Haha nice try! 😏",
        "Nope, can't click that! 💅",
        "That button is scared of you! 😂",
        "Seriously? Try again 😤",
        "The NO button said 'byeee' 👋",
        "It's running away! 🏃‍♀️💨",
        "You really thought?? 😭💀",
        "Just click YES already! 🥺",
        "NO is not an option babe 💕",
        "I trained this button well 😌",
        "One more try won't help 😘",
        "Accept your fate 💝",
        "Resistance is futile! 💖",
        "The YES button is getting lonely 🥹",
        "You know you want to say YES! 😍",
        "...are you done yet? 😂",
        "It's sneaky! 🐇",
        "Just give in already 🏅",
    ],
};
