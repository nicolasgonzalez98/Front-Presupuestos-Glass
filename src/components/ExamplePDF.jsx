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
    
  },
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
  }
  
});

const stylesArticles = StyleSheet.create({
  articles: {
    flexDirection: 'row',
    marginLeft:15,
    marginTop:5,
    paddingLeft:5,
    fontSize: 14,
    justifyContent: 'space-evenly',
    position:'absolute',
    
  },
  subarticles: {
    
    
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
      
      {/* <View style={stylesArticles.articles}>
        <Text style={[stylesArticles.subarticles, {left: 5, top: topPosition}]}>1</Text>
        <Text style={[stylesArticles.subarticles, {left: 30, top: topPosition}]}>Vidrio</Text>
        <Text style={[stylesArticles.subarticles, {left: 100, top: topPosition}]}>200x200</Text>
        <Text style={[stylesArticles.subarticles, {left: 350, top: topPosition}]}>40000M2</Text>
        <Text style={[stylesArticles.subarticles, {left: 440, top: topPosition}]}>100</Text>
        <Text style={[stylesArticles.subarticles, {left: 535, top: topPosition}]}>100</Text>
      </View>
      <View style={stylesArticles.articles}>
        <Text style={[stylesArticles.subarticles, {left: 5, top: topPosition+20}]}>1</Text>
        <Text style={[stylesArticles.subarticles, {left: 30, top: topPosition+20}]}>Mampara blindada de acetato</Text>
        <Text style={{left: 50, top: topPosition+20}}>200x200</Text>
        <Text style={{left: 88, top: topPosition+20}}>40000M2</Text>
        <Text style={{left: 130, top: topPosition+20}}>100</Text>
        <Text style={{left: 200, top: topPosition+20}}>100</Text>
      </View> */}
      <table>
        <thead>
          <tr style={styles.headers2}>
            <th><Text style={styles.celda}>Cantidad</Text></th>
            <th><Text style={styles.celda}>Descripcion</Text></th>
            <th><Text style={styles.celda}>Peso</Text></th>
            <th><Text style={styles.celda}>Medidas</Text></th>
            <th><Text style={styles.celda}>Superficie</Text></th>
            <th><Text style={styles.celda}>Precio por U.</Text></th>
            <th><Text style={styles.celda}>Total</Text></th>
          </tr>
        </thead>
        <tr style={styles.headers2}>
          <td><Text style={styles.celda}>1</Text></td>
          <td><Text style={styles.celda}>Vidrio</Text></td>
          <td><Text style={styles.celda}>10Kg</Text></td>
          <td><Text style={styles.celda}>200x200</Text></td>
          <td><Text style={styles.celda}>40000M2</Text></td>
          <td><Text style={styles.celda}>100</Text></td>
          <td><Text style={styles.celda}>100</Text></td>
        </tr>
        <tr style={styles.headers2}>
          <td><Text style={styles.celda}>1</Text></td>
          <td><Text style={styles.celda}>Mampara blindada de acetato</Text></td>
          <td><Text style={styles.celda}>10Kg</Text></td>
          <td><Text style={styles.celda}>100x100</Text></td>
          <td><Text style={styles.celda}>10000M2</Text></td>
          <td><Text style={styles.celda}>100</Text></td>
          <td><Text style={styles.celda}>100</Text></td>
        </tr>
      </table>
    </Page>
    
  </Document>
);

export default ExamplePDF;