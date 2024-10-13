export interface OrderRequest{
    fullname: string
    email: string
    phoneNumber: string
    address: string
    shipping: number
    paymentMethod: number
    amount: number
    note: string
}

export interface Order {
    id: number
    amount: number
    status: number
    createAt: string
    address: string
    fullname: string
    phoneNumber: string
    paymentMethod: string
  }

export interface OrderDetail {
    id: number
    note: string
    amount: number
    status: number
    createAt: Date
    updateAt: Date
    address: string
    fullname: string
    phoneNumber: string
    shipping: number
    email: string
    paymentMethod: string
    provider: string
    transactionId: string
    orderItems: OrderItem[]
  }

export interface OrderItem {
    name: string
    photo: string
    color: string
    size: string
    price: number
    quantity: number
    discount: number
}
