'use client';
import React from 'react';
import axios from 'axios';
import { useEffect, useState, use } from 'react';
import Invoice from '@/components/invoice/invoice';
import Preloader from '@/components/Layout/loader';


export default function page({params}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderid , setOrderid] = useState(null);
    const param = use(params);

    useEffect(() => {
        if (param.id) {
            setOrderid(param.id);
        }
    }
    , [param.id]);

    useEffect( () => {
        const fetchData = async () => {
            if (orderid) {
                try {
                    const response = await axios.post(`/api/orders/getOrderById/`, { id: orderid });
                    setData(response.data.order);
                    console.log(response.data.order);
                } catch (error) {
                    console.log(error);
                    setError(error);
                }
                setLoading(false);
            }
        };
        fetchData();

    }
    , [orderid]);
    if (loading) return <Preloader />;
  return (
    <div>
        <Invoice order={data}/>
    </div>
  )
}
