import { CardModel } from "../models/CardModel";
import { IorderItem, orderModel } from "../models/OrderModel";
import { ProductModel } from "../models/ProductsModel";

interface CreateCartForUser {
  userId: string;
}

const CreateCartForUser = async ({ userId }: CreateCartForUser) => {
  const Cart = await CardModel.create({ userId, totalAmounds: 0 });
  await Cart.save();
  return Cart;
};

interface GetActiveCartForUser {
  userId: string;
}

export const GetActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await CardModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await CreateCartForUser({ userId });
  }

  return cart;
};

interface AddItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: AddItemToCart) => {
  const cart = await GetActiveCartForUser({ userId });

  // IS THE PRODUCT IS ALREADY IN THE CART
  const productExist = cart.item.find((p) => p.product == productId);

  if (productExist) {
    return { data: "THE PRODUCT IS ALREADY IN THE CART", statuscode: 400 };
  }

  // FETCH THE PRODUCT
  const product = await ProductModel.findById(productId);

  if (!product) {
    return { data: "PRODUCT IS NOT FOUND", statuscode: 400 };
  }

  // STOCK CHECK
  if (product.stock < quantity) {
    return { data: "LOW STOCK IN THE STORE", statuscode: 400 };
  }

  cart.item.push({ product: productId, unitprice: product.price, quantity });

  // UPDATE THE AMOUNTPRICE OF THE CART

  cart.totalAmounds += product.price * quantity;

  const UpdatedCart = await cart.save();

  return { data: UpdatedCart, statuscode: 200 };
};

interface UpdateItemFromCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const UpdateItemFromCart = async ({
  userId,
  productId,
  quantity,
}: UpdateItemFromCart) => {
  const Cart = await GetActiveCartForUser({ userId });
  const productExist = Cart.item.find((p) => p.product.toString() == productId);
  if (!productExist) {
    return { data: "THE PRODUCT IS NOT FOUND", statuscode: 400 };
  }

  const product = await ProductModel.findById(productId);

  if (!product) {
    return { data: "PRODUCT IS NOT FOUND", statuscode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "LOW STOCK IN THE STORE", statuscode: 400 };
  }

  

  const otherItemsInCart = Cart.item.filter((p) => p.product !== productId);

  let total = otherItemsInCart.reduce((sum, product) => {
    sum += product.quantity + product.unitprice;
    return sum;
  }, 0);
  Cart.totalAmounds = total;
  productExist.quantity = quantity;

  total += productExist.quantity * productExist.unitprice;

  const UpdatedCart = await Cart.save();

  return { data: UpdatedCart, statuscode: 200 };
};

interface DeleteItemFromCart{
  userId: string;
  productId: string;
}

export const DeleteItemFromCart = async({userId , productId}: DeleteItemFromCart)=>{

  const cart = await GetActiveCartForUser({userId});

  const IsExist = cart.item.find((p) => p.product.toString() === productId);

  if(!IsExist){
    return{ data: "THE PRODUCT IS NOT EXIST", statuscode: 404 };
  }

  const CartItemsExist = cart.item.filter((p)=> p.product.toString() !== productId);

  const total = CartItemsExist.reduce((sum , product)=>{
    sum += product.quantity * product.unitprice
    return sum;
  },0)

  cart.item = CartItemsExist;

  cart.totalAmounds = total;

  const DeleteItem = await cart.save();
  return { data: DeleteItem , statuscode: 200 };

}

interface ClearCart{
  userId: string;
}


export const ClearCart = async ({userId}: ClearCart)=>{

  const Cart = await GetActiveCartForUser({userId});

  Cart.item = [];
  Cart.totalAmounds = 0;

  const ClearCart = await Cart.save();

  return { data: ClearCart , statuscode:200};

}

interface Checkout {
  userId: string;
  address: string;
}
export const checkout = async ({ userId, address }: Checkout) => {
  if (!address) {
    return { data: "Please add the address", statusCode: 400 };
  }

  const cart = await GetActiveCartForUser({ userId });

  const orderItems: IorderItem[] = [];

  // Loop cartItems and create orderItems
  for (const item of cart.item) {
    const product = await ProductModel.findById(item.product);

    if (!product) {
      return { data: "Product not found", statusCode: 400 };
    }

    const orderItem: IorderItem = {
      producttitle: product.Title,
      productImage: product.Img,
      quantity: item.quantity,
      unitprice: item.unitprice,
    };

    orderItems.push(orderItem);
  }

  const order = await orderModel.create({
    orderItems,
    total: cart.totalAmounds,
    address,
    userId,
  });

  await order.save();

  // Update the cart status to be completed
  cart.status = "completed";
  await cart.save();

  return { data: order, statusCode: 200 };
};