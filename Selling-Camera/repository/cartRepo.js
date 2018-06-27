exports.add = (cart, item) => {
    for (i = cart.length - 1; i >= 0; i--) {
        if (cart[i].proID === item.proID) {
            cart[i].proQuantity += item.proQuantity;
            return;
        }
    }
    cart.push(item);
}

exports.remove = (cart, proID) => {
    for (var i = cart.length - 1; i >= 0; i--) {
        if (proID === cart[i].proID) {
            cart.splice(i, 1);
            return;
        }
    }
}

exports.change = (cart, item) => {
    for (i = cart.length - 1; i >= 0; i--) {
        if (cart[i].proID === item.proID) {
            cart[i].proQuantity = item.proQuantity;
            return;
        }
    }
}
