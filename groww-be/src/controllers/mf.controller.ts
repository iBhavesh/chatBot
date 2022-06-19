import { RequestHandler } from "express";
import {MF} from "../models";
import mfData from "../data/mf.json";

export const getAllMF: RequestHandler = async (req, res) => {
  const { skip = 0, limit = 10 } = req.query;
  try {
    const mfs = await MF.find()
      .skip(+skip)
      .limit(+limit);
    return res.status(200).json(mfs);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getMF: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const mf = await MF.findById( id );
    if (mf) return res.status(200).json(mf);
    else return res.status(200).send("Mutual Fund not found");
  } catch (error) {
    res.status(400).send(error);
  }
};

export const buyMF: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const mf = await Stock.findById(id);
    if (mf) {
      return res.status(200).json(mf);
    } else {
      return res.status(200).send("Mutual Fund not found");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
}

export const populateMF:RequestHandler = async (req,res) => {
  try {
    for( const data of mfData) {
      await MF.create(data);
    }
    return res.send("MF populated");
  } catch(e) {
    return res.status(400).json({error:e.message})
  }
}