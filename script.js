*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:'Inter',sans-serif;
    background:#0b0b0b;
    color:#f5f5f5;
}

/* GLOBAL */

.hidden{
    display:none;
}

h1{
    font-size:42px;
    font-weight:800;
    color:#d4af37;
    letter-spacing:2px;
}

h2{
    color:#d4af37;
    margin-bottom:24px;
    font-size:30px;
}

.logo-ball{
    font-size:38px;
}

.logo-area{
    text-align:center;
    margin-bottom:30px;
}

.logo-area p{
    color:#9a9a9a;
    margin-top:8px;
}

/* AUTH + CONNECT */

#auth-screen,
#league-connect-screen{
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:
    linear-gradient(
        180deg,
        #111111 0%,
        #070707 100%
    );
}

.auth-card,
.connect-card{
    width:420px;
    background:#151515;
    border:1px solid #262626;
    border-radius:20px;
    padding:40px;
    box-shadow:
    0 12px 35px rgba(0,0,0,.45);
}

input,
select{
    width:100%;
    background:#101010;
    color:white;
    border:1px solid #333;
    border-radius:12px;
    padding:14px;
    margin-bottom:18px;
    font-size:15px;
    transition:.25s;
}

input:focus,
select:focus{
    outline:none;
    border-color:#d4af37;
    box-shadow:
    0 0 12px rgba(212,175,55,.25);
}

input:disabled{
    opacity:.5;
    cursor:not-allowed;
}

label{
    display:block;
    margin-bottom:10px;
    color:#d4af37;
    font-weight:600;
}

.helper-text{
    font-size:13px;
    line-height:1.6;
    color:#8d8d8d;
    margin-top:-5px;
    margin-bottom:22px;
}

.small-text{
    text-align:center;
    color:#888;
    margin-top:16px;
    margin-bottom:12px;
}

/* BUTTONS */

button{
    border:none;
    cursor:pointer;
    transition:.25s;
}

#login-btn,
#connect-btn,
.gold-btn{
    width:100%;
    background:#d4af37;
    color:#111;
    padding:14px;
    border-radius:12px;
    font-weight:700;
    font-size:15px;
}

#login-btn:hover,
#connect-btn:hover,
.gold-btn:hover{
    background:#e3bf4b;
    transform:translateY(-2px);
}

.secondary-btn{
    width:100%;
    background:transparent;
    border:1px solid #3b3b3b;
    color:#d4af37;
    padding:14px;
    border-radius:12px;
}

.secondary-btn:hover{
    background:#1b1b1b;
}

/* HEADER */

header{
    background:#121212;
    border-bottom:1px solid #232323;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:18px 40px;
    position:sticky;
    top:0;
    z-index:100;
}

.brand{
    display:flex;
    align-items:center;
    gap:12px;
}

.brand-name{
    font-size:24px;
    font-weight:800;
    color:#d4af37;
    letter-spacing:1px;
}

/* NAV */

nav{
    display:flex;
    gap:10px;
}

.tab-btn{
    background:transparent;
    color:#b8b8b8;
    padding:10px 18px;
    border-radius:10px;
    font-weight:600;
}

.tab-btn:hover{
    background:#1c1c1c;
    color:#d4af37;
}

.tab-btn.active{
    background:#d4af37;
    color:#111;
}

/* CONTENT */

.tab-content{
    display:none;
    padding:35px;
}

.tab-content.active{
    display:block;
}

.card{
    background:#171717;
    border:1px solid #262626;
    border-radius:18px;
    padding:26px;
    margin-bottom:24px;
    box-shadow:
    0 6px 18px rgba(0,0,0,.35);
}

.card h3{
    color:#d4af37;
    margin-bottom:18px;
}

/* TABLES */

table{
    width:100%;
    border-collapse:collapse;
}

th{
    background:#101010;
    color:#d4af37;
    text-align:left;
    padding:14px;
}

td{
    padding:14px;
    border-bottom:1px solid #252525;
}

tr:hover{
    background:#1a1a1a;
}

/* LOCK */

.locked-card{
    margin-top:22px;
    background:#101010;
    border:1px dashed #555;
    border-radius:12px;
    padding:18px;
    color:#7f7f7f;
    text-align:center;
}

.trade-result{
    margin-top:18px;
    color:#d4af37;
    font-weight:600;
}

.player-card{
    margin-top:24px;
    background:#111;
    border:1px solid #282828;
    border-radius:16px;
    padding:22px;
}

.player-card h3{
    color:#d4af37;
    margin-bottom:8px;
}

.grade-box{
    margin-top:18px;
    background:#d4af37;
    color:#111;
    padding:14px;
    border-radius:10px;
    font-weight:700;
}

/* MOBILE */

@media(max-width:850px){

    header{
        flex-direction:column;
        gap:18px;
    }

    nav{
        flex-wrap:wrap;
        justify-content:center;
    }

    .auth-card,
    .connect-card{
        width:92%;
    }

    .tab-content{
        padding:20px;
    }
}
