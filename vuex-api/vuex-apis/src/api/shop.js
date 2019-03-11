const _products = [{
        "id": 1, "title": "iPad 4 Mini",
        "price": 499.00,
        "inventory": 2
    },
    {
        "id": 2, "title": "H&M T_Shirt White",
        "price": 4199.00,
        "inventory": 10
    },
    {
        "id": 3, "title": "Charli xcx - Sucker CD",
        "price": 49.00,
        "inventory": 6
    }
]

export const getAllProducts = () => {
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve(_products)
        },100)
    })
}

export const buyProduct = (products,cb,errCb )=>{
    setTimeout(()=>{
        Math.random() > 0.5 ? cb() : errCb()
    },100)
}