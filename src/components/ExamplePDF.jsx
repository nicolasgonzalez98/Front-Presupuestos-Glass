import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

let topPosition = 220

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
const ExamplePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Presupuesto #4687987</Text>
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
      <View style={stylesArticles.articles}>
        <Text style={{left: 2, top: topPosition}}>1</Text>
        <Text style={{left: 15, top: topPosition}}>Mampara blindada de acetato</Text>
        <Text style={{left: 50, top: topPosition}}>200x200</Text>
        <Text style={{left: 88, top: topPosition}}>40000M2</Text>
        <Text style={{left: 130, top: topPosition}}>100</Text>
        <Text style={{left: 200, top: topPosition}}>100</Text>
      </View>
      <View style={stylesArticles.articles}>
        <Text style={{left: 2, top: topPosition+20}}>1</Text>
        <Text style={{left: 15, top: topPosition+20}}>Mampara blindada de acetato</Text>
        <Text style={{left: 50, top: topPosition+20}}>200x200</Text>
        <Text style={{left: 88, top: topPosition+20}}>40000M2</Text>
        <Text style={{left: 130, top: topPosition+20}}>100</Text>
        <Text style={{left: 200, top: topPosition+20}}>100</Text>
      </View>
    </Page>
    
  </Document>
);

export default ExamplePDF;