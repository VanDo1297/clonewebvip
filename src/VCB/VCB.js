import React from "react";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Container from "../Container/Container";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import "./VCB.css"
export default function VCB() {
  return (
    <div className="page-wrapper">
      <Header />
      <section className="content">
        <div className="page-container">
          <div className="page-content-wrapper">
            <div className="page-content">
              <Breadcrumb />
              <Container />
            </div>
          </div>
          <div className="clear" style={{clear:'both'}}></div>
          
        </div> 
       
      </section>
      <Footer />
    </div>
    
  );
}
