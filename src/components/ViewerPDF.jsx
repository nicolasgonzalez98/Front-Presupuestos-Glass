import React from 'react';

import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import ExamplePDF from './ExamplePDF';

const ViewerPDF = () => 
    (<div>
        
        <PDFViewer>
            <ExamplePDF />  
        </PDFViewer>

        

    </div>
)

export default ViewerPDF;