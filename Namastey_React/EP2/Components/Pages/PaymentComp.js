import React , {useState , useContext} from 'react';
import GooglePayButton from '@google-pay/button-react';
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "../../Alerts/SnackbarAlert";
import CartContext from '../../Context/CartContext';

const PaymentComp = () => {

    const {clearCart , user} = useContext(CartContext);


    /* setting toast */
  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleClick = (severity, message) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handlePaymentSuccess = (user) => {
    setTimeout(() => {
        handleClick("success", "Payment done successfully");
    }, 1500);
    setTimeout(() => {
        clearCart(user);
    }, 3000);
  };

  return (
      <>
    <GooglePayButton
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100.00',
      currencyCode: 'USD',
      countryCode: 'US',
    },
  }}
  onLoadPaymentData={paymentRequest => {
    console.log('load payment data', paymentRequest);
    handlePaymentSuccess(user);
  }}
/>
<Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      </>
  )
}

export default PaymentComp