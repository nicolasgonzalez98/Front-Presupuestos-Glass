import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { useState } from 'react';





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
function BudgetPDF({number_budget, articles}){
  
  let [topPosition, setTopPosition] = useState(220)

  return (
  <Document>
    
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Presupuesto #{number_budget}</Text>
        <Image style={styles.image} src='./decorglass.jpg' />
        <Text style={styles.mail}>E-Mail de contacto: info.ventas.decorglass@gmail.com</Text>
      </View>
      <View style={styles.client}>
        <Text>Cliente: Nicolas Gonzalez</Text>
        <Text style={styles.date}>Fecha</Text>
      </View>
      <table>
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
            <td><Text style={stylesArticles.celda}>{e.quantity}</Text></td>
            <td><Text style={stylesArticles.celda}>{e.name}</Text></td>
            <td><Text style={stylesArticles.celda}>10kg</Text></td>
            <td><Text style={stylesArticles.celda}>{`${e.width}x${e.height}M2`}</Text></td>
            <td><Text style={stylesArticles.celda}>{e.width * e.height}</Text></td>
            <td><Text style={stylesArticles.celda}>{e.price}</Text></td>
            <td><Text style={stylesArticles.celda}>{e.price * e.quantity}</Text></td>
          </tr>
        )}
        <tr style={stylesArticles.headers2}>
          <td>
            <Text style={stylesArticles.celda}>
              Superficie total: 20000M2
            </Text>
          </td>
        </tr>
      </table>
      
      {/* <View style={stylesArticles.bottom_table}>
        <Text style={{left: 335, top: topPosition + articles.length * 20 + 10}}>20000M2</Text>
      </View> */} 
      


    </Page>
    
  </Document>
  )
};



export default BudgetPDF;