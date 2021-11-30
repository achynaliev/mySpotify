export const calcSubPrice = (product) => {
    console.log(product.merch)
    return product.count * product.merch.price;
}
export const calcTotalPrice = (cart) => {
    let sum = 0;
    cart.merch.forEach((item) => {
        sum += item.subPrice;

    });
    return sum
}