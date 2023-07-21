const express = require('express');
const app = express();
const path = require('path');

app.get('/app', (req,res)=>{
    const dbReq = indexedDB.open('opentutorials',1);
    let db;
    dbReq.addEventListener('success', function(event){
        db = event.target.result;
    });
    dbReq.addEventListener('error', function(event){
        const error = event.target.error; 
        console.log('error', error.name);
    });            
    dbReq.addEventListener('upgradeneeded', function(event){
        db = event.target.result;  
        let oldVersion = event.oldVersion;
        if(oldVersion < 1){
            db.createObjectStore('topics', {keyPath:'id', autoIncrement:true});
        } 
    });
    let store = db.transaction('topics', 'readwrite').objectStore('topics');
    let utc_wal = document.querySelector('#utc_wal').value;
    let email = document.querySelector('#email').value;
    let eth_wal = document.querySelector('#eth_wal').value;
    let amount = document.querySelector('#amount').value;
    let txid = document.querySelector('#txid').value;
    let kla_wal = document.querySelector('#kla_wal').value;

    if(utc_wal == null || utc_wal == '') {
        alert('UTC를 보낼 지갑 주소를 입력해주세요.')
        return;
    }
    if(email == null || email == '') {
        alert('이메일을 입력해주세요.')
        return;
    }
    if(eth_wal == null || eth_wal == '') {
        alert('보낸 지갑주소(이더리움)을 입력해주세요.')
        return;
    }
    if(amount == null || amount == '') {
        alert('보낸 수량을 입력해주세요.')
        return;
    }
    if(txid == null || txid == '') {
        alert('TXID(Transaction_ID)를 입력해주세요.')
        return;
    }
    if(kla_wal == null || kla_wal == '') {
        alert('받을 지갑주소(클레이튼)을 입력해주세요.')
        return;
    }

    let addReq = store.add({
        'UTC를 보낼 지갑주소': utc_wal,
        '이메일': email,
        '보낸 지갑주소(이더리움)': eth_wal,
        '보낸 수량': amount,
        'TXID(Transaction_ID)': txid,
        '받을 지갑주소(클레이튼)': kla_wal
    });

    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, ()=>{
    console.log('서버 실행 중');
});






