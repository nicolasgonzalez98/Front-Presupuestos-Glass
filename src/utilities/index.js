
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDate(date){
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();


    if (month.length < 2) 
    month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    

    return [day, month, year].join('-');
}

export function what_is_the_price(articulo){
    if(articulo.type === 'quantity')return `$${articulo.unity_price} p/${articulo.unity}`

    if(articulo.type === 'bulk')return `$${articulo.area_price} p/${articulo.unity}`

    if(articulo.type === 'weight')return `$${articulo.weight_price} p/${articulo.unity}`
}

export function what_number_price(articulo){
    if(articulo.type === 'quantity')return articulo.unity_price

    if(articulo.type === 'bulk')return articulo.area_price

    if(articulo.type === 'weight')return articulo.weight_price
}

export function monto_total(presupuesto){
    let monto = 0
    let articulos = presupuesto.list_budget
    articulos.map(e => 
        
         monto += parseInt(e.budgetArticle.price)*parseInt(e.budgetArticle.quantity)
    )

    if(presupuesto.iva === 21)return monto*1.21
    if(presupuesto.iva === 10.5)return monto*1.105

    return monto
}

export function ordenar_articulos(articulos){
    let total = []
    let resultado = {}
    articulos?.map(e => {
        resultado.name = e.name
        resultado.quantity = e.budgetArticle.quantity
        resultado.weight = e.budgetArticle.weight
        resultado.width = e.budgetArticle.width
        resultado.height = e.budgetArticle.height
        resultado.price = e.budgetArticle.price
        total.push(resultado)
        resultado = {}
    })
    
    
    return total
}