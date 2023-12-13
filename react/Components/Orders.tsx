import React, { Fragment, useEffect, useState } from 'react'
import styles from '../styles/orders.module.css';
import { useGlobalContext } from '../context/GlobalContext';


const Orders = () => {
  const { profits } = useGlobalContext()

  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [filteredOrders, setFilteredOrders] = useState<Profits[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);


  useEffect(() => {
    if (selectedMonth && profits.length > 0) {
      const filtered = profits.filter(order => {
        const orderDate = new Date(order.orderDate);
        const month = orderDate.toLocaleString('default', { month: 'long' });
        return month.toLowerCase() === selectedMonth.toLowerCase();
      });
      const sorted = filtered.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
      setFilteredOrders(sorted);
    } else {
      const sorted = profits.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
      setFilteredOrders(sorted);
    }
    setCurrentPage(1);
  }, [profits, selectedMonth]);


  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value));
    setCurrentPage(1);
  }

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const totalCompletedOrders = filteredOrders ? filteredOrders.length : 0;
  const indexOfLastOrder = currentPage * pageSize;
  const indexOfFirstOrder = indexOfLastOrder - pageSize;
  const currentOrders: Profits[] = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className={styles.earnings__container}>
      <h2 className={styles.earnings__title}>Mis Ganancias</h2>
      <p className={styles.earnings__label}>
        Recuerda que a través de Fisapay recibirás tus ganancias. Haz clic {" "} {" "}
        <a href="https://www.fisapay.com.co/#!/Sign-Up/Natural-User" target='_blank' >aquí</a>
      </p>

      <div className={styles.earnings__selectMonth}>
        <label className={styles.earnings__label} htmlFor="filter-month">Mes</label> <br />
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

      {totalCompletedOrders > 0 ?
        <Fragment>
          <div className={styles.results}>
            {currentOrders.map((order, index) => (
              <div className={styles.results__container} key={index}>
                <h3 className={styles.results__title}>{order.firstName}</h3>
                <p className={styles.results__text}><span className={styles.results__span}> Orden ID: </span> {order.orderId}</p>
                <p className={styles.results__text}><span className={styles.results__span}>Fecha de compra: </span> {new Date(order.orderDate).toLocaleDateString('es-ES', options)}</p>
                <p className={styles.results__text}><span className={styles.results__span}>Total de la compra: </span>{(Number((order?.orderValue) / 100).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }))} </p>

              </div>
            ))}
          </div>

          <div className={styles.earnings__pageSize}>
            <label className={styles.earnings__label} htmlFor="page-size">Resultados por página </label>
            <select className={styles.earnings__select__label} id="page-size" value={pageSize} onChange={handlePageSizeChange}>
              <option value={5}>5</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </Fragment> : null
      }
    </div>
  );
};


export default Orders