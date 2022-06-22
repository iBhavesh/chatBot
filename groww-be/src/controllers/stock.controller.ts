import e, { RequestHandler } from "express";
import { Stock, StockOrder } from "../models";
import stocksData from '../data/stocks.json'

export const getAllStocks: RequestHandler = async (req, res) => {
  const { skip = 0, limit = 10 } = req.query;
  try {
    const stocks = await Stock.find()
      .skip(+skip)
      .limit(+limit);
    return res.status(200).json(stocks);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getStock: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const stock = await Stock.findById( id );
    if (stock) return res.status(200).json(stock);
    else return res.status(200).send("Stock not found");
  } catch (error) {
    res.status(400).send(error);
  }
};

export const buyStock: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const stock = await Stock.findById(id);
    if (stock) {
      return res.status(200).json(stock);
    } else {
      return res.status(200).send("Stock not found");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
}

export const populateStocks:RequestHandler = async (req,res) => {
  try {
    for( const data of stocksData) {
      await Stock.create(data);
    }
    return res.send("Stocks populated");
  } catch(e) {
    return res.status(400).json({error:e})
  }
}