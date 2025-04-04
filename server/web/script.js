async function clicked(){
    var pay_amount = document.getElementById("payamount").value;
    if(pay_amount == 0 || pay_amount == null){
        alert("No payment amount was entered");
        return;
    }
    const link = fetch('/getlink', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            PAY: pay_amount,
            WEB_URL: window.location.href
        })
    }).then(async (res) =>{
        if(res.ok){
            const responce = await res.json();
            window.location = responce.url;
        }else alert("an error has occured");
    });
}