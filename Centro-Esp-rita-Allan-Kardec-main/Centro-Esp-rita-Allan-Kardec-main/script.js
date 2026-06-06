const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }

    });

}, {
    threshold: 0.15
});

reveals.forEach(item => {
    observer.observe(item);
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAFR9LgDZQMa3e8UHFNVb8iFknaqGz1pn8",
    authDomain: "centro-espirita-allan-ka-15773.firebaseapp.com",
    projectId: "centro-espirita-allan-ka-15773",
    storageBucket: "centro-espirita-allan-ka-15773.firebasestorage.app",
    messagingSenderId: "401433292217",
    appId: "1:401433292217:web:8e15cbc2f7d14502ff1a68",
    measurementId: "G-968MFVMPKT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase conectado!");

async function carregarMensagem() {

    try {

        const snapshot = await getDocs(
            collection(db, "mensagens")
        );

        const mensagens = [];

        snapshot.forEach((doc) => {
            mensagens.push(doc.data());
        });

        if (mensagens.length === 0) {

            document.getElementById("mensagemTexto").innerText =
                "Nenhuma mensagem cadastrada.";

            return;
        }

        const indice =
            new Date().getDate() % mensagens.length;

        const mensagem = mensagens[indice];

        document.getElementById("mensagemTexto").innerText =
            mensagem.texto || "";

        document.getElementById("mensagemAutor").innerText =
            "— " + (mensagem.autor || "");

        document.getElementById("mensagemObra").innerText =
            mensagem.obra || "";

        document.getElementById("mensagemReferencia").innerText =
            `${mensagem.capitulo || ""} • ${mensagem.pagina || ""}`;

    } catch (erro) {

        console.error("Erro ao carregar mensagem:", erro);

        document.getElementById("mensagemTexto").innerText =
            "Erro ao carregar mensagem.";

    }
}

carregarMensagem();