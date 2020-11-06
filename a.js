let paymentRequestTimeout;
if (!window.PaymentRequest) {
   // paymentRequest not supported for this browser.
   return;
 }
 paymentRequestTimeout = setTimeout(() => {
   //send timeout event
 }, 2500);
 
 const paymentRequest = new PaymentRequest([{
  supportedMethods: "https://mercury.phonepe.com/transact/pay"
}], transactionDetails);
 
 const hasEnrolledInstrument = typeof paymentRequest.hasEnrolledInstrument === 'function';
 
 if (hasEnrolledInstrument) {
  paymentRequest.hasEnrolledInstrument()
  .then(result => {
 		//In success 
 		clearTimeout(paymentRequestTimeout);
  })
  .catch(() => { clearTimeout(paymentRequestTimeout); });
} else {
  paymentRequest.canMakePayment()
  .then(result => {
     //In success
     clearTimeout(paymentRequestTimeout);
   })
  .catch(() => { clearTimeout(paymentRequestTimeout); });
}
