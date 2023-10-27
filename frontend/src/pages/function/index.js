import Swal from "sweetalert2"

export const API_BASE_URL = 'http://localhost:5000'
//https://us-central1-revou-fullstack-2.cloudfunctions.net/week_17_defficharlina

export const getHeaders = () => {
    const token = localStorage.getItem('token');
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    };

export const showAlert = (icon, title, html) => {
  
Swal.fire
({
      icon,
      title,
      html,
    });
   }; 