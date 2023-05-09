import { useState, useEffect } from 'react';
import axios from 'axios';
import * as Intl from 'intl';
import styles from './ordenes.css'

interface Order {
  orderId: number;
  orderDate: string;
  orderValue: number;
  firstName: string;
}

interface Props {
  idLinker: string;
}

const Ordenes = ({ idLinker }: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://websvrx.hermeco.com/offcorsspersonalization/public/api/Ventadirectanew/orderLinkers/${idLinker}`);
      setOrders(response.data);
    };
    
    fetchData();
  }, [idLinker]);

  useEffect(() => {
    if (selectedMonth && orders.length > 0) {
      const filtered = orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        const month = orderDate.toLocaleString('default', { month: 'long' });
        return month.toLowerCase() === selectedMonth.toLowerCase();
      });
      const sorted = filtered.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
      setFilteredOrders(sorted);
    } else {
      const sorted = orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
      setFilteredOrders(sorted);
    }
    setCurrentPage(1); 
  }, [orders, selectedMonth]);

  const totalCompletedOrders = filteredOrders ? filteredOrders.length : 0;
  const totalPages = Math.ceil(totalCompletedOrders / pageSize);

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value));
    setCurrentPage(1);}

  const indexOfLastOrder = currentPage * pageSize;
  const indexOfFirstOrder = indexOfLastOrder - pageSize;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };

  const svg = <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.3333 3.33335H20V0.666687H17.3333V3.33335H6.66667V0.666687H4V3.33335H2.66667C1.18667 3.33335 0.0133333 4.53335 0.0133333 6.00002L0 24.6667C0 26.1334 1.18667 27.3334 2.66667 27.3334H21.3333C22.8 27.3334 24 26.1334 24 24.6667V6.00002C24 4.53335 22.8 3.33335 21.3333 3.33335ZM21.3333 24.6667H2.66667V11.3334H21.3333V24.6667ZM21.3333 8.66669H2.66667V6.00002H21.3333V8.66669ZM8 16.6667H5.33333V14H8V16.6667ZM13.3333 16.6667H10.6667V14H13.3333V16.6667ZM18.6667 16.6667H16V14H18.6667V16.6667ZM8 22H5.33333V19.3334H8V22ZM13.3333 22H10.6667V19.3334H13.3333V22ZM18.6667 22H16V19.3334H18.6667V22Z" fill="#404040"/>
  </svg>
  

  return (
    <div className={styles.earnings__container}>
      <h2 className={styles.earnings__title}>Mis Ganancias</h2>
      <div className={styles.earnings__selectMonth}>
        <label className={styles.earnings__label} htmlFor="filter-month">Mes</label> <br/>
        <select className={styles.earnings__select} id="filter-month" value={selectedMonth} onChange={handleFilter}>
          <option value=""> Todos los meses</option>
          <option value="enero"> Enero</option>
          <option value="febrero"> Febrero</option>
          <option value="marzo">Marzo</option>
          <option value="abril">Abril</option>
          <option value="mayo">Mayo</option>
          <option value="junio">Junio</option>
          <option value="julio">Julio</option>
          <option value="agosto">Agosto</option>
          <option value="septiembre">Septiembre</option>
          <option value="octubre">Octubre</option>
          <option value="noviembre">Noviembre</option>
          <option value="diciembre">Diciembre</option>
        </select>
      </div>
      <h3 className={styles.earnings__subtitle}>Órdenes completadas ({totalCompletedOrders})</h3>
      <div className={styles.results}>
        {currentOrders.map((order, index) => (
          <div className={styles.results__container} key={index}>
            <h3 className={styles.results__title}>{order.firstName}</h3>
            <p className={styles.results__text}><span className={styles.results__span}> Orden ID: </span> {order.orderId}</p>
            <p className={styles.results__text}><span className={styles.results__span}>Fecha de compra: </span> {new Date(order.orderDate).toLocaleDateString('es-ES', options)}</p>
            <p className={styles.results__text}><span className={styles.results__span}>Total de la compra: $ </span>{order.orderValue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }).replace(/\.00$/, '')}</p>
          </div>
        ))}
      </div>
      <div className={styles.earnings__pageSize}>
  <label className={styles.earnings__label} htmlFor="page-size">Resultados por página </label>
  <select className={styles.earnings__select__label} id="page-size" value={pageSize} onChange={handlePageSizeChange}>
    <option value={10}>10</option>
    <option value={20}>20</option>
    <option value={50}>50</option>
  </select>
</div>

    </div>
  );
};

export default Ordenes