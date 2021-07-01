import React, { useState, useEffect } from 'react';
import { Screen, View, Button, Text, StyleSheet} from 'react-native';
import  { CardField, useConfirmPayment }  from '@stripe/stripe-react-native';
import cx from '../config/axios'

const Payments = () => {
    
    const [card, setCard] = useState(null)

    const fetchPaymentIntentClientSecret = async () => {
        try {
            const response = await fetch('http://192.168.5.59:4000/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currency: 'usd',
                }),
            });
            const { clientSecret } = await response.json()
            return clientSecret;
        } catch (error) {
            console.log(error)
        }
    }

    
    const {confirmPayment, loading} = useConfirmPayment();
    const handlePayPress = async () => {

        if (!card) {
            return console.log('detalle con la tarjeta');
        }

        // Gather the customer's billing information (e.g., email)
        const BillingDetails = {
            email: 'jenny.rosen@example.com',
        }
        // Fetch the intent client secret from the backend
        const clientSecret = await fetchPaymentIntentClientSecret();
        // Confirm the payment with the card details
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
            type: 'Card',
            BillingDetails,
        });

        if (error) {
            console.log('Payment confirmation error', error);
        } else if (paymentIntent) {
            console.log('Success from promise', paymentIntent);
        }
    };

    return (
        <View style={styles.root}>
            <CardField
                postalCodeEnabled={true}
                placeholder={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                }}
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                    setCard(cardDetails);
                }}
                onFocus={(focusedField) => {
                    console.log('focusField', focusedField);
                }}
            />
            
            <Button onPress={handlePayPress} title="Pay" disabled={loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: 40

    },
    card: {
        
    },
    button: {
        color: '#000'
    },
})

export default Payments