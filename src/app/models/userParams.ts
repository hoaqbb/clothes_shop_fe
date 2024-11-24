export type ParamType = {
    pageNumber: number
    pageSize: number
}

export class UserParams implements ParamType{
    pageNumber = 1
    pageSize = 8
    sortBy = 'created_descending'
}

export class UserProductParams implements ParamType{
    pageNumber = 1
    pageSize = 8
    category = 'all'
    sortBy = 'created_descending'
}

export class AdminOrderParams {
    pageNumber = 1
    pageSize = 8
    sortBy = 'created_descending'
    paymentMethod = 'all'
    status = 'all'
}

export class AdminProductParams implements ParamType{
    pageNumber = 1
    pageSize = 8
    sortBy = 'created_descending'
    category = 'all'
    status = 'all'
}