import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { formatDate } from '../utilities';






// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  image: {
    width: 75,
    height: 75
  },
  section: {
    flexDirection: 'column',
    margin: 10,
    padding: 10,
    borderBottomColor: 'black',
    borderBottom: 2,
    marginBottom: 1
  },
  title: {
    alignSelf: 'center',
  },
  mail: {
    alignSelf:'flex-end'
  },
  client: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
    borderBottomColor: 'black',
    borderBottom: 2
  },
  date:{
    textAlign:'right'
  },
  headers:{
    marginLeft:10,
    marginTop:5,
    paddingLeft:5,
    fontSize: 16
    
  },
  bottom_section: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between'
  },
  aclaracion: {
    fontSize: 10, 
    maxWidth: 240, 
    border: 2, 
    borderColor: 'black'
  },
  totales: {
    flexDirection: 'column',
    minWidth: 240,
    marginRight: 5,
    justifyContent: 'space-between'
  },
  individuales: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  descripcion: {
    fontSize: 15, 
    minWidth: 240,
    minHeight: 100,
    border: 2, 
    borderColor: 'black'
  }
});

const stylesArticles = StyleSheet.create({
  headers2: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft:10,
    marginTop:5,
    paddingLeft:5,
    fontSize: 16,
    textAlign: 'left',
    
  },
  celda: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    minWidth: 90,
    maxWidth: 100,
    textAlign: 'left'
  },
  articles: {
    flexDirection: 'row',
    marginLeft:10,
    marginTop:5,
    paddingLeft:5,
    fontSize: 14,
    
    position:'absolute'
    
  },
  bottom_table: {
    flexDirection: 'row',
    marginLeft:10,
    marginTop:5,
    paddingLeft:5,
    fontSize: 14,
    position:'absolute',
    borderBottom: 2,
    borderBottomColor: 'black'
  }
})

// Create Document Component
function BudgetPDF({number_budget, articles, client, iva}){
  
  function superficie(){
    let total = 0

    for(let i = 0; i < articles.length; i++){
      total += (articles[i].width * articles[i].height)*parseInt(articles[i].quantity)
    }

    return total 
  }

  function total_weight(){
    let total = 0

    for(let i = 0; i < articles.length; i++){
      
      total += parseFloat(articles[i].weight)*parseInt(articles[i].quantity)
    }

    return total 
  }

  function subprice(){
    let total = 0

    for(let i = 0; i < articles.length; i++){
      total += articles[i].price * articles[i].quantity
    }

    return total 
  }

  function total_con_iva(subprice, iva){
    switch(iva){
      case '0':
        return subprice
      case '10.5':
        return subprice*1.105
      case '21':
        return subprice*1.21
      default:
            return subprice
    }
  }

  let sup_total = superficie()

  let peso_total = total_weight()
  

  let subtotal = subprice()
  
  let total_con_impuestos = total_con_iva(subtotal, iva).toFixed(2)
  
  return (
  <Document>
    
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Presupuesto #{number_budget}</Text>
        <Image style={styles.image} src='./decorglass.jpg' />
        <Text style={styles.mail}>E-Mail de contacto: info.ventas.decorglass@gmail.com</Text>
      </View>
      <View style={styles.client}>
        <Text>Cliente: {`${client.name} ${client.surname}`}</Text>
        <Text>{formatDate(Date.now())}</Text>
        
      </View>
      
      <table style={{borderBottom: 2, borderBottomColor: 'black'}}>
        <thead>
          <tr style={stylesArticles.headers2}>
            <th><Text style={stylesArticles.celda}>Cantidad</Text></th>
            <th><Text style={stylesArticles.celda}>Descr.</Text></th>
            <th><Text style={stylesArticles.celda}>Peso</Text></th>
            <th><Text style={stylesArticles.celda}>Medidas</Text></th>
            <th><Text style={stylesArticles.celda}>Superficie</Text></th>
            <th><Text style={stylesArticles.celda}>Prec p/ Uni.</Text></th>
            <th><Text style={stylesArticles.celda}>Total</Text></th>
          </tr>
        </thead>
        {articles?.map((e, index) => 
          <tr key={index} style={stylesArticles.headers2}>
            <td><Text style={stylesArticles.celda}>{parseInt(e.quantity)}</Text></td>
            <td><Text style={stylesArticles.celda}>{e.name}</Text></td>
            <td><Text style={stylesArticles.celda}>{parseInt(e.weight)}</Text></td>
            <td><Text style={stylesArticles.celda}>{`${e.width}x${e.height}M2`}</Text></td>
            <td><Text style={stylesArticles.celda}>{e.width * e.height}</Text></td>
            <td><Text style={stylesArticles.celda}>{e.price}</Text></td>
            <td><Text style={stylesArticles.celda}>{e.price * e.quantity}</Text></td>
          </tr>
        )}
        <tr style={stylesArticles.headers2}>
          <td>
            <Text style={stylesArticles.celda}>
              Sup. total: 
            </Text>
          </td>
          <td>
            <Text style={stylesArticles.celda}>
            {`${sup_total}`}M2
            </Text>
          </td>
          <td>
            <Text style={stylesArticles.celda}>
              Peso total:
            </Text>
          </td>
          <td>
            <Text style={stylesArticles.celda}>
              {`${peso_total}`}kg
            </Text>
          </td>
        </tr>
      </table>
      
      <div style={styles.bottom_section}>
        <section style={styles.aclaracion}>
          <Text>
            SR CLIENTE: El Presupuesto refleja el valor correspondiente al material solicitado con las
            medidas provistas por usted o recomendadas por nuestros técnicos. Es IMPORTANTE que
            revise el presupuesto ya que su aprobación es compromiso de producción del mismo.
            La empresa no se hará responsable por diferencias que puedan producirse por este motivo.
            Este presupuesto está sujeto a posibles aumentos. El precio definitivo de las mercaderías 
            presupuestadas se fijara en el momento de su efectivo pago.
          </Text>
        </section>
        <section style={styles.totales}>
          <div style={styles.individuales}>
            <Text>Subtotal</Text>
            <Text>{subtotal}</Text>
          </div>
          <div style={styles.individuales}>
            <Text>IVA</Text>
            <Text>{iva}%</Text>
          </div>
          <div style={styles.individuales}>
            <Text>Total</Text>
            <Text>${total_con_impuestos}</Text>
          </div>
        </section>
      </div>

      {client.description && 
      <>
        <div style={styles.bottom_section}>
          <section style={styles.descripcion}>
            <Text >
              {client.description}
            </Text>
          </section>
        </div>
      </>
      }
      
      


    </Page>
    
  </Document>
  )
};



export default BudgetPDF;