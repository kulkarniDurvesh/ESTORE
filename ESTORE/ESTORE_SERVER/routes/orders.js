const express = require('express');
const pool = require('../shared/pool');
const checkToken = require('../shared/checkToken');
const orders = express.Router();


orders.post('/add',checkToken,(req,res)=>{
    try{
        let userName = req.body.userName;
        let userEmail = req.body.userEmail;
        let address = req.body.address;
        let city = req.body.city;
        let state = req.body.state;
        let pin = req.body.pin;
        let total = req.body.total;
        let orderDetails = req.body.orderDetails;
        console.log(`${userEmail}`);
        pool.query(`select id from users where email ='${userEmail}'`,(error,user)=>{
            if(error){
                res.status(500).send({
                    error:error.code,
                    message:error.message
                })
            }else{

                if(user.length>0){
                    let userId = user[0].id;
                    const query = `insert into orders (userId,userName,address,city,state,pin,total) values(${userId},'${userName}','${address}','${city}','${state}','${pin}',${total}); select LAST_INSERT_ID();`;
                    console.log(query);
                    pool.query(query,(error,result)=>{
                        if(error){
                            res.status(401).send({
                                error:error.code,
                                message:error.message
                            });
                        }else{
                            let orderId = result[0].insertId;
                            orderDetails.forEach(item=>{
                                const detailsQuery = `insert into orderDetails(orderId,productId,qty,price,amount)values(${orderId},${item.productId},${item.qty},${item.price},${item.amount});`;
                                console.log(detailsQuery);

                                pool.query(detailsQuery,(detailsError,detailsResult)=>{
                                    if(detailsError){
                                        res.status(401).send({
                                            error:detailsError.code,
                                            message:detailsError.message
                                        })
                                    }
                                })
                            })
                        }
                        res.status(201).send({message:'successfully Updated'});

                    })
                }else{
                res.status(401).send({message:'User doesnt exists'});
                }
            }
        })

    }catch(error){
        res.status(400).send({
            error:error.code,
            message:error.message
        })
    }
});

orders.get('/allOrders',checkToken,(req,res)=>{
    try{
        let userEmail = req.query.userEmail;
        const ChkUserLgnQuery=`select id from users where email = '${userEmail}';`;

        pool.query(ChkUserLgnQuery,(error,user)=>{
            if(error){
                res.status(500).send({
                    error:error.code,
                    message:error.message
                })
            }else
            {
                if(user.length>0){
                    let userId = user[0].id;
                    const orderQuery = `select orderId,DATE_FORMAT(orderDate,'%m/%d/%Y') as orderDate,userName,address,state,pin,total from orders where userId = ${userId}`;
                    pool.query(orderQuery,(error,orders)=>{
                        if(error){
                            res.status(500).send({
                                error:error.code,
                                message:error.message
                            })
                        }
                        else{
                            if(orders.length>0)
                            {
                                const allOrders=[];
                                orders.forEach(order=>{
                                    allOrders.push({
                                        orderId:order.orderId,
                                        userName:order.userName,
                                        address:order.address,
                                        city:order.city,
                                        state:order.state,
                                        pin:order.pin,
                                        total:order.total,
                                        orderDate:order.orderDate
                                    });
                                });
                                res.status(200).send(allOrders);
                            }
                        }
                    });
                }
            }
        });
    }catch(error){
        res.status(400).send({
            error:error.code,
            message:error.error.message
        })
    }
});

orders.get('/orderproducts',checkToken,(req,res)=>{
    try{
        let orderId = req.query.orderId;
        const orderProductQuery = `select orderDetails.*,products.product_img,products.product_name from orderDetails,products where orderDetails.productId = products.id and orderId = ${orderId}`; 
        pool.query(orderProductQuery,(error,orderProducts)=>{
            if(error){
                res.status(500).send({
                    error:error.id,
                    message:error.message
                })
            }
            else{
                if(orderProducts.length>0)
                {
                    let orderDetails = [];
                    orderProducts.forEach(orderProduct=>{
                        orderDetails.push({
                            productId:orderProduct.productId,
                            productName:orderProduct.product_name,
                            productImage:orderProduct.product_img,
                            qty:orderProduct.qty,
                            price:orderProduct.price,
                            amount:orderProduct.amount
                        });
                    });
                    res.status(200).send(orderDetails)
                }
            }
        });
    }catch(error){
        res.status(401).send({
            error:error.code,
            message:error.message
        });
    }
});

module.exports = orders;