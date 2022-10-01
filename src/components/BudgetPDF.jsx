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
  articles: {
    flexDirection: 'row',
    marginLeft:10,
    marginTop:5,
    paddingLeft:5,
    fontSize: 14,
    justifyContent: 'space-around',
    position:'absolute',
    
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
      <View style={styles.headers}>
        <Text>
          Cantidad              Descripcion       Medidas      Superficie   Precio por U.     Total
        </Text>
      </View>
      {
        articles?.map((e, index) =>
        <>
        <View style={stylesArticles.articles}>
            <Text style={{left: 2, top: topPosition + index*20}}>{e.quantity}</Text>
            <Text style={{left: 15, top: topPosition + index*20}}>{e.name}</Text>
            <Text style={{left: 50, top: topPosition + index*20}}>{`${e.height}x${e.width}`}</Text>
            <Text style={{left: 88, top: topPosition + index*20}}>{`${e.height * e.width}`}M2</Text>
            <Text style={{left: 130, top: topPosition + index*20}}>{e.price}</Text>
            <Text style={{left: 200, top: topPosition + index*20}}>{e.price * e.quantity}</Text>
        </View>
        
        </>
        )
      } 
      


    </Page>
    
  </Document>
  )
};



export default BudgetPDF;