import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let Cartcontext = createContext();
export default function CartContextProvider(probs) {
    const [cardId, setcardId] = useState(null)
    let headers = {
        token: localStorage.getItem('userToken')
    }

    async function getCardId() {
        let { data } = await loggedUserCard();
        setcardId(data?.data._id);
        console.log(cardId);
    }
    useEffect(() => {
        getCardId()
    }, [])

    function loggedUserCard() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers})
            .then((response) => response)
            .catch((error) => error)
    }

    function addToCart(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            { productId: id }, { headers })
            .then((response) => response)
            .catch((err) => err)
    }
    function RemoveCartItem(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
    }
    function UpdateCartQuantity(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, { headers })
            .then((response) => response)
            .catch((error) => error)
    }

    function OnlinePayment(cardId, values) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:3000`, { shippingAddress: values }, { headers })
            .then((response) => response)
            .catch((error) => error)
    }

    return (
        <Cartcontext.Provider value={{ cardId, addToCart, OnlinePayment, loggedUserCard, RemoveCartItem, UpdateCartQuantity }}>
            {probs.children}
        </Cartcontext.Provider>
    )
}


