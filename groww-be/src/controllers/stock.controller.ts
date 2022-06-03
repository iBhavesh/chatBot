import e, { RequestHandler } from "express";
import { Stock, StockOrder } from "../models";

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
  return res.status(500).send("Internal server error");
};

export const getStock: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const stock = await Stock.findOne({ searchId: id });
    if (stock) return res.status(200).json(stock);
    else return res.status(200).send("Stock not found");
  } catch (error) {
    res.status(400).send(error);
  }
  return res.status(500).send("Internal server error");
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