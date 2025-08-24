export default async function handler(req, res){
  if(req.method!=='POST') return res.status(405).end();
  const { paymentId, txId } = req.body || {};
  try{
    const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method:'POST',
      headers:{
        'Authorization': `Key ${process.env.PI_API_KEY}`,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ txid: txId })
    });
    const data = await r.json().catch(()=> ({}));
    res.status(r.status).json(data);
  }catch(e){
    res.status(500).json({error:String(e)});
  }
}
